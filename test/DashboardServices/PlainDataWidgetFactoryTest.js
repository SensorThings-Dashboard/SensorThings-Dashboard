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
    PlainDataWidgetFactory
} from '../../src/DashboardServices/PlainDataWidgetFactory.js';
import {
    WidgetFactory
} from "../../src/DashboardServices/WidgetFactory.js";

describe("PlainDataWidgetFactory", () => {
    let _plainDataWidgetFactory;
    let pdw;

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

    let getConfigDummy = (title, valueSize, unitSize, unit) => ({
        title: {
            data: title
        },
        valueSize: {
            data: valueSize
        },
        unitSize: {
            data: unitSize
        },
        unit: {
            data: unit
        }
    });

    let getDummyData = val => {
        return {
            Observations: [{
                Observation_result: val,
                Observation_phenomenonTime: new Date()
            }]
        };
    };

    beforeEach(() => {
        $("body").html("");
        pdw = null;
    });

    // first initialization of TrafficLightWidgetFactory
    before(function(done) {
        // init window and jquery globally
        this.jsdom = require('jsdom-global')();
        window.iotBaseDir = process.cwd().split("\\").join("/") + "/public/";
        window.iotlg = {
            widgetLastUpdate: "Last Updated: "
        };
        global.$ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        _plainDataWidgetFactory = new PlainDataWidgetFactory(new WidgetFactory());
        done();
    });

    /**
     * Tests whether TrafficLightWidget is a Singleton
     */
    it("should be Singleton", () => {
        expect(new PlainDataWidgetFactory(new WidgetFactory())).to.eql(_plainDataWidgetFactory);
    });

    /**
     * Tests whether the correct text is displayed after an appropriate configUpdate
     */
    it("should display correct value", (done) => {


        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(pdw);
            dataUpdate(getDummyData(27));
            expect($(".widget-text-element").text()).to.eql("27");
            done();
        };
        pdw = _plainDataWidgetFactory.create("Test", callback, htmlTemplate);
    });

    /**
     * Tests whether the correct unit is displayed after an appropriate configUpdate
     */
    it("should display correct unit", (done) => {


        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(pdw);
            configUpdate(getConfigDummy("Test Title", 34, 30, "hPa"));
            expect($(".widget-unit-element").text()).to.eql("hPa");
            done();
        };
        pdw = _plainDataWidgetFactory.create("Test", callback, htmlTemplate);
    });

    /**
     * Tests whether the correct value font size is displayed after an appropriate configUpdate
     */
    it("should display correct value font size", (done) => {


        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(pdw);
            configUpdate(getConfigDummy("Test Title", 34, 30, "hPa"));
            expect($(".widget-text-element").css("font-size")).to.eql("34px");
            done();
        };
        pdw = _plainDataWidgetFactory.create("Test", callback, htmlTemplate);
    });

    /**
     * Tests whether the correct unit font size is displayed after an appropriate configUpdate
     */
    it("should display correct unit font size", (done) => {


        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(pdw);
            configUpdate(getConfigDummy("Test Title", 34, 30, "hPa"));
            expect($(".widget-unit-element").css("font-size")).to.eql("30px");
            done();
        };
        pdw = _plainDataWidgetFactory.create("Test", callback, htmlTemplate);
    });
});