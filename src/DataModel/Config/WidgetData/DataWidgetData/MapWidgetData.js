import {
    View
} from "../../../../View/View.js";
import {
    WidgetConfig
} from "../../WidgetConfig.js";

let logging = false;

/**
 * Class stores the data of one MapWidget
 */
export class MapWidgetData {

    /**
     * Constructs new MapWidgetData with an ID
     * @param {string} id
     *      widgetID
     * @param {object} args
     *      arguments to init configurable data
     */
    constructor(id, args = {}) {
        this.id = id;
        this.type = WIDGET_TYPE_MAP;

        // WidgetView Callback to notify for changed Data
        this.dataCallbacks = [];
        // WidgetView Callback to notify for changed WidgetConfiguration
        this.configCallbacks = [];

        // set up data observer callbacks
        this.dataObserverCallbacks = [this.newData.bind(this)];

        // Most recent data
        this.allData = [];
        this.allData.push([]);

        // Init WidgetConfiguration
        this._initConfigurableData();
        // set widget Data Attributes
        this.setAttributes(args);
        // Get view and widgetConfig
        this.view = new View();
        this.widgetConfig = new WidgetConfig();
    }

    /**
     * Sets the attributes needed for configuraion
     * @param {object} args
     *      the attributes
     */
    setAttributes(args) {
        this.position = args.position;
        this.size = args.size;
    }

    /**
     * returns a list of booleans representing, which Data is needed.
     * @returns {object} the parameterMap
     */
    getParameterMap() {
        let pm = {
            DataStream_name: true,
            DataStream_description: false,
            DataStream_observationType: false,
            DataStream_unitOfMeasurement: true,
            DataStream_observedArea: false,
            DataStream_phenomenonTime: true,
            DataStream_resultTime: false,
            Observation_phenomenonTime: false,
            Observation_resultTime: false,
            Observation_result: true,
            Observation_resultQuality: false,
            Observation_validTime: false,
            Observation_parameters: false,
            FeatureOfInterest_name: true,
            FeatureOfInterest_description: true,
            FeatureOfInterest_encodingType: true,
            FeatureOfInterest_feature: true,
            ObservedProperty_name: false,
            ObservedProperty_definition: false,
            ObservedProperty_description: false,
            Sensor_name: false,
            Sensor_description: false,
            Sensor_encodingType: false,
            Sensor_metadata: false,
            Thing_name: false,
            Thing_description: false,
            Thing_properties: false,
            Thing_HistoricalLocations: true,
            Thing_Location_name: true,
            Thing_Location_description: true,
            Thing_Location_encodingType: true,
            Thing_Location_location: true
        };
        return pm;
    }

    /**
     * This function inits every configurable data with their default
     * @private
     */
    _initConfigurableData()  {
        let nextHourTime = new Date();
        nextHourTime.setMinutes(new Date().getMinutes() + 1);
        this.configurableData = {
            // View configuration
            title: {
                data: 'Map Widget',
                type: TYPE_STRING
            },
            zoom: {
                data: 13,
                type: TYPE_INTEGER
            },
            mapURL: {
                data: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmV4dXJ5IiwiYSI6ImNpd3R2ZzY5djAwbzcydXFyazRsam80cDAifQ.TaIW3pR4RS3UuyZg61HV6g',
                type: TYPE_STRING
            },
            attribution: {
                data: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>",
                type: TYPE_STRING
            },
            latitude: {
                data: 49.014,
                type: TYPE_NUMBER
            },
            longitude: {
                data: 8.404,
                type: TYPE_NUMBER
            },

            // Data filter
            timeIntervalRelative: {
                data: true,
                type: TYPE_BOOLEAN
            },
            timeIntervalUnit: {
                data: UNIT_MINUTE,
                type: TYPE_DROPDOWN,
                options: {
                    second: UNIT_SECOND,
                    minute: UNIT_MINUTE,
                    hour: UNIT_HOUR,
                    day: UNIT_DAY,
                    month: UNIT_MONTH,
                    year: UNIT_YEAR
                }
            },
            timeInterval: {
                data: 5,
                type: TYPE_INTEGER
            },
            startTime: {
                data: new Date(),
                type: TYPE_DATE
            },
            endTime: {
                data: nextHourTime,
                type: TYPE_DATE
            },

            // ST configuration Attention: multiple Sensors are possible
            sensorThingsConfiguration: {
                data: [{
                    data: {
                        dataStreamUrl: {
                            data: '',
                            type: TYPE_FUZZY_SENSOR_SEARCH
                        },
                        mqttEnabled: {
                            data: false,
                            type: TYPE_BOOLEAN
                        },
                        mqttUrl: {
                            data: '',
                            type: TYPE_STRING
                        },
                        mqttBaseTopic: {
                            data: '',
                            type: TYPE_STRING
                        },
                        updateIntervalMs: {
                            data: 1000,
                            type: TYPE_INTEGER
                        },
                        overlayType: {
                            data: MARKER_TYPE_PLAIN,
                            type: TYPE_DROPDOWN,
                            options: {
                                plainMarker: MARKER_TYPE_PLAIN,
                                plainValueMarker: MARKER_TYPE_PLAINVALUE,
                                trafficLightMarker: MARKER_TYPE_TRAFFICLIGHT,
                                historyLine: MARKER_TYPE_HISTORY
                            }
                        },
                        thresholdMiddle: {
                            data: 0,
                            type: TYPE_NUMBER
                        },
                        thresholdUpper: {
                            data: 0,
                            type: TYPE_NUMBER
                        },
                        lowerRangeColor: {
                            data: COLOR_GREEN,
                            type: TYPE_DROPDOWN,
                            options: {
                                red: COLOR_RED,
                                yellow: COLOR_YELLOW,
                                green: COLOR_GREEN
                            }
                        },
                        middleRangeColor: {
                            data: COLOR_YELLOW,
                            type: TYPE_DROPDOWN,
                            options: {
                                red: COLOR_RED,
                                yellow: COLOR_YELLOW,
                                green: COLOR_GREEN
                            }
                        },
                        upperRangeColor: {
                            data: COLOR_RED,
                            type: TYPE_DROPDOWN,
                            options: {
                                red: COLOR_RED,
                                yellow: COLOR_YELLOW,
                                green: COLOR_GREEN
                            }
                        }
                    },
                    type: TYPE_OBJECT
                }],
                type: TYPE_ARRAY
            }
        };
    }

