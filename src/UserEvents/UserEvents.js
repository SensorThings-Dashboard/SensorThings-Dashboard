import {
    DashboardServices
} from '../DashboardServices/DashboardServices.js';
import {
    ImportExport
} from '../ImportExport/ImportExport.js';
import {
    DataModelProxy
} from '../DataModel/DataModelProxy.js';

let userEvents = null;
let dashboardServices = null;
let importExport = null;
let dataModelProxy = null;

/**
 * Handles all Events triggered by the User
 **/
export class UserEvents {
    /**
     * Implements Singleton
     **/
    constructor() {
        if (!userEvents) {
            userEvents = this;
            dashboardServices = new DashboardServices();
            importExport = new ImportExport();
            dataModelProxy = new DataModelProxy();
        }
        return userEvents;
    }

    /**
     * Loads the UserConfig
     * @returns {UserConfig} The current UserConfig
     */
    loadUserConfig() {
        return dashboardServices.loadUserConfig();
    }

    /**
     * Sets the UserConfig
     * @param {UserConfig} conf The new UserConfig to be set
     */
    setUserConfig(conf) {
        dashboardServices.setUserConfig(conf);
    }

    /**
     * Applies the new configuration to the dashboard
     */
    dashboardConfigChanged() {
        let userConfig = userEvents.loadUserConfig();
        dashboardServices.applyConfig(userConfig);
    }

    /**
     * Adds a widget of the given type to the dashboard with the default configuration
     * @param {int} type The type of the new widget. Int to type mapping can be found in main.js
     */
    addWidget(type) {
        dashboardServices.createWidget(type);
    }

    /**
     * Remove existing Widget from dashboard with the supplied element itselve
     * @param {String} id The id of the Widget. If id is not existing, none will be removed
     */
    removeWidget(id) {
        dashboardServices.removeWidget(id);
    }

    /**
     * Listener to be called when position or size of widgets changes
     * @param event The Event which triggered the widget change
     * @param items The items which were changed by the event
     */
    widgetChange(event, items) {
        //if items is undefined, it was a remove event which is not handeled through this function
        if (items) {
            items.forEach(item => {
                let data = dataModelProxy.getWidgetData(item.id);
                //If data is undefined, the widget was just added. This is already handeled during creation, not here
                if (data) {
                    data.position = {
                        "x": item.x,
                        "y": item.y
                    };
                    data.size = {
                        "height": item.height,
                        "width": item.width
                    };
                }
            });
        }
    };
    /**
     * Configure the widget with a specific id.
     * This event will open a configuration dialog in order to specify every possible option.
     * @param {String} id The id of the Widget. If the id is not existing, none will be configured.
     */
    configureWidget(id) {
        dashboardServices.configureWidget(id);
    }

    /**
     * starts the import process from a local file system.
     */
    importConfig() {
        importExport.configJSONImport();
    }

    /**
     * starts the export process to a local file system.
     */
    exportConfig() {
        importExport.configJSONExport();
    }

    /**
     * calls the function set from outside to take care of importing from CMS, if one was set
     */
    importFromCMS() {
        if (window.iotDB.onLoadConfig) {
            window.iotDB.onLoadConfig();
        }
    }

    /**
     * calls the function set from outside to take care of exporting to CMS, if one was set
     */
    exportToCMS() {
        if (window.iotDB.onSaveConfig) {
            window.iotDB.onSaveConfig();
        }
    }
}
