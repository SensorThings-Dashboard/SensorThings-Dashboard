import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import {
    PlainDataWidgetData
} from '../../../../../src/DataModel/Config/WidgetData/DataWidgetData/PlainDataWidgetData.js';
import Jsdom from 'mocha-jsdom';
import Chai, {
    expect
} from 'chai';

describe("PlainDataWidgetData", (done) => {
    it("should call data callback when new data arrives", () => {
        let plainDataWidgetData = new PlainDataWidgetData("test");
        let callback = (data) => {
            //make sure that test ends only for non-empty data
            if (data.Observations && data.Observations.length > 0) {
                done();
            }
        };

        plainDataWidgetData.registerViewCallback(() => {
        }, callback);
        plainDataWidgetData.newData({
            Observations: [
                {result: "Yay!"}
            ]
        });

    });

    it("should save size and position correctly", () => {
        let plainDataWidgetData = new PlainDataWidgetData("test");
        plainDataWidgetData.setPosition({x: 1, y: 2});
        plainDataWidgetData.setSize({width: 3, height: 4});
        let position = plainDataWidgetData.getPosition();
        let size = plainDataWidgetData.getSize();

        expect([position.x, position.y, size.width, size.height].join("")).to.equal("1234");
    });

    it("should provide a complete parameter map", () => {
       let plainDataWidgetData = new PlainDataWidgetData("test");
       let params = plainDataWidgetData.getParameterMap();
       expect(Object.keys(params).length).to.be.greaterThan(30);
    });
});