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
import {DataQueryObserverProxy} from '../../src/DataObserver/DataQueryObserverProxy.js';
import {LineGraphWidgetData} from '../../src/DataModel/Config/WidgetData/DataWidgetData/LineGraphWidgetData.js';
describe("DataQueryObserverProxy", () => {

    it("should update itself right", () => {
        let dataQueryObserverProxy = new DataQueryObserverProxy();
        let lineGraphWidgetData = new LineGraphWidgetData("test");
        dataQueryObserverProxy.update(true, false, lineGraphWidgetData);

        expect(lineGraphWidgetData.getQueryIDs().length == 1).to.be.true;
    });

    it("should update itself right - mqtt", () => {
        Jsdom();
        //mock object
        global.mqtt = {
            connect: () => ({
                on: () => {
                },
                subscribe: () => {
                }
            })

        };

        let dataQueryObserverProxy = new DataQueryObserverProxy();
        let lineGraphWidgetData = new LineGraphWidgetData("test");
        lineGraphWidgetData.configurableData.sensorThingsConfiguration.data[0].data.mqttEnabled.data = true;
        dataQueryObserverProxy.update(true, false, lineGraphWidgetData);

        expect(lineGraphWidgetData.getQueryIDs().length == 1).to.be.true;
    });

});