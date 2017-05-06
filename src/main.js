import {
    DataModelProxy
} from "./DataModel/DataModelProxy.js";
import {
    View
} from "./View/View.js";
import {
    DataObserverProxy
} from "./DataObserver/DataQueryObserverProxy.js";
import {
    DataQuerySynchronizing
} from "./DataObserver/DataQuerySynchronizing.js";
import {
    ServerQuery
} from "./SensorThingsCommunication/ServerQuery.js";
import {
    MapWidgetFactory
} from "./DashboardServices/MapWidgetFactory.js";
import {
    ImportExport
} from "./ImportExport/ImportExport.js";
import {
    Parser
} from "./Parser/Parser.js";

window.WIDGET_TYPE_BARGRAPH = 1;
window.WIDGET_TYPE_GAUGE = 2;
window.WIDGET_TYPE_LINEGRAPH = 3;
window.WIDGET_TYPE_MAP = 4;
window.WIDGET_TYPE_PLAINDATA = 5;
window.WIDGET_TYPE_PLAINTEXT = 6;
window.WIDGET_TYPE_THERMOMETER = 7;
window.WIDGET_TYPE_TRAFFICLIGHT = 8;

window.TYPE_COLOR = 0;
window.TYPE_STRING = 1;
window.TYPE_INTEGER = 2;
window.TYPE_BOOLEAN = 3;
window.TYPE_ARRAY = 4;
window.TYPE_DATE = 5;
window.TYPE_DROPDOWN = 6;
window.TYPE_NUMBER = 7;
window.TYPE_FUZZY_SENSOR_SEARCH = 8;
window.TYPE_OBJECT = 9;
window.TYPE_OTHER = 10;

window.UNIT_MILLISECOND = 0;
window.UNIT_SECOND = 1;
window.UNIT_MINUTE = 2;
window.UNIT_HOUR = 3;
window.UNIT_DAY = 4;
window.UNIT_MONTH = 5;
window.UNIT_YEAR = 6;
window.MARKER_TYPE_PLAIN = 0;
window.MARKER_TYPE_PLAINVALUE = 1;
window.MARKER_TYPE_TRAFFICLIGHT = 2;
window.MARKER_TYPE_HISTORY = 3;

window.COLOR_RED = 1;
window.COLOR_YELLOW = 2;
window.COLOR_GREEN = 3;

window.printAJAXerrors = true;

//Define the functions exposed to the outside via the window.iotDB variable
window.iotDB = {
    create(cf) {
        if (cf.language == null) {
            cf.language = "en";
        }
        cf.id = "iot-db";
        new View(cf.id, cf.backgroundTransparent, cf.disableConfiguration,
            cf.disableImportExportCMS, cf.disableDownloadUpload,
            cf.enableNoDistraction, cf.language, window.iotDB.onLoad);

        if (cf.baseDir) {
            window.iotBaseDir = cf.baseDir;
        } else {
            window.iotBaseDir = "./";
        }
    },

    /**
     * Leaflet layer export
     * @returns an array of Leaflet layers
     */
    getMapLayers() {
        return (new MapWidgetFactory()).getMapLayers();
    },

    /**
     * userConfig export
     * @return {string} The currently loaded user config
     */
    exportUserConfig() {
        return (new ImportExport()).configFileExport();
    },

    /**
     * userConfig import
     * @param {string} userConfig userConfig which should be loaded into the dashboard
     */
    importUserConfig(userConfig) {
        (new ImportExport()).configFileImport(userConfig);
    },

    /**
     * Import a userConfig as a ready-to-load JSON object.
     * @param {string} userConfig userConfig which should be loaded into the dashboard
     */
    importUserConfigJSON(userConfig) {
        //The only data apart from Strings are Dates which need to be parsed
        let parsedUserConfig = new Parser().parseDates(userConfig);
        new ImportExport().dataModelProxy.importNewUserConfig(parsedUserConfig);
    }
};