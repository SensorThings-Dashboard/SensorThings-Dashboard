/** 
 * a Query which only generates random Data.
 * only for internal & testing purposes
 *
 * This class has the following properties:
 * interval         -- the Time between 2 Querys
 * lastCalled       -- the Time since Jan,1,1970 of the last Query
 * callback         -- the Callback to write the Data
 * 
 */
export class RandomDataQuery {

    /** 
     * @param myParameterMap the ParameterMap
     * @param myCallback the callback to refresh the Data in the Datamodel
     */
    constructor(myParameterMap, myCallback) {
        this.interval = 1000;
        this.lastCalled = 0;
        this.callback = myCallback;
        this.setParameterMap(myParameterMap);
        this.myObservations = [];
        this.currentID = 1;
        this.callIt = this.callMe.bind(this);
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

    /** returns true, if the Data has to be retrieved from the Server.
     * @param time the time since Jan,1,1970 in milliseconds
     * @returns if the Query has to be sent
     */
    registerIfNeeded(time) {
        return (time > this.interval + this.lastCalled);
    }

    /** calls the callback.
     * Only for internal use
     * @param {Object} the new Data
     */
    callMe(myData) {
        this.lastCalled = Date.now();
        let params = this.getParameterMap();
        if (this.callback) {
            this.currentID = this.currentID + 1;

            let data = {};
            let curTime = new Date().toISOString();
            let result = Math.floor(Math.sin(this.currentID) * 50) + 50;

            //set the requested data
            //========================================
            data.DataStream_id = 0;
            data.DataStream_name = params.DataStream_name ? "Random Data Stream" : undefined;
            data.DataStream_description = params.DataStream_description ? "Random Data Stream" : undefined;
            data.DataStream_observationType = params.DataStream_observationType ? "Random" : undefined;
            data.DataStream_unitOfMeasurement = params.DataStream_unitOfMeasurement ? "ran" : undefined;
            data.DataStream_observedArea = params.DataStream_observedArea ? {} : undefined;
            data.DataStream_phenomenonTime = params.DataStream_phenomenonTime ? curTime : undefined;
            data.DataStream_resultTime = params.DataStream_resultTime ? curTime : undefined;
            let newObservation = {};
            newObservation.Observation_id = this.currentID;
            newObservation.Observation_phenomenonTime = params.Observation_phenomenonTime ? curTime : undefined;
            newObservation.Observation_resultTime = params.Observation_resultTime ? curTime : undefined;
            newObservation.Observation_result = params.Observation_result ? result : undefined;
            newObservation.Observation_resultQuality = params.Observation_resultQuality ? {} : undefined;
            newObservation.Observation_validTime = params.Observation_validTime ? curTime + "P24H" : undefined;
            newObservation.Observation_parameters = params.Observation_parameters ? {
                randomData: true,
            } : undefined;
            newObservation.FeatureOfInterest_name = params.FeatureOfInterest_name ? "Random Feature" : undefined;
            newObservation.FeatureOfInterest_description = params.FeatureOfInterest_description ? "Random Feature" : undefined;
            newObservation.FeatureOfInterest_encodingType = params.FeatureOfInterest_encodingType ? "application/vnd.geo+json" : undefined;
            newObservation.FeatureOfInterest_feature = params.FeatureOfInterest_feature ? {
                type: "Point",
                coordinates: [-117.05, 51.05]
            } : undefined;
            this.myObservations.push(newObservation);
            data.Observations = this.myObservations;

            data.ObservedProperty_name = params.ObservedProperty_name ? "Random" : undefined;
            data.ObservedProperty_definition = params.ObservedProperty_definition ? "Random" : undefined;
            data.ObservedProperty_description = params.ObservedProperty_description ? "Random" : undefined;
            data.Sensor_name = params.Sensor_name ? "Random Sensor" : undefined;
            data.Sensor_description = params.Sensor_description ? "Random Sensor" : undefined;
            data.Sensor_encodingType = params.Sensor_encodingType ? "application/pdf" : undefined;
            data.Sensor_metadata = params.Sensor_metadata ? "Random Sensor" : undefined;
            data.Thing_name = params.Thing_name ? "Random" : undefined;
            data.Thing_description = params.Sensor_description ? "Random" : undefined;
            data.Thing_properties = params.Sensor_properties ? {
                reference: "first",
            } : undefined;
            data.Thing_HistoricalLocations = params.Thing_HistoricalLocations ? [{
                time: curTime,
            }, {
                time: curTime,
            }] : undefined;
            data.Thing_Locations = [];

            let loc = {};
            loc.id = 1;
            loc.name = params.Thing_Location_name ? "Random Sensor Location" : undefined;
            loc.description = params.Thing_Location_description ? "Random Sensor Location" : undefined;
            loc.encodingType = params.Thing_Location_encodingType ? "application/vnd.geo+json" : undefined;
            loc.location = params.Thing_Location_location ? {
                type: "Point",
                coordinates: [8.404, 49.014]
            } : undefined;

            data.Thing_Locations.push(loc);

            //========================================

            this.callback(data);
        }
    }

    /** destroy the current Query
     */
    destroy() {
        delete this;
    }
}