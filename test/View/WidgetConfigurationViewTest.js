import Mocha, {
    describe,
    it,
    before,
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import Jsdom from 'mocha-jsdom';
import {
    WidgetConfigurationView
} from '../../src/View/WidgetConfigurationView.js';
import {
    PlainDataWidgetData
} from '../../src/DataModel/Config/WidgetData/DataWidgetData/PlainDataWidgetData';
import {
    View
} from '../../src/View/View.js';
describe("WidgetConfigurationView", () => {
    let _widgetConfigurationView;
    Jsdom();

    let getDummyWidgetData = (id, confData) => {
        if (!confData.title) {
            console.log("confData must contain title object.");
            return;
        }
        let wd = {
            _id: id,
            _configurableData: confData,

        };
        wd.getID = () => wd._id;
        wd.getConfigurableData = () => wd._configurableData;

        return wd;
    };

    let loadHTML = () => {
        $("body").html(
            '<div id="configureWidget" class="conf-popup"> ' +
            '<div class="conf-content"> ' +
            '<div class="conf-header"> ' +
            '<span id="widget_conf_title" class="conf-title">Configure $TITLE</span> ' +
            '<span id="widget_conf_close" class="conf-close close">&times;</span> ' +
            '</div> ' +
            '<div id="widget_conf_inner" class="conf-inner"> ' +
            '<table class="table table-striped"> ' +
            '<tbody id="widget_conf_table" class="conf-table"> </tbody> ' +
            '</table> ' +
            '</div> ' +
            '<div class="conf-footer"> ' +
            '<button id="widget_conf_save" accesskey="a" type="button" class="btn btn-primary conf-btn-save">Apply </button> ' +
            '</div> ' +
            '</div> ' +
            '</div>');
    };

    before(() => {
        //needed for inserting tooltips
        global.printAJAXerrors = false;
        let _view = new View("testView", false, false, false, "en");
        _view._setUpLanguage();

        loadHTML();
        let wd = getDummyWidgetData("test", {
            title: {
                data: "title",
                type: TYPE_STRING
            }
        });
        _widgetConfigurationView = new WidgetConfigurationView(wd);
    });

    /**
     * Tests whether an addition with no carry is successful
     */
    it("should add minutes to Dates correctly - Simple test", () => {
        expect(_widgetConfigurationView._configTableRowFactory._dateAddMinutes(new Date(0), 43)).to.eql(new Date(1970, 0, 1, 1, 43));
    });

    /**
     * Tests whether the addition of one year, one month, one day, one hour and one minute is successful.
     */
    it("should add minutes to Dates correctly - Carry test", () => {
        expect(_widgetConfigurationView._configTableRowFactory._dateAddMinutes(new Date(0), (365 + 31 + 1) * 24 * 60 + 61)).to.eql(new Date(1971, 1, 2, 2, 1));
    });

    /**
     * Tests whether a table with four rows is created given a configurableData-Object with four attributes.
     */
    it("should display the same amount of rows as there are configurable attributes", () => {
        //close popup again before inserting new widgetData
        _widgetConfigurationView._toggleView(null);

        let wd = getDummyWidgetData("test", {
            a: {
                data: "a",
                type: TYPE_STRING
            },
            b: {
                data: [{
                    data: 1,
                    type: TYPE_INTEGER
                }, {
                    data: 2,
                    type: TYPE_INTEGER
                }, {
                    data: 3,
                    type: TYPE_INTEGER
                }],
                type: TYPE_ARRAY
            },
            c: {
                data: {
                    attr1: {
                        data: true,
                        type: TYPE_BOOLEAN
                    },
                    attr2: {
                        data: false,
                        type: TYPE_BOOLEAN
                    },
                    attr3: {
                        data: true,
                        type: TYPE_BOOLEAN
                    }
                },
                type: TYPE_OBJECT
            },
            title: {
                data: "title",
                type: TYPE_STRING
            }
        });
        _widgetConfigurationView = new WidgetConfigurationView(wd);

        //expect row for a, b, c, and title.
        expect($("#widget_conf_table").children().length).to.equal(4);
    });

    /**
     * Tests whether a table with four rows is created given a configurableData-Object with four attributes.
     */
    it("should return an exact copy of the given configurableData object when nothing changes", () => {
        //close popup again before inserting new widgetData
        _widgetConfigurationView._toggleView(null);

        let confData = {
            a: {
                data: "valA",
                type: TYPE_STRING
            },
            b: {
                data: [{
                    data: 1,
                    type: TYPE_INTEGER
                }, {
                    data: 2,
                    type: TYPE_INTEGER
                }, {
                    data: 3,
                    type: TYPE_INTEGER
                }],
                type: TYPE_ARRAY
            },
            c: {
                data: {
                    attr1: {
                        data: true,
                        type: TYPE_BOOLEAN
                    },
                    attr2: {
                        data: false,
                        type: TYPE_BOOLEAN
                    },
                    attr3: {
                        data: true,
                        type: TYPE_BOOLEAN
                    }
                },
                type: TYPE_OBJECT
            },
            title: {
                data: "title",
                type: TYPE_STRING
            }
        };
        let wd = getDummyWidgetData("test", confData);
        _widgetConfigurationView = new WidgetConfigurationView(wd);

        //set attribute widgetConfigurableData
        _widgetConfigurationView._createConfigurableData();
        expect(_widgetConfigurationView.widgetConfigurableData).to.deep.equal(confData);
    });

    /**
     * Tests whether a table with four rows is created given a configurableData-Object with four attributes.
     */
    it("should return the correct configurableData object after modifications - all types simple", () => {
        //close popup again before inserting new widgetData
        _widgetConfigurationView._toggleView(null);

        let confData = {
            a: {
                data: "valA",
                type: TYPE_STRING
            },
            b: {
                data: [{
                    data: 1,
                    type: TYPE_INTEGER
                }, {
                    data: 2,
                    type: TYPE_INTEGER
                }, {
                    data: 3,
                    type: TYPE_INTEGER
                }],
                type: TYPE_ARRAY
            },
            c: {
                data: {
                    attr1: {
                        data: true,
                        type: TYPE_BOOLEAN
                    },
                    attr2: {
                        data: false,
                        type: TYPE_BOOLEAN
                    },
                    attr3: {
                        data: true,
                        type: TYPE_BOOLEAN
                    }
                },
                type: TYPE_OBJECT
            },
            title: {
                data: "title",
                type: TYPE_STRING
            }
        };
        let wd = getDummyWidgetData("test", confData);
        _widgetConfigurationView = new WidgetConfigurationView(wd);

        //modify table
        let setAttr = (val, attr, key) => {
            $("#" + attr + "-test-config" + (key !== undefined ? "-" + key : "")).val(val);
            if (typeof val === "boolean") {
                $("#" + attr + "-test-config" + (key ? "-" + key : "")).attr("checked", val);
            }
        };
        setAttr("modTitle", "title");
        setAttr("modValA", "a");
        setAttr(-1, "b", 0);
        setAttr(-2, "b", 1);
        setAttr(-3, "b", 2);
        setAttr(false, "c", "attr1");
        setAttr(true, "c", "attr2");
        setAttr(false, "c", "attr3");

        let expectData = {
            a: {
                data: "modValA",
                type: TYPE_STRING
            },
            b: {
                data: [{
                        data: -1,
                        type: TYPE_INTEGER,
                        options: null
                    },
                    {
                        data: -2,
                        type: TYPE_INTEGER,
                        options: null
                    },
                    {
                        data: -3,
                        type: TYPE_INTEGER,
                        options: null
                    }
                ],
                type: TYPE_ARRAY
            },
            c: {
                data: {
                    attr1: {
                        data: false,
                        type: TYPE_BOOLEAN,
                        options: null
                    },
                    attr2: {
                        data: true,
                        type: TYPE_BOOLEAN,
                        options: null
                    },
                    attr3: {
                        data: false,
                        type: TYPE_BOOLEAN,
                        options: null
                    }
                },
                type: TYPE_OBJECT
            },
            title: {
                data: "modTitle",
                type: TYPE_STRING
            }
        };

        //set attribute widgetConfigurableData
        _widgetConfigurationView._createConfigurableData();
        expect(_widgetConfigurationView.widgetConfigurableData).to.deep.equal(expectData);
    });

    /**
     * Tests whether a table with four rows is created given a configurableData-Object with four attributes.
     */
    it("should return the correct configurableData object after modifications - all types in a tree", () => {
        _widgetConfigurationView._toggleView(null);

        let confData = {
            obj: {
                type: TYPE_OBJECT,
                data: {
                    //array in object
                    arr: {
                        data: [
                            //simple in array
                            {
                                data: 25.7,
                                type: TYPE_NUMBER
                            },
                            //array in array
                            {
                                data: [{
                                    data: 25.7,
                                    type: TYPE_NUMBER
                                }],
                                type: TYPE_ARRAY,
                                "options": [null]
                            },
                            //object in array
                            {
                                data: {
                                    simple: {
                                        data: 25.7,
                                        type: TYPE_NUMBER
                                    }
                                },
                                type: TYPE_OBJECT
                            }
                        ],
                        type: TYPE_ARRAY,
                        "options": [null]
                    },
                    //object in object
                    obj: {
                        //simple in object
                        data: {
                            simple: {
                                data: 25.7,
                                type: TYPE_NUMBER
                            }
                        },
                        type: TYPE_OBJECT,
                        options: null
                    }
                }
            },
            title: {
                data: "OneTree",
                type: TYPE_STRING
            }
        };
        let wd = getDummyWidgetData("test", confData);
        _widgetConfigurationView = new WidgetConfigurationView(wd);

        //modify table
        let setAttr = (val, attr, key) => {
            $("#" + attr + "-test-config" + (key !== undefined ? "-" + key : "")).val(val);
            if (typeof val === "boolean") {
                $("#" + attr + "-test-config" + (key ? "-" + key : "")).attr("checked", val);
            }
        };

        let expectTree = {
            obj: {
                type: TYPE_OBJECT,
                data: {
                    //array in object
                    arr: {
                        data: [
                            //simple in array
                            {
                                data: -25.0,
                                type: TYPE_NUMBER,
                                options: null
                            },
                            //array in array
                            {
                                data: [{
                                    data: -25.1,
                                    type: TYPE_NUMBER,
                                    options: null
                                }],
                                type: TYPE_ARRAY,
                                options: null
                            },
                            //object in array
                            {
                                data: {
                                    simple: {
                                        data: -25.2,
                                        type: TYPE_NUMBER,
                                        options: null
                                    }
                                },
                                type: TYPE_OBJECT,
                                options: null
                            }
                        ],
                        type: TYPE_ARRAY,
                        options: null
                    },
                    //object in object
                    obj: {
                        //simple in object
                        data: {
                            simple: {
                                data: -25.3,
                                type: TYPE_NUMBER,
                                options: null
                            }
                        },
                        type: TYPE_OBJECT,
                        options: null
                    }
                }
            },
            title: {
                data: "ModOneTree",
                type: TYPE_STRING
            }
        };

        setAttr("ModOneTree", "title");
        setAttr(-25.0, "obj", "arr-0");
        setAttr(-25.1, "obj", "arr-1-0");
        setAttr(-25.2, "obj", "arr-2-simple");
        setAttr(-25.3, "obj", "obj-simple");
        //set attribute widgetConfigurableData
        _widgetConfigurationView._createConfigurableData();
        expect(_widgetConfigurationView.widgetConfigurableData).to.be.deep.equal(expectTree);
    });

    it("should save the configuration and close the View via saveExit()", () => {
        let plainTextWidgetData = new PlainDataWidgetData("test");
        _widgetConfigurationView = new WidgetConfigurationView(plainTextWidgetData);
        let data = plainTextWidgetData.configurableData;
        _widgetConfigurationView._toggleView(data);
        _widgetConfigurationView._saveExit();
        if ($("div.conf-popup#configureWidget").hasClass("open")) {
            //failed: WidgetConfigurationView still open
            expect(true).to.be.false;
        }
        expect(plainTextWidgetData.configurableData).to.deep.equal(data);
    });
});