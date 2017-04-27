import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    WidgetFactory
} from '../../src/DashboardServices/WidgetFactory.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';


/**
 * This one will test the WidgetFactory Class
 * @param string
 *      The displayed name of this test suite
 */
describe("WidgetFactory.js test", () => {
    let _view = null;
    let $ = null;
    let L = null;
    Jsdom();

    before(function(done) {

        // init window and jquery globaly
        this.jsdom = require('jsdom-global')();
        window.iotlg = {
            "dateFormat": "dd.mm.yyyy hh:MM:ss"
        };
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
        done();
    });

    /**
     * Performed test: test if WidgetFactory is a Singelton
     */
    it('WidgetFactory should be a Singleton', function(done) {
        var widgetFactory1 = new WidgetFactory();
        var widgetFactory2 = new WidgetFactory();
        // Expect widget factories to be the same
        expect(widgetFactory1).to.eql(widgetFactory2);
        done();
    });

    /**
     * Create widget checks for correct type
     */
    it('Create widget checks if type correct', function(done) {
        var widgetFactory = new WidgetFactory();
        expect(widgetFactory.createWidget(993, null)).to.eql(-1);
        done();
    });

    //Test if time prettyfier works correctly
    it('Time Prettyfier', function(done) {
        let widgetFactory = new WidgetFactory();
        window.iotlg.dateFormat = "dd.mm.yyyy hh:MM:ss";
        let date = new Date(98, 0); // Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)
        expect(widgetFactory.getTimePretty(date)).to.eql("01.01.1998 00:00:00");
        done();
    });
});