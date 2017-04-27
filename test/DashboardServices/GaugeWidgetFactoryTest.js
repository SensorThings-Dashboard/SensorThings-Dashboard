import Mocha, {
    describe,
    it,
    before,
    beforeEach,
    after
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import Jsdom from 'mocha-jsdom';
import {
    GaugeWidgetFactory
} from '../../src/DashboardServices/GaugeWidgetFactory.js';
import {
    WidgetFactory
} from '../../src/DashboardServices/WidgetFactory.js';
import {
    View
} from '../../src/View/View.js';


/**
 * The following test tests every feature of the GaugeWidgetFactory
 */
describe("GaugeWidgetFactory test", () => {
    let _gaugeWidgetFactory;
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
    var jsdom = require("mocha-jsdom");

    beforeEach(() => $("body").html(""));

    let configLoad = function() {

        return {
            // View configuration
            title: {
                data: 'Gauge Widget',
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
            shadow: {
                data: true,
                type: TYPE_BOOLEAN
            },
            textColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            tickmarksBigColor: {
                data: '#000055',
                type: TYPE_COLOR
            },
            tickmarksMediumColor: {
                data: '#000033',
                type: TYPE_COLOR
            },
            tickmarksSmallColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            backgroundColor: {
                data: '#FFFFFF',
                type: TYPE_COLOR
            },
            borderInnerColor: {
                data: '#FFFFFF',
                type: TYPE_COLOR
            },
            borderOuterColor: {
                data: '#EEEEEE',
                type: TYPE_COLOR
            },
            borderOutlineColor: {
                data: '#BBBBBB',
                type: TYPE_COLOR
            },
            needleColor: {
                data: '#FF0000',
                type: TYPE_COLOR
            },
            needleType: {
                data: 'line',
                type: TYPE_STRING
            },
            needleTail: {
                data: true,
                type: TYPE_BOOLEAN
            },
            centerpinRadius: {
                data: 7,
                type: TYPE_NUMBER
            },
            titleTop: {
                data: "",
                type: TYPE_STRING
            },
            titleTopSize: {
                data: 15,
                type: TYPE_INTEGER
            },
            titleTopColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            titleBottom: {
                data: "",
                type: TYPE_STRING
            },
            titleBottomColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            titleBottomSize: {
                data: 12,
                type: TYPE_INTEGER
            },
            labelsCentered: {
                data: true,
                type: TYPE_BOOLEAN
            },
            labelsOffset: {
                data: 7,
                type: TYPE_INTEGER
            },
            textAccessible: {
                data: true,
                type: TYPE_BOOLEAN
            },
            colorsRanges: {
                data: [{
                    data: {
                        lower: {
                            data: 60,
                            type: TYPE_NUMBER
                        },
                        upper: {
                            data: 80,
                            type: TYPE_NUMBER
                        },
                        color: {
                            data: '#FFFF00',
                            type: TYPE_COLOR
                        }
                    },
                    type: TYPE_OBJECT
                }, {
                    data: {
                        lower: {
                            data: 80,
                            type: TYPE_NUMBER
                        },
                        upper: {
                            data: 100,
                            type: TYPE_NUMBER
                        },
                        color: {
                            data: '#FF0000',
                            type: TYPE_COLOR
                        }
                    },
                    type: TYPE_OBJECT
                }],
                type: TYPE_ARRAY
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

    // first initialization of resources
    before(function(done) {
        this.jsdom = require('jsdom-global')();
        window.iotBaseDir = process.cwd().split("\\").join("/") + "/public/";
        window.iotlg = {
            widgetGaugeTitle: "My Title"
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
        window.RGraph.Gauge = function() {
            return {
                draw: function() {}
            };
        };


        _gaugeWidgetFactory = new GaugeWidgetFactory(new WidgetFactory());
        _gaugeWidgetFactory._resizeCanvas = () => {};
        new View()._setUpLanguage("en");
        done();
    });

    /**
     * Performed test: test if GaugeWidgetFactory is a Singelton
     */
    it('Factory should be a singleton', function(done)  {
        var factory1 = new GaugeWidgetFactory();
        var factory2 = new GaugeWidgetFactory();
        // Factories should be the same
        expect(factory1).to.eql(factory2);
        done();
    });

    /**
     * Tests wheather widget is correctly created
     */
    it("Gauge Widget Creation", (done) => {
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

        tlw = _gaugeWidgetFactory.create("Test", callback, htmlTemplate);
        $("body").append(tlw);
    });

    /**
     * Test format function of the GaugeWidgetFactory
     * @param string
     *      Name of the this test
     */
    it('Factory formats array', function(done) {
        let factory = new GaugeWidgetFactory();
        let data = {
            lineColors: {
                data: [{
                    data: {
                        lineColor: {
                            data: '#000000',
                            type: TYPE_COLOR
                        }
                    },
                    type: TYPE_OBJECT
                }, {
                    data: {
                        lineColor: {
                            data: '#aaaaaa',
                            type: TYPE_COLOR
                        }
                    },
                    type: TYPE_OBJECT
                }],
                type: TYPE_ARRAY
            }
        };
        let result = ['#000000', '#aaaaaa'];
        // Expect formated object to be formatted to an array
        expect(factory._formatConfigurableData(data).lineColors.data).to.eql(result);
        done();
    });
});
