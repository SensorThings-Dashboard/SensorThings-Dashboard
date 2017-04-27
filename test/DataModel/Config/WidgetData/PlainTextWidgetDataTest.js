import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    PlainTextWidgetData
} from '../../../../src/DataModel/Config/WidgetData/PlainTextWidgetData.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the PlainTextWidgetData Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class PlainTextWidgetData: Basic tests: ', () => {
    let _view = null;
    let $ = null;
    let L = null;

    let plainTextWidgetData = null;
    Jsdom();


    // first initialization of view
    before(function (done) {
        // init window and jquery globaly
        this.jsdom = require('jsdom-global')();
        global.$ = global.jQuery = require('jquery');
        $ = require('jquery');
        global.L = require('leaflet');
        window.iotlg = {
            textWidgetDefaultText: "asdf"
        };

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

    beforeEach(() => {
        plainTextWidgetData = new PlainTextWidgetData();
    });

    it('constructor works', function (done) {
        expect(plainTextWidgetData).to.be.instanceof(Object);
        done();
    });

    it('setAttributes & getPosition test', function (done) {
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
        plainTextWidgetData.setAttributes(temp);
        expect(plainTextWidgetData.getPosition()).equal(temp.position);
        done();
    });

    it('setAttributes & getSize test', function (done) {
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
        plainTextWidgetData.setAttributes(temp);
        expect(plainTextWidgetData.getSize()).equal(temp.size);
        done();
    });

    it('set- & getPosition test', function (done) {
        let temp = {
            "x": 4,
            "y": 2
        };
        plainTextWidgetData.setPosition(temp);
        expect(plainTextWidgetData.getPosition()).equal(temp);
        done();
    });

    it('set- & getSize test', function (done) {
        let temp = {
            "x": 20,
            "y": 12
        };
        plainTextWidgetData.setSize(temp);
        expect(plainTextWidgetData.getSize()).equal(temp);
        done();
    });

    it('method getID test', function (done) {
        plainTextWidgetData = new PlainTextWidgetData(10);
        expect(plainTextWidgetData.getID()).equal(10);
        done();
    });

    it('method getType test', function (done) {
        expect(plainTextWidgetData.getType()).equal(6);
        done();
    });

    it("should call config callback after new config", (done) => {
        let myConfig= [{data: "I am a config structure!"}];
        global.called = false;
        let callback = (config) => {
            if (called) {
                expect(config).to.equal(myConfig);
                done();
            }
            else {
                called = !called;
            }
        };
        plainTextWidgetData.registerViewCallback(() => {}, callback);
        plainTextWidgetData.setConfigurableData(myConfig);
    });
});