    /**
     * DataObserver pushes new data, callback methods from view are executed with new data
     * @param {object} data
     *      new data
     */
    newData(data) {
        this.allData[0] = data;
        for (let k in this.dataCallbacks) {
            this.dataCallbacks[k](this.allData);
        }
    }

    /**
     * Registers a callback function from the view
     * @param {function} dataFunc
     *      data callback function
     * @param {function} configFunc
     *      configuration callback function
     */
    registerViewCallback(dataFunc, configFunc) {
        this.dataCallbacks.push(dataFunc);
        this.configCallbacks.push(configFunc);
        dataFunc(this.allData);
        configFunc(this.configurableData);
    }

    /**
     * @returns {function} (this:LineGraphWidgetData)
     */
    getDataCallback() {
        if (logging) console.log(this.dataObserverCallbacks);
        return this.dataObserverCallbacks;
    }

    /**
     * Deletes Widget
     */
    destroy() {
        this.view.removeWidget(this.id);
        this.dataCallbacks = [];
    }

    /**
     * Getter for ID
     * @return {string} The ID
     */
    getID() {
        return this.id;
    }

    /**
     * Getter for Type
     * @return {number} The type
     */
    getType() {
        return this.type;
    }

    /**
     * Getter for position
     * @return {object} the position with attributes heigth and width
     */
    getPosition() {
        return this.position;
    }

    /**
     * Getter for size
     * @return {object} The size with attributes x and y
     */
    getSize() {
        return this.size;
    }

    /**
     * Get Query Params
     * @return QueryParams
     */
    getQueryParams() {
        return this.configurableData.sensorThingsConfiguration.data;
    }

    /**
     * Getter for queryIDs
     * @return {object} The QueryIDs
     */
    getQueryIDs() {
        return this.queryIDs;
    }

    /**
     * This function returns a key value map of the data, that is configurable
     */
    getConfigurableData() {
        return this.configurableData;
    }

    /**
     * This function sets the configurable data of this WidgetData
     * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
     */
    setConfigurableData(configurableData) {
        this._buildDataCallbacks(configurableData.sensorThingsConfiguration.data);

        this.configurableData = configurableData;
        for (let k in this.configCallbacks) {
            this.configCallbacks[k](this.configurableData);
        }
        this.widgetConfig.widgetDataChanged(this.id);
    }

    /**
     * Setter for position
     * @param {object} position The new position, with attributes width and height
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * Setter for size
     * @param {object} size The new size, with x and y attributes
     */
    setSize(size) {
        this.size = size;
    }

    /**
     * Setter for queryID
     * @param {object} queryID the new queryID
     */
    setQueryIDs(queryIDs) {
        this.queryIDs = queryIDs;
    }

    /**
     * @private
     */
    _buildDataCallbacks(sensorThingsConfiguration) {
        // clear data array
        this.allData = [];
        this.dataObserverCallbacks = [];

        let n = 0;
        //Add callback for each dataStreamUrl
        for (let stconfig in sensorThingsConfiguration) {
            // create callback for dataStreamUrl
            this.allData.push([]);
            let pos = n;
            this.dataObserverCallbacks.push(function(data) {
                if (logging) console.log("pushing data:", data, pos);
                this.allData[pos] = data;
                for (let k in this.dataCallbacks) {
                    this.dataCallbacks[k](this.allData);
                }
            }.bind(this));
            n++;
        }
        if (logging) console.log("Build " + n + " DataCallbacks");
    }
}