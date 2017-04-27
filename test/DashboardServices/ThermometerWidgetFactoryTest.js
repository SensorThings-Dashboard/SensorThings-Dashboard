import Mocha, {
    describe,
    it,
    before,
    beforeEach
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import Jsdom from 'mocha-jsdom';
import {
    ThermometerWidgetFactory
} from '../../src/DashboardServices/ThermometerWidgetFactory.js';
import {
    WidgetFactory
} from '../../src/DashboardServices/WidgetFactory.js';
import {
    View
} from '../../src/View/View.js';

/**
 * The following tests cover the creation and functionality of ThermometerWidgets
 * @param string
 *      The displayed name of this test suite
 */
describe("ThermometerWidgetFactory.js test", () => {
    let _thermometerWidgetFactory;
    let htmlTemplate = '<div id="templateWidget" class="grid-stack-item-content">' +
        '<div class="widget-header">' +
        '<div class="widget-title">Widget-Title & Info</div>' +
        '<button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>' +
        '</div>' +
        '<canvas id="templateWidgetCanvas" width="350" height="280"></canvas>' +
        '<div class="widget-footer"><div class="lastUpdate" id="templateWidgetLastUpdate"></div>' +
        '<button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">' +
        '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>' +
        '</button>' +
        '</div>' +
        '</div>';

    var jsdom = require('mocha-jsdom');

    let configLoad = function() {
        let nextHourTime = new Date();
        nextHourTime.setMinutes(new Date().getMinutes() + 1);
        return {
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
    };

    after(function() {
        this.jsdom();
    });

    beforeEach(() => $("body").html(""));

    // first initialization of resources
    before(function(done) {
        this.jsdom = require('jsdom-global')();
        window.iotBaseDir = process.cwd().split("\\").join("/") + "/public/";
        window.iotlg = {
            widgetThermometerTitle: "My Title"
        };
        global.$ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        //define global vars
        global.TYPE_COLOR = 0;
        global.TYPE_STRING = 1;
        global.TYPE_INTEGER = 2;
        global.TYPE_BOOLEAN = 3;
        global.TYPE_ARRAY = 4;
        global.TYPE_DATE = 5;
        global.TYPE_DROPDOWN = 6;
        global.TYPE_NUMBER = 7;
        global.TYPE_FUZZY_SENSOR_SEARCH = 8;
        global.TYPE_OBJECT = 9;
        global.TYPE_OTHER = 10;
        global.UNIT_MILLISECOND = 0;
        global.UNIT_SECOND = 1;
        global.UNIT_MINUTE = 2;
        global.UNIT_HOUR = 3;
        global.UNIT_DAY = 4;
        global.UNIT_MONTH = 5;
        global.UNIT_YEAR = 6;

        window.RGraph = global.RGraph = {
            isRGraph: true
        };
        window.RGraph.reset = window.RGraph.Clear = function() {};
        require("../../public/libs/RGraph.common.core");
        window.RGraph.Thermometer = function() {
            return {
                draw: function() {},
                value: 4,
                min: 2,
                max: 20,
                grow: function() {}
            };
        };

        _thermometerWidgetFactory = new ThermometerWidgetFactory(new WidgetFactory());
        _thermometerWidgetFactory._resizeCanvas = () => {};
        new View()._setUpLanguage("en");
        done();
    });

    /**
     * Tests, if the constructor creates an instance of Object
     * @param string
     *      name of this test
     */
    it('Constructor creates an object', function(done)  {
        let factory = new ThermometerWidgetFactory();
        expect(factory).to.be.instanceof(Object);
        done();
    });

    /**
     * Tests, if the constructor implements singleton correctly
     * @param string
     *      name of this test
     */
    it('Constructor implements singleton', function(done)  {
        let factory1 = new ThermometerWidgetFactory();
        let factory2 = new ThermometerWidgetFactory();
        expect(factory1).to.eql(factory2);
        done();
    });

    /**
     * Tests, if the factory corrects negative scale decimal numbers to zero
     * @param string
     *      name of this test
     */
    it('Negative scale decimal number is corrected', function(done) {
        let factory = new ThermometerWidgetFactory();
        let scaleDecimals1 = 1;
        let scaleDecimals2 = 0;
        let scaleDecimals3 = -1;

        expect(factory._correctScaleDecimals(scaleDecimals1)).to.eql(1);
        expect(factory._correctScaleDecimals(scaleDecimals2)).to.eql(0);
        expect(factory._correctScaleDecimals(scaleDecimals3)).to.eql(0);

        done();
    });

    /**
     * Tests whether widget is created correctly with data
     */
    it("Test widget creation", (done) => {
        let tlw;
        let title = () => $(".widget-title")[0].innerText;

        let configUpdate = configLoad;

        let dataUpdate = function() {
            return [{
                Observations: [{
                    Observation_phenomenonTime: new Date(2000),
                    Observation_result: 0.5
                }, {
                    Observation_phenomenonTime: new Date(1000),
                    Observation_result: 12
                }, {
                    Observation_phenomenonTime: new Date(0),
                    Observation_result: 24
                }],
                otherRandomStuff: "peter"
            }, {
                Observations: [{
                    Observation_phenomenonTime: new Date(2000),
                    Observation_result: 0.5
                }, {
                    Observation_phenomenonTime: new Date(1000),
                    Observation_result: 12
                }, {
                    Observation_phenomenonTime: new Date(0),
                    Observation_result: 24
                }],
                otherRandomStuff: "peter"
            }];
        };

        let callback = (htmlId, updateData, updateConfig) => {
            $("canvas").ready(() => {
                updateConfig(configUpdate());
                updateData(dataUpdate());

                // Test title of the widget
                expect(title()).to.equal(configLoad().title.data);
                done();
            });
        };

        tlw = _thermometerWidgetFactory.create("Test", callback, htmlTemplate);
        $("body").append(tlw);
    });

    /**
     * Tests whether widget is created correctly without data
     */
    it("Test widget creating without init data and update afterwards", (done) => {
        let tlw;
        let title = () => $(".widget-title")[0].innerText;

        let configUpdate = configLoad;

        let dataUpdate = function() {
            return [];
        };

        let callback = (htmlId, updateData, updateConfig) => {
            $("canvas").ready(() => {
                updateConfig(configUpdate());
                updateData(dataUpdate());

                // Test title of the widget
                expect(title()).to.equal(configLoad().title.data);
                done();
            });
        };

        tlw = _thermometerWidgetFactory.create("Test", callback, htmlTemplate);
        $("body").append(tlw);
    });

    /**
     * Tests, if the factory corrects too high scale decimal numbers to twenty
     * @param string
     *      name of this test
     */
    it('Too high scale decimal number is corrected', function(done) {
        let factory = new ThermometerWidgetFactory();
        let scaleDecimals0 = 19;
        let scaleDecimals1 = 20;
        let scaleDecimals2 = 25;
        let scaleDecimals3 = 41;

        expect(factory._correctScaleDecimals(scaleDecimals0)).to.eql(19);
        expect(factory._correctScaleDecimals(scaleDecimals1)).to.eql(20);
        expect(factory._correctScaleDecimals(scaleDecimals2)).to.eql(20);
        expect(factory._correctScaleDecimals(scaleDecimals3)).to.eql(20);

        done();
    });

    /**
     * Tests, if the factory formats arrays given in the config correctly
     * @param string
     *      name of this test
     */
    it('Factory formats arrays in the config correctly', function(done) {
        let factory = new ThermometerWidgetFactory();
        let data = {
            array: {
                data: [{
                        data: {
                            arrayMember1: {
                                data: 'test',
                                type: TYPE_STRING
                            }
                        },
                        type: TYPE_OBJECT
                    },
                    {
                        data: {
                            arrayMember2: {
                                data: 42,
                                type: TYPE_INTEGER
                            }
                        },
                        type: TYPE_OBJECT
                    }
                ],
                type: TYPE_ARRAY
            }
        };
        let result = ['test', 42];
        expect(factory._formatConfigurableData(data).array.data).to.eql(result);
        done();
    });

    /**
     * Tests whether widget is created correctly without data
     */
    it("Test widget creating without init data and update afterwards", (done) => {
        let tlw;
        let title = () => $(".widget-title")[0].innerText;

        let configUpdate = configLoad;

        let dataUpdate = function() {
            return [];
        };

        let secondDataUpdate = function () {
            return {
                    Observations: [
                        {
                            Observation_phenomenonTime: new Date(2000),
                            Observation_result: 0.5
                        }, {
                            Observation_phenomenonTime: new Date(1000),
                            Observation_result: 12
                        }, {
                            Observation_phenomenonTime: new Date(0),
                            Observation_result: 24
                        }
                    ],
                    otherRandomStuff: "peter"
                }
        };

        let callback = (htmlId, updateData, updateConfig) => {
            $("canvas").ready(() => {
                updateConfig(configUpdate());
                updateData(dataUpdate());
                updateData(secondDataUpdate());

                // Test title of the widget
                expect(title()).to.equal(configLoad().title.data);
                done();
            })
        };

        tlw = _thermometerWidgetFactory.create("Test", callback, htmlTemplate);
        $("body").append(tlw);
    });
});
