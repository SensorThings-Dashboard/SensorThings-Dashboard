import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    MapWidgetData
} from '../../../../../src/DataModel/Config/WidgetData/DataWidgetData/MapWidgetData.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';
import {
    View
} from '../../../../../src/View/View.js';

/**
 * This one will test the WidgetConfig Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class WidgetConfigTest: Basic tests: ', () => {
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

        global.WIDGET_TYPE_BARGRAPH = 1;
        global.WIDGET_TYPE_GAUGE = 2;
        global.WIDGET_TYPE_LINEGRAPH = 3;
        global.WIDGET_TYPE_MAP = 4;
        global.WIDGET_TYPE_PLAINDATA = 5;
        global.WIDGET_TYPE_PLAINTEXT = 6;
        global.WIDGET_TYPE_THERMOMETER = 7;
        global.WIDGET_TYPE_TRAFFICLIGHT = 8;
        global.TYPE_OBJECT = 9;
        global.MARKER_TYPE_PLAIN = 0;
        global.MARKER_TYPE_PLAINVALUE = 1;
        global.MARKER_TYPE_TRAFFICLIGHT = 2;
        global.MARKER_TYPE_HISTORY = 3;
        done();
    });

    it('constructor works', function(done)  {
        let mapWidgetData = new MapWidgetData();
        expect(mapWidgetData).to.be.instanceof(Object);
        done();
    });

    it('setAttributes & getPosition test', function(done) {
        let mapWidgetData = new MapWidgetData();
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
        mapWidgetData.setAttributes(temp);
        expect(mapWidgetData.getPosition()).equal(temp.position);
        done();
    });

    it('setAttributes & getSize test', function(done) {
        let mapWidgetData = new MapWidgetData();
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
        mapWidgetData.setAttributes(temp);
        expect(mapWidgetData.getSize()).equal(temp.size);
        done();
    });

    it('set- & getPosition test', function(done) {
        let mapWidgetData = new MapWidgetData();
        let temp = {
            "x": 4,
            "y": 2
        };
        mapWidgetData.setPosition(temp);
        expect(mapWidgetData.getPosition()).equal(temp);
        done();
    });

    it('set- & getSize test', function(done) {
        let mapWidgetData = new MapWidgetData();
        let temp = {
            "x": 20,
            "y": 12
        };
        mapWidgetData.setSize(temp);
        expect(mapWidgetData.getSize()).equal(temp);
        done();
    });

    it('method getID test', function(done) {
        let mapWidgetData = new MapWidgetData(10);
        expect(mapWidgetData.getID()).equal(10);
        done();
    });

    it('method getType test', function(done) {
        let mapWidgetData = new MapWidgetData(22);
        expect(mapWidgetData.getType()).equal(4);
        done();
    });

    it('method getDataCallback test', function(done) {
        let mapWidgetData = new MapWidgetData(85);
        expect(mapWidgetData.getDataCallback().length).equal(1);
        done();
    });

    it('method newData test', function(done) {
        let mapWidgetData = new MapWidgetData(85);
        mapWidgetData.newData(88);
        expect(mapWidgetData.allData[0]).equal(88);
        done();
    });

    it('method getDataCallback test', function(done) {
        let mapWidgetData = new MapWidgetData(76);
        let paramMap = {
            DataStream_name: true,
            DataStream_description: false,
            DataStream_observationType: false,
            DataStream_unitOfMeasurement: true,
            DataStream_observedArea: false,
            DataStream_phenomenonTime: true,
            DataStream_resultTime: false,
            Observation_phenomenonTime: false,
            Observation_resultTime: false,
            Observation_result: true,
            Observation_resultQuality: false,
            Observation_validTime: false,
            Observation_parameters: false,
            FeatureOfInterest_name: true,
            FeatureOfInterest_description: true,
            FeatureOfInterest_encodingType: true,
            FeatureOfInterest_feature: true,
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
            Thing_HistoricalLocations: true,
            Thing_Location_name: true,
            Thing_Location_description: true,
            Thing_Location_encodingType: true,
            Thing_Location_location: true
        };
        for(let k in mapWidgetData.getParameterMap()) {
            expect(mapWidgetData.getParameterMap()[k]).equal(paramMap[k]);
        }
        done();
    });

    it('method set- & getQueryIDs test', function(done) {
        let mapWidgetData = new MapWidgetData(42);
        let IDs = [1, 2, 3];
        mapWidgetData.setQueryIDs(IDs);
        expect(mapWidgetData.getQueryIDs()).equal(IDs);
        done();
    });

    it('destroy test', function(done) {
        let view = new View();
        let mapWidgetData = new MapWidgetData(22);
        view._gridstack = view._gridstack || {addWidget: () => {}, removeWidget: () => {}};
        view.addWidget(22, '');
        mapWidgetData.destroy();
        expect(mapWidgetData.dataCallbacks.length).equal(0);
        done();
    });

    it('method getQueryParams test', function(done) {
        let mapWidgetData = new MapWidgetData();
        expect(mapWidgetData.getQueryParams()[0].type).equal(TYPE_OBJECT);
        done();
    });

    it('method setConfigurableData test', function(done) {
        let mapWidgetData = new MapWidgetData(1);
        let newConfData = {
            // View configuration
            title: {
                data: 'Map Widget',
                type: TYPE_STRING
            },
            zoom: {
                data: 13,
                type: TYPE_INTEGER
            },
            mapURL: {
                data: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmV4dXJ5IiwiYSI6ImNpd3R2ZzY5djAwbzcydXFyazRsam80cDAifQ.TaIW3pR4RS3UuyZg61HV6g',
                type: TYPE_STRING
            },
            attribution: {
                data: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>",
                type: TYPE_STRING
            },
            latitude: {
                data: 49.014,
                type: TYPE_NUMBER
            },
            longitude: {
                data: 8.404,
                type: TYPE_NUMBER
            },

            // Data filter
            timeIntervalRelative: {
                data: true,
                type: TYPE_BOOLEAN
            },
            timeIntervalUnit: {
                data: UNIT_MINUTE,
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

            // ST configuration Attention: multiple Sensors are possible
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
                        },
                        overlayType: {
                            data: MARKER_TYPE_PLAIN,
                            type: TYPE_DROPDOWN,
                            options: {
                                plainMarker: MARKER_TYPE_PLAIN,
                                plainValueMarker: MARKER_TYPE_PLAINVALUE,
                                trafficLightMarker: MARKER_TYPE_TRAFFICLIGHT,
                                historyLine: MARKER_TYPE_HISTORY
                            }
                        },
                        thresholdMiddle: {
                            data: 0,
                            type: TYPE_NUMBER
                        },
                        thresholdUpper: {
                            data: 0,
                            type: TYPE_NUMBER
                        },
                        lowerRangeColor: {
                            data: COLOR_GREEN,
                            type: TYPE_DROPDOWN,
                            options: {
                                red: COLOR_RED,
                                yellow: COLOR_YELLOW,
                                green: COLOR_GREEN
                            }
                        },
                        middleRangeColor: {
                            data: COLOR_YELLOW,
                            type: TYPE_DROPDOWN,
                            options: {
                                red: COLOR_RED,
                                yellow: COLOR_YELLOW,
                                green: COLOR_GREEN
                            }
                        },
                        upperRangeColor: {
                            data: COLOR_RED,
                            type: TYPE_DROPDOWN,
                            options: {
                                red: COLOR_RED,
                                yellow: COLOR_YELLOW,
                                green: COLOR_GREEN
                            }
                        }
                    },
                    type: TYPE_OBJECT
                }],
                type: TYPE_ARRAY
            }
        };
        mapWidgetData.setConfigurableData(newConfData);
        expect(mapWidgetData.getConfigurableData()).equal(newConfData);
        done();
    });
});