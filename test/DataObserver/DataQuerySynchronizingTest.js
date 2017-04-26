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
import {DataQuerySynchronizing} from '../../src/DataObserver/DataQuerySynchronizing.js';
describe("DataQuerySynchronizing", () => {

    let dataQuerySynchronizing = null;

    before(() => {
       dataQuerySynchronizing = new DataQuerySynchronizing();

    });

    it("should complete parameter lists", () => {
        let params = {};
        params = dataQuerySynchronizing._completeParameterList(params);

        // 31 parameters are expectable
        expect(Object.keys(params).length).to.be.greaterThan(30);
    })

});
