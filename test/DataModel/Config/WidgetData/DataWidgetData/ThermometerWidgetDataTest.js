import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    ThermometerWidgetData
} from '../../../../../src/DataModel/Config/WidgetData/DataWidgetData/ThermometerWidgetData.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';
import {
    View
} from '../../../../../src/View/View.js';

/**
 * This one will test the ThermometerWidgetData Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class ThermometerWidgetData: Basic tests: ', () => {
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
        window.TYPE_STRING = 1;
        window.TYPE_INTEGER = 2;
        window.TYPE_BOOLEAN = 3;
        window.TYPE_ARRAY = 4;
        window.TYPE_DATE = 5;
        window.TYPE_DROPDOWN = 6;
        window.TYPE_NUMBER = 7;
        window.TYPE_FUZZY_SENSOR_SEARCH = 8;
        window.TYPE_OBJECT = 9;
        window.TYPE_OTHER = 10;

        window.UNIT_MILLISECOND = 0;
        window.UNIT_SECOND = 1;
        window.UNIT_MINUTE = 2;
        window.UNIT_HOUR = 3;
        window.UNIT_DAY = 4;
        window.UNIT_MONTH = 5;
        window.UNIT_YEAR = 6;
        done();
    });

    it('constructor works', function(done)  {
        let thermometerWidgetData = new ThermometerWidgetData();
        expect(thermometerWidgetData).to.be.instanceof(Object);
        done();
    });

    it('setAttributes & getPosition test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData();
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
        thermometerWidgetData.setAttributes(temp);
        expect(thermometerWidgetData.getPosition()).equal(temp.position);
        done();
    });

    it('method newData test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData(85);
        thermometerWidgetData.newData([88]);
        expect(thermometerWidgetData.allData[0]).equal(88);
        done();
    });

    it('method registerViewCallback test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData(85);
        let emptyDataFunc = function (param) {
            expect(param).equal(thermometerWidgetData.allData);
        };
        let emptyConfigFunc = function (param) {
            expect(param).equal(thermometerWidgetData.configurableData);
        };
        thermometerWidgetData.registerViewCallback(emptyDataFunc, emptyConfigFunc);
        done();
    });

    it('setAttributes & getSize test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData();
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
        thermometerWidgetData.setAttributes(temp);
        expect(thermometerWidgetData.getSize()).equal(temp.size);
        done();
    });

    it('set- & getPosition test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData();
        let temp = {
            "x": 4,
            "y": 2
        };
        thermometerWidgetData.setPosition(temp);
        expect(thermometerWidgetData.getPosition()).equal(temp);
        done();
    });

    it('set- & getSize test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData();
        let temp = {
            "x": 20,
            "y": 12
        };
        thermometerWidgetData.setSize(temp);
        expect(thermometerWidgetData.getSize()).equal(temp);
        done();
    });

    it('method getID test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData(10);
        expect(thermometerWidgetData.getID()).equal(10);
        done();
    });

    it('method getType test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData(22);
        expect(thermometerWidgetData.getType()).equal(7);
        done();
    });

    it('destroy test', function(done) {
        let view = new View();
        let thermometerWidgetData = new ThermometerWidgetData(22);
        view._gridstack = view._gridstack || {addWidget: () => {}, removeWidget: () => {}};
        view.addWidget(22, '');
        thermometerWidgetData.destroy();
        expect(thermometerWidgetData.dataCallbacks.length).equal(0);
        done();
    });

    it('method getDataCallback test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData(76);
        let paramMap = {
            DataStream_name: true,
            DataStream_description: false,
            DataStream_observationType: false,
            DataStream_unitOfMeasurement: true,
            DataStream_observedArea: false,
            DataStream_phenomenonTime: false,
            DataStream_resultTime: false,
            Observation_phenomenonTime: true,
            Observation_resultTime: false,
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
            Thing_Location_location: false
        };
        for(let k in thermometerWidgetData.getParameterMap()) {
            expect(thermometerWidgetData.getParameterMap()[k]).equal(paramMap[k]);
        }
        done();
    });

    it('method setConfigurableData test', function(done) {
        let thermometerWidgetData = new ThermometerWidgetData(1);
        let newConfData = {
            // View configuration
            title: {
                data: 'Thermometer Widget',
                type: TYPE_STRING
            },

            titleSide: {
                data: "",
                type: TYPE_STRING
            },

            min: {
                data: 0,
                type: TYPE_NUMBER
            },
            max: {
                data: 100,
                type: TYPE_NUMBER
            },
            scaleVisible: {
                data: true,
                type: TYPE_BOOLEAN
            },
            scaleDecimals: {
                data: 2,
                type: TYPE_INTEGER
            },
            gutterLeft: {
                data: 60,
                type: TYPE_INTEGER
            },
            gutterRight: {
                data: 60,
                type: TYPE_INTEGER
            },
            valueLabel: {
                data: false,
                type: TYPE_BOOLEAN
            },

            // Data filter
            timeIntervalRelative: {
                data: true,
                type: TYPE_BOOLEAN
            },
            timeIntervalUnit: {
                data: UNIT_MONTH,
                type: TYPE_DROPDOWN,
                options: {
                    second: UNIT_SECOND,
                    minute: UNIT_MINUTE,
                    hour: UNIT_HOUR,
                    day: UNIT_DAY,
                    month: UNIT_MONTH,
                    year: UNIT_YEAR
                }
            },
            timeInterval: {
                data: 5,
                type: TYPE_INTEGER
            },
            startTime: {
                data: new Date(),
                type: TYPE_DATE
            },
            endTime: {
                data: new Date(),
                type: TYPE_DATE
            },

            // ST configuration Attention: mulitple Sensors are possible
            sensorThingsConfiguration: {
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
            }
        };
        thermometerWidgetData.setConfigurableData(newConfData);
        expect(thermometerWidgetData.getConfigurableData()).equal(newConfData);
        done();
    });
});