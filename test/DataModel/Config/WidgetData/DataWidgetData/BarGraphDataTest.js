import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    BarGraphData
} from '../../../../../src/DataModel/Config/WidgetData/DataWidgetData/BarGraphData.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the BarGraphData Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class BarGraphData: Basic tests: ', () => {
    let _view = null;
    let $ = null;
    let L = null;
    Jsdom();

    // first initialization of view
    before(function(done) {
        // init window and jquery globaly
        this.jsdom = require('jsdom-global')();
        global.$ = global.jQuery = require('jquery');
        $ = require('jquery');
        global.L = require('leaflet');
        global.logging = false;

        global.WIDGET_TYPE_BARGRAPH = 1;
        global.WIDGET_TYPE_GAUGE = 2;
        global.WIDGET_TYPE_LINEGRAPH = 3;
        global.WIDGET_TYPE_MAP = 4;
        global.WIDGET_TYPE_PLAINDATA = 5;
        global.WIDGET_TYPE_PLAINTEXT = 6;
        global.WIDGET_TYPE_THERMOMETER = 7;
        global.WIDGET_TYPE_TRAFFICLIGHT = 8;

        global.MARKER_TYPE_PLAIN = 0;
        global.MARKER_TYPE_PLAINVALUE = 1;
        global.MARKER_TYPE_TRAFFICLIGHT = 2;
        global.MARKER_TYPE_HISTORY = 3;
        done();
    });

    it('constructor works', function(done)  {
        let barGraphWidgetData = new BarGraphData();
        expect(barGraphWidgetData).to.be.instanceof(Object);
        done();
    });

    it('setAttributes & getPosition test', function(done) {
        let barGraphWidgetData = new BarGraphData();
        let temp = {
            "position": {
                "x": 4,
                "y": 2
            },
            "size": {
                "x": 42,
                "y": 24
            }
        };
        barGraphWidgetData.setAttributes(temp);
        expect(barGraphWidgetData.getPosition()).equal(temp.position);
        done();
    });

    it('setAttributes & getSize test', function(done) {
        let barGraphWidgetData = new BarGraphData();
        let temp = {
            "position": {
                "x": 4,
                "y": 2
            },
            "size": {
                "x": 42,
                "y": 24
            }
        };
        barGraphWidgetData.setAttributes(temp);
        expect(barGraphWidgetData.getSize()).equal(temp.size);
        done();
    });

    it('set- & getPosition test', function(done) {
        let barGraphWidgetData = new BarGraphData();
        let temp = {
            "x": 4,
            "y": 2
        };
        barGraphWidgetData.setPosition(temp);
        expect(barGraphWidgetData.getPosition()).equal(temp);
        done();
    });

    it('set- & getSize test', function(done) {
        let barGraphWidgetData = new BarGraphData();
        let temp = {
            "x": 20,
            "y": 12
        };
        barGraphWidgetData.setSize(temp);
        expect(barGraphWidgetData.getSize()).equal(temp);
        done();
    });

    it('method getID test', function(done) {
        let barGraphWidgetData = new BarGraphData(10);
        expect(barGraphWidgetData.getID()).equal(10);
        done();
    });

    it('method getType test', function(done) {
        let barGraphWidgetData = new BarGraphData(22);
        expect(barGraphWidgetData.getType()).equal(1);
        done();
    });

    it('test getParameterMap', function(done) {
        let barGraphWidgetData = new BarGraphData(22);
        let pm = {
                DataStream_name: true,
                DataStream_description: false,
                DataStream_observationType: false,
                DataStream_unitOfMeasurement: true,
                DataStream_observedArea: false,
                DataStream_phenomenonTime: false,
                DataStream_resultTime: false,
                Observation_phenomenonTime: true,
                Observation_resultTime: true,
                Observation_result: true,
                Observation_resultQuality: false,
                Observation_validTime: false,
                Observation_parameters: false,
                FeatureOfInterest_name: false,
                FeatureOfInterest_description: false,
                FeatureOfInterest_encodingType: false,
                FeatureOfInterest_feature: false,
                ObservedProperty_name: false,
                ObservedProperty_definition: false,
                ObservedProperty_description: false,
                Sensor_name: false,
                Sensor_description: false,
                Sensor_encodingType: false,
                Sensor_metadata: false,
                Thing_name: false,
                Thing_description: false,
                Thing_properties: false,
                Thing_HistoricalLocations: false,
                Thing_Location_name: false,
                Thing_Location_description: false,
                Thing_Location_encodingType: false,
                Thing_Location_location: false,
            };

        expect(barGraphWidgetData.getParameterMap()).to.eql(pm);
        done();
    });

    it('test build Data Callbacks', function(done) {
        let barGraphWidgetData = new BarGraphData(22);
        let sensorThingsConfiguration = {
            data: [{
                data: {
                    dataStreamUrl: {
                        data: '',
                        type: TYPE_FUZZY_SENSOR_SEARCH
                    },
                    mqttEnabled: {
                        data: false,
                        type: TYPE_BOOLEAN
                    },
                    mqttUrl: {
                        data: '',
                        type: TYPE_STRING
                    },
                    mqttBaseTopic: {
                        data: '',
                        type: TYPE_STRING
                    },
                    updateIntervalMs: {
                        data: 1000,
                        type: TYPE_INTEGER
                    }
                },
                type: TYPE_OBJECT
            }],
            type: TYPE_ARRAY
        };
        barGraphWidgetData._buildDataCallbacks(sensorThingsConfiguration);
        done();
    });

    it('test add new data with null', function(done) {
        let barGraphWidgetData = new BarGraphData(887);
        barGraphWidgetData.newData(null);
        done();
    });

    it('test register dataCallback', function(done) {
        let barGraphWidgetData = new BarGraphData(8387);

        let dataFunc = function(){
            done();
        };
        let configFunc = function(){
            // empty
        };

        barGraphWidgetData.registerViewCallback(dataFunc, configFunc);
    });

    it('test register confCallback', function(done) {
        let barGraphWidgetData = new BarGraphData(838007);

        let dataFunc = function(){
            // empty
        };
        let configFunc = function(){
            done();
        };

        barGraphWidgetData.registerViewCallback(dataFunc, configFunc);
    });

    it('test get dataCallback', function(done) {
        let barGraphWidgetData = new BarGraphData(8387000999);

        expect(barGraphWidgetData.getDataCallback()).to.equal(barGraphWidgetData.dataObserverCallbacks);
        done();
    });

    it('test to set configurable data and get it', function(done) {
        let barGraphWidgetData = new BarGraphData(8010187);
        let sensorThingsConfiguration = {
            data: [{
                data: {
                    dataStreamUrl: {
                        data: '',
                        type: TYPE_FUZZY_SENSOR_SEARCH
                    },
                    mqttEnabled: {
                        data: false,
                        type: TYPE_BOOLEAN
                    },
                    mqttUrl: {
                        data: '',
                        type: TYPE_STRING
                    },
                    mqttBaseTopic: {
                        data: '',
                        type: TYPE_STRING
                    },
                    updateIntervalMs: {
                        data: 1000,
                        type: TYPE_INTEGER
                    }
                },
                type: TYPE_OBJECT
            }],
            type: TYPE_ARRAY
        };
        let conf = {
            tes: "one",
            testTwp: "two",
            sensorThingsConfiguration:{
                data: sensorThingsConfiguration
            }
        };
        barGraphWidgetData.setConfigurableData(conf);
        expect(barGraphWidgetData.getConfigurableData()).to.eql(conf);
        done();
    });

});
