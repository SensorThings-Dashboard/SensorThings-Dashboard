import {
    Parser
} from '../Parser/Parser.js';
import {
    DataModelProxy
} from '../DataModel/DataModelProxy.js';

let _importExport = null;

/**
 * In charge of handeling Im- and Export actions
 */
export class ImportExport {
    /**
     * Implements Singleton
     * @constructor
     **/
    constructor() {
        if (!_importExport) {
            _importExport = this;
            this.parser = new Parser();
            this.dataModelProxy = new DataModelProxy();
            this._tree = null;
            this._jsonData = null;
        }
        return _importExport;
    }

    /**
     * starts the jsonFile import from local file system.
     * Start a system file chooser, and notifies import export if file was selected
     */
    configJSONImport() {
        let fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        //It's forbidden to choose multiple data
        fileSelector.setAttribute('multiple', 'false');
        //It's only allowed to load json data
        fileSelector.setAttribute('accept', '.json');
        fileSelector.addEventListener("change", function() {
            _importExport._insertFile(fileSelector);
        }, false);
        fileSelector.click();
    }

    /**
     * Starts a download of the currently loaded userConfig. The file will be placed
     * in the download folder
     * @return {boolean} true, if it works
     */
    configJSONExport() {
        let userConfig = this.dataModelProxy.getUserConfig();
        this._jsonData = this.parser.configStore(userConfig);

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this._jsonData);
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", this._getCurrentDate() + "_userConfig" + ".json");
        dlAnchorElem.click();
        window.hideConfig();
        return true;
    }

    /**
     * method is a useful "slave" for the "master" 'configJSONImport'.
     * Calls DataModel and Parser
     * @param {fileSelector} fileSelector
     * @private
     */
    _insertFile(fileSelector) {
        if (!fileSelector.value) {
            console.error("Path missing.");
        } else {
            let file = fileSelector.files[0];
            let reader = new FileReader();
            reader.onload = function() {
                var data = reader.result;
                this._tree = _importExport.parser.configLoad(data);
                _importExport.dataModelProxy.importNewUserConfig(this._tree);
                window.hideConfig();
            };
            reader.readAsText(file);
        }
    }

    /**
     * Starts an import of the given userConfig which will then be loaded into the dashboard
     * @param {String} userConfig JSON-File w/ userConfig
     * @returns {object} userConfig
     */
    configFileImport(userConfig) {
        this._tree = this.parser.configLoad(userConfig);
        _importExport.dataModelProxy.importNewUserConfig(this._tree);
        return this._tree;
    }

    /**
     * Gets the currently loaded userConfig and returns it
     * @return {String} UserConfig
     */
    configFileExport() {
        let userConfig = this.dataModelProxy.getUserConfig();
        this._jsonData = this.parser.configStore(userConfig);
        return this._jsonData;
    }

    /**
     * Returns the current date as a String.
     * @returns {String} current date string
     * @private
     */
    _getCurrentDate() {
        let today = new Date();
        let mi = today.getMinutes();
        let hh = today.getHours();
        let dd = today.getDate();
        let mo = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mo < 10) {
            mo = '0' + mo;
        }
        if (mi < 10) {
            mi = '0' + mi;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        return yyyy + mo + dd + '_' + hh + mi;
    }
}
