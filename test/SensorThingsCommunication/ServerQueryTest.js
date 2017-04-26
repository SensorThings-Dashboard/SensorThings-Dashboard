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
import {ServerQuery} from '../../src/SensorThingsCommunication/ServerQuery.js';
import {LineGraphWidgetData} from '../../src/DataModel/Config/WidgetData/DataWidgetData/LineGraphWidgetData.js';
describe("ServerQuery", () => {

    Jsdom();

    it("should call callback after creation of a new query - invalid URL", (done) => {
        let callback = (data) => {
            expect(data).to.deep.equal({});
            done();
        };
        let params = new LineGraphWidgetData("test").getParameterMap();
        let queryURL = "This is not even a real URL.";
        new ServerQuery().createQuery(queryURL, params, callback, new Date(), new Date());

    });

});