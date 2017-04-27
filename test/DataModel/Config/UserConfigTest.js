import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    UserConfig
} from '../../../src/DataModel/Config/UserConfig.js';
import {
    WidgetConfig
} from '../../../src/DataModel/Config/WidgetConfig.js';
import {
    DashboardConfig
} from '../../../src/DataModel/Config/DashboardConfig.js'
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the UserConfig Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class UserConfig: Basic tests: ', () => {
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
        let userConfig = new UserConfig();
        expect(userConfig).to.be.instanceof(Object);
        done();
    });


    it('UserConfig should be a Singleton', function(done)  {
        var userConfig1 = new UserConfig();
        var userConfig2 = new UserConfig();
        // Expect dataModels to be the same
        expect(userConfig1).to.eql(userConfig2);
        done();
    });

    it('method getWidgetConfig test', function(done) {
        var userConfig = new UserConfig();
        expect(userConfig.getWidgetConfig()).to.be.instanceof(WidgetConfig);
        done();
    });

    it('method getDashboardConfig test', function(done) {
        var userConfig = new UserConfig();
        expect(userConfig.getDashboardConfig()).to.be.instanceof(DashboardConfig);
        done();
    });

    it('set- & getWidgetConfig works', function(done) {
        var userConfig = new UserConfig();
        let temp = new WidgetConfig();
        userConfig.setWidgetConfig(temp);
        expect(userConfig.getWidgetConfig()).equal(temp);
        done();
    });

    it('set- & getDashboardConfig works', function(done) {
        var userConfig = new UserConfig();
        let temp = new WidgetConfig();
        userConfig.setWidgetConfig(temp);
        expect(userConfig.getWidgetConfig()).equal(temp);
        done();
    });
});