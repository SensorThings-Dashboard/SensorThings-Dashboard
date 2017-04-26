import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    TimedQuery
} from '../../../src/DataObserver/Query/TimedQuery.js';
import {
    GaugeWidgetData
} from '../../../src/DataModel/Config/WidgetData/DataWidgetData/GaugeWidgetData.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';
describe("TimedQuery", () => {

    let timedQuery = null;

    before(() => {
        timedQuery = getTimedQuery();


    });

    let getTimedQuery = function () {
        return new TimedQuery(
            new GaugeWidgetData("test").getParameterMap(),
            50,
            "mySTServer.com/Datastreams(7)",
            //declare callback for tests specifically
            () => {
            },
            new Date(2016, 11, 13, 12, 0),
            new Date(2016, 11, 13, 13, 0),
            3 * 1000 * 60 * 60 * 24,
            true
        );
    };


    it("should call callback on callIt", (done) => {
        global.calledCount = 0;
        let date1;
        let date2;
        timedQuery.callback = (currentData) => {
            calledCount++;
            switch (calledCount) {
                case 1:
                case 2:
                    if (!currentData.Observations || currentData.Observations[0].data != "I am an observation!") {
                        //failed
                        fail();
                    }
                    break;
                case 3:
                    expect(currentData.Observations).to.deep.equal([
                            {
                                data: "I am another observation!",
                                Observation_phenomenonTime: date2
                            },
                            {
                                data: "I am an observation!",
                                Observation_phenomenonTime: date1
                            }
                        ]
                    );
                    done();
            }
        };
        timedQuery.callIt({
            Observations: [{
                data: "I am an observation!",
                Observation_phenomenonTime: (date1 = new Date())
            }]
        });
        timedQuery.callIt({
            Observations: null
        });
        timedQuery.callIt({
            Observations: [{
                data: "I am another observation!",
                Observation_phenomenonTime: (date2 = new Date())
            }]
        });

    });

    it("should indicate that a query should be retrieved after interval", () => {
        //"refresh"
        let first;
        timedQuery.registerIfNeeded(first = new Date());

        let callTime0 = new Date();
        let callTime1 = new Date();
        let temp;
        let count = 0;
        while (!(timedQuery.registerIfNeeded(temp = new Date()))) {
            callTime0 = callTime1;
            callTime1 = temp;
            count++;
        }
        callTime0 = callTime1;
        callTime1 = temp;
        expect(callTime0.getTime() - first.getTime() <= timedQuery.interval && callTime1.getTime() - first.getTime() > timedQuery.interval).to.be.true;
    });

    it("should return the parameter map passed on creation", () => {
        expect(getTimedQuery().getParameterMap()).to.deep.equal(new GaugeWidgetData("test").getParameterMap());
    });

    it("should get the Observation start right", () => {

        timedQuery.onlyLatest = true;
        if (timedQuery.getObsStart() != false) {
            expect(true).to.be.false;
        }

        timedQuery = getTimedQuery();
        timedQuery.obsRel = false;
        if (new Date(2016, 11, 13, 12, 0).getTime() - timedQuery.getObsStart().getTime() > 1) {
            expect(true).to.be.false;
        }

        let delta;
        timedQuery = getTimedQuery();
        timedQuery.callback = () => {
            if ((delta = new Date().getTime() - timedQuery.getObsStart().getTime()) > 100) {
                expect(true).to.be.false;
            }
        };
        timedQuery.callIt({Observations: [{Observation_phenomenonTime: new Date()}]});

        timedQuery = getTimedQuery();
        if (Math.abs(timedQuery.getObsStart() - new Date().getTime() + timedQuery.obsSize) > 100) {
            expect(true).to.be.false;
        }


    });
});