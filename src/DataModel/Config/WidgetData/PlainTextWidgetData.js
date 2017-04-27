import {
    View
} from '../../../View/View.js';
import {
    WidgetConfig
} from "../WidgetConfig.js";

/**
 * PlainTextWidgetData is the datamodel of a plainTextWidget widget
 */
export class PlainTextWidgetData {

    /**
     * Constructs new LineGraphWidgetData with an ID
     * @param {string} id
     *      id
     * @param {object} args
     *      arguments to init configurable data
     */
    constructor(id, args = {}) {
        this.id = id;
        this.type = WIDGET_TYPE_PLAINTEXT;

        // WidgetView Callback to notify for changed WidgetConfiguration
        this.configCallbacks = [];

        // Most recent data
        this.allData = [];

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
     * This function inits every configurable data with their default
     * @private
     */
    _initConfigurableData()  {
        this.configurableData = {
            // View configuration
            text: {
                data: window.iotlg.textWidgetDefaultText,
                type: TYPE_STRING
            },
            title: {
                data: 'Plaintext Widget',
                type: TYPE_STRING
            },
            fontSize: {
                data: 27,
                type: TYPE_INTEGER
            }
        };
    }

    /**
     * Registers a callback function from the view
     * @param {function} dataFunc
     *      data callback function
     * @param {function} configFunc
     *      configuration callback function
     */
    registerViewCallback(dataFunc, configFunc) {
        this.configCallbacks.push(configFunc);
        configFunc(this.configurableData);
      //  this.dataCallbacks.push(dataFunc);
      //  dataFunc(this.allData);
    }

    /**
     * Deletes Widget
     */
    destroy() {
        this.view.removeWidget(this.id);
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
     * @return {object} QueryParams
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
     * @return {object} object containing all configurable fields and their values
     */
    getConfigurableData() {
        return this.configurableData;
    }

    /**
     * This function sets the configurable data of this WidgetData
     * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
     */
    setConfigurableData(configurableData) {
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
    setQueryID(queryID) {
        this.queryID = queryID;
    }
}