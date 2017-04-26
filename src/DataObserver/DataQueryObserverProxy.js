import {
    DataObserver
} from './DataObserver.js';
import {
    DataModel
} from '../DataModel/DataModel.js';
import {
    SensorThingsCommunications
} from '../SensorThingsCommunication/SensorThingsCommunications.js';

let dataQueryObserverProxy = null;
let logging = false;

/**
 * is the Interface for other Modules to the DataObserver
 *
 * This class has the following properties:
 * myDataModel       -- reference to the DataModel
 * myDataObserver    -- reference to the DataObserver
 *
 */
export class DataQueryObserverProxy {

    /**
     * converts a value & unit combination of a timeinterval to a count of milliseconds
     * @param {int} value the count of <units>
     * @param {int} unit_const the constant for a timeunit
     * @return {int} the count of milliseconds 
     */
    _getMilliseconds(value, unit_const) {
        switch (unit_const) {
            case UNIT_MILLISECOND:
                return value;
                break;
            case UNIT_SECOND:
                return value * 1000;
                break;
            case UNIT_MINUTE:
                return value * 1000 * 60;
                break;
            case UNIT_HOUR:
                return value * 1000 * 60 * 60;
                break;
            case UNIT_DAY:
                return value * 1000 * 60 * 60 * 24;
                break;
            case UNIT_MONTH:
                return value * 1000 * 60 * 60 * 24 * 31;
                break;
            case UNIT_YEAR:
                return value * 1000 * 60 * 60 * 24 * 365;
                break;

            default:
                console.error("Error, unknown unit constant");
                return (value);
        }
    }

    /** Observer update function
     * @param {boolean} added boolean, shows if the datapoint was added
     * @param {boolean} removed boolean, shows if the datapoint was removed
     * if added and removed are true, it handles it as a change.
     * @param {Object} dataWidgetData the updated Element
     */
    update(added, removed, dataWidgetData) {
        if (logging) console.log("update Event", dataWidgetData.getQueryIDs());
        if (removed) {
            let queryIDs = dataWidgetData.getQueryIDs();
            for (let k in queryIDs) {
                this.myDataObserver.deleteQuery(queryIDs[k]);
            }
        }
        if (added) {
            let myParameterMap = dataWidgetData.getParameterMap();
            let myID = [];

            let callback = dataWidgetData.getDataCallback();

            let queryParams = dataWidgetData.getQueryParams();

            for (let k in queryParams) {

                let url = queryParams[k].data.dataStreamUrl.data;
                let mqttEn = queryParams[k].data.mqttEnabled.data;
                let mqttUrl = queryParams[k].data.mqttUrl.data;
                let mqttBaseTopic = queryParams[k].data.mqttBaseTopic.data;
                let updateInterval = queryParams[k].data.updateIntervalMs.data;
                let timeData = dataWidgetData.getConfigurableData();


                if (mqttEn) {
                    myID.push(this.myDataObserver.newMQTTQuery(myParameterMap, mqttUrl, mqttBaseTopic, callback[k]));
                } else {
                    if (timeData.startTime != null && timeData.endTime != null && timeData.timeInterval != null && timeData.timeIntervalUnit != null && timeData.timeIntervalRelative != null) {
                        let obsStart = timeData.startTime.data;
                        let obsEnd = timeData.endTime.data;
                        let obsSize = this._getMilliseconds(timeData.timeInterval.data, timeData.timeIntervalUnit.data);
                        if (logging) console.log("obsSize", timeData.timeInterval.data, timeData.timeIntervalUnit.data, obsSize);
                        let obsRel = timeData.timeIntervalRelative.data;

                        myID.push(this.myDataObserver.newQuery(myParameterMap, updateInterval, url, callback[k], obsStart, obsEnd, obsSize, obsRel));
                    } else {
                        myID.push(this.myDataObserver.newQuery(myParameterMap, updateInterval, url, callback[k], 0, 0, -1, true));
                    }
                }
            }
            dataWidgetData.setQueryIDs(myID);
        }
    }

    /**
     * gathers a list of all Datastreams on a SensorThingsServer
     * @param {string} url the URL to the Server
     * @param {function} callback a Callback to write the list to
     * @return {Array} the List of DataStreams on a SensorThingsServer
     */
    getDataStreamList(url, callback) {
        //only forwarded from SensorThingsCommunications
        new SensorThingsCommunications().getDataStreamList(url, callback);
    }

    /** Implements Singleton.
     * @return {DataQueryObserverProxy} Singleton DataQueryObserverProxy object.
     */
    constructor() {
        if (!dataQueryObserverProxy) {
            dataQueryObserverProxy = this;
            this.myDataObserver = new DataObserver();
            this.myDataModel = new DataModel();
            this.myDataModel.getUserConfig().getWidgetConfig().registerDataStreamsObserver(this.update.bind(this));
        }
        return dataQueryObserverProxy;
    }
}