import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    RandomDataQuery
} from '../../../src/DataObserver/Query/RandomDataQuery.js';
import {
    LineGraphWidgetData
} from '../../../src/DataModel/Config/WidgetData/DataWidgetData/LineGraphWidgetData';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';
describe("RandomDataQuery", () => {
    it("should create a valid response object", (done) => {
        let callback = (data) => {
            expect(data.Observations && data.Observations[0].Observation_result < 100).to.be.true;
            done();
        };
        let randomDataQuery = new RandomDataQuery(new LineGraphWidgetData("test").getParameterMap(), callback);
        randomDataQuery.callIt();
    });

});