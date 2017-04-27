import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    WidgetConfig
} from '../../../src/DataModel/Config/WidgetConfig.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the WidgetConfig Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class WidgetConfigTest: Basic tests: ', () => {
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
        done();
    });

    it('constructor works', function(done)  {
        let widgetConfig = new WidgetConfig();
        expect(widgetConfig).to.be.instanceof(Object);
        done();
    });

    it('WidgetConfig should be a Singleton', function(done)  {
        var widgetConfig1 = new WidgetConfig();
        var widgetConfig2 = new WidgetConfig();
        // Expect dataModels to be the same
        expect(widgetConfig1).to.eql(widgetConfig2);
        done();
    });

    it('method getConfigContent works', function(done) {
        var widgetConfig = new WidgetConfig();
        expect(widgetConfig.getConfigContent()).to.be.instanceof(Array);
        done();
    });

    it('set- & getConfigContent works', function(done) {
        var widgetConfig = new WidgetConfig();
        let temp = [12, 34, 45, {
            'name': 'Ben',
            'alter': 21
        }];
        widgetConfig.setConfigContent(temp);
        expect(widgetConfig.getConfigContent()).equal(temp);
        done();
    });

    after(() => new WidgetConfig().setConfigContent([]));
});