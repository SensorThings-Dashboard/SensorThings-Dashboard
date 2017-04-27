import {
    WidgetFactory
} from './WidgetFactory.js';
import {
    MapWidgetFactory
} from './MapWidgetFactory.js';
import {
    MapWidgetData
} from '../DataModel/Config/WidgetData/DataWidgetData/MapWidgetData.js';
import {
    View
} from '../View/View.js';
import {
    DataModelProxy
} from '../DataModel/DataModelProxy.js';
import {
    WidgetConfigurationView
} from '../View/WidgetConfigurationView.js';

let dashboardServices = null;
let dataModelProxy = null;
let widgetFactory = null;
let view = null;

/**
 * In charge of handling the creation of new widgets
 **/
export class DashboardServices {
    /**
     * Implements Singleton
     **/
    constructor() {
        if (!dashboardServices) {
            dashboardServices = this;
            widgetFactory = new WidgetFactory();
            view = new View();
            dataModelProxy = new DataModelProxy();
        }
        return dashboardServices;
    }

    /*
     * Get the current UserConfig
     * @return {UserConfig} The currently loaded UserConfig
     */
    loadUserConfig() {
        return dataModelProxy.getUserConfig();
    }

    /*
     * Sets UserConfig to new UserConfig
     * @param {UserConfig} conf the new UserConfig
     */
    setUserConfig(conf) {
        dataModelProxy.setUserConfig(conf);
    }


    /**
     * Applies the given config to the dashboard
     * @param the config to be applied
     */
    applyConfig(conf) {
        $(".navbar-brand").text(conf.dashboardConfig.getTitle());
        $("#conf_title").text(window.iotlg.dbConfig + conf.dashboardConfig.getTitle());
    }

    /**
     * Creates a new Widget using the supplied parameters
     * @param {int} type The type of the widget which should be created. Mappings int -> type can be seen in main.js
     * If null defaults will be used
     **/
    createWidget(type, params) {
        //The function to be called once the widget is created
        let callback = (id, dataUpdate, configUpdate) => {
            //Get configurableData, position and size to save it in the datamodel
            let result = view.getWidgetAttrFromId(id);
            dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, params, result[0], result[1]);
            /*dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, result[0], result[1]);*/
        };
        type = parseInt(type);
        /*let widget = widgetFactory.createWidget(params, type, callback);*/
        let widget = widgetFactory.createWidget(type, callback);
        view.addWidget("iotdbWidget" + widget[0], widget[1]);
    }

    /**
     * Creates a new Widget using the supplied parameters, at the given position and size
     * @param {int} type The Type of the widget which will be created. Mappings int -> type can be seen in main.js
     * @param {Object} position needs to have "x" and "y" attributes containing the position
     * @param {Object} size needs to have "width" and "height" attributes containing the size
     */
    createWidgetWithPosAndSize(type, position, size, params) {
        let callback = (id, dataUpdate, configUpdate) => {
            dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, params, position, size);
            /*dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, position, size);*/
        };
        type = parseInt(type);
        /*let widget = widgetFactory.createWidget(params, type, callback);*/
        let widget = widgetFactory.createWidget(type, callback);
        view.addWidgetAtPosition("iotdbWidget" + widget[0], widget[1], position.x, position.y, size.width, size.height);
    }

    /**
     * Creates new widgets, based on the userConfig
     * @param {object} data a widgetConfig
     */
    createWidgetsFromConfig(data) {
        let configs = data.widgetDataArray;
        for (let i = 0; i < configs.length; i++) {
            console.log("Create Widget", configs[i]);
            if (configs[i].position && configs[i].size) {
                this.createWidgetWithPosAndSize(configs[i].type, configs[i].position, configs[i].size, configs[i].configurableData);
                /*this.createWidgetWithPosAndSize(configs[i].type, configs[i].position, configs[i].size);*/
            } else {
                this.createWidget(configs[i].type, configs[i].configurableData);
            }
        }

    }

    /**
     * Remove existing Widget with the supplied id
     * Line of death: DS destroys -> GWD destroys -> View removes -> GV
     * @param {String} id The id of the Widget. If id is not existing, none will be removed
     **/
    removeWidget(id) {
        // if a map is removed, the factory has to be informed to update the array of all layers
        let data = dataModelProxy.getWidgetData(id);
        if (data instanceof MapWidgetData) {
            new MapWidgetFactory(null).removeLayerGroup(id);
        }
        dataModelProxy.removeWidgetData(id);
    }

    /**
     * Configure the widget with a specific id.
     * This event will open a configuration dialog in order to specify every possible option.
     * @param {String} id The id of the Widget. If the id is not existing, none will be configured.
     */
    configureWidget(id) {
        let widgetConfigurationView = new WidgetConfigurationView(dataModelProxy.getWidgetData(id));
    }
}