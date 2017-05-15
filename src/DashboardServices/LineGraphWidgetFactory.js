import {UserEvents} from "../UserEvents/UserEvents.js";
import {View} from "../View/View.js";
let _lineGraphWidgetFactory = null;
let _widgetFactory = null;
let _userEvents = null;

/**
 * Responsible for setting up new LineWidgets
 *
 **/
export class LineGraphWidgetFactory {
    //Implements singleton
    constructor(widgetFactory) {
        if (!_lineGraphWidgetFactory) {
            _lineGraphWidgetFactory = this;
            _widgetFactory = widgetFactory;
            _userEvents = new UserEvents();
        }
        return _lineGraphWidgetFactory;
    }

    /**
     * This will return a properly formated Object, that return a propper array at config.key.value
     * Arrays will be real array containing their data
     * @param configurable Data that should be formated
     * @return formated data
     */
    _formatConfigurableData(configurable) {
        let formattedObject = {};

        // Check every key if it is an array.
        // If it is an array, then make it a real one
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
        // return formatted configurableData
        return formattedObject;
    }

    /**
     * Formats a date according to the date format specified in the language pack
     * @param date the date to format
     * @param tzOffset time zone offset
     * @return {string} date string
     * @private
     */
    _formatDate(date, tzOffset) {
        let str = window.iotlg.dateFormat;
        let actualDate = new Date();
        actualDate.setTime(date.getTime() + this._getMilliseconds(tzOffset, UNIT_HOUR));
        let hours = (actualDate.getUTCHours());
        let day = (actualDate.getUTCDate());

        str = str.replace("yyyy", actualDate.getUTCFullYear());
        str = str.replace("mm", this._fillUp(actualDate.getUTCMonth() + 1, 2));
        str = str.replace("dd", this._fillUp(day, 2));
        str = str.replace("hh", this._fillUp(hours, 2));
        str = str.replace("MM", this._fillUp(actualDate.getUTCMinutes(), 2));
        str = str.replace("ss", this._fillUp(actualDate.getUTCSeconds(), 2));
        str = str.replace(" ", "\n");
        return str;
    }

    _fillUp(num, length) {
        return ("" + num).length < length
            ? this._fillUp("0" + num, length - 1)
            : num;
    }

