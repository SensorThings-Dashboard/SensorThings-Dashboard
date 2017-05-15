import {
    UserEvents
} from "../UserEvents/UserEvents.js";
import {
    View
} from '../View/View.js';

let logging = false;

let _mapWidgetFactory = null;
let _widgetFactory = null;
let _userEvents = null;

let htmlTemplate =
    `<div id="mapWidget" class="grid-stack-item-content">
        <div class="widget-header">
        <div class="widget-title">
        Widget-Title & Info
</div>
    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>
    </div>
    <div id="mapWidgetDiv" class="mapWidgets"></div>
    <div class="widget-footer map-footer">
    <div class="lastUpdate" id="templateWidgetLastUpdate">
    </div>
    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">
    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
    </button>
    </div>
    </div>`;

/**
 * Responsible for setting up new MapWidgets
 *
 **/
export class MapWidgetFactory {
    //Implements singleton
    constructor(widgetFactory) {
        if (!_mapWidgetFactory) {
            _mapWidgetFactory = this;
            _widgetFactory = widgetFactory;
            _userEvents = new UserEvents();
            this.mapLayers = L.layerGroup();
            this.mapIDs = [];
        }
        return _mapWidgetFactory;
    }

    /**
     * Returns an array of all superLayers which contain all layers of a widget
     * @returns the layers
     */
    getMapLayers() {
        return this.mapLayers.getLayers();
    }

    /**
     * Upon widget removal, remove the corresponding superLayer from the array of all layers
     * @param id
     *      the id of the widget to be removed
     */
    removeLayerGroup(id) {
        for (let pair in this.mapIDs) {
            if (this.mapIDs[pair].mapID == id) {
                this.mapLayers.removeLayer(this.mapIDs[pair].layerID);
            }
        }
    }

    /**
     * This will return a properly formatted Object, that return a propper array at config.key.value
     * Arrays will be real array containing their data
     * @param configurable Data that should be formatted
     * @return formatted data
     */
    _formatConfigurableData(configurable) {
        let formattedObject = {};
        for (let key in configurable) {
            if (configurable[key].type == TYPE_ARRAY) {
                formattedObject[key] = {
                    data: configurable[key].data.map(function(d) {
                        return d.data;
                    })
                };
            } else  {
                formattedObject[key] = configurable[key];
            }
        }
        return formattedObject;
    }

    /**
     * Private sort function will compare two arrays by their time value
     *
     * @param a Array with a number at first position
     * @param b Array with a number at first postiion
     * @private
     **/
    _sortByTime(a, b) {
        if (a.time === b.time) {
            return 0;
        } else {
            return (a.time < b.time) ? -1 : 1;
        }
    }

    /**
     * Creates a new Map widget
     * @param id The id of the new widget
     * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
     *           1. The id the widget has within the DOM
     *           2. The function to call when new data has arrived, with the new data as an argument
     * @return The html of the Widget which should be inserted into the DOM
     **/
    create(id, callback) {
        let html = $('<div/>').prepend(htmlTemplate);

        //create the id to be set in html
        let htmlId = "iotdbWidget" + id;
        let htmlIdSelector = `#${htmlId}`;

        // set leaflet image path
        L.Icon.Default.imagePath = window.iotBaseDir + 'res/LeafletImages/';

        // create layer for geojson objects
        let superLayer = L.geoJSON();

        // add layer to the array of all layers of all maps
        this.mapLayers.addLayer(superLayer);
        this.mapIDs.push({
            mapID: htmlId,
            layerID: this.mapLayers.getLayerId(superLayer)
        });

        //When html of widget is loaded, set up map in div
        $("#mapWidgetDiv").ready(() => {

            //Replace dummy ids with real ones
            $("#mapWidget").attr("id", htmlId);
            $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
            $("#mapWidgetDiv").attr("id", `${htmlId}-div`);

            // Set correct language for title
            $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetMapTitle);

            // Set remove callback
            $(htmlIdSelector).find("#removeWidgetButton").click(function(e) {
                e.preventDefault();
                _userEvents.removeWidget(htmlId);
            });

            // Set config callback
            $(htmlIdSelector).find("#configureWidgetButton").click(function(e) {
                e.preventDefault();
                _userEvents.configureWidget(htmlId);
            });

            //the DOM-Element to display the time of the last Update
            let lastUpdate = $(`#${htmlId}-lastUpdate`)[0];

            // Try to initialize a map. This will fail if there is no HTML
            // component.
            let map = undefined;
            let tiles = undefined;
            try {
                // initialize a new map centered to the Karlsruhe Palace with a zoom level of 13
                map = L.map(htmlId + '-div').setView([49.014, 8.404], 13);

                $("#" + htmlId).parent().resize(() => setTimeout(function() {
                    map.invalidateSize();
                }, 200));

                // disable map dragging because it interferes with widget dragging, navigation is still possible with arrow keys
                map.dragging.disable();

                map.on('popupopen', function(e) {});

                // create map tiles and add them to the map
                tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmV4dXJ5IiwiYSI6ImNpd3R2ZzY5djAwbzcydXFyazRsam80cDAifQ.TaIW3pR4RS3UuyZg61HV6g', {
                    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>"
                });
                tiles.addTo(map);
                map.addLayer(superLayer);
            } catch (err) {
            }

