import {
    UserEvents
} from "../UserEvents/UserEvents.js";
import {
    View
} from "../View/View.js";
import {
    WidgetConfig
} from "../DataModel/Config/WidgetConfig.js";

let _gaugeWidgetFactory = null;
let _widgetFactory = null;
let _userEvents = null;

/**
 * Responsible for setting up new GaugeWidgets
 **/
export class GaugeWidgetFactory {
    //Implements singleton
    constructor(widgetFactory) {
        if (!_gaugeWidgetFactory) {
            _gaugeWidgetFactory = this;
            _widgetFactory = widgetFactory;
            _userEvents = new UserEvents();
        }
        return _gaugeWidgetFactory;
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
                        let res = [];
                        for (let k in d.data) {
                            res.push(d.data[k].data);
                        }
                        if (res.length == 1) {
                            return res[0];
                        } else {
                            return res;
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
     * Creates a new Gauge widget
     * @param {String} id The id of the new widget
     * @param {Function} callback The function which will be called once the widget is all set up. Follow arguments will be passed:
     *           1. The id the widget has within the DOM
     *           2. The function to call when new data has arrived, with the new data as an argument
     * @param {HTML} htmlTemplate The default template for Canvas widgets
     **/
    create(id, callback, htmlTemplate) {
        let html = $('<div/>').prepend(htmlTemplate);

        //create the id to be set in html
        let htmlId = "iotdbWidget" + id;
        let htmlIdSelector = `#${htmlId}`;

        //When html of widget is loaded, set up gauge in canvas
        $("#templateWidgetCanvas").ready(() => {

            //Replace dummy ids with real ones
            $("#templateWidget").attr("id", htmlId);
            $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
            $("#templateWidgetCanvas").attr("id", `${htmlId}-canvas`);

            //Resize inner map after 0.1 seconds
            $("#" + `${htmlId}`).parent().resize(function() {
                _gaugeWidgetFactory._resizeCanvas(htmlId);
            });

            // Set correct language for title
            $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetGaugeTitle);

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

            //Setup the actual gauge via RGraph
            let gauge = new RGraph.Gauge({
                id: htmlId + '-canvas',
                min: 0,
                max: 100,
                value: 0,
                options: {
                    anglesStart: RGraph.PI - (RGraph.PI / 8),
                    anglesEnd: RGraph.TWOPI + (RGraph.PI / 8),
                    shadow: false,
                    textColor: '#FFFFFF',
                    tickmarksBigColor: '#FFFFFF',
                    tickmarksMediumColor: '#FFFFFF',
                    tickmarksSmallColor: '#FFFFFF',
                    colorsRanges: [],
                    backgroundColor: '#000000',
                    borderInner: '#000000',
                    borderOuter: '#000000',
                    borderOutline: '#000000',
                    needleColors: ['#FF0000'],
                    needleType: 'line',
                    needleTail: true,
                    centerpinRadius: 0.1,
                    titleTop: '',
                    titleTopSize: 12,
                    titleTopColor: '#FFFFFF',
                    titleBottom: '',
                    titleBottomColor: '#FFFFFF',
                    titleBottomSize: 12,
                    labelsCentered: true,
                    labelsOffset: 7,
                    textAccessible: true,
                    initialConfig: true
                }
            }).draw();

            //the DOM-Element to display the time of the last Update
            let lastUpdate = $(`#${htmlId}-lastUpdate`)[0];

            //Function to be called when new data arrives
            let dataUpdate = (data) => {
                if (typeof data.Observations !== 'undefined') {
                    //Apply several info from the DataStream
                    let options = new WidgetConfig().getWidgetDataByID(htmlId).configurableData;
                    if (options.titleTop.data == "") {
                        options.titleTop = {
                            data: data.DataStream_name,
                            type: TYPE_STRING
                        };
                    }
                    if (options.titleBottom.data == "" && data.DataStream_unitOfMeasurement) {
                        options.titleBottom = {
                            data: "(" + data.DataStream_unitOfMeasurement.symbol + ")",
                            type: TYPE_STRING
                        };
                        configUpdate(options);
                    }

                    if (data.DataStream_unitOfMeasurement) {
                        options.titleBottom.data = data.DataStream_unitOfMeasurement.symbol;
                    }

                    let date = new Date();
                    lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

                    let newValue;
                    let maxTime = 0;
                    for (let k in data.Observations) {
                        if (new Date(data.Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
                            maxTime = new Date(data.Observations[k].Observation_phenomenonTime).getTime();
                            newValue = data.Observations[k].Observation_result;
                            console.log("Value: ", newValue);
                        }
                    }
                    gauge.value = newValue;
                    gauge.grow({
                        frames: 10
                    });
                }

                let _view = new View();
                if (_view.getLoadingWidgets().indexOf(htmlId) > -1) {
                    _view.popLoading(htmlId);
                }

            };

            //Function to be called when new configuration arrives
            let configUpdate = (config) => {
                // format config properly
                config = this._formatConfigurableData(config);
                html.find(".widget-title")[0].innerText = config.title.data;

                RGraph.reset(document.getElementById(`${htmlId}-canvas`));
                gauge = new RGraph.Gauge({
                    id: htmlId + '-canvas',
                    min: config.min.data,
                    max: config.max.data,
                    value: gauge? gauge.value : 7,
                    options: {
                        anglesStart: RGraph.PI - (RGraph.PI / 8),
                        anglesEnd: RGraph.TWOPI + (RGraph.PI / 8),
                        shadow: config.shadow.data,
                        textColor: config.textColor.data,
                        tickmarksBigColor: config.tickmarksBigColor.data,
                        tickmarksMediumColor: config.tickmarksMediumColor.data,
                        tickmarksSmallColor: config.tickmarksSmallColor.data,
                        colorsRanges: config.colorsRanges.data,
                        backgroundColor: config.backgroundColor.data,
                        borderInner: config.borderInnerColor.data,
                        borderOuter: config.borderOuterColor.data,
                        borderOutline: config.borderOutlineColor.data,
                        needleColors: [config.needleColor.data],
                        needleType: config.needleType.data,
                        needleTail: config.needleTail.data,
                        centerpinRadius: config.centerpinRadius.data,
                        titleTop: config.titleTop.data,
                        titleTopSize: config.titleTopSize.data,
                        titleTopColor: config.titleTopColor.data,
                        titleBottom: config.titleBottom.data,
                        titleBottomColor: config.titleBottomColor.data,
                        titleBottomSize: config.titleBottomSize.data,
                        labelsCentered: config.labelsCentered.data,
                        labelsOffset: config.labelsOffset.data,
                        textAccessible: config.textAccessible.data
                    }
                }).draw();
            };

            callback(htmlId, dataUpdate, configUpdate);
            _gaugeWidgetFactory._resizeCanvas(htmlId);
        });
        return html;
    }

    /**
     * Called when canvas is resized, when widget is added to the dashboard, and when the resize handler (the arrow button) is released.
     * @param htmlId The id of the widget whose canvas shall be resized.
     * @private
     */
    _resizeCanvas(htmlId) {
        let canvas = $(`#${htmlId}-canvas`);
        let w = canvas.parent().width();
        let h = canvas.parent().height();
        canvas.attr("width", w);
        canvas.attr("height", h);
        RGraph.Clear(canvas[0]);
        RGraph.Redraw();
    }
}