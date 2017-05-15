import {
    View
} from './View.js';
import {
    UserEvents
} from '../UserEvents/UserEvents.js';

let _userConfigurationView = null;
let _view = null;
let _userEvents = null;

export class UserConfigurationView {

    constructor() {
        if (!_userConfigurationView) {
            _userConfigurationView = this;
            _view = new View();
            _userEvents = new UserEvents();
            //flag for allowing export/download of configuration or not
            this.modified = false;
        }
        return _userConfigurationView;
    }


    /**
     * Creates a row for the server table inside the Dashboard Configuration.
     * @param server Server information to be inserted into new row.
     * @private
     */
    _getServerTableRowDummy(server) {
        let tr = document.createElement("TR");
        tr.innerHTML = "<td>" + server.name + "</td><td>" + server.url + "</td><td><span class='tr-delete close' style='font-size: large'/>x</td>";
        tr.querySelector(".tr-delete").onclick = e => _userConfigurationView._removeServer(e);
        return tr;
    }

    /**
     * Creates the last row for the the server table inside the Dashboard Configuration, where another server can be added.
     * @private
     */
    _getServerTableAddRow() {
        let tr = document.createElement("TR");
        tr.innerHTML = "<td><input id='conf-server-name'></td><td><input id='conf-server-url'></td><td><button" +
            " class='btn btn-success conf-btn-add-server'>" + window.iotlg.addButton + "</button></td>";
        return tr;
    }

    /**
     * Toggles the visibility of the configuration dialog.
     * @private
     */
    _toggleConfigure() {
        let conf = $("div.conf-popup#configure");
        if (conf.hasClass("open")) {
            _userConfigurationView._setModified(false);
            conf.css("animationName", "animateOut");
            window.hideConfig = function() {};
        } else {
            //about to be opened
            let confData = _userEvents.loadUserConfig();
            conf.find("#conf_title").text(window.iotlg.dbConfig + " " + confData.dashboardConfig.getTitle());

            conf.find("#conf-label-title").text(window.iotlg.dbTitle);
            conf.find("#conf-input-title").val(confData.dashboardConfig.getTitle());

            conf.find("#conf-label-servers").text(window.iotlg.serverList);
            let serverTable = conf.find(".conf-server-table");
            serverTable.html("");
            confData.dashboardConfig.getServerList().forEach(server => {
                serverTable.append(_userConfigurationView._getServerTableRowDummy(server));
            });
            serverTable.append(_userConfigurationView._getServerTableAddRow());
            $(".conf-btn-add-server").click(function(e) {
                e.preventDefault();
                return _userConfigurationView._addServer();
            });
            $(".tr-delete.close").click(e => _userConfigurationView._removeServer(e));
            conf.css("animationName", "animateIn");
            window.hideConfig = this._toggleConfigure.bind(this);
        }

        conf.toggleClass("open");
    }

    /**
     * Adds a server to the configuration server list (but not to the DashboardConfig server list).
     * @private
     */
    _addServer() {
        let serverTable = $(".conf-server-table")[0];
        let inputTitle = $("#conf-server-name");
        let inputUrl = $("#conf-server-url");
        if (inputTitle.val() == "" || inputUrl.val() == "") return;
        let server = {
            name: inputTitle.val(),
            url: inputUrl.val()
        };

        inputTitle.val("");
        inputUrl.val("");
        serverTable.insertBefore(_userConfigurationView._getServerTableRowDummy(server, serverTable.childElementCount), serverTable.lastChild);
        _userConfigurationView._setModified(true);
    }

    /**
     * Called on click on a X button at the end of a server row inside the Dashboard Configuration.
     * Removes the server row (but not the server from the config)
     * @param e Click Event
     * @private
     */
    _removeServer(e) {
        let target = e.target;
        target.parentElement.parentElement.remove();
        _userConfigurationView._setModified(true);
    }

    /**
     * Saves the content of the DashboardConfig popup menu and stores the values as the new DashboardConfig.
     * @private
     */
    _saveConfig() {
        let confData = _userEvents.loadUserConfig();

        let title = $("#conf-input-title").val();
        confData.dashboardConfig.setTitle(title);

        let serverList = [];
        let servers = $(".conf-server-table tr");

        servers.each(index => {
            serverList.push({
                name: servers[index].childNodes[0].innerHTML,
                url: servers[index].childNodes[1].innerHTML
            });
        });
        // Remove invalid entry for the last row
        serverList.pop();

        serverList.sort((s1, s2) => {
            if (s1.name != s2.name) return s1.name.localeCompare(s2.name);
            else return s1.url.localeCompare(s2.url);
        });

        confData.dashboardConfig.setServerList(serverList);
        _userConfigurationView._setModified(false);
    }

    /**
     * If modified, disables the buttons for exporting the Configuration.
     * @param modified
     * @private
     */
    _setModified(modified) {
        _userConfigurationView.modified = modified;
    }

    /**
     * Shows a File Selection Dialog and tries to import the selected configuation file.
     * @private
     */
    _importConfig() {
        _userEvents.importConfig();
    }

    /**
     * Downloads the current configuration into the local Downloads directory.
     * @private
     */
    _exportConfig() {
        if (_userConfigurationView.modified) {
            alert(window.iotlg.warningConfigModified);
            return;
        }
        _userEvents.exportConfig();
    }

    /**
     * Invokes the method provided by the user to deal with importing a configuration from the CMS.
     * @private
     */
    _importFromCMS() {
        _userEvents.importFromCMS();
    }

    /**
     * Notifies user events that the user wants to export the config to CMS
     * @private
     */
    _exportToCMS() {
        if (_userConfigurationView.modified) {
            alert(window.iotlg.warningConfigModified);
            return;
        }
        _userEvents.exportToCMS();
    }


}