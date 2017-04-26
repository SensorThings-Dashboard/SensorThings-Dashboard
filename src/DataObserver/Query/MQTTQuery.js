import {
    SensorThingsCommunications
} from "../../SensorThingsCommunication/SensorThingsCommunications.js";

let logging = false;

/**
 * represents a Query which is updated via MQTT.
 *
 * This class has the following properties:
 * queryId           -- in a Dashboard unique identidier number for a Query
 * handle            -- handle to a MQTT object
 * callback          -- the callback to refresh the Data in the DataModel
 *
 */
export class MQTTQuery {

    /** @param myHandle the interval to update this stream with
     * @param myCallback the callback to refresh the Data in the DataModel
     */
    constructor(myParameterMap, query, baseTopic, myCallback) {
        if (logging) console.log("new MQTTQuery Object");
        this.setCallback(myCallback);
        this.setParameterMap(myParameterMap);
        this.setHandleID(new SensorThingsCommunications().registerMQTT(myParameterMap, query, baseTopic, myCallback));
    }

    /**
     * sets the ParameterMap
     * @param {object} myParameterMap the ParameterMap
     */
    setParameterMap(myParameterMap) {
        this.parameterMap = myParameterMap;
    }

    /**
     * Gets the ParameterMap.
     * @returns {object} the parameterMap
     */
    getParameterMap() {
        return this.parameterMap;
    }


    /** Sets the matching handleID.
     * @param {integer} myID the new matching HandleID
     */
    setHandleID(myID) {
        this.handleID = myID;
    }

    /** Returns the matching HandleID.
     * @returns the matching HandleID
     */
    getHandleID() {
        return this.handleID;
    }

    /** Returns true if the data has to be retrieved from the Server.
     * @param time the time since startup in milliseconds
     * @returns false
     */
    registerIfNeeded(time) {
        return false;
    }

    /** get the queryId
     * @return the queryId
     */
    getQueryID() {
        return this.queryId;
    }

    /** set the queryId
     * @param n the new queryId
     */
    setQueryID(n) {
        this.queryId = n;
    }

    /** set the callback
     * @param c the new callback
     */
    setCallback(c) {
        this.callback = c;
    }

    /** get the callback
     * @return the current callback
     */
    getCallback() {
        return this.callback;
    }

    /** calls the callback.
     * Only for internal use
     */
    callIt(myData) {
        if (this.callback) {
            this.callback(myData);
        }
    }

    /** destroys the current Query
     */
    destroy() {
        new SensorThingsCommunications().unregister(this.getHandleID);
        delete this;
    }
}