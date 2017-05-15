import {UserEvents} from "../UserEvents/UserEvents.js";
import {View} from '../View/View.js';
import {WidgetConfig} from "../DataModel/Config/WidgetConfig.js";

let _barGraphWidgetFactory = null;
let _widgetFactory = null;
let _userEvents = null;

/**
 * Responsible for setting up new LineWidgets
 *

 **/
export class BarGraphWidgetFactory {
    //Implements singleton
    constructor(widgetFactory) {
        if (!_barGraphWidgetFactory) {
            _barGraphWidgetFactory = this;
            _widgetFactory = widgetFactory;
            _userEvents = new UserEvents();
        }
        return _barGraphWidgetFactory;
    }

    /**
     * Formats a date according to the date format specified in the language pack
     * @param date the date to format
     * @param tzOffset time zone offset
     * @return date string
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

    /**
     * Fill upp arrray
     */
    _fillUp(num, length) {
        return ("" + num).length < length
            ? this._fillUp("0" + num, length - 1)
            : num;
    }

    /**
     * This will return a properly formated Object, that return a propper array at config.key.value
     * Arrays will be real array containing their data
     * @return formatted configurableData
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

        for (let n = 0; n < groups - 1; n++) {
            labels.push(this._formatDate(new Date(unitTime.startDate.getTime() + interval * n), offset) + "\n - \n" + this._formatDate(new Date(unitTime.startDate.getTime() + interval * (n + 1)), offset));
        }
        labels.push(this._formatDate(new Date(unitTime.startDate.getTime() + interval * (groups - 1)), offset) + "\n - \n" + this._formatDate(new Date(unitTime.endDate.getTime()), offset));

        return {label: labels, interval: interval, startDate: unitTime.startDate, endDate: unitTime.endDate};
    }

    /**
     * This Function calculated the mean value of an array of numbers
     * @param meanArray Array with numbers
     * @return mean value
     */
    _calcMeanFromArray(meanArray) {
        let mean = 0;
        for (let data of meanArray) {
            mean += data;
        }
        if (meanArray.length == 0) {
            return mean;
        } else {
            return mean / meanArray.length;
        }
    }

    /*
     * Convert data from the DataObserver to barData array
     * @param data Data from the the DataObserver (Parsed via callback)
     * @return Sorted baredData array Format: [[[x,f1(x)],[x,f1(x)],[x,f1(x)],[x,f1(x)]],
     *                                                [[x2,f2(x)],[x,f2(x)],[x,f2(x)],[x,f2(x)]]]
     */
    _convertedDataToBarData(data) {
        let barData = [];
        // update barData pice by pices
        for (let n = 0; n < data.length; n++) {
            barData.push([]);
            if (typeof data[n].Observations !== 'undefined') {
                for (let i = 0; i < data[n].Observations.length; i++) {
                    // insert Data into array
                    barData[n].push([
                        new Date(data[n].Observations[i].Observation_phenomenonTime).toUTCString(),
                        data[n].Observations[i].Observation_result
                    ]);
                }
                // sort Data of one dataStream by time
                barData[n].sort(this._sortByFirstValue);
            }
        }
        return barData;
    }

    /*
     * Cut of data at min max
     * @param min Date of min (Date Object)
     * @param max Date of max (Date Object)
     * @param barData barData that should be trimed
     * @return min <= data <= max
     */
    _trimData(min, max, barData) {
        let result = [];
        for (let n = 0; n < barData.length; n++) {
            // trim
            result.push(barData[n].filter((coordinates) => {
                return (((new Date(coordinates[0])) >= min) && ((new Date(coordinates[0])) <= max));
            }));
        }
        return result;
    }

