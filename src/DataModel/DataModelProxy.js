import {
    DataModel
} from "./DataModel.js";
import {
    DashboardServices
} from '../DashboardServices/DashboardServices';
import {
    GaugeWidgetData
} from "./Config/WidgetData/DataWidgetData/GaugeWidgetData.js";
import {
    BarGraphData
} from "./Config/WidgetData/DataWidgetData/BarGraphData.js";
import {
    LineGraphWidgetData
} from "./Config/WidgetData/DataWidgetData/LineGraphWidgetData.js";
import {
    PlainDataWidgetData
} from "./Config/WidgetData/DataWidgetData/PlainDataWidgetData.js";
import {
    ThermometerWidgetData
} from "./Config/WidgetData/DataWidgetData/ThermometerWidgetData.js";
import {
    TrafficLightWidgetData
} from "./Config/WidgetData/DataWidgetData/TrafficLightWidgetData.js";
import {
    MapWidgetData
} from "./Config/WidgetData/DataWidgetData/MapWidgetData.js";
import {
    PlainTextWidgetData
} from "./Config/WidgetData/PlainTextWidgetData.js";

/**
 * This class is the facade to the DataModel.
 * Therefore the DataModelProxy should be the Gateway
 * to every data entity of the project.
 */
export class DataModelProxy {

    /**
     * Constructor
     */
    constructor() {
        this.datamodel = new DataModel();
        this.dashboardServices = new DashboardServices();
    }

    /**
     * Get WidgetData objet for a specific id
     * @param id Id of the requested widgetData object
     **/
    getWidgetData(id) {
        return this.datamodel.getUserConfig().getWidgetConfig().getWidgetDataByID(id);
    }

    /**
     * Getter for UserConfig
     * @return {UserConfig} Singleton UserConfig object.
     */
    getUserConfig() {
        return this.datamodel.getUserConfig();
    }

    /**
     * Setter for the DataModel
     * @param {DataModel} datamodel
     */
    setDataModel(datamodel) {
        this.datamodel = datamodel;
    }

    /**
     * Adds a new widget data to the datamodel and registers callback functions from the view
     * @param {number} id
     *      id of the new gauge widget
     * @param {function} dataFunc
     *      data callback function
     * @param {function} configFunc
     *      configuration callback function
     * @param {number} type
     *      type of the new widget
     * @param {object} params
     *      configurable of the new widget
     * @param {object} position
     *      position of the new widget
     * @param {object} size
     *      size of the new widget
     */
    addWidget(id, dataFunc, configFunc, type, params, position, size) {
        let widgetData;
        switch (type) {
            case WIDGET_TYPE_GAUGE:
                widgetData = new GaugeWidgetData(id);
                break;
            case WIDGET_TYPE_BARGRAPH:
                widgetData = new BarGraphData(id);
                break;
            case WIDGET_TYPE_LINEGRAPH:
                widgetData = new LineGraphWidgetData(id);
                break;
            case WIDGET_TYPE_PLAINDATA:
                widgetData = new PlainDataWidgetData(id);
                break;
            case WIDGET_TYPE_THERMOMETER:
                widgetData = new ThermometerWidgetData(id);
                break;
            case WIDGET_TYPE_TRAFFICLIGHT:
                widgetData = new TrafficLightWidgetData(id);
                break;
            case WIDGET_TYPE_MAP:
                widgetData = new MapWidgetData(id);
                break;
            case WIDGET_TYPE_PLAINTEXT:
                widgetData = new PlainTextWidgetData(id);
                break;
            default:
                console.error("unknown widget type");
                break;
        }

        if (params) {
            /*Don't remove me*/
            widgetData.setConfigurableData(params);
        }

        if (position) {
            widgetData.setPosition(position);
        }
        if (size) {
            widgetData.setSize(size);
        }

        widgetData.registerViewCallback(dataFunc, configFunc);
        this.datamodel.getUserConfig().getWidgetConfig().addWidgetData(widgetData);
    }

    /**
     * Modifies an existing widget data
     * @param {int} id
     *      id of the widget to be modified
     * @param {object} params
     *      new configuration to be set
     */
    changeWidgetData(id, params) {
        this.datamodel.getUserConfig().getWidgetConfig().changeWidgetData(id, params);
    }

    /**
     * Removes an existing widget data
     * @param {int} id
     *      id of the widget to be removed
     */
    removeWidgetData(id) {
        this.datamodel.getUserConfig().getWidgetConfig().removeWidgetData(id);
    }

    /**
     * Getter for UserConfig
     * @return {object} the current stored instance of the class UserConfig
     */
    getUserConfig() {
        return this.datamodel.getUserConfig();
    }

    /**
     * Setter for UserConfig
     * @param {object} conf
     *      An instance of the class UserConfig
     */
    setUserConfig(conf) {
        this.datamodel.setUserConfig(conf);
    }

    /**
     * method sets the UserConfigData and calls DashboardService to build the widgets
     * @param {object} userConfigData
     */
    importNewUserConfig(userConfigData) {
        this.datamodel.getUserConfig().setUserConfigData(userConfigData);
        this.datamodel.getUserConfig().getWidgetConfig().removeAllWidgetData();
        this.dashboardServices.createWidgetsFromConfig(userConfigData.widgetConfig);
    }
}