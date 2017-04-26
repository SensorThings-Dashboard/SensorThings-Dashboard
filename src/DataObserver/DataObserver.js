import {
    DataQuerySynchronizing
} from './DataQuerySynchronizing.js';
import {
    RandomDataQuery
} from './Query/RandomDataQuery.js';
import {
    TimedQuery
} from './Query/TimedQuery.js';
import {
    MQTTQuery
} from './Query/MQTTQuery.js';
import {
    SensorThingsCommunications
} from '../SensorThingsCommunication/SensorThingsCommunications.js';

let dataObserver = null;


/**
 * manages DataQuerySynchronizing
 * 
 * This class has the following properties:
 * syncFreq                     -- the frequency with which the DataObserver works
 * queryIDcounter               -- the QueryID counter
 * running                      -- if a querying batch is running
 * lastRan                      -- when the last querying batch ran
 * myTimer                      -- the timer to start new querying batches
 * mySensorThingsCommunication  --reference to SensorThingsCommunications
 * myDataQuerySynchronizing     --reference to DataQuerySynchronizing
 * 
 */
export class DataObserver {

    /** @class
     * @param syncFreq the Frequency with which the DataObserver works.
     */
    constructor(mySyncFreq = 1000) {
        if (!dataObserver) {
            dataObserver = this;
            this.sync = this.mySyncFunction.bind(this);
            this.mySensorThingsCommunication = new SensorThingsCommunications();
            this.queryIDcounter = 0;
            this.syncFreq = mySyncFreq;
            this.myDataQuerySynchronizing = new DataQuerySynchronizing();
            this.myTimer = window.setInterval(this.sync, this.syncFreq);
            this.running = false;
        }
        return dataObserver;
    }

    /** registers a new Query
     * @param interval the interval in which the datastream should be refreshed
     * @param query the Query as a String
     * @param dataModelRef a function to update the data.
     * the function should look like:
     * function(data){}
     * where data is a Key-Value-Pair
     * @param {Date} obsStart the start date of the Observation Scope if not relative
     * @param {Date} obsEnd the end date of the Observation Scope if not relative
     * @param {int} obsSize the size of the Observation Scope if relative
     * @param {boolean} obsRel if the Observation Scope is relative
     * @return the ID of the newly-created Query
     */
    newQuery(myParameterMap, interval, query, dataModelRef, obsStart, obsEnd, obsSize, obsRel) {
        this.queryIDcounter += 1;
        let myID = this.queryIDcounter;
        let myQuery = new TimedQuery(myParameterMap, interval, query, dataModelRef, obsStart, obsEnd, obsSize, obsRel);
        myQuery.setQueryID(myID)
        this.myDataQuerySynchronizing.addQuery(myQuery);
        return myID;
    }

    /** registers a new MQTTQuery
     * @param myParameterMap the ParameterMap
     * @param query the Query as a String
     * @param baseTopic the Base of the Topic(the part to navigate to the Datastream)
     * @param dataModelRef a function to update the data.
     * the function should look like:
     * function(data){}
     * where data is a Key-Value-Pair
     * @return the ID of the newly-created Query
     */
    newMQTTQuery(myParameterMap, query, baseTopic, dataModelRef) {
        this.queryIDcounter += 1;
        var myID = this.queryIDcounter;
        this.myDataQuerySynchronizing.addQuery(new MQTTQuery(myParameterMap, query, baseTopic, dataModelRef));
        return myID;
    }

    /** registers a new RandomDataQuery
     * used for testing purposes
     * @param myParameterMap the ParameterMap
     * @param dataModelRef a function to update the data.
     * @return the ID of the newly-created Query
     */
    newRandomQuery(myParameterMap, dataModelRef) {
        this.queryIDcounter += 1;
        var myID = this.queryIDcounter;
        this.myDataQuerySynchronizing.addQuery(new RandomDataQuery(myParameterMap, dataModelRef));
        return myID;
    }

    /** deletes a Query or MQTTQuery
     * @param myID the ID of the object which should be deleted
     */
    deleteQuery(myID) {
        this.myDataQuerySynchronizing.removeQuery(myID);
    }


    /** sets a new Sync Frequency
     * @param mySyncFreq the new Sync Frequency
     */
    setSyncFreq(mySyncFreq) {
        clearInterval(this.myTimer);
        this.syncFreq = mySyncFreq;
        this.myTimer = window.setInterval(this.sync, this.syncFreq);
    }

    /** gets the Sync Frequency
     * @returns the Sync Frequency
     */
    getSyncFreq() {
        return this.syncFreq;
    }

    /** 
     * performs one sync of the currently "expired" Data
     * @private
     */
    mySyncFunction() {
        if (!this.running || this.lastRan + 100 * this.getSyncFreq() < new Date().getTime()) {
            this.lastRan = new Date().getTime();
            this.running = true;
            this.myDataQuerySynchronizing.clearRegisteredQueries();
            this.myDataQuerySynchronizing.registerTimedQueries();
            let callback = function() {
                this.running = false;
            }
            this.myDataQuerySynchronizing.loadRegistered(callback.bind(this));
        }
    }
}