import {
    UserEvents
} from '../../UserEvents/UserEvents.js';

let _dashboardConfig = null;

/**
 * Class stores the Dashboard Configuration
 */
export class DashboardConfig {

    /**
     * Implements Singleton.
     * @return {DashboardConfig} DashboardConfig Singleton object
     */
    constructor() {
        if (!_dashboardConfig) {
            _dashboardConfig = this;
            this.title = "Dashboard: " + window.iotlg.headerDefTitle;
            this.serverList = [{
                name: "Standard",
                url: "http://scratchpad.sensorup.com/OGCSensorThings/v1.0/"
            }];
            this._relative = false;
            this._absoluteLimit = 1000;
            this._relativeUnit = 4;
            this._relativeValue = 1;

            this._userEvents = new UserEvents();
        }
        return _dashboardConfig;
    }

    /**
     * Getter for title.
     * @return {string} The title
     */
    getTitle() {
        return this.title;
    }

    /**
     * Getter for ServerList
     * @return {Array} ServerList
     */
    getServerList() {
        return this.serverList;
    }

    /**
     * Setter for title
     * @param {string} title The new title
     */
    setTitle(title) {
        this.title = title;
        this._userEvents.dashboardConfigChanged();
    }

    /**
     * Setter for serverList
     * @param {Array} serverList The new ServerList
     */
    setServerList(serverList) {
        this.serverList = serverList;
        this._userEvents.dashboardConfigChanged();
    }
}
