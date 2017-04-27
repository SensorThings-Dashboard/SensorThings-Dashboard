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
    PlainTextWidgetFactory
} from '../../src/DashboardServices/PlainTextWidgetFactory.js';

describe("PlainTextWidgetFactory", () => {
    let _plainTextWidgetFactory;

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

    let getConfigDummy = (text, title, fontSize) => ({
        title: {
            data: title
        },
        text: {
            data: text
        },
        fontSize: {
            data: fontSize
        }
    });

    beforeEach(() => $("body").html(""));

    // first initialization of TrafficLightWidgetFactory
    before(function(done) {
        // init window and jquery globally
        this.jsdom = require('jsdom-global')();
        window.iotBaseDir = process.cwd().split("\\").join("/") + "/public/";
        global.$ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        _plainTextWidgetFactory = new PlainTextWidgetFactory(null);
        done();
    });

    /**
     * Tests whether TrafficLightWidget is a Singleton
     */
    it("should be Singleton", () => {
        expect(new PlainTextWidgetFactory(null)).to.eql(_plainTextWidgetFactory);
    });

    /**
     * Tests whether the correct text is displayed after an appropriate configUpdate
     */
    it("should display correct text", (done) => {
        let ptw;

        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(ptw);
            configUpdate(getConfigDummy("Test Text", "Test Title", 42));
            expect($(".widget-text-element").text()).to.eql("Test Text");
            done();
        };
        ptw = _plainTextWidgetFactory.create("Test", callback, htmlTemplate);
    });

    /**
     * Tests whether the correct title is displayed after an appropriate configUpdate
     */
    it("should display correct title", (done) => {
        let ptw;

        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(ptw);
            configUpdate(getConfigDummy("Test Text", "Test Title", 42));
            expect($(".widget-title").text()).to.eql("Test Title");
            done();
        };
        ptw = _plainTextWidgetFactory.create("Test", callback, htmlTemplate);
    });

    /**
     * Tests whether the correct font size is displayed after an appropriate configUpdate
     */
    it("should display correct font size", (done) => {
        let ptw;

        let callback = (htmlId, dataUpdate, configUpdate) => {
            $("body").append(ptw);
            configUpdate(getConfigDummy("Test Text", "Test Title", 42));
            expect($(".widget-text-element").css("font-size")).to.eql("42px");
            done();
        };
        ptw = _plainTextWidgetFactory.create("Test", callback, htmlTemplate);
    });
});