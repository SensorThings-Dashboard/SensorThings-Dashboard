import {
    UserEvents
} from "../UserEvents/UserEvents.js";
import {
    View
} from '../View/View.js';
import {
    WidgetConfig
} from "../DataModel/Config/WidgetConfig.js";

let _thermometerWidgetFactory = null;
let _widgetFactory = null;
let _userEvents = null;

/**
 * Responsible for setting up new ThermometerWidgets
 **/
export class ThermometerWidgetFactory {
    //Implements singleton
    constructor(widgetFactory) {
        if (!_thermometerWidgetFactory) {
            _thermometerWidgetFactory = this;
            _widgetFactory = widgetFactory;
            _userEvents = new UserEvents();
        }
        return _thermometerWidgetFactory;
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
     * This will set a negative number of scale decimals to zero and a number of over twenty to twenty
     * to prevent errors
     * @param {int} scaleDecimals the number of scale decimals
     * @returns {int} the corrected number
     * @private
     **/
    _correctScaleDecimals(scaleDecimals) {
        scaleDecimals = scaleDecimals < 0 ? 0 : scaleDecimals;
        scaleDecimals = scaleDecimals > 20 ? 20 : scaleDecimals;
        return scaleDecimals;
    }

    /**
     * Creates a new Thermometer widget
     * @param id The id of the new widget
     * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
     *           1. The id the widget has within the DOM
     *           2. The function to call when new data has arrived, with the new data as an argument
     * @param htmlTemplate The default template for Canvas widgets
     * @return The html of the Widget which should be inserted into the DOM
     **/
    create(id, callback, htmlTemplate) {
        let html = $('<div/>').prepend(htmlTemplate);

        //create the id to be set in html
        let htmlId = "iotdbWidget" + id;
        let htmlIdSelector = `#${htmlId}`;
        let _options = {
            scaleVisible: true,
            scaleDecimals: 2,
            gutterLeft: 60,
            gutterRight: 60,
            valueLabel: false
        };

        //When html of widget is loaded, set up thermometer in canvas
        $("#templateWidgetCanvas").ready(() => {

            //Replace dummy ids with real ones and set canvas size
            $("#templateWidget").attr("id", htmlId);
            $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
            $("#templateWidgetCanvas").attr("width", 160);
            $("#templateWidgetCanvas").attr("id", `${htmlId}-canvas`);

            //Resize inner map after 0.1 seconds
            $("#" + `${htmlId}`).parent().resize(function() {
                _thermometerWidgetFactory._resizeCanvas(htmlId);
            });

            // Set correct language for title
            $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetThermometerTitle);

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

            //create thermometer initially
            let thermometer;
            thermometer = new RGraph.Thermometer({
                id: htmlId + '-canvas',
                min: 0,
                max: 100,
                value: 7,
                options: _options
            }).draw();

            //the DOM-Element to display the time of the last Update
            let lastUpdate = $(`#${htmlId}-lastUpdate`)[0];

            //Function to be called when new data arrives
            let dataUpdate = (data) => {
                //console.log("Data", data);
                if (data != undefined && data.Observations != undefined) {
                    // update timestamp
                    let date = new Date();
                    lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

                    // search most recent observation
                    let newValue;
                    let maxTime = 0;

                    data.Observations.forEach((observation) => {
                        if (new Date(observation.Observation_phenomenonTime).getTime() > maxTime) {
                            maxTime = new Date(observation.Observation_phenomenonTime).getTime();
                            newValue = observation.Observation_result;
                            //console.log(newValue);
                        }
                    });

                    if(newValue){
                        // set the thermometer to the most recent observation result
                        if(thermometer == undefined){
                            // Redraw thermometer rgraph if it doesnt exist
                            RGraph.reset(document.getElementById(`${htmlId}-canvas`));
                            thermometer = new RGraph.Thermometer({
                                id: `${htmlId}-canvas`,
                                min: 0,
                                max: 100,
                                value: newValue,
                                options: _options
                            }).draw();
                        }
                        else{
                            thermometer.value = newValue;
                            thermometer.grow({
                                frames: 10
                            });
                        }
                    }
                }

                //id not important but needed in tests
                let _view = new View("id");
                if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
                    _view.popLoading(htmlId);
                }
            };

            //Function to be called when new configuration arrives
            let configUpdate = (config) => {

                // format config properly
                config = this._formatConfigurableData(config);
                html.find(".widget-title")[0].innerText = config.title.data;
                // check for and correct a negative scale decimals number
                config.scaleDecimals.data = this._correctScaleDecimals(config.scaleDecimals.data);

                _options = {
                    scaleVisible: config.scaleVisible.data,
                    scaleDecimals: config.scaleDecimals.data,
                    gutterLeft: config.gutterLeft.data,
                    gutterRight: config.gutterRight.data,
                    valueLabel: config.valueLabel.data,
                    titleSide: config.titleSide ? config.titleSide.data : ""
                }
                // redraw the thermometer and apply config changes
                RGraph.reset(document.getElementById(`${htmlId}-canvas`));
                thermometer = new RGraph.Thermometer({
                    id: htmlId + '-canvas',
                    min: config.min.data,
                    max: config.max.data,
                    value: 0,
                    options: _options
                }).draw();

            };

            callback(htmlId, dataUpdate, configUpdate);

            //Thermometer should be centered after creation
            _thermometerWidgetFactory._resizeCanvas(htmlId);
        });
        return html;
    }

    /**
     * Called when the widget container is resized. Resizes the inner canvas and redraws the widget.
     * @param htmlId Id of the widget.
     * @private
     */
    _resizeCanvas(htmlId) {
        let canvas = $(`#${htmlId}-canvas`);
        canvas.parent().css("margin-left", "5%");
        let w = canvas.parent().width();
        let h = canvas.parent().height();
        //Set bounds to ratio of w and h, because otherwise the thermometer looks terrible
        if (h * 1.0 / w > 3) {
            h = 3 * w;
        } else if (h * 1.0 / w < 2.5) {
            w = Math.max(h / 2.5, 170);
            w = Math.min(w, 280);
        }
        canvas.attr("width", w);
        canvas.attr("height", h);
        canvas.parent().css("margin-left", (canvas.parent().width() - w) * 0.5);
        RGraph.Clear(canvas[0]);
        RGraph.Redraw();
    }
}
