import {
    UserEvents
} from "../UserEvents/UserEvents.js";
import {
    View
} from '../View/View.js';

let logging = false;

let _trafficLightWidgetFactory = null;
let _widgetFactory = null;
let _userEvents = null;

let htmlTemplate = `
        <div id="templateWidget" class="grid-stack-item-content">
        <div class="widget-header">
        <div class="widget-title">
        Widget-Title & Info
</div>
    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>
    </div>
    <div class="widget-footer">
    <div class="lastUpdate" id="templateWidgetLastUpdate">
    </div>
    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">
    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
    </button>
    </div>
    </div>`;

/**
 * Responsible for setting up new TrafficLight Widgets
 **/
export class TrafficLightWidgetFactory {
    //Implements singleton
    constructor(widgetFactory) {
        if (!_trafficLightWidgetFactory) {
            _trafficLightWidgetFactory = this;
            _widgetFactory = widgetFactory;
            _userEvents = new UserEvents();
        }
        return _trafficLightWidgetFactory;
    }

    /**
     * This will return a properly formated Object, that return a propper array at config.key.value
     * Arrays will be real array containing their data
     * @param configurable Data that should be formated
     * @return formated data
     */
    _formatConfigurableData(configurable) {
        let formattedObject = {};
        for (let key in configurable) {
            if (configurable[key].type == TYPE_ARRAY) {
                formattedObject[key] = {
                    data: configurable[key].data.map(function(d) {
                        for (let k in d.data) {
                            return d.data[k].data;
                        }
                    })
                };
            } else {
                formattedObject[key] = configurable[key];
            }
        }
        return formattedObject;
    }

    /**
     * Creates a new TrafficLight widget
     * @param {String} id The id of the new widget
     * @param {function} callback The function which will be called once the widget is all set up. Follow arguments will be passed:
     *           1. The id the widget has within the DOM
     *           2. The function to call when new data has arrived, with the new data as an argument
     * @return {HTML} The html of the Widget which should be inserted into the DOM
     **/
    create(id, callback) {
        let html = $('<div/>').prepend(htmlTemplate);

        //create the id to be set in html
        let htmlId = "iotdbWidget" + id;
        let htmlIdSelector = `#${htmlId}`;

        //When html of widget is loaded, set up traffic light in canvas
        $("#templateWidgetCanvas").ready(() => {
            let configuration = {};

            //Replace dummy ids with real ones
            html.find("#templateWidget").attr("id", htmlId);
            html.find("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");

            let trafficLight = document.createElement("DIV");
            trafficLight.className = "traffic-light";
            trafficLight.style.backgroundImage = "url('" + window.iotBaseDir + "res/TLred.svg')";

            let widget = html.find("#" + htmlId)[0];
            widget.insertBefore(trafficLight, html.find(".widget-footer")[0]);

            // Set correct language for title
            $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetTrafficLightTitle);

            // Set remove callback
            html.find(htmlIdSelector).find("#removeWidgetButton").click(function(e) {
                e.preventDefault();
                _userEvents.removeWidget(htmlId);
            });

            // Set config callback
            html.find(htmlIdSelector).find("#configureWidgetButton").click(function(e) {
                e.preventDefault();
                _userEvents.configureWidget(htmlId);
            });

            //the DOM-Element to display the time of the last Update
            let lastUpdate = html.find(`#${htmlId}-lastUpdate`)[0];

            //The function which is called with the new data
            let dataUpdate = function(data) {
                let trafficLight = $(`#${htmlId}.traffic-light`)[0];
                let date = new Date();
                lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();
                if (!data.Observations) {
                    return;
                }
                let newValue;
                let maxTime = 0;
                for (let k in data.Observations) {
                    if (new Date(data.Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
                        maxTime = new Date(data.Observations[k].Observation_phenomenonTime).getTime();
                        newValue = data.Observations[k].Observation_result;
                    }
                }

                let getFName = function(col) {
                    switch (col) {
                        case COLOR_RED:
                            return "red";
                            break;
                        case COLOR_YELLOW:
                            return "yellow";
                            break;
                        case COLOR_GREEN:
                            return "green";
                            break;
                        default:
                            return "green";
                    }
                };
                let image;
                if (newValue < configuration.lowerThreshold) {
                    image = getFName(configuration.lowerColor);
                    if (logging) console.log("lower");
                } else if (newValue <= configuration.upperThreshold) {
                    image = getFName(configuration.middleColor);
                    if (logging) console.log("middle");
                } else {
                    image = getFName(configuration.upperColor);
                    if (logging) console.log("upper");
                }

                //set the correct image
                $("#" + htmlId + " .traffic-light").css("background-image", "url('" + window.iotBaseDir + "res/TL" + image + ".svg')");

                //id not important but needed in tests
                let _view = new View("id");
                if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
                    _view.popLoading(htmlId);
                }
            };

            let configUpdate = function(config) {
                // format config properly
                config = this._formatConfigurableData(config);
                $(htmlIdSelector).find(".widget-title").text(config.title.data);

                configuration.lowerThreshold = config.lower.data;
                configuration.upperThreshold = config.upper.data;
                configuration.lowerColor = config.lowerColor.data;
                configuration.middleColor = config.middleColor.data;
                configuration.upperColor = config.upperColor.data;
                if (logging) console.log("loaded config:", configuration);

                /*
                let trafficLight = $("#" + htmlId + " .traffic-light")[0];
                trafficLight.setAttribute("lower", config.lower.data);
                trafficLight.setAttribute("higher", config.higher.data);*/
            }.bind(this);
            callback(htmlId, dataUpdate, configUpdate);
        });
        return html;
    };
}