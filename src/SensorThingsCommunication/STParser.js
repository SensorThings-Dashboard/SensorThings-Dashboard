import {
    SensorThingsCommunications
} from './SensorThingsCommunications.js';


let logging = false;
let stParser = null;


/**
 * This class decodes several Things for the Communication with the SensorThingsServer
 *
 * This class has the following properties:
 * stComm            -- reference to SensorThingsCommunications
 *
 */
export class STParser {

    /**
     * Implements Singleton.
     * @returns {STParser} Singleton object
     */
    constructor() {
        if (!stParser) {
            stParser = this;
            this.stComm = new SensorThingsCommunications();
        }
        return stParser;
    }

    /**
     * Join two given pages from SensorThings API
     * @param {Array|Object} first page
     * @param {Array|Object} second page
     * @returns {Object} the joined page
     * @private
     */
    _joinObjectOrArray(obj1, obj2) {
        if (obj1 instanceof Array) {
            if (obj2 instanceof Array) {
                return obj1.concat(obj2);
            } else {
                return obj1;
            }
        } else if (obj1 === null || obj2 === null) {
            return null;
        } else {
            for (let k in obj1) {
                if (obj1.hasOwnProperty(k)) {
                    obj1[k] = this._joinObjectOrArray(obj1[k], obj2[k]);
                }
            }
            return obj1;
        }
    }

    /**
     * make a Deep copy of a given Array
     * @param {Array} array the array to clone
     * @returns {Array} the clone
     * @private
     */
    _clone(array) {
        let clone = [];
        for (let i in array) {
            clone[i] = array[i];
        }
        return clone;
    }

    /**
     * Returns the Object from the given object at the given path
     * @param {Object} object the Object which contains the requested data
     * @param {String} path the path in the given Object to the requested data
     * @returns {Object} the requested Data
     * @private
     */
    _getParam(object, path) {
        let first = path[0];
        if (path.length <= 0 || first == null || first == "") return object;
        let pathClone = this._clone(path);
        pathClone.shift();
        return this._getParam(object[first], pathClone);
    }

    /**
     * Set the Object from the given Object at the given Path w/ the given value
     * @param {Object} object the Object which contains the data to be set
     * @param {String} path the path to the data to be set
     * @param {Object} value the data to be set
     * @returns {Object} the modified Object
     * @private
     */
    _setParam(object, path, value) {
        let first = path[0];
        if (path.length == 1) {
            object[first] = value;
            return object;
        } else if (path.length <= 0 || first == null || first == "") {
            object = value;
            return value;
        }
        let pathClone = this._clone(path);
        pathClone.shift();

        object[first] = this._setParam(object[first], pathClone, value);
        return object;
    }

    /**
     * Deletes Object of the given object at the given path
     * @param {Object} object the Object which contains the Object to be deleted
     * @param {String} path the Path to find the Object to delete within the given Object
     * @returns {Object} the modified Object
     * @private
     */
    _deleteParam(object, path) {
        if (path.length <= 1) {
            if (object == null) return null;
            delete object[path[0]];
            return object;
        }
        let first = path[0];
        let pathClone = this._clone(path);
        pathClone.shift();
        if (first == "") {
            if (path[1] != null) {
                object[first] = this._deleteParam(object, pathClone);
                return object;
            }
            object = undefined;
            return undefined;
        }
        object[first] = this._deleteParam(object[first], pathClone);
        return object;
    }

