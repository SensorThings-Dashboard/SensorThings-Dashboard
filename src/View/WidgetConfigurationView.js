import {
    ConfigTableRowFactory
} from './ConfigTableRowFactory.js';
import {
    View
} from './View.js';

let _wtData = null;
let _widgetConfigurableData = null;
let _widgetId = null;
let _widgetConfigurationView = null;

/**
 * This class represents a widget configuration service for a specific widget.
 * When creating this object a configuration window will show up,
 * where every detail of the widget will be configurable.
 *
 **/
export class WidgetConfigurationView {
    /**
     * Constructor of the widget configuration service, implements singleton
     * @param widgetData wtData object of the widget that should be configured.
     **/
    constructor(widgetData) {
        if (!_widgetConfigurableData) {
            // create new instance
            _widgetConfigurationView = this;
            _widgetConfigurationView._configTableRowFactory = new ConfigTableRowFactory();
            // configure close and save button
            $("#widget_conf_close").click(e => this._toggleView(_widgetConfigurableData));
            $("#widget_conf_save").click(e => this._saveExit());
        }

        // set up configuration of this service
        _wtData = widgetData;
        _widgetId = _wtData.getID();

        //access via this needed for testing purposes
        this.widgetConfigurableData = _widgetConfigurableData = _wtData.getConfigurableData();

        // create view and display it :)
        this._toggleView(_widgetConfigurableData);
    }


    /**
     * Save the edited key value map in the wtData and toggle view
     * @private
     */
    _saveExit() {
        _widgetConfigurationView._createConfigurableData();

        //should start loading new data soon
        if ([WIDGET_TYPE_PLAINTEXT].indexOf(_wtData.type) == -1 && _widgetConfigurableData.sensorThingsConfiguration.data[0].data.dataStreamUrl.data.length > 0)
            new View().pushLoading(_widgetId);

        _wtData.setConfigurableData(_widgetConfigurableData);
        this._toggleView(_widgetConfigurableData);
    }



    /**
     * Gets the relevant information out of any possible type of structure of DOM elements to create a ConfigurableData object.
     * @param tr Table row out of which to get data
     * @param key Name of the configurable feature
     * @param configurableData ConfigurableData object to append new data to
     * @returns {{value: *, type: *, options: *}|{failedAttribute: string}} The configurable data object in case of success, or else an object containing the attribute where the parsing error occurred.
     * @private
     */
    _extractValue(tr, key, configurableData) {
        let value, type, options = null;
        switch ($(tr).attr('class')) {
            case "widget-config-array-input":
                if (configurableData[key] == null) {
                    configurableData[key] = {};
                }
                type = TYPE_ARRAY;
                value = _widgetConfigurationView._getConfArray(tr, configurableData[key].data);
                break;
            case "widget-config-object-input":
                if (configurableData == null) configurableData = {};
                if (configurableData[key] == null) {
                    configurableData[key] = {};
                }
                type = TYPE_OBJECT;
                value = _widgetConfigurationView._getConfObject(tr, configurableData[key].data);
                break;
            case "widget-config-item":
                let input = $(tr).find(".widget-config-data");
                switch ($(input).attr("input_fmt")) {
                    case "string":
                        type = TYPE_STRING;
                        value = $(input).find(".widget-config-input").val();
                        //Assuming no invalid input is possible here.
                        break;
                    case "int":
                        type = TYPE_INTEGER;
                        value = parseInt($(input).find(".widget-config-input").val());
                        if (isNaN(value)) {
                            return {
                                failedAttribute: key
                            };
                        }
                        break;
                    case "date":
                        type = TYPE_DATE;
                        let str = $(input).find(".widget-config-input").val();
                        value = this._configTableRowFactory._dateAddMinutes(new Date(str + "Z"), new Date().getTimezoneOffset());
                        if (value == "Invalid Date" || value < new Date(0)) {
                            return {
                                failedAttribute: key
                            };
                        }
                        break;
                    case "dropdown":
                        type = TYPE_DROPDOWN;
                        value = parseInt($(input).find(".widget-config-input").find("option:selected").val());
                        let options = {};
                        $(input).find(".widget-config-input").find("option").each(function() {
                            options[$(this).text()] = $(this).val();
                        });
                        //Assuming no invalid input is possible here.
                        break;
                    case "number":
                        type = TYPE_NUMBER;
                        value = parseFloat($(input).find(".widget-config-input").val());
                        if (isNaN(value)) {
                            return {
                                failedAttribute: key
                            };
                        }
                        break;
                    case "color":
                        type = TYPE_COLOR;
                        value = $(input).find(".widget-config-input").val();
                        if (!/^#[0-9A-F]{6}$/i.test(value)) {
                            return {
                                failedAttribute: key
                            };
                        }
                        break;
                    case "checkbox":
                        type = TYPE_BOOLEAN;
                        value = $(input).find(".widget-config-input").prop("checked");
                        if (typeof(value) != "boolean") {
                            return {
                                failedAttribute: key
                            };
                        }
                        break;
                    case "fssearch":
                        type = TYPE_FUZZY_SENSOR_SEARCH;
                        value = $(input).find(".urlBox").val();
                        break;
                    default:
                        type = TYPE_OTHER;
                        console.log("unrecognized: ", $(input), $(input).attr("input_fmt"));
                        break;
                }
                break;
            default: //standard: ""
                type = TYPE_OTHER;
                value = $(tr).find(".widget-config-data").find("input").val();
                break;
        }
        return {
            value: value,
            type: type,
            options: options
        };
    }

