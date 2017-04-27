import {
    MapWidgetData
} from "./WidgetData/DataWidgetData/MapWidgetData.js";
import {
    PlainTextWidgetData
} from "./WidgetData/PlainTextWidgetData.js";

let _widgetConfig = null;
let _widgetDataArray = null;

/**
 * class stores the Widget Configurations
 */
export class WidgetConfig {
    /**
     * Implementation of Singleton-Construction
     * @returns {object} WidgetConfig
     */
    constructor() {
        if (!_widgetConfig) {
            _widgetConfig = this;
            // init vars
            this.widgetDataArray = [];
            this.datastreamFunctions = [];
        }
        return _widgetConfig;
    }

    /**
     * get the widgetDataArray
     * @return {array} widgetDataArray - saved information
     */
    getConfigContent() {
        return this.widgetDataArray;
    }

    /**
     * set the widgetDataArray
     * @param {object} widgetDataArray
     */
    setConfigContent(widgetDataArray) {
        this.widgetDataArray = widgetDataArray;
    }

    /**
     * returns the widgetData from the wanted widget (key = id)
     * @param {string} id Id of the requested widget
     * @return {object} The WidgetData of the widget with the id "id", undefined if it doesn't exist
     */
    getWidgetDataByID(id) {
        return this.widgetDataArray.find(item => {
            return item.id === id;
        });
    }

    /**
     * Adds a new widget data to the list of all widget widgetData and notifies DataObserver
     * @param {object} widgetData
     *      new widget data to be added
     */
    addWidgetData(widgetData) {
        this.widgetDataArray.push(widgetData);
        if (!(widgetData instanceof PlainTextWidgetData)) {
            for (let func in this.datastreamFunctions) {
                this.datastreamFunctions[func](true, false, widgetData);
            }
        }
    }

    /**
     * Notifies DataObserver
     * @param {number} id ~ widgetID
     *      ID of the desired widget
     */
    widgetDataChanged(id) {
        let widgetData = this.getWidgetDataByID(id);
        if (!(widgetData instanceof PlainTextWidgetData || widgetData == null)) {
            for (let func in this.datastreamFunctions) {
                this.datastreamFunctions[func](true, true, widgetData);
            }
        }
    }

    /**
     * Removes a widget with the given ID from the list of widgetData and notifies DataObserver
     * @param {number} id ~ widgetID
     *      ID of the widget to be removed
     */
    removeWidgetData(id) {
        let widgetData = this.getWidgetDataByID(id);
        widgetData.destroy();
        let index = this.widgetDataArray.indexOf(widgetData);
        //actual removal
        this.widgetDataArray.splice(index, 1);

        if (!(widgetData instanceof PlainTextWidgetData || widgetData == null)) {
            for (let func in this.datastreamFunctions) {
                this.datastreamFunctions[func](false, true, widgetData);
            }
        }
    }

    /**
     * Removes all stored widget-information
     */
    removeAllWidgetData() {
        let temp = [];
        for (let widgetData in this.widgetDataArray) {
            temp.push(this.widgetDataArray[widgetData].id);
        }
        for (let i = 0; i < temp.length; i++) {
            this.removeWidgetData(temp[i]);
        }
    }

    /**
     * Subscription function for the DataObserver
     * @param {function} func
     *      callback function
     */
    registerDataStreamsObserver(func) {
        this.datastreamFunctions.push(func);
    }
}