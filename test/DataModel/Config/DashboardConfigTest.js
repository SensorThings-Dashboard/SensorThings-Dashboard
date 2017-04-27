import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    DashboardConfig
} from '../../../src/DataModel/Config/DashboardConfig.js';
import {
    View
} from "../../../src/View/View.js";
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the DasbiardConfig Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class DashboardConfig: Basic tests: ', () => {
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
        new View("test")._setUpLanguage();
        done();
    });

    it('constructor works', function(done)  {
        let dashboardConfig = new DashboardConfig();
        expect(dashboardConfig).to.be.instanceof(Object);
        done();
    });

    it('DataModel should be a Singleton', function(done)  {
        var dashboardConfig1 = new DashboardConfig();
        var dashboardConfig2 = new DashboardConfig();
        // Expect dataModels to be the same
        expect(dashboardConfig1).to.eql(dashboardConfig2);
        done();
    });

    it('Default Title is setted', function(done) {
        var dashboardConfig = new DashboardConfig();
        expect(dashboardConfig.getTitle()).to.not.equal('undefined');
        done();
    });

    it('Default ServerList is setted', function(done) {
        var dashboardConfig = new DashboardConfig();
        expect(dashboardConfig.getServerList()).to.not.equal('undefined');
        done();
    });

    it('set- & getTitle works', function(done) {
        var dashboardConfig = new DashboardConfig();
        let temp = 'Beispiel Titel';
        dashboardConfig.setTitle(temp);
        expect(dashboardConfig.getTitle()).equal(temp);
        done();
    });

    it('set- & getServerList works', function(done) {
        var dashboardConfig = new DashboardConfig();
        let temp = [{
            name: "Name 2",
            url: "https://test.mosquitto.org/"
        }];
        dashboardConfig.setServerList(temp);
        expect(dashboardConfig.getServerList()).equal(temp);
        done();
    });
});