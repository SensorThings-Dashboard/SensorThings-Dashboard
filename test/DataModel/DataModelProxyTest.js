import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    DataModelProxy
} from '../../src/DataModel/DataModelProxy.js';
import {
    UserConfig
} from '../../src/DataModel/Config/UserConfig.js';
import {
    View
} from '../../src/View/View.js'

import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

/**
 * This one will test the DataModelProxy Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class DataModelProxy: Basic tests: ', () => {
    let _view = null;
    let $ = null;
    let L = null;
    Jsdom();

    // first initialization of view
    before(function(done) {
        // init window and jquery globaly
        this.jsdom = require('jsdom-global')();
        global.$ = $ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        new View()._setUpLanguage("en");
        done();
    });

    it('constructor works', function(done)  {
        let dataModelProxy = new DataModelProxy();
        expect(dataModelProxy).to.be.instanceof(Object);
        done();
    });

    it('method getUserConfig test', function(done) {
        let dataModelProxy = new DataModelProxy();
        let result = dataModelProxy.getUserConfig();
        expect(result).to.be.instanceof(UserConfig);
        done();
    });

    it('method getUserConfig test', function(done) {
        let dataModelProxy = new DataModelProxy();
        let result = dataModelProxy.getUserConfig();
        expect(result).to.be.instanceof(UserConfig);
        done();
    });
})