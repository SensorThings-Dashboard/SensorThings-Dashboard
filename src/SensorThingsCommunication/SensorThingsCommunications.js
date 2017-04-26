import {
    ServerQuery
} from './ServerQuery.js';
import {
    MQTTHandle
} from './MQTTHandle.js';
import {
    STParser
} from './STParser.js';

let sensorThingsCommunications = null;

/**
 * This class is the main class for handleing Communication with the STServer
 *
 * This class has the following properties:
 * myDataModel       -- reference to the DataModel
 * myDataObserver    -- reference to the DataObserver
 * mqttHandles       -- list of all registered MQTT Handles
 * nextID            -- the id for the next registering MQTT Handle
 *
 */
export class SensorThingsCommunications {

    /**
     * Implements Singleton.
     * @returns {SensorThingsCommunications} the Singleton object.
     */
    constructor() {
        if (!sensorThingsCommunications) {
            sensorThingsCommunications = this;
            this.mqttHandles = {};
            this.nextID = 1;
        }
        return sensorThingsCommunications;
    }

    /**
     * Creates a simple one-time query to the specified URL
     * @param {string} queryURL the URL to use
     * @param {Object} params the ParameterMap
     * @param {function} callback the callback to write the Data
     * @param {Date} obsStart start-date of the filter for the Observations
     * @param {Date} obsEnd end-date of the filter for the Observations
     */
    createQuery(queryURL, params, callback, obsStart, obsEnd) {
        new ServerQuery().createQuery(queryURL, params, callback, obsStart, obsEnd);
    }

    /**
     * Calls a simple one-time query without decoding and adding the selectors to the URL
     * @param {string} query the query. This has to be a syntactically correct and complete queryURL
     * @param {function} callback the callback to write the Data
     */
    createDirectQuery(query, callback) {
        new ServerQuery().createDirectQuery(query, callback);
    }

    /**
     * Calls a simple one-time query with Paging
     * @param {string} query the query. This has to be a syntactically correct and complete queryURL
     * @param {function} callback the callback to write the Data
     */
    createDirectQueryPaging(query, callback) {
        new ServerQuery().createDirectQueryPaging(query, callback);
    }

    /**
     * Gathers a list of all Datastreams on a SensorThingsServer
     * @param {string} url the URL to the Server
     * @param {function} callback a Callback to write the list to
     */
    getDataStreamList(url, callback) {
        let selectors = "/Datastreams?$top=100";
        this.createDirectQueryPaging(url + selectors, callback);
    }

    /**
     * Registers one or multiple MQTT queries to the specified URL
     *
     * @param {Object} parameterMap the ParameterMap
     * @param {string} query the queryString
     * @param {string} baseTopic the topic to navigate to the Datastream
     * @param {function} callback a callback to call if new Data is available
     * @returns {number} the id of the created mqttPack
     */
    registerMQTT(parameterMap, query, baseTopic, callback) {
        let topics = this._generateTopics(parameterMap);
        let myID = this.nextID;
        this.nextID = this.nextID + 1;
        this.mqttHandles[myID] = [];
        let callbackProxy = function(data) {
            callback(data);
        };
        let queryParts = {
            serverURL: query,
            genericTopic: baseTopic
        };

        for (let k in topics) {
            let mqtt = new MQTTHandle();

            /*ServerURL must look like: "<ServerIP>:<WebsocketPort>/mqtt" */
            /*Entity/Topic must look like: "v1.0/Datastreams(<DS Number>)/Observations"*/

            mqtt.registerMQTT(queryParts.serverURL, queryParts.genericTopic + topics[k], callbackProxy);
            this.mqttHandles[myID].push(mqtt);
        }
        return myID;
    }

    /**
     * removes a MQTT-Handle
     * @param {number} myID then ID of the MQTT Handle to be removed
     * @returns {boolean} success
     */
    unregister(myID) {
        if (this.mqttHandles[myID] != null) {
            for (let k in this.mqttHandles[myID]) {
                this.mqttHandles[myID][k].unregister();
            }
            this.mqttHandles[myID] = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * generates the topics for MQTT Queries. A Query which requests Data from multiple topics has to be split up into multiple MMQTT Queries.
     * @param {Object} pM the ParameterMap
     * @returns {Array} a List of the Topics to subuscribe to
     * @private
     */
    _generateTopics(pM) {
        let topics = [];
        let _addTopic = function(topic) {
            if (!topics.some(function(t) {
                    return (t == topic);
                })) {
                topics.push(topic);
            }
        };

        if (pM.DataStream_name || pM.DataStream_description || pM.DataStream_observationType || pM.DataStream_unitOfMeasurement || pM.DataStream_observedArea || pM.DataStream_phenomenonTime || pM.DataStream_resultTime) {
            _addTopic("");
        }
        if (pM.Observation_phenomenonTime || pM.Observation_resultTime || pM.Observation_result || pM.Observation_resultQuality || pM.Observation_validTime || pM.Observation_parameters) {
            _addTopic("/Observations");
        }
        if (pM.FeatureOfInterest_name || pM.FeatureOfInterest_description || pM.FeatureOfInterest_encodingType || pM.FeatureOfInterest_feature) {
            _addTopic("/Observations/FeatureOfInterest");
        }
        if (pM.ObservedProperty_name || pM.ObservedProperty_definition || pM.ObservedProperty_description) {
            _addTopic("/ObservedProperty");
        }
        if (pM.Sensor_name || pM.Sensor_description || pM.Sensor_encodingType || pM.Sensor_metadata) {
            _addTopic("/Sensor");
        }
        if (pM.Thing_name || pM.Thing_description || pM.Thing_properties) {
            _addTopic("/Thing");
        }
        if (pM.Thing_HistoricalLocations) {
            _addTopic("/Thing/HistoricalLocations");
        }
        if (pM.Thing_Location_name || pM.Thing_Location_description || pM.Thing_Location_encodingType || pM.Thing_Location_location) {
            _addTopic("/Thing/Location");
        }
        return topics;
    }
}