    /**
     * checks which pages have to be queried and implicitly
     * querys those pages, merges the responses and calls the
     * "done" function with the merged response
     * @param {Object} response the response
     * @param {function} done the function to call once completed
     * @private
     */
    _readAdditionalPages(response, done) {
        let queryList = [];
        let _writeNextLinks = function(responseArray, path) {
            for (let k in this._getParam(responseArray, path)) {
                if (k.search("@iot.nextLink") >= 0) {
                    let myPath = this._clone(path);
                    let myUrlPath = this._clone(path);
                    let pathend = k.substring(0, k.search("@iot.nextLink"));
                    if (pathend != "" && pathend != null) myPath.push(pathend);
                    myUrlPath.push(k);
                    let obj = {
                        path: myPath,
                        urlPath: myUrlPath
                    };
                    queryList.push(obj);
                    if (logging) console.log("adding:", k, myPath, obj);
                } else if (this._getParam(responseArray, path)[k] instanceof Object || this._getParam(responseArray, path)[k] instanceof Array) {
                    let myPath = this._clone(path);
                    myPath.push(k)
                    _writeNextLinks(responseArray, myPath);
                }
            }
        }.bind(this);
        _writeNextLinks(response, []);
        let myDone = function(resp) {
            done(resp);
        };
        this._checkPaging(response, queryList, myDone.bind(this));
    }

    /**
     * pulls the necessary new Pages
     * @param {Object} response the response recieved from the Server
     * @param {Array} queryList a List of the pages to query
     * @param {function} doneFunc a function to call once completed
     * @private
     */
    _checkPaging(response, queryList, doneFunc) {
        if (logging) console.log("checkPaging", queryList);
        if (queryList.length > 0) {
            let i = queryList.length - 1;
            if (queryList[i] == null || queryList[i].path == null || queryList[i].urlPath == null) {
                doneFunc(response);
                return;
            }
            let queryPath = queryList[i].path;
            let urlPath = queryList[i].urlPath;
            queryList.pop();
            let url = this._getParam(response, urlPath);
            if (queryPath == null || url == null) {
                doneFunc(response);
                return;
            }
            let cb = function(myData) {
                if (myData == null) doneFunc(response);
                if (logging) console.log("retrieved", this._getParam(response, queryPath), myData);
                let joined = this._joinObjectOrArray(this._getParam(response, queryPath), myData);
                response = this._setParam(response, queryPath, joined);
                if (logging) console.log("retrieved and joined", response, joined, queryPath);
                this._checkPaging(response, queryList, doneFunc);
            }.bind(this);
            if (logging) console.log("retrieving", response, urlPath, this._getParam(response, urlPath));
            response = this._setParam(response, urlPath, undefined);
            this._deleteParam(response, urlPath);
            this.stComm.createDirectQueryPaging(url, cb.bind(this));
        } else {
            doneFunc(response);
        }
    }

    /**
     * retrieves additional Pages
     * @param {Object} response The response recieved from the Server
     * @param {function} doneFunc The function to call once completed
     */
    retrieveAdditionalPages(response, doneFunc) {
        if (logging) console.log("retrievingAddPages", response);
        if (response.value != null) {
            response.value["@iot.nextLink"] = response["@iot.nextLink"];
            response = response.value;
        }
        this._readAdditionalPages(response, doneFunc);
    }

    /**
     * Decodes a response from a Server to the format used by the Software
     * @param {object} response The response from the Server which has to be decoded
     * @param {function} doneFunc The function to call once completed
     */
    decodeQuery(response, doneFunc) {
        if (response == null) {
            doneFunc({});
            console.log("ERROR");
            return;
        }
        stParser._rewriteParams(response, doneFunc);
    }