    /**
     * Private sort function will compare two arrays by theire value at the first position
     *
     * @param a Array with a number at first position
     * @param b Array with a number at first postiion
     * @private
     **/
    _sortByFirstValue(a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (new Date(a[0]) < new Date(b[0]))
                ? -1
                : 1;
        }
    }

    /**
     * Private sort function will compare two arrays by theire value at the first position
     *
     * @param a Array with a number at first position
     * @param b Array with a number at first postiion
     * @private
     **/
    _sortBySecondValue(a, b) {
        if (a[1] === b[1]) {
            return 0;
        } else {
            return (new Date(a[1]) < new Date(b[1]))
                ? -1
                : 1;
        }
    }

    /**
     * Private function to finde the bigest "reasonable" unit to label the difference
     *
     * @param {Date} date1 first date
     * @param {Date} date2 second date
     * @return Object with unit: constant, diffrence: diffrence in ms, starteDate: start, endDate: end
     * @private
     **/
    _calcBiggestTimeUnitDifference(date1, date2) {
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());

        // define start and end dates
        let startDate = date1;
        let endDate = date2;
        if (startDate > date2) {
            startDate = date2;
            endDate = date1;
        }

        // calculate biggest time unit difference
        if (timeDiff < 1000) {
            return {unit: UNIT_MILLISECOND, difference: timeDiff, startDate: startDate, endDate: endDate};
        } else if (Math.ceil((timeDiff / 1000) < 60)) {
            return {unit: UNIT_SECOND, difference: timeDiff, startDate: startDate, endDate: endDate};
        } else if (Math.ceil((timeDiff / (1000 * 60)) < 60)) {
            return {unit: UNIT_MINUTE, difference: timeDiff, startDate: startDate, endDate: endDate};
        } else if (Math.ceil((timeDiff / (1000 * 60 * 60)) < 24)) {
            return {unit: UNIT_HOUR, difference: timeDiff, startDate: startDate, endDate: endDate};
        } else if (Math.ceil((timeDiff / (1000 * 60 * 60 * 24)) < 31)) {
            return {unit: UNIT_DAY, difference: timeDiff, startDate: startDate, endDate: endDate};
        } else if (Math.ceil((timeDiff / (1000 * 60 * 60 * 24)) < 365)) {
            return {unit: UNIT_MONTH, difference: timeDiff, startDate: startDate, endDate: endDate};
        } else {
            return {unit: UNIT_YEAR, difference: timeDiff, startDate: startDate, endDate: endDate};
        }
    }

    /**
     * This method returns the amount of milliseconds for an value and unit
     *
     * @param {number} value Value of the time
     * @param {number} unit_const Unit of the time
     * @return amount of ms
     */
    _getMilliseconds(value, unit_const) {
        switch (unit_const) {
            case UNIT_MILLISECOND:
                return value;
            case UNIT_SECOND:
                return value * 1000;
            case UNIT_MINUTE:
                return value * 1000 * 60;
            case UNIT_HOUR:
                return value * 1000 * 60 * 60;
            case UNIT_DAY:
                return value * 1000 * 60 * 60 * 24;
            case UNIT_MONTH:
                return value * 1000 * 60 * 60 * 24 * 31;
            case UNIT_YEAR:
                return value * 1000 * 60 * 60 * 24 * 365;
            default:
                console.error("Error, unknown unit constant");
                return (value);
        }
    }

    /**
     * This methods generats an array of n strings of even distributed time stamps between start and End date
     *
     * @param startDate StartDate for the array
     * @param endDate endDate for the array
     * @param groups number of strings in the array
     * @return Object with Array of labels for the graph (.label), start & endDate, interval length

     */
    _calcLabelTicks(startDate, endDate, groups) {
        let offset = -Math.ceil((new Date().getTimezoneOffset()) / 60);
        // Calculated intervall length
        let unitTime = this._calcBiggestTimeUnitDifference(startDate, endDate);
        let interval = Math.ceil(unitTime.difference / groups);
        let labels = [];

        // Create labels for each group
        for (let n = 0; n < groups - 1; n++) {
            labels.push([
                this._formatDate(new Date(unitTime.startDate.getTime() + interval * n), offset),
                new Date(unitTime.startDate.getTime() + interval * n).toUTCString()
            ]);
        }
        // Add end date as last lable
        labels.push([
            this._formatDate(new Date(unitTime.endDate.getTime()), offset),
            new Date(unitTime.endDate.getTime()).toUTCString()
        ]);

        // Return object
        return {label: labels, interval: interval, startDate: unitTime.startDate, endDate: unitTime.endDate};
    }

    /*
     * Convert data from the DataObserver to scatterData array
     * @param data Data from the the DataObserver (Parsed via callback)
     * @param color Color for each datapoint (Point!! not line)
     * @return Sorted scatteredData array Format: [[[x,f1(x)],[x,f1(x)],[x,f1(x)],[x,f1(x)]],
     *                                                [[x2,f2(x)],[x,f2(x)],[x,f2(x)],[x,f2(x)]]]
     */
    _convertedDataToSccatterData(data, color) {
        let scatterData = [];
        // update scatterData pice by pices
        for (let n = 0; n < data.length; n++) {
            scatterData.push([]);
            if (typeof data[n].Observations !== 'undefined') {
                for (let i = 0; i < data[n].Observations.length; i++) {
                    // insert Data into array
                    scatterData[n].push([
                        new Date(data[n].Observations[i].Observation_phenomenonTime).toUTCString(),
                        data[n].Observations[i].Observation_result,
                        color
                    ]);
                }
                // sort Data of one dataStream by time
                scatterData[n].sort(this._sortByFirstValue);
            }
        }
        return scatterData;
    }

    /*
     * Cut off data at min max
     * @param min Date of min (Date Object)
     * @param max Date of max (Date Object)
     * @param scatterData scatterData that should be trimed
     * @return min <= data <= max
     */
    _trimData(min, max, scatterData) {
        let result = [];
        for (let n = 0; n < scatterData.length; n++) {
            // trim
            result.push(scatterData[n].filter((coordinates) => {
                return (((new Date(coordinates[0])) >= min) && ((new Date(coordinates[0])) <= max));
            }));
        }
        return result;
    }

    /*
     * Calculated relative min and max for scattered Data
     * @param scatterData scatterData
     * @param delta Delat in ms
     * return min max object with the format {min: min, max: max}
     */
    _getRelativMinAndMax(scatterData, delta) {
        let min = new Date();
        let max = new Date();
        let minAndMax = [];
        scatterData.forEach((dataStream) => {
            if (dataStream.length >= 2) {
                minAndMax.push([
                    dataStream[0][0],
                    dataStream[dataStream.length - 1][0]
                ]);
            }
            if (dataStream.length == 1) {
                minAndMax.push([dataStream[0][0], dataStream[0][0]
                ]);
            }
        });
        // Sort for min and set min
        min = new Date(minAndMax.sort(this._sortByFirstValue)[0][0]);
        // Sort for max and set max
        max = new Date(minAndMax.sort(this._sortBySecondValue)[minAndMax.length - 1][1]);

        // check if max is in future
        if (max > new Date()) {
            max = new Date();
        }

        // Check if min has to be reset
        if (max.getTime() - min.getTime() > delta) {
            min.setTime(max.getTime() - delta);
        }

        // return min max
        return {min: min, max: max};
    }

    /**
     * Creates a new LineGraph widget
     * @param id The id of the new widget
     * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
     *           1. The id the widget has within the DOM
     *           2. The function to call when new data has arrived, with the new data as an argument
     * @param htmlTemplate The default template for Canvas widgets
     * @return The html of the Widget which should be inserted into the DOM
     **/
    create(id, callback, htmlTemplate) {
        //Load the actual html to be displayed
        //Load the actual html to be displayed !synchronously
        let html = $('<div/>').prepend(htmlTemplate);

        //create the id to be set in html
        let htmlId = "iotdbWidget" + id;
        let htmlIdSelector = `#${htmlId}`;

        //When html of widget is loaded, set up lineGraph in canvas
        $("#templateWidgetCanvas").ready(() => {

            //Replace dummy ids with real ones
            $("#templateWidget").attr("id", htmlId);
            $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
            $("#templateWidgetCanvas").attr("id", `${htmlId}-canvas`);

            //Resize inner map after 0.1 seconds
            $("#" + `${htmlId}`).parent().resize(function() {
                _lineGraphWidgetFactory._resizeCanvas(htmlId);
            });

            // Set correct language for title
            $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetLineGraphTitle);

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

            // Define variables
            let timeRelative;
            let scatterData = [
                [
                    [0, 0, 'white']
                ]
            ];
            let delta;
            let timeIntervalUnit;
            let scatterGraph;
            let steps = 4;
            let color;
            let configurableOptions;
            let labelTicks = {
                label: ""
            };

            //the DOM-Element to display the time of the last Update
            let lastUpdate = $(`#${htmlId}-lastUpdate`)[0];

            //Function to be called when new data arrives
            let dataUpdate = (data) => {

                if (data[0] != undefined && data[0].Observations != undefined) {
                    // Convert Data into the right format
                    scatterData = this._convertedDataToSccatterData(data, color);

                    // Set min max values
                    if (timeRelative) {
                        let relMinMax = this._getRelativMinAndMax(scatterData, delta);
                        configurableOptions.xmin = relMinMax.min.toUTCString();
                        configurableOptions.xmax = relMinMax.max.toUTCString();
                    } else {
                        // min max have not changed, since they are absolute
                    }
                    // trim Data according to new min and max values
                    scatterData = this._trimData(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), scatterData);

                    // Update LastUpdated time of the LineGraphWidget
                    lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

                    // set X-Axis label correctly
                    let labelTicks = this._calcLabelTicks(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), steps);
                    configurableOptions.backgroundGridAutofitNumvlines = labelTicks.label.length;
                    configurableOptions.labels = labelTicks.label;

                    // Redraw scatter rgraph
                    RGraph.reset(document.getElementById(`${htmlId}-canvas`));
                    scatterGraph = new RGraph.Scatter({id: `${htmlId}-canvas`, data: scatterData, options: configurableOptions}).draw();
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

                //Check for absolute or rellativ and chose min max right
                timeRelative = config.timeIntervalRelative.data;
                timeIntervalUnit = config.timeIntervalUnit.data;
                let max = config.endTime.data.toUTCString();
                let min = config.startTime.data.toUTCString();
                delta = this._getMilliseconds(config.timeInterval.data, timeIntervalUnit);

                // check if scatterGraph exists
                if (scatterData.length >= 1) {
                    // set min max
                    if (timeRelative) {
                        let relMinMax = this._getRelativMinAndMax(scatterData, delta);
                        min = relMinMax.min.toUTCString();
                        max = relMinMax.max.toUTCString();
                    } else {
                        // Do nothing, since min, max is set
                    }
                    // set X-Axis label correctly
                    steps = config.labelSteps.data;
                    labelTicks = this._calcLabelTicks(new Date(min), new Date(max), steps);
                }

                if (config.ymin === undefined) {
                    config.ymin = {data:0, type:0};
                }

                color = config.pointColor.data;
                configurableOptions = {
                    xmin: min,
                    xmax: max,
                    ymin: config.ymin.data,
                    backgroundGridBorder: config.backgroundGridBorder.data,
                    backgroundGridVlines: config.backgroundGridVlines.data,
                    backgroundBarcolor1: config.backgroundBarcolor1.data,
                    backgroundBarcolor2: config.backgroundBarcolor2.data,
                    backgroundGridColor: config.backgroundGridColor.data,
                    gutterLeft: 50,
                    gutterBottom: 85,
                    tickmarks: config.tickmarks.data,
                    labels: labelTicks.label,
                    noxaxis: true,
                    textAngle: 45,
                    backgroundGridAutofitNumvlines: labelTicks.label.length,
                    ticksize: config.ticksize.data,
                    line: config.line.data,
                    lineColors: config.lineColors.data,
                    titleXaxis: config.titleXaxis.data,
                    titleXaxisPos: 0.1,
                    titleYaxis: config.titleYaxis.data,
                    titleYaxisPos: 0.15
                };

                RGraph.reset(document.getElementById(`${htmlId}-canvas`));
                scatterGraph = new RGraph.Scatter({id: `${htmlId}-canvas`, data: scatterData, options: configurableOptions}).draw();
            };

            callback(htmlId, dataUpdate, configUpdate);
            _lineGraphWidgetFactory._resizeCanvas(htmlId);
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
