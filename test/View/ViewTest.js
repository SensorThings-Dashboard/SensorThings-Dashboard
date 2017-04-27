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
    View
} from '../../src/View/View.js';

/**
 * The following test tests every feature of the view
 * @param string
 *      The displayed name of this test suite
 */
describe("View", () => {
    var view;
    Jsdom();

    // first initialization of view
    before(function (done) {
        global.$ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        window.iotBaseDir = process.cwd().split("\\").join("/") + "/public/";
        require("gridstack");
        $("body").html('<div id="iot-db"></div>');
        view = new View("test", false, false, false, false, false, "en", null);
        //view might have been set up before
        view._setUpLanguage("en");
        let fs = require("fs");
        let html = fs.readFileSync(window.iotBaseDir + "iotwebdashboard.html").toString().replace(new RegExp("\n|\r", "g"), "");
        $("#iot-db").html(html);
        done();
    });


    it('View should be a Singleton', function (done) {
        var view1 = new View("test", false, false, false, false, false, () => {
        });
        var view2 = new View("test", false, false, false, false, false, () => {
        });

        expect(view1).to.eql(view2);
        done();
    });

    //Loading default language pack works correctly
    it('Loading language pack', function (done) {
        let view = new View();
        view._setUpLanguage("en");
        expect(window.iotlg.headerAddNew).to.eql("Add Widget");
        done();
    });

    //Missing translations in provided language pack are filled in with english translations
    it('filling up language pack with missing translations', function (done) {
        let view = new View();
        window["test"] = {
            "headerconf": "testtest"
        };
        view._setUpLanguage("test");
        expect(window["test"].headerAddNew).to.eql("Add Widget");
        done();
    });

    /**
     * Test to add an element
     * @param string
     *      Name of the this test
     */
    it('should initialize the dashboard with no errors', function (done) {
        //gridstack is not supported here
        view._initializeDashboard();
        done();
    });

    /**
     * Test to add an element
     * @param string
     *      Name of the this test
     */
    it('should show the Add Widget menu on click on the button', function (done) {
        view._initializeDashboard();
        //items are loaded asynchronously, so for the test we load them once more
        view._loadDropdownItems();
        $("#addwidget_dropdown").click();
        if ($(".dropdown-menu").css("display") == "none") {
            //failed
            expect(true).to.be.false;
        }
        expect($(".dropdown-menu").children().length).to.equal(view._getWidgetTypes().length);
        done();
    });

    it('should set up another language than English', function (done) {
        view._setUpLanguage("de");
        //expect(window.iotlg.headerConf).to.equal("Konfigurieren");
        done();
    });

});