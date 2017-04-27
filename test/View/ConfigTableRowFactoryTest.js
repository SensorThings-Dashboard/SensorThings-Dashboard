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
    ConfigTableRowFactory
} from '../../src/View/ConfigTableRowFactory.js';
import {
    View
} from '../../src/View/View.js';
import {
    Search
} from '../../src/Search/Search.js';
describe("ConfigTableRowFactory", () => {
    "use strict";

    let configTableRowFactory = null;
    Jsdom();

    before(() => {
        global.$ = global.jQuery = require('jquery');
        configTableRowFactory = new ConfigTableRowFactory();
        new View("test")._setUpLanguage("en");
    });

    it("should be Singleton", () => {
        expect(new ConfigTableRowFactory()).to.equal(configTableRowFactory);
    });

    it("should create ConfigTableRows of type Color", () => {
        let key = "backgroundColor";
        let htmlId = "testId";
        let value = "#123456";
        let inner = '<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="color"><input class="widget-config-input" type="color" value="#123456" id="' + htmlId + '"></td>';
        let row = configTableRowFactory.create(key, {
            type: TYPE_COLOR,
            data: value
        }, htmlId);
        expect(row.html()).to.equal(inner);
    });

    it("should create ConfigTableRows of type Date", () => {
        let key = "startTime";
        let htmlId = "testId";
        let value = new Date(2017, 5, 4, 13, 0, 0);
        let inner = '<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="date"><input class="widget-config-input" type="datetime-local" value="' + configTableRowFactory._dateAddMinutes(value, (-1) * new Date().getTimezoneOffset()).toISOString().substring(0, value.toISOString().length - 2) + '" id="' + htmlId + '"></td>';
        let row = configTableRowFactory.create(key, {
            type: TYPE_DATE,
            data: value
        }, htmlId);
        expect(row.html()).to.equal(inner);
    });

    it("should handle adding elements to ConfigTableRows of type Array", () => {
        let key = "lineColors";
        let htmlId = "testId";
        let data = {
            data: [{
                data: {
                    lineColor: {
                        data: "#123456",
                        type: TYPE_COLOR
                    }
                },
                type: TYPE_OBJECT
            }],
            type: TYPE_ARRAY
        };
        let row = configTableRowFactory.create(key, data, htmlId);
        $("body").html(row);
        $(".add-entry-button").click();
        expect($(".widget-config-array-table").children().length).to.equal(2);
    });

    it("should handle deleting elements from ConfigTableRows of type Array", () => {
        let key = "lineColors";
        let htmlId = "testId";
        let data = {
            data: [{
                data: {
                    lineColor: {
                        data: "#123456",
                        type: TYPE_COLOR
                    }
                },
                type: TYPE_OBJECT
            }],
            type: TYPE_ARRAY
        };
        let row = configTableRowFactory.create(key, data, htmlId);
        $("body").html(row);
        $(".add-entry-button").click();
        $(".tr-delete").click();
        expect($(".widget-config-array-table").children().length).to.equal(1);
    });

    it("should handle trials to delete the last element from ConfigTableRows of type Array", () => {
        let key = "lineColors";
        let htmlId = "testId";
        let data = {
            data: [{
                data: {
                    lineColor: {
                        data: "#123456",
                        type: TYPE_COLOR
                    }
                },
                type: TYPE_OBJECT
            }],
            type: TYPE_ARRAY
        };
        let row = configTableRowFactory.create(key, data, htmlId);
        $("body").html(row);
        $(".tr-delete").click();
        expect($(".widget-config-array-table").children().length).to.equal(1);
    });

    it("should create ConfigTableRows of type Dropdown", () => {
        let key = "timeIntervalUnit";
        let htmlId = "testId";
        let value = "option2";
        let options = ["option0", "option1", "option2", "option3"];
        let optionsText = '<option value="option0">0</option><option value="option1">1</option><option' +
            ' value="option2" selected="">2</option><option value="option3">3</option>';
        let inner = '<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="dropdown"><select class="widget-config-input" id="' + htmlId + '">' + optionsText + '</select></td>';
        let row = configTableRowFactory.create(key, {
            type: TYPE_DROPDOWN,
            data: value,
            options: options
        }, htmlId);
        expect(row.html()).to.equal(inner);
    });

    it("should create ConfigTableRows of type Simple", () => {
        let key = "timeIntervalUnit";
        let htmlId = "testId";
        let value = "myValue";
        let type = "CustomType";
        let inner = '<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="simple"><input class="widget-config-input" type="' + type + '" value="' + value + '" id="' + htmlId + '"></td>';
        let row = configTableRowFactory.create(key, {
            type: type,
            data: value
        }, htmlId);
        expect(row.html()).to.equal(inner);
    });

    it("should create ConfigTableRows of type FSSearch", () => {
        let key = "dataStreamUrl";
        let htmlId = "testId";
        let value = "http://mySTServer.com/Datastream(1)";
        let row = configTableRowFactory.create(key, {
            data: value,
            type: TYPE_FUZZY_SENSOR_SEARCH
        }, htmlId);
        let inner = '<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' +
            key +
            '</td>' +
            '<td class="widget-config-data" input_fmt="fssearch">' +
            '<table class="fssearchTable">' +
            '<tbody class="fssearchTBody">' +
            '<tr>' +
            '<td class="well">' +
            '<div class="url-box-wrapper" style="white-space: nowrap"><label class="search-box-label">' +
            ' URL:' +
            '</label>' +
            '<input class="urlBox form-control" type="url" name="url" placeholder="plain URL to' +
            ' datastream"' +
            ' value="' + value + '">' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '<tr class="searchFormTableRow">' +
            '<td class="well">' +
            '<div class="url-box-wrapper">' +
            '<label class="search-box-label">Search:</label>' +
            '<input type="search" class="searcher form-control" value="" placeholder="search datastreams for URL">' + '</div>' +
            '<div class="list search-result-list">' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '</td>';
        expect(row.html()).to.equal(inner);
    });



    it("should handle searching datastreams - find datastreams by all properties", () => {
        let key = "dataStreamUrl";
        let htmlId = "testId";
        let value = "";
        let row = configTableRowFactory.create(key, {
            data: value,
            type: TYPE_FUZZY_SENSOR_SEARCH
        }, htmlId);
        $("body").html(row);

        let search = new Search();
        configTableRowFactory._dataStreamList = [];
        //find me via name
        configTableRowFactory._dataStreamList.push(createDummyDatastream("1", "", {
            symbol: "",
            name: ""
        }));
        //find me via description
        configTableRowFactory._dataStreamList.push(createDummyDatastream("2", "B", {
            symbol: "",
            name: ""
        }));
        //find me via unit symbol
        configTableRowFactory._dataStreamList.push(createDummyDatastream("3", "", {
            symbol: "C",
            name: ""
        }));
        //find me via unit name
        configTableRowFactory._dataStreamList.push(createDummyDatastream("4", "", {
            symbol: "",
            name: "D"
        }));

        let result = "";
        let strings = ["1", "b", "c", "d"];
        for (let i in strings) {
            $(".searcher").val(strings[i]);
            $(".searcher").keyup();
            if ($(".search-result-list").children().length != 1 || $(".search-result-list").children()[0].childElementCount != 1) {
                //failed
                expect(true).equal(false);
            }
            let resBox = $(".search-result-list").children()[0].childNodes[0];
            result += $(resBox).find(".label").text();
        }
        expect(result).to.equal("1234");

    });

    it("should handle searching datastreams - find multiple datastreams", () => {
        let key = "dataStreamUrl";
        let htmlId = "testId";
        let value = "";
        let row = configTableRowFactory.create(key, {
            data: value,
            type: TYPE_FUZZY_SENSOR_SEARCH
        }, htmlId);
        $("body").html(row);

        let search = new Search();
        configTableRowFactory._dataStreamList = [];
        //find me via name
        configTableRowFactory._dataStreamList.push(createDummyDatastream("1 ", "", {
            symbol: "",
            name: "",
            definition: ""
        }));
        //find me via description
        configTableRowFactory._dataStreamList.push(createDummyDatastream("2", "B ", {
            symbol: "",
            name: "",
            definition: ""
        }));
        //find me via unit symbol
        configTableRowFactory._dataStreamList.push(createDummyDatastream("3", "", {
            symbol: "C ",
            name: "",
            definition: ""
        }));
        //find me via unit name
        configTableRowFactory._dataStreamList.push(createDummyDatastream("4", "", {
            symbol: "",
            name: "D ",
            definition: ""
        }));

        let result = "";

        $(".searcher").val(" ");
        $(".searcher").keyup();
        if ($(".search-result-list").children().length != 1 || $(".search-result-list").children()[0].childElementCount != 4) {
            //failed
            expect(true).equal(false);
        }

        //Concatenate datastream names of all found datastreams
        let results = $(".search-result-list").children()[0].childNodes;
        results.forEach(el => {
            result += $(el.childNodes[0]).find(".label").text();
        });


        expect(result).to.equal("1 234");

    });

    it("should handle searching datastreams - no result", () => {
        let key = "dataStreamUrl";
        let htmlId = "testId";
        let value = "";
        let row = configTableRowFactory.create(key, {
            data: value,
            type: TYPE_FUZZY_SENSOR_SEARCH
        }, htmlId);
        $("body").html(row);

        configTableRowFactory._dataStreamList = [];
        let result = "";

        $(".searcher").val(" ");
        $(".searcher").keyup();

        //Concatenate datastream names of all found datastreams
        let results = $(".search-result-list").children()[0].childNodes;
        expect($(results[0].childNodes[0]).find(".label").text()).to.equal("no Results");

    });

    it("should create handle the selected search result", () => {
        let key = "dataStreamUrl";
        let htmlId = "testId";
        let value = "";
        let row = configTableRowFactory.create(key, {
            data: value,
            type: TYPE_FUZZY_SENSOR_SEARCH
        }, htmlId);
        $("body").html(row);

        let dataStream = createDummyDatastream("My temperature", "Measures my temperature", {
            symbol: "°C",
            name: "Degrees Celsius",
            definition: "See Wikipedia",
        });
        dataStream["@iot.selfLink"] = "http://mySTServer.com/Datastreams(1)";
        dataStream["@iot.id"] = 1;
        dataStream["server-id"] = 0;

        configTableRowFactory._dataStreamList = [];
        configTableRowFactory._dataStreamList.push(dataStream);
        let result = "";

        $(".searcher").val("°C");
        $(".searcher").keyup();

        $(".serverSelector").click();
        expect($(".urlBox").val()).to.equal(dataStream["@iot.selfLink"]);
    });

    let createDummyDatastream = (name, description, unit) => {
        return {
            name: name,
            description: description,
            unitOfMeasurement: unit,
            observationType: "",
            phenomenonTime: new Date(0).toISOString()

        }
    };
});