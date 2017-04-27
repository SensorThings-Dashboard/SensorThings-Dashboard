import Mocha, {
    describe,
    it,
    before,
    beforeEach
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import Jsdom from 'mocha-jsdom'
import {
    UserEvents
} from '../../src/UserEvents/UserEvents.js';
import {
    DashboardServices
} from '../../src/DashboardServices/DashboardServices.js';

/**
 * The following test tests every feature of the BarGraphWidgetFactory
 * @param string
 *      The displayed name of this test suite
 */
describe("UserEvent test", () => {
    var jsdom = require('mocha-jsdom');
    jsdom();

    // first initialization of resources
    before(function(done) {
        global.$ = global.jQuery = require('jquery')(window);
        global.L = require('leaflet');

        //define global lets
        global.TYPE_COLOR = 0;
        global.TYPE_STRING = 1;
        global.TYPE_INTEGER = 2;
        global.TYPE_BOOLEAN = 3;
        global.TYPE_ARRAY = 4;
        global.TYPE_DATE = 5;
        global.TYPE_DROPDOWN = 6;
        global.TYPE_NUMBER = 7;
        global.TYPE_FUZZY_SENSOR_SEARCH = 8;
        global.TYPE_OBJECT = 9;
        global.TYPE_OTHER = 10;
        global.UNIT_MILLISECOND = 0;
        global.UNIT_SECOND = 1;
        global.UNIT_MINUTE = 2;
        global.UNIT_HOUR = 3;
        global.UNIT_DAY = 4;
        global.UNIT_MONTH = 5;
        global.UNIT_YEAR = 6;

        done();
    });

    /**
     * Performed test: test if UserEvents is a Singelton
     * @param string
     *      Name of the this test
     */
    it('UserEvents should be a Singleton', function(done) {
        let userEvents1 = new UserEvents();
        let userEvents2 = new UserEvents();
        // Expect factories to be the same
        expect(userEvents1).to.eql(userEvents2);
        done();
    });

    /**
     * Performed test: test if loadUserConfig return UserConfig
     * @param string
     *      Name of the this test
     */
    it('Test if loadUserConfig() returns UserConfig', function(done) {
        let userEvents1 = new UserEvents();
        let dbService = new DashboardServices();
        let arg = userEvents1.loadUserConfig();
        let res = dbService.loadUserConfig();
        // Expect factories to be the same
        expect(arg).to.eql(res);
        done();
    });

    /**
     * Performed test: test if setUserConfig sets setUserConfig
     * @param string
     *      Name of the this test
     */
    it('Test set userConfig', function(done) {
        let userEvents1 = new UserEvents();
        let conf = userEvents1.loadUserConfig();
        conf.thisIsATestAtribute = {
            peter: "Peter tests this"
        };
        let arg = userEvents1.setUserConfig(conf);
        let res = userEvents1.loadUserConfig();
        // Expect factories to be the same
        expect(conf).to.eql(res);
        done();
    });

    /**
     * Performed test: test if setUserConfig sets setUserConfig
     * @param string
     *      Name of the this test
     */
    it('Test export to cms', function(done) {
        let userEvents1 = new UserEvents();
        var testFunction = function() {
            done();
        };
        window.iotDB = {
            onSaveConfig: testFunction
        };
        userEvents1.exportToCMS();
    });

    /**
     * Performed test: test if setUserConfig sets setUserConfig
     * @param string
     *      Name of the this test
     */
    it('Test export to cms not working', function(done) {
        let userEvents1 = new UserEvents();
        var testFunction = null;
        window.iotDB = {
            onSaveConfig: testFunction
        };
        userEvents1.exportToCMS();
        done();
    });

    /**
     * Performed test: test if setUserConfig sets setUserConfig
     * @param string
     *      Name of the this test
     */
    it('Test import from cms', function(done) {
        let userEvents1 = new UserEvents();
        var testFunction = function() {
            done();
        };
        window.iotDB = {
            onLoadConfig: testFunction
        };
        userEvents1.importFromCMS();
    });

    /**
     * Performed test: test if setUserConfig sets setUserConfig
     * @param string
     *      Name of the this test
     */
    it('Test import from cms not working', function(done) {
        let userEvents1 = new UserEvents();
        var testFunction = null;
        window.iotDB = {
            onLoadConfig: testFunction
        };
        userEvents1.importFromCMS();
        done();
    });

});