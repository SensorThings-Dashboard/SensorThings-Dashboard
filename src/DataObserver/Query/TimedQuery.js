import {
    SensorThingsCommunications
} from '../../SensorThingsCommunication/SensorThingsCommunications.js'

let logging = false;

/**
 * represents a Query that will only be repeatadly retrieved.
 *
 * This class has the following properties:
 * queryId          -- in a Dashboard unique identidier number for a Query
 * interval         -- the interval, a datastream is refreshed
 * query            -- the Query as a String
 * lastCalled       -- the time, the Query was refreshed the last time
 * callback         -- the callback to refresh the Data in the Datamodel
 *
 */
export class TimedQuery {

    /** @class
     * @param myInterval the interval to update this stream with
     * @param myQuery the query to use
     * @param myCallback the callback to refresh the Data in the Datamodel
     */
    constructor(myParameterMap, myInterval, myQuery, myCallback, obsStart, obsEnd, obsSize, obsRel) {
        this.interval = myInterval;
        this.query = myQuery;
        this.callback = myCallback;
        this.lastCalled = 0;
        this.lastDataCalled = 0;
        this.obsStart = obsStart;
        this.obsEnd = obsEnd;
        this.obsSize = obsSize;
        this.obsRel = obsRel;
        this.onlyLatest = this.obsSize < 0;
        this.setParameterMap(myParameterMap);
        if (logging) console.log("creating a new timed Query to", myQuery);
    }

    /**
     * sets the ParameterMap
     * @param { object } the ParameterMap
     */
    setParameterMap(myParameterMap) {
        this.parameterMap = myParameterMap;
    }

    /**
     * gets the ParameterMap
     * @returns { object } the parameterMap
     */
    getParameterMap() {
        return this.parameterMap;
    }

    /** returns true, if the Data has to be retrieved from the Server.
     * @param {number} time the time since Jan 1, 1980 in milliseconds
     * @returns {boolean} if the Query has to be sent
     */
    registerIfNeeded(time) {
        if (time > this.interval + this.lastCalled) {
            this.lastCalled = Date.now();
            return true;
        }
        return false;
    }

    /** get the queryId
     * @return {number} the queryId
     */
    getQueryID() {
        return this.queryId;
    }

    /** set the queryId
     * @param {number} n the new queryId
     */
    setQueryID(n) {
        this.queryId = n;
    }

    /** get the queryString
     * @return {string} the queryString
     */
    getQueryString() {
        return this.query;
    }

    /** set the queryString
     * @param {string} q the new queryString
     */
    setQueryString(q) {
        if (logging) console.log(this.getQueryID(), "setting QueryString to", q);
        this.query = q;
    }

    /** substract ms from d1
     * @param {Date} d1 the Date to substract from
     * @param {number} ms the miliseconds to substract
     * @return {Date} the calculated Date
     */
    _subtractDate(d1, ms) {
        return new Date(d1.getTime() - ms);
    }

    /**
     * deletes all Observations older than size milliseconds
     * @param {Array} array an Array of Observations
     * @param {number} size the maximum age of the Observation
     * @return {Array} the modified Array
     */
    _deleteOld(array, size) {
        return array.filter(function (e) {
            let pass = new Date(e.Observation_phenomenonTime).getTime() > new Date().getTime() - size;
            return pass;
        });
    }

    /**
     * gets the Date of the start of the time-scope
     * @return {Date} the start of the time-scope to generate the next Query to
     */
    getObsStart() {
        if (this.onlyLatest) {
            return false;
        } else if (this.lastDataCalled != 0) {
            return new Date(this.lastDataCalled);
        } else {
            if (this.obsRel) {
                return this._subtractDate(new Date(), this.obsSize);
            } else {
                return this.obsStart;
            }
        }
    }


    /**
     * gets the Date of the end of the time-scope
     * @return {Date} the end of the time-scope to generate the next Query to
     */
    getObsEnd() {
        if (this.obsRel) {
            return false;
        } else {
            return this.obsEnd;
        }
    }

    /**
     * returns the phenomenonTime of the latest Observation
     * @param {Array} myObs an Array of Observations
     * @return {number} the phenomenonTime of the latest Observation in milliseconds since Jan 1, 1980
     */
    _getLatestTime(myObs) {
        let latest = 0;
        for (let k in myObs) {
            let time = new Date(myObs[k].Observation_phenomenonTime).getTime();
            if (time > latest) latest = time;
        }
        if (logging) console.log("found latest:", latest, myObs);
        return latest;
    }

    /**
     * calls the callback.
     * Only for internal use
     * @param {Object} myData the new Data
     */
    callIt(myData) {
        if (this.callback && myData != null) {
            //this.lastDataCalled = new Date().getTime();
            if (logging && myData.Observations != null && myData.Observations.length > 0) console.log("new Data pushed", this.getQueryID());
            if (this.curData == null) {
                this.curData = myData;
                this.lastDataCalled = this._getLatestTime(this.curData.Observations);
            } else if (myData.Observations != null && this.curData.Observations != null) {
                let array = [];
                myData.Observations = array.concat(myData.Observations, this.curData.Observations);
                if (this.obsRel) myData.Observations = this._deleteOld(myData.Observations, this.obsSize);
                this.curData = myData;
                this.lastDataCalled = this._getLatestTime(this.curData.Observations);
            } else if (myData.Observations == null) {
                if (this.obsRel && this.curData.Observations != null) {
                    this.curData.Observations = this._deleteOld(this.curData.Observations, this.obsSize);
                }
                myData.Observations = this.curData.Observations;
                this.curData = myData;
            }
            this.callback(this.curData);
        }
    }

    /** destroys the current Query
     */
    destroy() {
        delete this;
    }
}