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
    View
} from '../../src/View/View.js';
import {
    UserConfigurationView
} from '../../src/View/UserConfigurationView.js';
import {
    UserConfig
} from '../../src/DataModel/Config/UserConfig';
describe("DashboardConfig Popup Menu", () => {
    let _view = null;
    let _userConfigurationView = null;
    Jsdom();

    let loadConfig = () => {
        $("body").append('<div id="configure" class="conf-popup"> ' +
            '<div class="conf-content resizable"> ' +
            '<div class="conf-header">' +
            ' <span id="conf_title" class="conf-title">Configure $TITLE</span>' +
            ' <span id="conf_close" class="conf-close close">&times;</span> </div> <div class="conf-inner"> ' +
            '<table> <tbody> <tr> ' +
            '<td><span class="conf-label">Titel: </span>' +
            '</td> <td><input class="conf-input" id="conf-input-title" type="text"></td> </tr> ' +
            '<tr> <td><span class="conf-label">Server List: </span></td> ' +
            '<td> <table> <tbody class="conf-server-table"> <!-- Servers are inserted by View --> </tbody> </table> </td> </tr></tbody> </table> </div> ' +
            '<div class="conf-footer"> ' +
            '<button id="conf_save" type="button" class="btn btn-primary conf-btn-save">Apply</button> ' +
            '<button id="conf_upload" type="button" class="btn btn-primary conf-btn-save">Upload Config</button> ' +
            '<button id="conf_download" type="button" class="btn btn-primary conf-btn-save">Download Config</button> ' +
            '<button id="conf_import" type="button" class="btn btn-primary conf-btn-save">Import Config from CMS</button> ' +
            '<button id="conf_export" type="button" class="btn btn-primary conf-btn-save">Export Config to CMS</button> ' +
            '<a id="downloadAnchorElem" style="display:none"></a> </div> </div> </div>');
    };

    /**
     * Set up libraries
     */
    before(() => {
        global.$ = global.jQuery = require('jquery');
        global.L = require('leaflet');
        _view = new View("test", false, false, false, "en");
        _view._setUpLanguage(); //needed for test
        _userConfigurationView = new UserConfigurationView();

    });

    /**
     * Reset document
     */
    beforeEach(() => {
        $("body").html("");
        loadConfig();
    });

    /**
     * Tests whether the popup is opened with the correct method.
     */
    it("should open the Popup", () => {
        _userConfigurationView._toggleConfigure();
        expect($("div.conf-popup#configure").css("display")).to.not.eql("none");
    });

    /**
     * Tests whether the elements of the DashboardConfig are put into the popup accordingly
     */
    it("should display the correct current entries for each attribute", () => {
        let confData = new UserConfig();

        //Set up entries to be shown in popup
        confData.dashboardConfig.setTitle("TestConfig Title");
        let serverList = [{
                name: "TestServer1",
                url: "http://testserver1.com/"
            },
            {
                name: "TestServer2",
                url: "http://testserver2.com/"
            }
        ];
        confData.dashboardConfig.setServerList(serverList);

        _userConfigurationView._toggleConfigure();

        //Read entries back from popup
        let serverListEntries = [];
        let servers = $(".conf-server-table tr");
        servers.each(
            index => {
                serverListEntries.push({
                    name: servers[index].childNodes[0].innerHTML,
                    url: servers[index].childNodes[1].innerHTML
                })
            });
        // Remove invalid entry for the last row
        serverListEntries.pop();

        let entryStructure = {
            title: $("#conf-input-title").val(),
            servers: serverListEntries
        };

        //Compare entries
        expect(entryStructure).to.deep.equal({
            title: "TestConfig Title",
            servers: serverList
        });
    });

    /**
     * Tests whether a new DashboardConfig can be written back to the UserConfig correctly.
     */
    it("should save new entries back into config correctly", () => {
        _userConfigurationView._toggleConfigure();

        //Set title
        $("#conf-input-title").val("This is a test");

        //Remove standard servers
        $(".tr-delete").click();

        //Add new servers
        $("#conf-server-name").val("myServer");
        $("#conf-server-url").val("http://myServer.com");
        _userConfigurationView._addServer();

        $("#conf-server-name").val("myOtherServer");
        $("#conf-server-url").val("http://myOtherServer.com");
        _userConfigurationView._addServer();

        //Save
        _userConfigurationView._saveConfig();

        let inputStructure = {
            title: "This is a test",
            serverList: [{
                name: "myOtherServer",
                url: "http://myOtherServer.com"
            }, {
                name: "myServer",
                url: "http://myServer.com"
            }]
        };

        let confData = new UserConfig().dashboardConfig;
        expect(inputStructure).to.deep.equal({
            title: confData.getTitle(),
            serverList: confData.getServerList()
        });
    });
});