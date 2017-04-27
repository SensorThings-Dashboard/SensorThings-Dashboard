import Mocha, {
    describe,
    it,
    before,
    beforeEach
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import Jsdom from 'mocha-jsdom'
import {
    MapWidgetFactory
} from '../../src/DashboardServices/MapWidgetFactory.js';
import {
    WidgetFactory
} from "../../src/DashboardServices/WidgetFactory.js";
import {
    View
} from '../../src/View/View.js'

/**
 * The following tests cover the creation and functionality of MapWidgets
 * @param string
 *      The displayed name of this test suite
 */
describe("MapWidgetFactory.js test", () => {
    let _mapWidgetFactory;

    before(function(done) {

        this.jsdom = require('jsdom-global')();
        window.iotBaseDir = process.cwd().split("\\").join("/") + "/public/";
        window.iotlg = {
            widgetMapTitle: "My Title"
        };
        //set up dependencies and constants
        global.$ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        global.MARKER_TYPE_PLAIN = 0;
        global.MARKER_TYPE_PLAINVALUE = 1;
        global.MARKER_TYPE_TRAFFICLIGHT = 2;
        global.MARKER_TYPE_HISTORY = 3;
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
        global.COLOR_RED = 1;
        global.COLOR_YELLOW = 2;
        global.COLOR_GREEN = 3;
        _mapWidgetFactory = new MapWidgetFactory(new WidgetFactory());
        new View()._setUpLanguage("en");
        done();
    });

    let getDummyData = function() {
        return [
            {
                Observations: [{
                    Observation_phenomenonTime: 1,
                    Observation_result: 10
                }],
                Thing_Locations: [{
                    encodingType : "application/vnd.geo+json",
                    location: {"type":"Point","coordinates":[50,50]}
                }],
                DataStream_unitOfMeasurement: {
                    symbol: 'C'
                },
                Thing_HistoricalLocations: [{
                    Locations: [{
                        encodingType : "application/vnd.geo+json",
                        location: {"type":"Point","coordinates":[50,50]}
                    }],
                    time: 1
                }]
            }
        ];
    };

    let getConfigDummy = function(type) {
        return {
            title: {
                data: "Map Test",
                type: TYPE_STRING
            },
            zoom: {
                data: 13,
                TYPE_INTEGER
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
                data: 50,
                TYPE_NUMBER
            },
            longitude: {
                data: 50,
                TYPE_NUMBER
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
                            data: type,
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
    };

    /**
     * Tests, if the constructor creates an instance of Object
     * @param string
     *      name of this test
     */
    it('Constructor creates an object', function(done)  {
        let factory = new MapWidgetFactory();
        expect(factory).to.be.instanceof(Object);
        done();
    });

    /**
     * Tests, if the constructor implements singleton correctly
     * @param string
     *      name of this test
     */
    it('Constructor implements singleton', function(done)  {
        let factory1 = new MapWidgetFactory();
        let factory2 = new MapWidgetFactory();
        expect(factory1).to.eql(factory2);
        done();
    });

    /**
     * Tests, if the factory formats arrays given in the config correctly
     * @param string
     *      name of this test
     */
    it('Factory formats arrays in the config correctly', function(done) {
        let factory = new MapWidgetFactory();
        // create an object containing an array
        let data = {
            overlayTypes: {
                data: [{
                        data: {
                            overlayType1: {
                                data: MARKER_TYPE_PLAIN,
                                type: TYPE_INTEGER
                            }
                        },
                        type: TYPE_OBJECT
                    },
                    {
                        data: {
                            overlayType2: {
                                data: MARKER_TYPE_TRAFFICLIGHT,
                                type: TYPE_INTEGER
                            }
                        },
                        type: TYPE_OBJECT
                    }
                ],
                type: TYPE_ARRAY
            }
        };

        // expect the result to be this array
        let result = [{
                "overlayType1": {
                    "data": 0,
                    "type": 2
                }
            },
            {
                "overlayType2": {
                    "data": 2,
                    "type": 2
                }
            }
        ];

        expect(factory._formatConfigurableData(data).overlayTypes.data).to.eql(result);
        done();
    });

    /**
     * Tests, if the factory returns all of the available layers
     * @param string
     *      name of this test
     */
    it('Factory returns layers correctly', function(done)  {
        let factory = new MapWidgetFactory();
        // create some leaflet layers and add them to the layergroup
        let testMarker = L.marker([50, 50]);
        factory.mapLayers.addLayer(L.marker([20, 80]));
        factory.mapLayers.addLayer(testMarker);
        let latlngs = [];
        latlngs.push(L.latLng(40, 60));
        latlngs.push(L.latLng(60, 40));
        factory.mapLayers.addLayer(L.polyline(latlngs));

        // expect the length of the layergroup to be 3 and check one identity
        expect(factory.getMapLayers().length).to.eql(3);
        expect(factory.getMapLayers()[1]).to.eql(testMarker);
        factory.removeLayerGroup(123);
        done();
    });

    /**
     * Tests, if the sort method within the factory works properly
     * @param string
     *      name of this test
     */
    it('Factory sorts arrays properly', function(done)  {
        let factory = new MapWidgetFactory();
        // create three objects that should be sorted by time
        let testObj1 = {
            time: 5
        };
        let testObj2 = {
            time: 2
        };
        let testObj3 = {
            time: 8
        };
        let arr = [testObj1, testObj2, testObj3];
        arr.sort(factory._sortByTime);

        // check sorted order
        expect(arr[0]).to.eql(testObj2);
        expect(arr[1]).to.eql(testObj1);
        expect(arr[2]).to.eql(testObj3);

        done();
    });

    /**
     * Tests whether a widget with a plain marker is created correctly
     */
    it("Widget can be created with plain marker", (done) => {
        let tlw;
        let title = () => $(".widget-title")[0].innerText;
        let callback = (htmlId, dataUpdate, configUpdate) => {
            configUpdate(getConfigDummy(MARKER_TYPE_PLAIN));
            dataUpdate(getDummyData());
            done();
        };
        tlw = _mapWidgetFactory.create("Test1", callback);
        $("body").append(tlw);
    });

    /**
     * Tests whether widget with a plain value marker is created correctly
     */
    it("Widget can be created with plain value marker", (done) => {
        let tlw;
        let title = () => $(".widget-title")[0].innerText;
        let callback = (htmlId, dataUpdate, configUpdate) => {
            configUpdate(getConfigDummy(MARKER_TYPE_PLAINVALUE));
            dataUpdate(getDummyData());
            done();
        };
        tlw = _mapWidgetFactory.create("Test2", callback);
        $("body").append(tlw);
    });

    /**
     * Tests whether widget with a traffic light marker is created correctly
     */
    it("Widget can be created with traffic light marker", (done) => {
        let tlw;
        let title = () => $(".widget-title")[0].innerText;
        let callback = (htmlId, dataUpdate, configUpdate) => {
            configUpdate(getConfigDummy(MARKER_TYPE_TRAFFICLIGHT));
            dataUpdate(getDummyData());
            done();
        };
        tlw = _mapWidgetFactory.create("Test3", callback);
        $("body").append(tlw);
    });

    after(function() {
        this.jsdom();
    });

});