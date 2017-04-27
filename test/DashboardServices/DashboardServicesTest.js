import Mocha, {
    describe,
    it,
    before,
    after
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import Jsdom from 'mocha-jsdom';
import {
    DashboardServices
} from '../../src/DashboardServices/DashboardServices.js';

/**
 * The following test tests every feature of the GaugeWidgetFactory
 */
describe("DashboardServices test", () => {


    // first initialization of resources
    before(function(done) {

        //define global vars
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
     * Performed test: test if GaugeWidgetFactory is a Singelton
     */
    it('Factory should be a singleton', function(done)  {
        var dashboard1 = new DashboardServices();
        var dashboard2 = new DashboardServices();
        // Factories should be the same
        expect(dashboard1).to.eql(dashboard2);
        done();
    });
});
