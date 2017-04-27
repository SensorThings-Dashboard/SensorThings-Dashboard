import {
    WidgetConfig
} from './WidgetConfig.js';
import {
    DashboardConfig
} from './DashboardConfig.js';

let userConfig = null;

/**
 * Class stores User Configurations like the Widget-Configurations
 * and the Dashboard Configuration
 */
export class UserConfig {
    /**
     * Implements Singleton.
     * @return {UserConfig} Singleton UserConfig object.
     */
    constructor() {
        if (!userConfig) {
            userConfig = this;
            // init vars
            this.widgetConfig = new WidgetConfig();
            this.dashboardConfig = new DashboardConfig();
        }
        return userConfig;
    }

    /**
     * Getter for WidgetConfig
     * @return {object} WidgetConfig - Singleton WidgetConfig object
     */
    getWidgetConfig() {
        return this.widgetConfig;
    }

    /**
     * Getter for DashboardConfig
     * @return {object} DashboardConfig - Singleton DashboardConfig object
     */
    getDashboardConfig() {
        return this.dashboardConfig;
    }

    /**
     * Setter for WidgetConfig
     * @param {object} widgetConfig The new WidgetConfig
     */
    setWidgetConfig(widgetConfig) {
        this.widgetConfig = widgetConfig;
    }

    /**
     * Setter for DashboardConfig
     * @param {object} dashboardConfig the new DashboardConfig
     */
    setDashboardConfig(dashboardConfig) {
        this.dashboardConfig = dashboardConfig;
    }

    /**
     * sets DashboardTitle and ServerList in DashboardConfig
     * @param {object} dashboardConfig containg Title & ServerList
     */
    setDashboardConfigData(dashboardConfig) {
        this.dashboardConfig.setTitle(dashboardConfig.title);
        this.dashboardConfig.setServerList(dashboardConfig.serverList);
    }


    /**
     * sets the WidgetConfig-Data in WidgetConfig
     * @param {object} widgetConfig
     */
    setWidgetConfigData(widgetConfig) {
        this.widgetConfig.setConfigContent(widgetConfig);
    }

    /**
     * sets the data in DashboardConfig
     * @param {object} userConfigData
     */
    setUserConfigData(userConfigData) {
        userConfig.setDashboardConfigData(userConfigData.dashboardConfig);
    }

}