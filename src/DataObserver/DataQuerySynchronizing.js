import {
    MQTTQuery
} from './Query/MQTTQuery.js';
import {
    TimedQuery
} from './Query/TimedQuery.js';
import {
    RandomDataQuery
} from './Query/RandomDataQuery.js';
import {
    SensorThingsCommunications
} from '../SensorThingsCommunication/SensorThingsCommunications.js'

let logging = false;

/** 
 * Synchronizes the Queries to the SensorThingsServer to prevent unneccesary Traffic.
 *
 * This class has the following properties:
 * queryList         -- saves all Querys
 * registeredQueries -- saves the Querys which should be retrived in this "tick"
 *
 */
export class DataQuerySynchronizing {

    /**
     * Constructor method of DataQuerySynchronizing.
     */
    constructor() {
        this.queryList = [];
        this.registeredQueries = [];
        return this;
    }

    /** adds a new Query to the Query-Scheduling
     * @param {Object} query the query object that should be added. Has to implement QueryTypeInterface.
     */
    addQuery(query) {
        this.queryList.push(query);
        if (logging) console.log("QueryList", this.queryList);
    }

    /** removes and destroys a query
     * @param {int} myID the ID of the Query
     */
    removeQuery(myID) {
        for (let k in this.registeredQueries) {
            if (this.registeredQueries[k].getQueryID() == myID) {
                this.registeredQueries.splice(k, 1);
            }
        }
        for (let k in this.queryList) {
            if (this.queryList[k].getQueryID() == myID) {
                var query = this.queryList[k];
                this.queryList.splice(k, 1);
                query.destroy();
            }
        }
    }

    /** called to iterate through all Queries and add the relevant ones to a seperate list
     */
    registerTimedQueries() {
        for (let k in this.queryList) {
            if (this.queryList[k].registerIfNeeded(Date.now())) {
                this.registeredQueries.push(this.queryList[k]);
            }
        }
    }

    /**
     * add the missing Parameters to the ParameterList
     * @params params {Array} the parameterList to autocomplete
     * @returns {Array} the completed parameterList 
     * @private
     */
    _completeParameterList(params) {
        params.DataStream_name = params.DataStream_name || false;
        params.DataStream_description = params.DataStream_description || false;
        params.DataStream_observationType = params.DataStream_observationType || false;
        params.DataStream_unitOfMeasurement = params.DataStream_unitOfMeasurement || false;
        params.DataStream_observedArea = params.DataStream_observedArea || false;
        params.DataStream_phenomenonTime = params.DataStream_phenomenonTime || false;
        params.DataStream_resultTime = params.DataStream_resultTime || false;
        params.Observation_phenomenonTime = params.Observation_phenomenonTime || false;
        params.Observation_resultTime = params.Observation_resultTime || false;
        params.Observation_result = params.Observation_result || false;
        params.Observation_resultQuality = params.Observation_resultQuality || false;
        params.Observation_validTime = params.Observation_validTime || false;
        params.Observation_parameters = params.Observation_parameters || false;
        params.FeatureOfInterest_name = params.FeatureOfInterest_name || false;
        params.FeatureOfInterest_description = params.FeatureOfInterest_description || false;
        params.FeatureOfInterest_encodingType = params.FeatureOfInterest_encodingType || false;
        params.FeatureOfInterest_feature = params.FeatureOfInterest_feature || false;
        params.ObservedProperty_name = params.ObservedProperty_name || false;
        params.ObservedProperty_definition = params.ObservedProperty_definition || false;
        params.ObservedProperty_description = params.ObservedProperty_description || false;
        params.Sensor_name = params.Sensor_name || false;
        params.Sensor_description = params.Sensor_description || false;
        params.Sensor_encodingType = params.Sensor_encodingType || false;
        params.Sensor_metadata = params.Sensor_metadata || false;
        params.Sensor_properties = params.Sensor_properties || false;
        params.Thing_name = params.Thing_name || false;
        params.Thing_HistoricalLocations = params.Thing_HistoricalLocations || false;
        params.Thing_Location_name = params.Thing_Location_name || false;
        params.Thing_Location_description = params.Thing_Location_description || false;
        params.Thing_Location_encodingType = params.Thing_Location_encodingType || false;
        params.Thing_Location_location = params.Thing_Location_location || false;
        return params;
    }