    /**
     * Rewrite the local data w/ the given response data
     * @param {object} response The response from the Server which has to be decoded
     * @param {function} doneFunc The function to call once completed
     * @private
     */
    _rewriteParams(response, doneFunc) {
        let data = {};
        if (logging) console.log('timed input data', response);
        data.DataStream_id = response["@iot.id"];
        data.DataStream_name = response.name;
        data.DataStream_description = response.description;
        data.DataStream_observationType = response.observationType;
        data.DataStream_unitOfMeasurement = response.unitOfMeasurement;
        data.DataStream_observedArea = response.observedArea;
        data.DataStream_phenomenonTime = response.phenomenonTime;
        data.DataStream_resultTime = response.resultTime;

        if (response.Observations != null && response.Observations.length > 0) {
            data.Observations = [];
            for (let i in response.Observations) {
                data.Observations[i] = {};
                data.Observations[i].Observation_id = response.Observations[i]["@iot.id"];
                data.Observations[i].Observation_phenomenonTime = response.Observations[i].phenomenonTime;
                data.Observations[i].Observation_resultTime = response.Observations[i].resultTime;
                data.Observations[i].Observation_result = response.Observations[i].result;
                data.Observations[i].Observation_resultQuality = response.Observations[i].resultQuality;
                data.Observations[i].Observation_validTime = response.Observations[i].validTime;
                data.Observations[i].Observation_parameters = response.Observations[i].parameters;
                if (response.Observations[i].FeatureOfInterest != null) {
                    data.Observations[i].FeatureOfInterest_name = response.Observations[i].FeatureOfInterest.name;
                    data.Observations[i].FeatureOfInterest_description = response.Observations[i].FeatureOfInterest.description;
                    data.Observations[i].FeatureOfInterest_encodingType = response.Observations[i].FeatureOfInterest.encodingType;
                    data.Observations[i].FeatureOfInterest_feature = response.Observations[i].FeatureOfInterest.feature;
                }
            }
        }

        if (response.ObservedProperty != null) {
            data.ObservedProperty_name = response.ObservedProperty.name;
            data.ObservedProperty_definition = response.ObservedProperty.definition;
            data.ObservedProperty_description = response.ObservedProperty.description;
        }
        if (response.Sensor != null) {
            data.Sensor_name = response.Sensor.name;
            data.Sensor_description = response.Sensor.description;
            data.Sensor_encodingType = response.Sensor.encodingType;
            data.Sensor_metadata = response.Sensor.metadata;
        }
        if (response.Thing != null) {
            data.Thing_name = response.Thing.name;
            data.Thing_description = response.Thing.description;
            data.Thing_properties = response.Thing.properties;
            data.Thing_HistoricalLocations = response.Thing.HistoricalLocations;
        }

        if (response.Thing != null && response.Thing.Locations != null && response.Thing.Locations.length > 0) {
            data.Thing_Locations = [];
            for (let i in response.Thing.Locations) {
                data.Thing_Locations[i] = {};
                if (response.Thing.Locations[i] != null) {
                    data.Thing_Locations[i].id = response.Thing.Locations[i]["@iot.id"];
                    data.Thing_Locations[i].name = response.Thing.Locations[i].name;
                    data.Thing_Locations[i].description = response.Thing.Locations[i].description;
                    data.Thing_Locations[i].encodingType = response.Thing.Locations[i].encodingType;
                    data.Thing_Locations[i].location = response.Thing.Locations[i].location;
                }
            }
        }
        doneFunc(data);
    }