            let markerTypes = [];
            let thresholds = [];

            // predefine traffic light marker icons for the three states
            let greenTrafficLight = L.icon({
                iconUrl: window.iotBaseDir + 'res/TLgreen.svg',
                iconSize: [15, 35]
            });
            let redTrafficLight = L.icon({
                iconUrl: window.iotBaseDir + 'res/TLred.svg',
                iconSize: [15, 35]
            });
            let yellowTrafficLight = L.icon({
                iconUrl: window.iotBaseDir + 'res/TLyellow.svg',
                iconSize: [15, 35]
            });

            // function to be called when new data arrives
            let dataUpdate = (data) => {
                superLayer.clearLayers();

                // update last update text
                if (lastUpdate !== undefined) {
                    lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();
                }

                for (let i = 0; i < data.length; i++) {
                    // check for undefined thing location within data
                    if (data[i].Thing_Locations !== undefined) {
                        let thingLoc = data[i].Thing_Locations[data[i].Thing_Locations.length - 1];

                        // check if the location's type is GeoJSON
                        if (thingLoc.encodingType !== "application/vnd.geo+json") {
                            console.error("Error, encoding type is not geoJSON");
                        } else {
                            let geoJson;
                            let type;

                            // check for invalid marker type
                            if (markerTypes[i] !== undefined) {
                                type = markerTypes[i];
                            }

                            let newValue;
                            let maxTime;

                            // handle different marker type inputs
                            switch (type) {
                                case MARKER_TYPE_PLAIN:
                                    // add GeoJSON to map
                                    geoJson = data[i].Thing_Locations[data[i].Thing_Locations.length - 1].location;
                                    superLayer.addData(geoJson);
                                    break;
                                case MARKER_TYPE_PLAINVALUE:
                                    // add GeoJSON to map and assign a popup with the latest observation result and the unit of measurement to it, but do nothing if no observation is available
                                    if (data[i].Observations == undefined) {
                                        break;
                                    }
                                    geoJson = data[i].Thing_Locations[data[i].Thing_Locations.length - 1].location;
                                    let unit = data[i].DataStream_unitOfMeasurement.symbol;

                                    maxTime = 0;
                                    for (let k in data[i].Observations) {
                                        if (new Date(data[i].Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
                                            maxTime = new Date(data[i].Observations[k].Observation_phenomenonTime).getTime();
                                            newValue = data[i].Observations[k].Observation_result;
                                        }
                                    }

                                    let popUpData = newValue.toString();

                                    let popUp;
                                    //append unit if there is one
                                    if (unit !== undefined) {
                                        popUp = L.popup({
                                            autoPan: false,
                                            autoClose: false
                                        }).setContent("<center>" + popUpData.toString() + " " + unit + "</center>");
                                    } else {
                                        popUp = L.popup({
                                            autoPan: false,
                                            autoClose: false
                                        }).setContent("<center>" + popUpData.toString() + "</center>");
                                    }

                                    marker = L.GeoJSON.geometryToLayer(geoJson);
                                    marker.bindPopup(popUp).addTo(superLayer).openPopup();
                                    break;
                                case MARKER_TYPE_TRAFFICLIGHT:
                                    // add GeoJSON to map change the marker icon dynamically to a certain traffic light, but do nothing if no observation is available
                                    if (data[i].Observations == undefined) {
                                        break;
                                    }
                                    geoJson = data[i].Thing_Locations[data[i].Thing_Locations.length - 1].location;
                                    let icon;

                                    maxTime = 0;
                                    for (let k in data[i].Observations) {
                                        if (new Date(data[i].Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
                                            maxTime = new Date(data[i].Observations[k].Observation_phenomenonTime).getTime();
                                            newValue = data[i].Observations[k].Observation_result;
                                        }
                                    }
                                    let value = newValue;

                                    let getFName = function(col) {
                                        switch (col) {
                                            case COLOR_RED:
                                                return redTrafficLight;
                                                break;
                                            case COLOR_YELLOW:
                                                return yellowTrafficLight;
                                                break;
                                            case COLOR_GREEN:
                                                return greenTrafficLight;
                                                break;
                                            default:
                                                return greenTrafficLight;
                                        }
                                    };
                                    if (value < thresholds[i].middle) {
                                        icon = getFName(thresholds[i].lowerColor);
                                    } else if (value <= thresholds[i].upper) {
                                        icon = getFName(thresholds[i].middleColor);
                                    } else {
                                        icon = getFName(thresholds[i].upperColor);
                                    }

                                    let marker = L.GeoJSON.geometryToLayer(geoJson);
                                    marker.setIcon(icon).addTo(superLayer);
                                    break;
                                case MARKER_TYPE_HISTORY:
                                    let hist = data[i].Thing_HistoricalLocations;
                                    // sort historical locations by time
                                    hist.sort(this._sortByTime);

                                    // make latitude/longitude array from historical locations
                                    let latlngs = [];
                                    for (let i = 0; i < hist.length; i++) {
                                        if (hist[i].hasOwnProperty('Locations')) {
                                            for (let j = 0; j < hist[i].Locations.length; j++) {
                                                latlngs.push(L.GeoJSON.geometryToLayer(hist[i].Locations[j].location).getLatLng());
                                            }
                                        }
                                    }
                                    // create history line from points
                                    L.polyline(latlngs, {
                                        color: 'red'
                                    }).addTo(superLayer);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
                if (logging) console.log("LAYERS: ", this.getMapLayers());

                let _view = new View();
                if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
                    _view.popLoading(htmlId);
                }
            };

            // function to be called when new configuration arrives
            let configUpdate = (config) => {
                // format config properly
                config = this._formatConfigurableData(config);
                html.find(".widget-title")[0].innerText = config.title.data;
                // Make the title available for direct users of the layer.
                if (superLayer.setTitle) {
                    superLayer.setTitle(config.title.data);
                } else {
                    superLayer.iotTitle = config.title.data;
                }

                // extract basic map options and set them, if we have a map.
                if (map !== undefined) {
                    map.setView(L.latLng(config.latitude.data, config.longitude.data), config.zoom.data);
                    map.removeLayer(tiles);
                    tiles = L.tileLayer(config.mapURL.data, {
                        attribution: config.attribution.data
                    }).addTo(map);
                }

                // extract marker type and color ranges from the config and save them
                for (let i = 0; i < config.sensorThingsConfiguration.data.length; i++) {
                    // read overlay type from config
                    markerTypes[i] = config.sensorThingsConfiguration.data[i].overlayType.data;
                    // read overlay type from config
                    let middle = config.sensorThingsConfiguration.data[i].thresholdMiddle.data;
                    let upper = config.sensorThingsConfiguration.data[i].thresholdUpper.data;
                    let lowerColor = config.sensorThingsConfiguration.data[i].lowerRangeColor.data;
                    let middleColor = config.sensorThingsConfiguration.data[i].middleRangeColor.data;
                    let upperColor = config.sensorThingsConfiguration.data[i].upperRangeColor.data;
                    thresholds[i] = {
                        middle: middle,
                        upper: upper,
                        lowerColor: lowerColor,
                        middleColor: middleColor,
                        upperColor: upperColor
                    }
                }
            };

            callback(htmlId, dataUpdate, configUpdate);
        });
        return html;
    }

}