    /**
     * called after registerTimedQueries. it loads the data for all Queries in the seperate list
     * @param callback {function} Function to call when all requests have been dealt with
     */
    loadRegistered(callback) {
        let results = [];

        //retrieve which data is wanted
        for (let k in this.registeredQueries) {
            if (this.registeredQueries[k] instanceof TimedQuery) {
                let url = this.registeredQueries[k].getQueryString();
                let parameterList = this.registeredQueries[k].getParameterMap();
                let obsStart = this.registeredQueries[k].getObsStart();
                let obsEnd = this.registeredQueries[k].getObsEnd();
                let containsSameDate = function(e) {
                    return ((e.obsStart == obsStart) && (e.obsEnd == obsEnd));
                }
                if (!results[url]) {
                    results[url] = [];
                    results[url].push({
                        parameterList: parameterList,
                        obsStart: obsStart,
                        obsEnd: obsEnd,
                        qID: [this.registeredQueries[k].getQueryID()]
                    });
                } else if (results[url].some(containsSameDate)) {
                    let q = results[url].find(containsSameDate);
                    q.qID.push(this.registeredQueries[k].getQueryID());
                    for (let p in parameterList) {
                        if (q.parameterList == null) q.parameterList = {};
                        q.parameterList[p] = q.parameterList[p] || parameterList[p];
                    }
                } else {
                    results[url].push({
                        parameterList: parameterList,
                        obsStart: obsStart,
                        obsEnd: obsEnd,
                        qID: [this.registeredQueries[k].getQueryID()]
                    });
                }
            }
        }

        let allRequestsDone = function() {
            //send the wanted data to the endpoints which requested them

            for (let k in this.registeredQueries) {
                if (this.registeredQueries[k] instanceof TimedQuery) {
                    let obsStart = this.registeredQueries[k].getObsStart;
                    let obsEnd = this.registeredQueries[k].getObsEnd;
                    let matchingID = function(e) {
                        return e.qID.some(function(e) {
                            if (this.registeredQueries[k] == null) return;
                            return e == this.registeredQueries[k].getQueryID();
                        }.bind(this));
                    }
                    let obj = results[this.registeredQueries[k].getQueryString()].find(matchingID.bind(this));
                    if (obj != null) {
                        this.registeredQueries[k].callIt(obj.result);
                    } else {
                        this.registeredQueries[k].callIt(null);
                    }
                } else {
                    this.registeredQueries[k].callIt(null);
                }
            }
            callback();
        }.bind(this);

        //retrieve the wanted data
        let calledRequests = 0;
        for (let k in results) {
            for (let i in results[k]) {
                let url = k;
                let params = this._completeParameterList(results[k][i].parameterList);
                let obsStart = results[k][i].obsStart;
                let obsEnd = results[k][i].obsEnd;
                let cb = function(data) {
                    results[k][i].result = data;
                    calledRequests = calledRequests - 1;
                    if (calledRequests <= 0) {
                        allRequestsDone();
                    }
                };
                calledRequests = calledRequests + 1;
                if (!(obsStart instanceof Date) || !(obsEnd instanceof Date) || obsStart.getTime() <= obsEnd.getTime()) {
                    new SensorThingsCommunications().createQuery(url, params, cb.bind(this), obsStart, obsEnd);
                } else {
                    cb(null);
                }
            }
        }
        if (calledRequests <= 0) {
            allRequestsDone();
        }

    }

    /** called to clear the separate List after one iteration
     */
    clearRegisteredQueries() {
        this.registeredQueries = [];
    }
}