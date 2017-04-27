import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    DataModel
} from '../../src/DataModel/DataModel.js';
import {
    UserConfig
} from '../../src/DataModel/Config/UserConfig.js';
import {
    DashboardConfig
} from '../../src/DataModel/Config/DashboardConfig.js'
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';


/**
 * This one will test the DataModel Class
 * @param string
 *      The displayed name of this test suite
 */
describe("DataModel.js test", () => {
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

    /**
     * Performed test: test if DataModel is a Singelton
     * @param string
     *      Name of the this test
     */
    it('DataModel should be a Singleton', function(done)  {
        var dataModel1 = new DataModel();
        var dataModel2 = new DataModel();
        // Expect dataModels to be the same
        expect(dataModel1).to.eql(dataModel2);
        done();
    });


    it('method getUserConfig test', function(done) {
        let dataModel = new DataModel();
        let result = dataModel.getUserConfig();
        expect(result).to.be.instanceof(UserConfig);
        done();
    });

    it('method set- & getUserConfig test', function(done) {
        let dataModel = new DataModel();
        let temp = dataModel.getUserConfig();
        dataModel.setUserConfig(temp);
        let result = dataModel.getUserConfig();
        expect(result).to.eql(temp);
        done();
    });
});