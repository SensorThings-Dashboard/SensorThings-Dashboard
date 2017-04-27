import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    GaugeWidgetData
} from '../../../../../src/DataModel/Config/WidgetData/DataWidgetData/GaugeWidgetData.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the GaugeWidgetData Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class GaugeWidgetData: Basic tests: ', () => {
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

        global.MARKER_TYPE_PLAIN = 0;
        global.MARKER_TYPE_PLAINVALUE = 1;
        global.MARKER_TYPE_TRAFFICLIGHT = 2;
        global.MARKER_TYPE_HISTORY = 3;
        done();
    });

    it('constructor works', function(done)  {
        let gaugeWidgetData = new GaugeWidgetData();
        expect(gaugeWidgetData).to.be.instanceof(Object);
        done();
    });

    it('setAttributes & getPosition test', function(done) {
        let gaugeWidgetData = new GaugeWidgetData();
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
        gaugeWidgetData.setAttributes(temp);
        expect(gaugeWidgetData.getPosition()).equal(temp.position);
        done();
    });

    it('setAttributes & getSize test', function(done) {
        let gaugeWidgetData = new GaugeWidgetData();
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
        gaugeWidgetData.setAttributes(temp);
        expect(gaugeWidgetData.getSize()).equal(temp.size);
        done();
    });

    it('set- & getPosition test', function(done) {
        let gaugeWidgetData = new GaugeWidgetData();
        let temp = {
            "x": 4,
            "y": 2
        };
        gaugeWidgetData.setPosition(temp);
        expect(gaugeWidgetData.getPosition()).equal(temp);
        done();
    });

    it('set- & getSize test', function(done) {
        let gaugeWidgetData = new GaugeWidgetData();
        let temp = {
            "x": 20,
            "y": 12
        };
        gaugeWidgetData.setSize(temp);
        expect(gaugeWidgetData.getSize()).equal(temp);
        done();
    });

    it('method getID test', function(done) {
        let gaugeWidgetData = new GaugeWidgetData(10);
        expect(gaugeWidgetData.getID()).equal(10);
        done();
    });

    it('method getType test', function(done) {
        let gaugeWidgetData = new GaugeWidgetData(22);
        expect(gaugeWidgetData.getType()).equal(2);
        done();
    });
});