    /**
     * creates the selectors
     * @param {Object} parameterMap the parameterMap
     * @param {Boolean} containsParams specifies if the ? is already in the String
     * @param {Date} obsStart start-Date of the requested time-Interval
     * @param {Date} obsEnd end-Date of the requested time-Interval
     * @returns {String} the selectors for the requests
     */
    createSelectors(pM, containsParams, obsStart, obsEnd) {
        let sel = {};
        sel.dataStream = {};
        sel.observation = {};
        sel.featureOfInterest = {};
        sel.observedProperty = {};
        sel.sensor = {};
        sel.thing = {};
        sel.historicalLocations = {};
        sel.location = {};

        if (pM.DataStream_name || pM.DataStream_description || pM.DataStream_observationType || pM.DataStream_unitOfMeasurement || pM.DataStream_observedArea || pM.DataStream_phenomenonTime || pM.DataStream_resultTime) {
            sel.dataStream.required = true;
        }
        if (pM.Observation_phenomenonTime || pM.Observation_resultTime || pM.Observation_result || pM.Observation_resultQuality || pM.Observation_validTime || pM.Observation_parameters) {
            sel.observation.required = true;
        }
        if (pM.FeatureOfInterest_name || pM.FeatureOfInterest_description || pM.FeatureOfInterest_encodingType || pM.FeatureOfInterest_feature) {
            sel.featureOfInterest.required = true;
        }
        if (pM.ObservedProperty_name || pM.ObservedProperty_definition || pM.ObservedProperty_description) {
            sel.observedProperty.required = true;
        }
        if (pM.Sensor_name || pM.Sensor_description || pM.Sensor_encodingType || pM.Sensor_metadata) {
            sel.sensor.required = true;
        }
        if (pM.Thing_name || pM.Thing_description || pM.Thing_properties) {
            sel.thing.required = true;
        }
        if (pM.Thing_HistoricalLocations) {
            sel.historicalLocations.required = true;
        }
        if (pM.Thing_Location_name || pM.Thing_Location_description || pM.Thing_Location_encodingType || pM.Thing_Location_location) {
            sel.location.required = true;
        }


        //append the start to the selectors
        let expand = {};
        if (sel.observation.required) {
            expand["Observations"] = {};
        }
        if (sel.featureOfInterest.required) {
            if (expand["Observations"] == null) {
                expand["Observations"] = {};
            }
            expand["Observations"]["FeatureOfInterest"] = {};
        }
        if (sel.observedProperty.required) {
            expand["ObservedProperty"] = {};
        }
        if (sel.sensor.required) {
            expand["Sensor"] = {};
        }
        if (sel.thing.required) {
            expand["Thing"] = {};
        }
        if (sel.historicalLocations.required) {
            if (expand["Thing"] == null) {
                expand["Thing"] = {};
            }
            expand["Thing"]["HistoricalLocations"] = {};
            expand["Thing"]["HistoricalLocations"]["Locations"] = {};
        }
        if (sel.location.required) {
            if (expand["Observations"] == null) {
                expand["Observations"] = {};
            }
            expand["Thing"]["Locations"] = {};
        }



        let addExpands = function(expands, delim, start, end) {
            let qS = "";
            if (Object.keys(expands).length > 0) {
                for (let k in expands) {
                    let mySubs = addExpands(expands[k], ";", start, end);
                    if (mySubs == "") {
                        let par = "";
                        if (k.search("Observations") >= 0) {
                            if (start) {
                                par = "$orderby=phenomenonTime desc" + delim + "$filter=phenomenonTime gt " + start;
                                if (end) {
                                    par = par + " and phenomenonTime lt " + end;
                                }
                                qS = qS + k + "(" + "$top=1000" + delim + par + ")" + ",";
                            } else {
                                qS = qS + k + "(" + "$top=1" + delim + "$orderby=phenomenonTime desc)" + ",";
                            }
                        } else {
                            qS = qS + k + "($top=1000)" + ",";
                        }
                    } else {
                        let par = "";
                        if (k.search("Observations") >= 0) {
                            if (start) {
                                par = "$orderby=phenomenonTime desc" + delim + "$filter=phenomenonTime gt " + start;
                                if (end) {
                                    par = par + " and phenomenonTime lt " + end;
                                }
                                par = par + delim;
                            } else {
                                qS = qS + k + "(" + "$top=1" + delim + "$orderby=phenomenonTime desc" + delim + "$expand=" + mySubs + ")" + ",";
                            }
                        }
                        qS = qS + k + "(" + "$top=1000" + delim + par + "$expand=" + mySubs + ")" + ",";
                    }
                }
                return qS.substring(0, qS.length - 1);
            } else {
                return qS;
            }
        }.bind(this);

        let querySelector = "?$top=1000";
        if (containsParams) querySelector = "&$top=1000";
        if (Object.keys(expand).length > 0) {
            querySelector = querySelector + "&$expand=";
            let end = obsEnd ? new Date(obsEnd).toISOString() : false;
            querySelector = querySelector + addExpands(expand, ";", new Date(obsStart).toISOString(), end);
        }
        return querySelector;
    }
}