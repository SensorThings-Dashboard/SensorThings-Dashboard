import Mocha, {
    describe,
    it,
    before
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import Jsdom from 'mocha-jsdom';
import {
    STParser
} from '../../src/SensorThingsCommunication/STParser.js';
import {
    SensorThingsCommunication
} from '../../src/SensorThingsCommunication/SensorThingsCommunications.js';
describe("STParser", () => {
    let stParser = null;
    Jsdom();

    let getParameterMap = () => ({
        "@iot.id": "id",
        name: "name",
        description: "description",
        observationType: "observationType",
        unitOfMeasurement: {name: "Hectopascal", symbol: "hPa", definition: "definition"},
        observedArea: "observedArea",
        phenomenonTime: new Date(0),
        resultTime: new Date(0),
        Observations: [
            {
                "@iot.id": "id",
                phenomenonTime: "phenomenonType",
                resultTime: "resultTime",
                validTime: "validTime",
                result: "result",
                resultQuality: "resultQuality",
                parameters: "parameters",
                FeatureOfInterest: {
                    name: "name",
                    description: "description",
                    encodingType: "encodingType",
                    feature: "feature"
                }
            }
        ],
        ObservedProperty: {
            name: "name",
            description: "description",
            definition: "definition"
        },
        Sensor: {
            name: "name",
            description: "description",
            encodingType: "encodingType",
            metadata: "metadata"
        },
        Thing: {
            name: "name",
            description: "description",
            properties: "properties",
            HistoricalLocations: "HistoricalLocations",
            Locations: [
                {
                    "@iot.id": "id", name: "name", description: "description",
                    encodingType: "encodingType", location: "location"
                }
            ]
        }
    });

    let getResponse = () => {
        return {
            "@iot.id": 100149,
            "@iot.selfLink":
                "http://mystserver.com/v1.0/Datastreams(100149)",
            "@iot.nextLink":
                "http://mystserver.com/v1.0/Datastreams(100150)",
            Observations: [
                {
                    "@iot.id": "id",
                    "@iot.selfLink": "http://mystserver.com/v1.0/Observations(601442)",

                    "Datastream@iot.navigationLink": "http://mystserver.com/v1.0/Observations(601442)/Datastream",
                    "FeatureOfInterest@iot.navigationLink": "http://mystserver.com/v1.0/Observations(601442)/FeatureOfInterest",
                    phenomenonTime: "2016-11-23T10:43:58.442Z",
                    result: "12483",
                    resultTime: null,
                    phenomenonTime: "phenomenonType",
                    resultTime: "resultTime",

                    "ObservedProperty@iot.navigationLink": "http://mystserver.com/v1.0/Datastreams(100149)/ObservedProperty",
                    "Sensor@iot.navigationLink": "http://mystserver.com/v1.0/Datastreams(100149)/Sensor",
                    "Thing@iot.navigationLink": "http://mystserver.com/v1.0/Datastreams(100149)/Thing",
                    description: "My Datastream",
                    name: "NA",
                    observationType: "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement"
                }
            ]
        }

    };

    before(() => {
        stParser = new STParser();
    });

    it("should be Singleton", () => {
        expect(stParser).to.equal(new STParser());
    });

    it("should join two Arrays correctly", () => {
        let a1 = [1, 2, 3];
        let a2 = [4, 5, 6];
        let a = stParser._joinObjectOrArray(a1, a2);
        expect(a.join("")).to.equal("123456");
    });

    it("should extract parameters correctly", () => {
        let response = getParameterMap();
        stParser._rewriteParams(response, (data) => {
            expect(data.Thing_description).to.equal("description");
        });
    });

    it("should create selectors correctly - expand everything", () => {
        stParser._rewriteParams(getParameterMap(), (data) => {
            data.Observation_phenomenonTime = new Date(100);
            data.FeatureOfInterest_name = "FOI";
            data.Thing_Location_name = "Home";
            let selector = stParser.createSelectors(data, true, new Date(0), new Date(1000000));
            expect(selector).to.equal("&$top=1000&$expand=Observations($top=1000;$orderby=phenomenonTime desc;$filter=phenomenonTime gt 1970-01-01T00:00:00.000Z and phenomenonTime lt 1970-01-01T00:16:40.000Z;$expand=FeatureOfInterest($top=1000)),ObservedProperty($top=1000),Sensor($top=1000),Thing($top=1000;$expand=HistoricalLocations($top=1000;$expand=Locations($top=1000)),Locations($top=1000))");
        });
    });

    it("should retrieve additional pages without errors for empty answers", () => {
        let callback = (data) => {
           expect(data).to.deep.equal(getResponse());
        };
        stParser.retrieveAdditionalPages(getResponse(), callback);
    });
});