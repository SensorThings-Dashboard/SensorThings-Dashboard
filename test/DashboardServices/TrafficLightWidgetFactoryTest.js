import Mocha, {
    describe,
    it,
    before,
    after
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import {
    TrafficLightWidgetFactory
} from '../../src/DashboardServices/TrafficLightWidgetFactory.js';
import {
    WidgetFactory
} from "../../src/DashboardServices/WidgetFactory.js";

describe("TrafficLightWidget", () => {
    let _trafficLightWidgetFactory;

    let htmlTemplate =
        '<div id="templateWidget" class="grid-stack-item-content">' +
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

    let getConfigDummy = function(lower, higher) {
        return {
            title: {
                data: "Test Title"
            },
            lower: {
                data: lower,
            },
            upper: {
                data: higher,
            },
            lowerColor: {
                data: 3
            },
            middleColor: {
                data: 2
            },
            upperColor: {
                data: 1
            }
        };
    };

    beforeEach(() => $("body").html(""));

    // first initialization of TrafficLightWidgetFactory
    before(function(done) {
        // init window and jquery globally
        this.jsdom = require('jsdom-global')();
        window.iotBaseDir = process.cwd().split("\\").join("/") + "/public/";
        window.iotlg = {
            widgetTrafficLightTitle: "Test Title"
        };
        global.$ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        global.COLOR_RED = 1;
        global.COLOR_YELLOW = 2;
        global.COLOR_GREEN = 3;
        _trafficLightWidgetFactory = new TrafficLightWidgetFactory(new WidgetFactory());
        done();
    });

    let getDummyData = val => {
        return {
            Observations: [{
                Observation_phenomenonTime: 1,
                Observation_result: val
            }]
        };
    };

    /**
     * Tests whether TrafficLightWidget is a Singleton
     */
    it("should be Singleton", () => {
        expect(new TrafficLightWidgetFactory(null)).to.eql(_trafficLightWidgetFactory);
    });



    /**
     * Tests whether the red traffic light is displayed after an appropriate dataUpdate with standard config
     */
    it("should display correct images for standard thresholds - Red", (done) => {
        let tlw;
        let image = () => $(".traffic-light").css("background-image");

        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(tlw);
            configUpdate(getConfigDummy(33, 66));
            dataUpdate(getDummyData(80));
            expect(image().indexOf("TLred.svg")).to.not.equal(-1);
            done();

        };
        tlw = _trafficLightWidgetFactory.create("Test", callback, htmlTemplate);
    });

    /**
     * Tests whether the yellow traffic light is displayed after an appropriate dataUpdate with standard config
     */
    it("should display correct images for standard thresholds - Yellow", (done) => {
        let tlw;
        let image = () => $(".traffic-light").css("background-image");

        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(tlw);
            configUpdate(getConfigDummy(33, 66));
            dataUpdate(getDummyData(40));
            expect(image().indexOf("TLyellow.svg")).to.not.equal(-1);
            done();
        };
        tlw = _trafficLightWidgetFactory.create("Test", callback, htmlTemplate);
    });

    /**
     * Tests whether the green traffic light is displayed after an appropriate dataUpdate with standard Config
     */
    it("should display correct images for standard thresholds - Green", (done) => {
        let tlw;
        let image = () => $(".traffic-light").css("background-image");

        let callback = (htmlId, dataUpdate, configUpdate) => {

            $("body").append(tlw);
            configUpdate(getConfigDummy(33, 66));
            dataUpdate(getDummyData(20));
            expect(image().indexOf("TLgreen.svg")).to.not.equal(-1);
            done();
        };
        tlw = _trafficLightWidgetFactory.create("Test", callback, htmlTemplate);
    });

    after(function() {
        this.jsdom();
    });
});