    /**
     * Creates a ConfigurableDataObject out of the current configuration table and saves it in widgetConfigurableData.
     * @private
     */
    _createConfigurableData() {
        //deep clone for restoration
        let oldConfig = jQuery.extend(true, {}, _widgetConfigurableData);

        let myTable = $("#widget_conf_table");
        let len = $(myTable).children().length;
        for (let k = 0; k < len; k++) {
            let tr = $(myTable).children()[k];
            let key = $(tr).find(".widget-conf-label").attr("key-id");
            let value = this._extractValue(tr, key, _widgetConfigurableData, null);

            //Error handling
            if (value.failedAttribute) {
                alert("Parsing error at attribute \"" + value.failedAttribute + "\". Saving aborted, old configuration restored.\nPlease verify the current value.");
                //restore old config
                _widgetConfigurableData = oldConfig;
                return;
            }

            _widgetConfigurableData[key].data = value.value;
            _widgetConfigurableData[key].type = value.type;
        }
    }

    /**
     * Creates an array structure out of a configuration and all of its subcomponents.
     * @param {HTML} tr Configuration Table row out of which to extract array
     * @param {Object} res object to insert array entries in
     * @returns {Array}
     * @private
     */
    _getConfArray(tr, res) {
        res = [];
        let tbody = $(tr).find("tbody.widget-config-array-table").first();
        let len = $(tbody).children().length;
        for (let k = 0; k < len; k++) {
            let object = $(tbody).children()[k];
            let key = $(object).find(".widget-conf-label").attr("key-id");
            let value = this._extractValue(object, key, res);

            //Error handling
            if (value.failedAttribute) {
                return value;
            }

            if (res == null) res = [];
            if (res[key] == null) res[key] = {};
            res[key].data = value.value;
            res[key].type = value.type;
            res[key].options = value.options;
        }
        return res;
    }

    /**
     * Creates an object structure out of a configuration and all of its subcomponents.
     * @param {HTML} tr Configuration Table row out of which to extract object
     * @param {Object} res object to insert object attributes in
     * @returns {Object} the finished object structure
     * @private
     */
    _getConfObject(tr, res) {
        let tbody = $(tr).find("tbody.widget-config-object-table").first();
        let len = tbody.children().length;
        for (let k = 0; k < len; k++) {
            let object = tbody.children()[k];
            let key = $(object).find(".widget-conf-label").attr("key-id");
            let value = this._extractValue(object, key, res);

            //Error handling
            if (value.failedAttribute) {
                return value;
            }

            if (res == null) res = {};
            if (res[key] == null) res[key] = {};
            res[key].data = value.value;
            res[key].type = value.type;
            res[key].options = value.options;
        }
        return res;
    }

    /**
     * This method toggles the view of the configuration service and displays it.
     * @private
     */
    _toggleView(wConfigurableData) {
        let conf = $("div.conf-popup#configureWidget");
        if (conf.hasClass("open")) {
            conf.css("animationName", "animateOut");
        } else {
            //load DatastreamList for Searching
            _widgetConfigurationView._configTableRowFactory.loadDataStreamList();


            conf.find("#widget_conf_title").text("Configure widget: " + wConfigurableData.title.data);

            // Add an editable table of every configurable data to the window
            let confTable = $("#widget_conf_table");
            confTable.html('');
            for (let k in wConfigurableData) {
                if (wConfigurableData.hasOwnProperty(k)) {
                    let key = k;
                    let htmlId = key + '-' + _widgetId + '-config';

                    confTable.append(_widgetConfigurationView._configTableRowFactory.create(key, wConfigurableData[key], htmlId));
                }
            }
            conf.css("animationName", "animateIn");
        }

        conf.toggleClass("open");
    }
}