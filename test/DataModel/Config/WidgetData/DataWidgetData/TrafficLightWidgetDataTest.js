import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    TrafficLightWidgetData
} from '../../../../../src/DataModel/Config/WidgetData/DataWidgetData/TrafficLightWidgetData.js';
import {View} from '../../../../../src/View/View.js';
import {DashboardServices} from '../../../../../src/DashboardServices/DashboardServices.js';
import {WidgetConfig} from '../../../../../src/DataModel/Config/WidgetConfig.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the TrafficLightWidgetData Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class TrafficLightWidgetData: Basic tests: ', () => {
    let _view = null;
    let $ = null;
    let L = null;
    Jsdom();

    // first initialization of view
    before(function (done) {
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

        global.MARKER_TYPE_PLAIN = 0;
        global.MARKER_TYPE_PLAINVALUE = 1;
        global.MARKER_TYPE_TRAFFICLIGHT = 2;
        global.MARKER_TYPE_HISTORY = 3;
        done();
    });

    it('constructor works', function (done) {
        let trafficLightWidgetData = new TrafficLightWidgetData();
        expect(trafficLightWidgetData).to.be.instanceof(Object);
        done();
    });

    it('setAttributes & getPosition test', function (done) {
        let trafficLightWidgetData = new TrafficLightWidgetData();
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
        trafficLightWidgetData.setAttributes(temp);
        expect(trafficLightWidgetData.getPosition()).equal(temp.position);
        done();
    });

    it('setAttributes & getSize test', function (done) {
        let trafficLightWidgetData = new TrafficLightWidgetData();
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
        trafficLightWidgetData.setAttributes(temp);
        expect(trafficLightWidgetData.getSize()).equal(temp.size);
        done();
    });

    it('set- & getPosition test', function (done) {
        let trafficLightWidgetData = new TrafficLightWidgetData();
        let temp = {
            "x": 4,
            "y": 2
        };
        trafficLightWidgetData.setPosition(temp);
        expect(trafficLightWidgetData.getPosition()).equal(temp);
        done();
    });

    it('set- & getSize test', function (done) {
        let trafficLightWidgetData = new TrafficLightWidgetData();
        let temp = {
            "x": 20,
            "y": 12
        };
        trafficLightWidgetData.setSize(temp);
        expect(trafficLightWidgetData.getSize()).equal(temp);
        done();
    });

    it('method getID test', function (done) {
        let trafficLightWidgetData = new TrafficLightWidgetData(10);
        expect(trafficLightWidgetData.getID()).equal(10);
        done();
    });

    it('method getType test', function (done) {
        let trafficLightWidgetData = new TrafficLightWidgetData(22);
        expect(trafficLightWidgetData.getType()).equal(8);
        done();
    });

    it("should call data callback when new data arrives", () => {
        let trafficLightWidgetData = new TrafficLightWidgetData("test");
        let callback = (data) => {
            //make sure that test ends only for non-empty data
            if (data.Observations && data.Observations.length > 0) {
                done();
            }
        };

        trafficLightWidgetData.registerViewCallback(() => {
        }, callback);
        trafficLightWidgetData.newData({
            Observations: [
                {result: "Yay!"}
            ]
        });

    });

    it("should save size and position correctly", () => {
        let trafficLightWidgetData = new TrafficLightWidgetData("test");
        trafficLightWidgetData.setPosition({x: 1, y: 2});
        trafficLightWidgetData.setSize({width: 3, height: 4});
        let position = trafficLightWidgetData.getPosition();
        let size = trafficLightWidgetData.getSize();

        expect([position.x, position.y, size.width, size.height].join("")).to.equal("1234");
    });

    it("should apply passed config on creation", (done) => {
        _view = new View("test");
        _view._setUpLanguage("en");
        _view._gridstack = _view._gridstack || {
                addWidget: () => {
                }
            };
        let dashboardServices = new DashboardServices();
        let params = {
            title: {
                data: 'My test title', type: TYPE_STRING
            },
            lower: {
                data: 7, type: TYPE_NUMBER
            },
            upper: {
                data: 12, type: TYPE_NUMBER
            },
            lowerColor: {
                data: COLOR_GREEN,
                type: TYPE_DROPDOWN,
                options: {
                    red: COLOR_RED,
                    yellow: COLOR_YELLOW,
                    green: COLOR_GREEN
                }
            },
            middleColor: {
                data: COLOR_YELLOW,
                type: TYPE_DROPDOWN,
                options: {
                    red: COLOR_RED,
                    yellow: COLOR_YELLOW,
                    green: COLOR_GREEN
                }
            },
            upperColor: {
                data: COLOR_RED,
                type: TYPE_DROPDOWN,
                options: {
                    red: COLOR_RED,
                    yellow: COLOR_YELLOW,
                    green: COLOR_GREEN
                }
            },
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

        dashboardServices.createWidget(WIDGET_TYPE_TRAFFICLIGHT, params);
        new WidgetConfig().addWidgetData = (data) => {
            expect(data.configurableData.title.data).to.equal("My test title");
            done();
        };
    });

    it("should destroy itself", (done) => {
        let trafficLightWidgetData = new TrafficLightWidgetData("test");
        global.called = false;
        let _view = new View("test");
        _view._gridstack = {removeWidget:() => {}};
        let callback = () => {
                called = !called;
                expect(called).to.be.true;
        };
        trafficLightWidgetData.registerViewCallback(callback, () => {});
        trafficLightWidgetData.allData = [1];
        trafficLightWidgetData.destroy();
        trafficLightWidgetData.newData([2]);
        done();
    });
});