    /*
     * Calculated relativ min and max for bared Data
     * @param barData barData
     * @param delta Delat in ms
     * return min max object with the format {min: min, max: max}
     */
    _getRelativMinAndMax(barData, delta) {
        let min = new Date();
        let max = new Date();
        let minAndMax = [];
        barData.forEach((dataStream) => {
            if (dataStream.length >= 2) {
                minAndMax.push([
                    dataStream[0][0],
                    dataStream[dataStream.length - 1][0]
                ]);
            } else if (dataStream.length == 1) {
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
     * This function will group the data into n groups for the barGraph
     *
     * @param realBarData This array contains the data, that is parsed to the graph
     * @param groupInterval The amount of bars/Groups of the bar graph
     * @param labelTicks Contains the labels for each groupInterval
     * @return BarData grouped, so the barGraph can display it porperly
     */
    _groupData(realBarData, groupInterval, labelTicks) {
        let barData = [];
        for (let n = 0; n < groupInterval; n++) {
            barData.push([]);
            for (let realData of realBarData) {
                let i = 0;
                let mean = 0;
                let meanArray = [];
                for (let i = 0; i < realData.length && (new Date(realData[i][0]) < new Date(labelTicks.startDate.getTime() + labelTicks.interval * (n + 1))); i++) {
                    if (new Date(realData[i][0]) >= new Date(labelTicks.startDate.getTime() + labelTicks.interval * (n))) {
                        meanArray.push(realData[i][1]);
                    }
                }
                barData[n].push(this._calcMeanFromArray(meanArray));
            }
        }
        return barData;
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
        let html = $('<div/>').prepend(htmlTemplate);

        //create the id to be set in html
        let htmlId = "iotdbWidget" + id;
        let htmlIdSelector = `#${htmlId}`;

        //When html of widget is loaded, set up barGraph in canvas
        $("#templateWidgetCanvas").ready(() => {

            //Replace dummy ids with real ones
            $("#templateWidget").attr("id", htmlId);
            $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
            $("#templateWidgetCanvas").attr("id", `${htmlId}-canvas`);

            //Resize inner canvas after resizing
            $("#" + `${htmlId}`).parent().resize(function() {
                _barGraphWidgetFactory._resizeCanvas(htmlId);
            });

            // Set correct language for title
            $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetBarGraphTitle);

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
            let barData = [
                []
            ];
            let delta;
            let timeIntervalUnit;
            let realBarData = [];
            let barGraph;
            let min;
            let max;
            let color;
            let configurableOptions;
            let minAndMax = [];
            let groupInterval = 3;
            let labelTicks = {
                label: ""
            };

            //the DOM-Element to display the time of the last Update
            let lastUpdate = $(`#${htmlId}-lastUpdate`)[0];

            //Function to be called when new data arrives
            let dataUpdate = (data) => {

                // check if data is actually something
                if (data[0] != undefined && data[0].Observations != undefined) {

                    // Set time for last upadate
                    let date = new Date();
                    lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

                    // update barData
                    realBarData = this._convertedDataToBarData(data);

                    // Set min max values
                    if (timeRelative) {
                        let relMinMax = this._getRelativMinAndMax(realBarData, delta);
                        configurableOptions.xmin = relMinMax.min.toUTCString();
                        configurableOptions.xmax = relMinMax.max.toUTCString();
                    } else {
                        // min max have not changed, since they are absolute
                    }

                    // trim Data according to new min and max values
                    realBarData = this._trimData(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), realBarData);

                    //calculate labels of barGraph
                    labelTicks = this._calcLabelTicks(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), groupInterval);
                    barData = this._groupData(realBarData, groupInterval, labelTicks);
                    // console.log(labelTicks, groupInterval);

                    // set X-Axis label correctly
                    configurableOptions.labels = labelTicks.label;

                    // Redraw barGraph rgraph
                    RGraph.reset(document.getElementById(`${htmlId}-canvas`));
                    barGraph = new RGraph.Bar({id: `${htmlId}-canvas`, data: barData, options: configurableOptions}).draw();
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
                max = config.endTime.data.toUTCString();
                min = config.startTime.data.toUTCString();
                delta = this._getMilliseconds(config.timeInterval.data, timeIntervalUnit);

                // check if scatterGraph exists
                if (realBarData.length >= 1) {
                    // set min max
                    if (timeRelative) {
                        let relMinMax = this._getRelativMinAndMax(realBarData, delta);
                        min = relMinMax.min.toUTCString();
                        max = relMinMax.max.toUTCString();
                    } else {
                        // Do nothing, since min, max is set
                    }
                    // set X-Axis label correctly
                    labelTicks = this._calcLabelTicks(new Date(min), new Date(max), config.timeGroups.data);
                    // console.log(labelTicks, config.timeGroups.data);
                }

                // View configuration
                // set title by config settings title:
                groupInterval = config.timeGroups.data;

                configurableOptions = {
                    xmin: min,
                    xmax: max,
                    gutterLeft: 50,
                    colors: config.colors.data,
                    backgroundBarcolor1: config.backgroundBarcolor1.data,
                    backgroundBarcolor2: config.backgroundBarcolor2.data,
                    backgroundGrid: config.backgroundGrid.data,
                    gutterBottom: 120,
                    labels: labelTicks.label,
                    titleXaxis: "Time intervals",
                    titleXaxisPos: -0.1,
                    titleYaxis: config.titleY.data,
                    titleYaxisPos: 0.15
                };

                RGraph.reset(document.getElementById(`${htmlId}-canvas`));
                barGraph = new RGraph.Bar({id: `${htmlId}-canvas`, data: barData, options: configurableOptions}).draw();
            };

            callback(htmlId, dataUpdate, configUpdate);
            _barGraphWidgetFactory._resizeCanvas(htmlId);
        });
        return html;
    }

    /**
     * Called when canvas is resized, when widget is added to the dashboard, and when the resize handler (the arrow button) is released.
     * @param htmlId The id of the widget whose canvas shall be resized.
     * @private
     *
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
