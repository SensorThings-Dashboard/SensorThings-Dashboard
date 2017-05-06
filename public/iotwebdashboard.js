/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _DataModelDataModelProxyJs = __webpack_require__(1);

	var _ViewViewJs = __webpack_require__(6);

	var _DataObserverDataQueryObserverProxyJs = __webpack_require__(29);

	var _DataObserverDataQuerySynchronizingJs = __webpack_require__(31);

	var _SensorThingsCommunicationServerQueryJs = __webpack_require__(22);

	var _DashboardServicesMapWidgetFactoryJs = __webpack_require__(13);

	var _ImportExportImportExportJs = __webpack_require__(26);

	var _ParserParserJs = __webpack_require__(27);

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
	    create: function create(cf) {
	        if (cf.language == null) {
	            cf.language = "en";
	        }
	        cf.id = "iot-db";
	        new _ViewViewJs.View(cf.id, cf.backgroundTransparent, cf.disableConfiguration, cf.disableImportExportCMS, cf.disableDownloadUpload, cf.enableNoDistraction, cf.language, window.iotDB.onLoad);

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
	    getMapLayers: function getMapLayers() {
	        return new _DashboardServicesMapWidgetFactoryJs.MapWidgetFactory().getMapLayers();
	    },

	    /**
	     * userConfig export
	     * @return {string} The currently loaded user config
	     */
	    exportUserConfig: function exportUserConfig() {
	        return new _ImportExportImportExportJs.ImportExport().configFileExport();
	    },

	    /**
	     * userConfig import
	     * @param {string} userConfig userConfig which should be loaded into the dashboard
	     */
	    importUserConfig: function importUserConfig(userConfig) {
	        new _ImportExportImportExportJs.ImportExport().configFileImport(userConfig);
	    },

	    /**
	     * Import a userConfig as a ready-to-load JSON object.
	     * @param {string} userConfig userConfig which should be loaded into the dashboard
	     */
	    importUserConfigJSON: function importUserConfigJSON(userConfig) {
	        //The only data apart from Strings are Dates which need to be parsed
	        var parsedUserConfig = new _ParserParserJs.Parser().parseDates(userConfig);
	        new _ImportExportImportExportJs.ImportExport().dataModelProxy.importNewUserConfig(parsedUserConfig);
	    }
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _DataModelJs = __webpack_require__(2);

	var _DashboardServicesDashboardServices = __webpack_require__(9);

	var _ConfigWidgetDataDataWidgetDataGaugeWidgetDataJs = __webpack_require__(37);

	var _ConfigWidgetDataDataWidgetDataBarGraphDataJs = __webpack_require__(38);

	var _ConfigWidgetDataDataWidgetDataLineGraphWidgetDataJs = __webpack_require__(39);

	var _ConfigWidgetDataDataWidgetDataPlainDataWidgetDataJs = __webpack_require__(40);

	var _ConfigWidgetDataDataWidgetDataThermometerWidgetDataJs = __webpack_require__(41);

	var _ConfigWidgetDataDataWidgetDataTrafficLightWidgetDataJs = __webpack_require__(42);

	var _ConfigWidgetDataDataWidgetDataMapWidgetDataJs = __webpack_require__(5);

	var _ConfigWidgetDataPlainTextWidgetDataJs = __webpack_require__(35);

	/**
	 * This class is the facade to the DataModel.
	 * Therefore the DataModelProxy should be the Gateway
	 * to every data entity of the project.
	 */

	var DataModelProxy = (function () {

	    /**
	     * Constructor
	     */

	    function DataModelProxy() {
	        _classCallCheck(this, DataModelProxy);

	        this.datamodel = new _DataModelJs.DataModel();
	        this.dashboardServices = new _DashboardServicesDashboardServices.DashboardServices();
	    }

	    /**
	     * Get WidgetData objet for a specific id
	     * @param id Id of the requested widgetData object
	     **/

	    _createClass(DataModelProxy, [{
	        key: "getWidgetData",
	        value: function getWidgetData(id) {
	            return this.datamodel.getUserConfig().getWidgetConfig().getWidgetDataByID(id);
	        }

	        /**
	         * Getter for UserConfig
	         * @return {UserConfig} Singleton UserConfig object.
	         */
	    }, {
	        key: "getUserConfig",
	        value: function getUserConfig() {
	            return this.datamodel.getUserConfig();
	        }

	        /**
	         * Setter for the DataModel
	         * @param {DataModel} datamodel
	         */
	    }, {
	        key: "setDataModel",
	        value: function setDataModel(datamodel) {
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
	    }, {
	        key: "addWidget",
	        value: function addWidget(id, dataFunc, configFunc, type, params, position, size) {
	            var widgetData = undefined;
	            switch (type) {
	                case WIDGET_TYPE_GAUGE:
	                    widgetData = new _ConfigWidgetDataDataWidgetDataGaugeWidgetDataJs.GaugeWidgetData(id);
	                    break;
	                case WIDGET_TYPE_BARGRAPH:
	                    widgetData = new _ConfigWidgetDataDataWidgetDataBarGraphDataJs.BarGraphData(id);
	                    break;
	                case WIDGET_TYPE_LINEGRAPH:
	                    widgetData = new _ConfigWidgetDataDataWidgetDataLineGraphWidgetDataJs.LineGraphWidgetData(id);
	                    break;
	                case WIDGET_TYPE_PLAINDATA:
	                    widgetData = new _ConfigWidgetDataDataWidgetDataPlainDataWidgetDataJs.PlainDataWidgetData(id);
	                    break;
	                case WIDGET_TYPE_THERMOMETER:
	                    widgetData = new _ConfigWidgetDataDataWidgetDataThermometerWidgetDataJs.ThermometerWidgetData(id);
	                    break;
	                case WIDGET_TYPE_TRAFFICLIGHT:
	                    widgetData = new _ConfigWidgetDataDataWidgetDataTrafficLightWidgetDataJs.TrafficLightWidgetData(id);
	                    break;
	                case WIDGET_TYPE_MAP:
	                    widgetData = new _ConfigWidgetDataDataWidgetDataMapWidgetDataJs.MapWidgetData(id);
	                    break;
	                case WIDGET_TYPE_PLAINTEXT:
	                    widgetData = new _ConfigWidgetDataPlainTextWidgetDataJs.PlainTextWidgetData(id);
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
	    }, {
	        key: "changeWidgetData",
	        value: function changeWidgetData(id, params) {
	            this.datamodel.getUserConfig().getWidgetConfig().changeWidgetData(id, params);
	        }

	        /**
	         * Removes an existing widget data
	         * @param {int} id
	         *      id of the widget to be removed
	         */
	    }, {
	        key: "removeWidgetData",
	        value: function removeWidgetData(id) {
	            this.datamodel.getUserConfig().getWidgetConfig().removeWidgetData(id);
	        }

	        /**
	         * Getter for UserConfig
	         * @return {object} the current stored instance of the class UserConfig
	         */
	    }, {
	        key: "getUserConfig",
	        value: function getUserConfig() {
	            return this.datamodel.getUserConfig();
	        }

	        /**
	         * Setter for UserConfig
	         * @param {object} conf
	         *      An instance of the class UserConfig
	         */
	    }, {
	        key: "setUserConfig",
	        value: function setUserConfig(conf) {
	            this.datamodel.setUserConfig(conf);
	        }

	        /**
	         * method sets the UserConfigData and calls DashboardService to build the widgets
	         * @param {object} userConfigData
	         */
	    }, {
	        key: "importNewUserConfig",
	        value: function importNewUserConfig(userConfigData) {
	            this.datamodel.getUserConfig().setUserConfigData(userConfigData);
	            this.datamodel.getUserConfig().getWidgetConfig().removeAllWidgetData();
	            this.dashboardServices.createWidgetsFromConfig(userConfigData.widgetConfig);
	        }
	    }]);

	    return DataModelProxy;
	})();

	exports.DataModelProxy = DataModelProxy;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ConfigUserConfigJs = __webpack_require__(3);

	var _ConfigDashboardConfigJs = __webpack_require__(36);

	var _dataModel = null;

	/**
	 * Implements the essential/central class of the whole DataModel
	 */

	var DataModel = (function () {
	    /**
	     * Implementation of Singleton-Construction
	     */

	    function DataModel() {
	        _classCallCheck(this, DataModel);

	        if (!_dataModel) {
	            _dataModel = this;
	            this._userConfig = new _ConfigUserConfigJs.UserConfig();
	            this._dashboardConfig = new _ConfigDashboardConfigJs.DashboardConfig();
	            this._observers = [];
	        }
	        return _dataModel;
	    }

	    /**
	     * Adds an observer to the list of observers. When new data comes in
	     * the observer is then notified by calling its notify() method
	     * @param observer the object that should be notified when new Data comes in
	     * @returns {DataModel} the updated DataModel
	     */

	    _createClass(DataModel, [{
	        key: 'observe',
	        value: function observe(observer) {
	            this._observers.push(observer);
	            return this;
	        }

	        /**
	         * Notifies all observers
	         * @private
	         */
	    }, {
	        key: '_notify',
	        value: function _notify() {
	            for (var observer in this._observers) {
	                observer.notify();
	            }
	        }

	        /**
	         * Getter for UserConfig
	         * @return {UserConfig} the currently loaded userConfig
	         */
	    }, {
	        key: 'getUserConfig',
	        value: function getUserConfig() {
	            return this._userConfig;
	        }

	        /**
	         * Setter for UserConfig
	         * @param {Object} userConfig new UserConfig
	         */
	    }, {
	        key: 'setUserConfig',
	        value: function setUserConfig(userConfig) {
	            this._userConfig = userConfig;
	        }
	    }]);

	    return DataModel;
	})();

	exports.DataModel = DataModel;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _WidgetConfigJs = __webpack_require__(4);

	var _DashboardConfigJs = __webpack_require__(36);

	var userConfig = null;

	/**
	 * Class stores User Configurations like the Widget-Configurations
	 * and the Dashboard Configuration
	 */

	var UserConfig = (function () {
	    /**
	     * Implements Singleton.
	     * @return {UserConfig} Singleton UserConfig object.
	     */

	    function UserConfig() {
	        _classCallCheck(this, UserConfig);

	        if (!userConfig) {
	            userConfig = this;
	            // init vars
	            this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	            this.dashboardConfig = new _DashboardConfigJs.DashboardConfig();
	        }
	        return userConfig;
	    }

	    /**
	     * Getter for WidgetConfig
	     * @return {object} WidgetConfig - Singleton WidgetConfig object
	     */

	    _createClass(UserConfig, [{
	        key: 'getWidgetConfig',
	        value: function getWidgetConfig() {
	            return this.widgetConfig;
	        }

	        /**
	         * Getter for DashboardConfig
	         * @return {object} DashboardConfig - Singleton DashboardConfig object
	         */
	    }, {
	        key: 'getDashboardConfig',
	        value: function getDashboardConfig() {
	            return this.dashboardConfig;
	        }

	        /**
	         * Setter for WidgetConfig
	         * @param {object} widgetConfig The new WidgetConfig
	         */
	    }, {
	        key: 'setWidgetConfig',
	        value: function setWidgetConfig(widgetConfig) {
	            this.widgetConfig = widgetConfig;
	        }

	        /**
	         * Setter for DashboardConfig
	         * @param {object} dashboardConfig the new DashboardConfig
	         */
	    }, {
	        key: 'setDashboardConfig',
	        value: function setDashboardConfig(dashboardConfig) {
	            this.dashboardConfig = dashboardConfig;
	        }

	        /**
	         * sets DashboardTitle and ServerList in DashboardConfig
	         * @param {object} dashboardConfig containg Title & ServerList
	         */
	    }, {
	        key: 'setDashboardConfigData',
	        value: function setDashboardConfigData(dashboardConfig) {
	            this.dashboardConfig.setTitle(dashboardConfig.title);
	            this.dashboardConfig.setServerList(dashboardConfig.serverList);
	        }

	        /**
	         * sets the WidgetConfig-Data in WidgetConfig
	         * @param {object} widgetConfig
	         */
	    }, {
	        key: 'setWidgetConfigData',
	        value: function setWidgetConfigData(widgetConfig) {
	            this.widgetConfig.setConfigContent(widgetConfig);
	        }

	        /**
	         * sets the data in DashboardConfig
	         * @param {object} userConfigData
	         */
	    }, {
	        key: 'setUserConfigData',
	        value: function setUserConfigData(userConfigData) {
	            userConfig.setDashboardConfigData(userConfigData.dashboardConfig);
	        }
	    }]);

	    return UserConfig;
	})();

	exports.UserConfig = UserConfig;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _WidgetDataDataWidgetDataMapWidgetDataJs = __webpack_require__(5);

	var _WidgetDataPlainTextWidgetDataJs = __webpack_require__(35);

	var _widgetConfig = null;
	var _widgetDataArray = null;

	/**
	 * class stores the Widget Configurations
	 */

	var WidgetConfig = (function () {
	    /**
	     * Implementation of Singleton-Construction
	     * @returns {object} WidgetConfig
	     */

	    function WidgetConfig() {
	        _classCallCheck(this, WidgetConfig);

	        if (!_widgetConfig) {
	            _widgetConfig = this;
	            // init vars
	            this.widgetDataArray = [];
	            this.datastreamFunctions = [];
	        }
	        return _widgetConfig;
	    }

	    /**
	     * get the widgetDataArray
	     * @return {array} widgetDataArray - saved information
	     */

	    _createClass(WidgetConfig, [{
	        key: "getConfigContent",
	        value: function getConfigContent() {
	            return this.widgetDataArray;
	        }

	        /**
	         * set the widgetDataArray
	         * @param {object} widgetDataArray
	         */
	    }, {
	        key: "setConfigContent",
	        value: function setConfigContent(widgetDataArray) {
	            this.widgetDataArray = widgetDataArray;
	        }

	        /**
	         * returns the widgetData from the wanted widget (key = id)
	         * @param {string} id Id of the requested widget
	         * @return {object} The WidgetData of the widget with the id "id", undefined if it doesn't exist
	         */
	    }, {
	        key: "getWidgetDataByID",
	        value: function getWidgetDataByID(id) {
	            return this.widgetDataArray.find(function (item) {
	                return item.id === id;
	            });
	        }

	        /**
	         * Adds a new widget data to the list of all widget widgetData and notifies DataObserver
	         * @param {object} widgetData
	         *      new widget data to be added
	         */
	    }, {
	        key: "addWidgetData",
	        value: function addWidgetData(widgetData) {
	            this.widgetDataArray.push(widgetData);
	            if (!(widgetData instanceof _WidgetDataPlainTextWidgetDataJs.PlainTextWidgetData)) {
	                for (var func in this.datastreamFunctions) {
	                    this.datastreamFunctions[func](true, false, widgetData);
	                }
	            }
	        }

	        /**
	         * Notifies DataObserver
	         * @param {number} id ~ widgetID
	         *      ID of the desired widget
	         */
	    }, {
	        key: "widgetDataChanged",
	        value: function widgetDataChanged(id) {
	            var widgetData = this.getWidgetDataByID(id);
	            if (!(widgetData instanceof _WidgetDataPlainTextWidgetDataJs.PlainTextWidgetData || widgetData == null)) {
	                for (var func in this.datastreamFunctions) {
	                    this.datastreamFunctions[func](true, true, widgetData);
	                }
	            }
	        }

	        /**
	         * Removes a widget with the given ID from the list of widgetData and notifies DataObserver
	         * @param {number} id ~ widgetID
	         *      ID of the widget to be removed
	         */
	    }, {
	        key: "removeWidgetData",
	        value: function removeWidgetData(id) {
	            var widgetData = this.getWidgetDataByID(id);
	            widgetData.destroy();
	            var index = this.widgetDataArray.indexOf(widgetData);
	            //actual removal
	            this.widgetDataArray.splice(index, 1);

	            if (!(widgetData instanceof _WidgetDataPlainTextWidgetDataJs.PlainTextWidgetData || widgetData == null)) {
	                for (var func in this.datastreamFunctions) {
	                    this.datastreamFunctions[func](false, true, widgetData);
	                }
	            }
	        }

	        /**
	         * Removes all stored widget-information
	         */
	    }, {
	        key: "removeAllWidgetData",
	        value: function removeAllWidgetData() {
	            var temp = [];
	            for (var widgetData in this.widgetDataArray) {
	                temp.push(this.widgetDataArray[widgetData].id);
	            }
	            for (var i = 0; i < temp.length; i++) {
	                this.removeWidgetData(temp[i]);
	            }
	        }

	        /**
	         * Subscription function for the DataObserver
	         * @param {function} func
	         *      callback function
	         */
	    }, {
	        key: "registerDataStreamsObserver",
	        value: function registerDataStreamsObserver(func) {
	            this.datastreamFunctions.push(func);
	        }
	    }]);

	    return WidgetConfig;
	})();

	exports.WidgetConfig = WidgetConfig;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	var logging = false;

	/**
	 * Class stores the data of one MapWidget
	 */

	var MapWidgetData = (function () {

	    /**
	     * Constructs new MapWidgetData with an ID
	     * @param {string} id
	     *      widgetID
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function MapWidgetData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, MapWidgetData);

	        this.id = id;
	        this.type = WIDGET_TYPE_MAP;

	        // WidgetView Callback to notify for changed Data
	        this.dataCallbacks = [];
	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // set up data observer callbacks
	        this.dataObserverCallbacks = [this.newData.bind(this)];

	        // Most recent data
	        this.allData = [];
	        this.allData.push([]);

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuraion
	     * @param {object} args
	     *      the attributes
	     */

	    _createClass(MapWidgetData, [{
	        key: "setAttributes",
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * returns a list of booleans representing, which Data is needed.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            var pm = {
	                DataStream_name: true,
	                DataStream_description: false,
	                DataStream_observationType: false,
	                DataStream_unitOfMeasurement: true,
	                DataStream_observedArea: false,
	                DataStream_phenomenonTime: true,
	                DataStream_resultTime: false,
	                Observation_phenomenonTime: false,
	                Observation_resultTime: false,
	                Observation_result: true,
	                Observation_resultQuality: false,
	                Observation_validTime: false,
	                Observation_parameters: false,
	                FeatureOfInterest_name: true,
	                FeatureOfInterest_description: true,
	                FeatureOfInterest_encodingType: true,
	                FeatureOfInterest_feature: true,
	                ObservedProperty_name: false,
	                ObservedProperty_definition: false,
	                ObservedProperty_description: false,
	                Sensor_name: false,
	                Sensor_description: false,
	                Sensor_encodingType: false,
	                Sensor_metadata: false,
	                Thing_name: false,
	                Thing_description: false,
	                Thing_properties: false,
	                Thing_HistoricalLocations: true,
	                Thing_Location_name: true,
	                Thing_Location_description: true,
	                Thing_Location_encodingType: true,
	                Thing_Location_location: true
	            };
	            return pm;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: "_initConfigurableData",
	        value: function _initConfigurableData() {
	            var nextHourTime = new Date();
	            nextHourTime.setMinutes(new Date().getMinutes() + 1);
	            this.configurableData = {
	                // View configuration
	                title: {
	                    data: 'Map Widget',
	                    type: TYPE_STRING
	                },
	                zoom: {
	                    data: 13,
	                    type: TYPE_INTEGER
	                },
	                mapURL: {
	                    data: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmV4dXJ5IiwiYSI6ImNpd3R2ZzY5djAwbzcydXFyazRsam80cDAifQ.TaIW3pR4RS3UuyZg61HV6g',
	                    type: TYPE_STRING
	                },
	                attribution: {
	                    data: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>",
	                    type: TYPE_STRING
	                },
	                latitude: {
	                    data: 49.014,
	                    type: TYPE_NUMBER
	                },
	                longitude: {
	                    data: 8.404,
	                    type: TYPE_NUMBER
	                },

	                // Data filter
	                timeIntervalRelative: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                timeIntervalUnit: {
	                    data: UNIT_MINUTE,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        second: UNIT_SECOND,
	                        minute: UNIT_MINUTE,
	                        hour: UNIT_HOUR,
	                        day: UNIT_DAY,
	                        month: UNIT_MONTH,
	                        year: UNIT_YEAR
	                    }
	                },
	                timeInterval: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                startTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },
	                endTime: {
	                    data: nextHourTime,
	                    type: TYPE_DATE
	                },

	                // ST configuration Attention: multiple Sensors are possible
	                sensorThingsConfiguration: {
	                    data: [{
	                        data: {
	                            dataStreamUrl: {
	                                data: '',
	                                type: TYPE_FUZZY_SENSOR_SEARCH
	                            },
	                            mqttEnabled: {
	                                data: false,
	                                type: TYPE_BOOLEAN
	                            },
	                            mqttUrl: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            mqttBaseTopic: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            updateIntervalMs: {
	                                data: 1000,
	                                type: TYPE_INTEGER
	                            },
	                            overlayType: {
	                                data: MARKER_TYPE_PLAIN,
	                                type: TYPE_DROPDOWN,
	                                options: {
	                                    plainMarker: MARKER_TYPE_PLAIN,
	                                    plainValueMarker: MARKER_TYPE_PLAINVALUE,
	                                    trafficLightMarker: MARKER_TYPE_TRAFFICLIGHT,
	                                    historyLine: MARKER_TYPE_HISTORY
	                                }
	                            },
	                            thresholdMiddle: {
	                                data: 0,
	                                type: TYPE_NUMBER
	                            },
	                            thresholdUpper: {
	                                data: 0,
	                                type: TYPE_NUMBER
	                            },
	                            lowerRangeColor: {
	                                data: COLOR_GREEN,
	                                type: TYPE_DROPDOWN,
	                                options: {
	                                    red: COLOR_RED,
	                                    yellow: COLOR_YELLOW,
	                                    green: COLOR_GREEN
	                                }
	                            },
	                            middleRangeColor: {
	                                data: COLOR_YELLOW,
	                                type: TYPE_DROPDOWN,
	                                options: {
	                                    red: COLOR_RED,
	                                    yellow: COLOR_YELLOW,
	                                    green: COLOR_GREEN
	                                }
	                            },
	                            upperRangeColor: {
	                                data: COLOR_RED,
	                                type: TYPE_DROPDOWN,
	                                options: {
	                                    red: COLOR_RED,
	                                    yellow: COLOR_YELLOW,
	                                    green: COLOR_GREEN
	                                }
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                }
	            };
	        }

	        /**
	         * DataObserver pushes new data, callback methods from view are executed with new data
	         * @param {object} data
	         *      new data
	         */
	    }, {
	        key: "newData",
	        value: function newData(data) {
	            this.allData[0] = data;
	            for (var k in this.dataCallbacks) {
	                this.dataCallbacks[k](this.allData);
	            }
	        }

	        /**
	         * Registers a callback function from the view
	         * @param {function} dataFunc
	         *      data callback function
	         * @param {function} configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: "registerViewCallback",
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.dataCallbacks.push(dataFunc);
	            this.configCallbacks.push(configFunc);
	            dataFunc(this.allData);
	            configFunc(this.configurableData);
	        }

	        /**
	         * @returns {function} (this:LineGraphWidgetData)
	         */
	    }, {
	        key: "getDataCallback",
	        value: function getDataCallback() {
	            if (logging) console.log(this.dataObserverCallbacks);
	            return this.dataObserverCallbacks;
	        }

	        /**
	         * Deletes Widget
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	            this.dataCallbacks = [];
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: "getID",
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return QueryParams
	         */
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: "getQueryIDs",
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         */
	    }, {
	        key: "getConfigurableData",
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: "setConfigurableData",
	        value: function setConfigurableData(configurableData) {
	            this._buildDataCallbacks(configurableData.sensorThingsConfiguration.data);

	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: "setPosition",
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: "setQueryIDs",
	        value: function setQueryIDs(queryIDs) {
	            this.queryIDs = queryIDs;
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: "_buildDataCallbacks",
	        value: function _buildDataCallbacks(sensorThingsConfiguration) {
	            var _this = this;

	            // clear data array
	            this.allData = [];
	            this.dataObserverCallbacks = [];

	            var n = 0;
	            //Add callback for each dataStreamUrl

	            var _loop = function (stconfig) {
	                // create callback for dataStreamUrl
	                _this.allData.push([]);
	                var pos = n;
	                _this.dataObserverCallbacks.push((function (data) {
	                    if (logging) console.log("pushing data:", data, pos);
	                    this.allData[pos] = data;
	                    for (var k in this.dataCallbacks) {
	                        this.dataCallbacks[k](this.allData);
	                    }
	                }).bind(_this));
	                n++;
	            };

	            for (var stconfig in sensorThingsConfiguration) {
	                _loop(stconfig);
	            }
	            if (logging) console.log("Build " + n + " DataCallbacks");
	        }
	    }]);

	    return MapWidgetData;
	})();

	exports.MapWidgetData = MapWidgetData;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _langEnJs = __webpack_require__(7);

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _UserConfigurationViewJs = __webpack_require__(28);

	var _DataObserverDataQueryObserverProxyJs = __webpack_require__(29);

	var _view = null;
	var _gridstack = null;
	var _userEvents = null;
	var _userConfigurationView = null;
	var _cf = null;

	var logging = false;

	/**
	 * Creates the dashboard as shown to the user. Handles the actual code for the dashboard, responsible for inserting and removing widgets.
	 */

	var View = (function () {
	    /**
	     * Constructs the visual part of the dashboard
	     * @param {string} id The id of the div the dashboard should be placed in
	     * @param {boolean} transparent True if the background of the dashboard should be transparent
	     * @param {boolean} disableConfig True if configuration of dashboard and its widgets should be disabled
	     * @param {boolean} disableImExCMS True if Import and Export of Configurations should be disabled
	     * @param {boolean} disableUpDownload True if up- and download should be disabled
	     * @param {string} lang The name of the object holding all Strings to be displayed in the View in the correct language
	     * @param {function} callback The function to be called once the view is all set up
	     **/

	    function View(id, transparent, disableConfig, disableImExCMS, disableUpDownload, enableNoDistr, lang, callback) {
	        _classCallCheck(this, View);

	        if (!_view && id != undefined) {
	            _view = this;
	            _cf = {
	                id: id,
	                transparent: transparent,
	                disableConfig: disableConfig,
	                disableImExCMS: disableImExCMS,
	                disableUpDownload: disableUpDownload,
	                enableNoDistr: enableNoDistr,
	                lang: lang,
	                callback: callback
	            };
	            _view._setUpLanguage(_cf.lang);
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	            _userConfigurationView = new _UserConfigurationViewJs.UserConfigurationView();
	            new _DataObserverDataQueryObserverProxyJs.DataQueryObserverProxy();

	            $(document).ready(_view._loadDashboardHTML);
	        }

	        return _view;
	    }

	    /**
	     * Loads the HTML into the div element
	     * @private
	     */

	    _createClass(View, [{
	        key: "_loadDashboardHTML",
	        value: function _loadDashboardHTML() {
	            $("#iot-db").load(window.iotBaseDir + "iotwebdashboard.html", _view._initializeDashboard);
	        }

	        /**
	         * sets up the dashboard once the HTML was loaded into the DOM
	         * @private
	         **/
	    }, {
	        key: "_initializeDashboard",
	        value: function _initializeDashboard() {
	            //Apply language file
	            $("#btn-configure").text(window.iotlg.headerConf);
	            $("#addwidget_dropdown").html(window.iotlg.headerAddNew + " <span class='caret'></span>");
	            $("#iotdbHeaderTitle").text(_userEvents.loadUserConfig().getDashboardConfig().getTitle());
	            $("#conf_upload").text(window.iotlg.configUpload);
	            $("#conf_download").text(window.iotlg.configDownload);
	            $("#conf_import").text(window.iotlg.configImport);
	            $("#conf_export").text(window.iotlg.configExport);
	            $("#conf_save").text(window.iotlg.configSave);

	            //Options for Gridstack
	            var widgetHeight = Math.round($("#" + _cf.id).width() * 0.8 * 60 / 800);
	            var options = {
	                float: true,
	                animate: true,
	                cellHeight: widgetHeight,
	                disableDrag: _cf.disableConfig,
	                disableResize: _cf.disableConfig
	            };
	            //Start up gridstack
	            $(".grid-stack").gridstack(options);
	            _view._gridstack = $(".grid-stack").data("gridstack");

	            //Listen for resizes, adds and moves of widgets
	            $(".grid-stack").on("change", _userEvents.widgetChange);

	            //Add all the onClick Listeners
	            $("#btn-configure").click(function (e) {
	                return _userConfigurationView._toggleConfigure();
	            });
	            $("#addwidget_dropdown").ready(function () {
	                return _view._loadDropdownItems();
	            });
	            $("#conf_close").click(function (e) {
	                return _userConfigurationView._toggleConfigure();
	            });
	            $("#conf_save").click(function (e) {
	                return _userConfigurationView._saveConfig();
	            });
	            $("#conf_upload").click(function () {
	                return _userConfigurationView._importConfig();
	            });
	            $("#conf_download").click(function (e) {
	                return _userConfigurationView._exportConfig();
	            });
	            $("#conf_import").click(function (e) {
	                return _userConfigurationView._importFromCMS();
	            });
	            $("#conf_export").click(function (e) {
	                return _userConfigurationView._exportToCMS();
	            });
	            $("#btn-no-distraction").click(function () {
	                return _view._toggleDistraction();
	            });

	            //Watch out for changes
	            $("#conf-input-title").on('input', function () {
	                return _userConfigurationView._setModified(true);
	            });

	            //Apply the configuration
	            if (_cf.transparent) {
	                $("#iot-db").css("background-color", "transparent");
	            }
	            if (_cf.disableImExCMS) {
	                $("#conf_import").remove();
	                $("#conf_export").remove();
	            }
	            if (_cf.disableUpDownload) {
	                $("#conf_download").remove();
	                $("#conf_upload").remove();
	            }
	            if (_cf.disableConfig) {
	                var styleTag = $('<style>.remove-widget-button, .configureWidgetButton { display: none; }</style>');
	                $('html > head').append(styleTag);
	                $("#btn-no-distraction").remove();
	                $("#btn-configure").remove();
	                $("#addwidget_dropdown").remove();
	            }
	            if (_cf.enableNoDistr) {
	                $("#iot-db").addClass("no-distract");
	            }
	            if (_cf.callback) {
	                _cf.callback();
	            }
	        }

	        /**
	         * Sets up the language variable, inserting missing translations
	         * @private
	         **/
	    }, {
	        key: "_setUpLanguage",
	        value: function _setUpLanguage(lang) {
	            if (lang === "en" || window[lang] === undefined) {
	                window.iotlg = _langEnJs.en;
	            } else {
	                //Set the correct language object
	                window.iotlg = window[lang];

	                //Fill default values for missing translations
	                for (var key in _langEnJs.en) {
	                    if (_langEnJs.en.hasOwnProperty(key)) {
	                        if (!window.iotlg.hasOwnProperty(key)) {
	                            window.iotlg[key] = _langEnJs.en[key];
	                        }
	                    }
	                }
	            }

	            //Set the resource names
	            window.iotlg.widgetResName1 = "BarGraph";
	            window.iotlg.widgetResName2 = "Gauge";
	            window.iotlg.widgetResName3 = "LineGraph";
	            window.iotlg.widgetResName4 = "Map";
	            window.iotlg.widgetResName5 = "PlainData";
	            window.iotlg.widgetResName6 = "PlainText";
	            window.iotlg.widgetResName7 = "Thermometer";
	            window.iotlg.widgetResName8 = "TrafficLight";
	        }

	        /**
	         * Remove the widget from the dashboard by their id
	         * @param {string} htmlId The id of the html-element to be removed. This id can be different to the id saved by gridstack!
	         **/
	    }, {
	        key: "removeWidget",
	        value: function removeWidget(htmlId) {
	            htmlId = "#" + htmlId;
	            _view._gridstack.removeWidget($(htmlId).parent());
	        }

	        /**
	         * Adds a new Widget with the provided html to the dashboard
	         * at the first free place
	         * @param {int} id the html for the widget, saved by gridstack
	         * @param {HTML} html the html for the widget
	         **/
	    }, {
	        key: "addWidget",
	        value: function addWidget(id, html) {
	            // Add Widget to gridstack
	            _view._gridstack.addWidget(html, 0, 0, 5, 5, true, null, null, null, null, id);
	            //Add resize listener
	            $(html).find(".ui-resizable-se").mouseup(function (e) {
	                return setTimeout(function () {
	                    return $(e.target.parentElement).find(".rgraph_domtext_wrapper").resize();
	                }, 300);
	            });
	            $(html).find(".rgraph_domtext_wrapper").resize();
	        }

	        /**
	         * Adds a new Widget with the provided html to the dashboard
	         * at the given position and with the given size
	         * @param {HTML} html the html for the widget
	         * @param {int} x position x of the widget
	         * @param {int} y position y of the widget
	         * @param {int} width Width of the widget
	         * @param {int} height height of the widget
	         **/
	    }, {
	        key: "addWidgetAtPosition",
	        value: function addWidgetAtPosition(id, html, x, y, width, height) {
	            // Add Widget to gridstack
	            _view._gridstack.addWidget(html, x, y, width, height);

	            $(html).find(".ui-resizable-se").mouseup(function (e) {
	                return setTimeout(function () {
	                    return $(e.target.parentElement).find(".rgraph_domtext_wrapper").resize();
	                }, 300);
	            });
	            $(html).find(".rgraph_domtext_wrapper").resize();
	        }

	        /**
	         * Get the size and position of a widget in the DOM
	         * @param {String} id The id the widget has in the DOM, not the Gridstack Id!
	         * @return {Array} [position, size], where position and size are objects with
	         * x & y or width & height keys
	         */
	    }, {
	        key: "getWidgetAttrFromId",
	        value: function getWidgetAttrFromId(id) {
	            var result = $("#" + id).parent();
	            var position = {
	                "x": result.attr("data-gs-x"),
	                "y": result.attr("data-gs-y")
	            };
	            var size = {
	                "width": result.attr("data-gs-width"),
	                "height": result.attr("data-gs-height")
	            };
	            return [position, size];
	        }

	        /**
	         * Adds a click handler to the "Add Widget" menu item with the given data type. On click, a widget of the given type will be added
	         * @param {int} type Type of the widget
	         * @private
	         */
	    }, {
	        key: "_setAddWidgetItemOnClick",
	        value: function _setAddWidgetItemOnClick(type) {
	            var a = $('a[data-type=' + type + ']');
	            a = a[0];
	            a.onclick = function (e) {
	                _userEvents.addWidget(e.target.getAttribute("data-type"));
	            };
	        }

	        /**
	         * Loads widget types into UI dynamically, add click handler
	         * @private
	         */
	    }, {
	        key: "_loadDropdownItems",
	        value: function _loadDropdownItems() {
	            var menu = $('#addwidget_dropdown_menu')[0];
	            var widgetTypes = _view._getWidgetTypes();
	            menu.innerHTML = "";
	            menu.style.padding = "0px 0";
	            for (var index in widgetTypes) {
	                var type = widgetTypes[index];
	                menu.appendChild(_view._getDropdownMenuItem(type, window.iotlg['widgetName' + type], window.iotlg['widgetResName' + type]));
	                //involves UserEvents, not accessible from here
	                _view._setAddWidgetItemOnClick(type);
	            }
	        }

	        /**
	         * Wraps the given String into a new dropdown menu item, which then can be displayed in the "Add Widget"-Menu
	         * @param type Numeral type of the Widget
	         * @param name Name of the widget type
	         * @param resName Name of the image resource for this type
	         * @returns {Element} LI-Element to be added to document
	         * @private
	         */
	    }, {
	        key: "_getDropdownMenuItem",
	        value: function _getDropdownMenuItem(type, name, resName) {
	            var li = document.createElement("LI");
	            li.classList.add("dropdown-item");
	            li.innerHTML = "<a href=\"#\" data-type=\"" + type + "\">" + name + "</a>";
	            li.style.backgroundImage = "url('" + window.iotBaseDir + "res/" + resName + ".png')";
	            return li;
	        }

	        /**
	         * Returns an Array of identifiers of widgets that are currently loading a new DataStream.
	         * @return {Array} The loading widgets
	         */
	    }, {
	        key: "getLoadingWidgets",
	        value: function getLoadingWidgets() {
	            if (_view._loadingWidgets == undefined) {
	                _view._loadingWidgets = [];
	            }
	            return _view._loadingWidgets;
	        }

	        /**
	         * Adds the given widget identifier to the list of loading widgets and invokes the "loading" status.
	         * @param id new loading widget
	         */
	    }, {
	        key: "pushLoading",
	        value: function pushLoading(id) {
	            if (_view._loadingWidgets == undefined) {
	                _view._loadingWidgets = [];
	            }
	            _view._loadingWidgets.push(id);
	            _view.setLoading(_view._loadingWidgets.length > 0);
	            if (logging) console.log("loading... " + _view._loadingWidgets.length);
	        }

	        /**
	         * Removes the given widget identifier from the list of loading widgets and terminates the "loading" status if
	         * it is now empty
	         * @param id identifier of widget that has finished loading
	         */
	    }, {
	        key: "popLoading",
	        value: function popLoading(id) {
	            if (_view._loadingWidgets == undefined) {
	                _view._loadingWidgets = [];
	            }
	            var i = _view._loadingWidgets.indexOf(id);
	            if (i == -1) {
	                if (logging) console.log("WARNING: loading widget not found.");
	            } else {
	                //remove from list
	                _view._loadingWidgets.splice(i, 1);
	            }
	            _view.setLoading(_view._loadingWidgets.length > 0);
	            if (logging) console.log("finished loading... " + _view._loadingWidgets.length);
	        }

	        /**
	         * Setter for the "loading" class tag of the dashboard.
	         * @param loading If true, a loading cursor appears.
	         */
	    }, {
	        key: "setLoading",
	        value: function setLoading(loading) {
	            if (loading) {
	                $("#iot-db").addClass("loading");
	            } else {
	                $("#iot-db").removeClass("loading");
	            }
	        }

	        /*
	         * Switches the CSS Stylesheet between the standard and the no-replacement style.
	         * @private
	         */
	    }, {
	        key: "_toggleDistraction",
	        value: function _toggleDistraction() {
	            $("#iot-db").toggleClass("no-distract");
	            $(".rgraph_domtext_wrapper").resize();
	        }

	        /**
	         * Returns a list of widget types.
	         * @private
	         * @returns {array} an array of Integers.
	         */
	    }, {
	        key: "_getWidgetTypes",
	        value: function _getWidgetTypes() {
	            return [WIDGET_TYPE_BARGRAPH, WIDGET_TYPE_GAUGE, WIDGET_TYPE_LINEGRAPH, WIDGET_TYPE_MAP, WIDGET_TYPE_PLAINDATA, WIDGET_TYPE_PLAINTEXT, WIDGET_TYPE_THERMOMETER, WIDGET_TYPE_TRAFFICLIGHT];
	        }
	    }]);

	    return View;
	})();

	exports.View = View;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var en = {

	    //Navbar
	    "headerConf": "Configure",
	    "headerAddNew": "Add Widget",
	    "headerDefTitle": "Default",

	    "widgetDefTitle": "Default Widget",
	    "widgetLineGraphTitle": "Line Graph Widget",
	    "widgetGaugeTitle": "Gauge Widget",
	    "widgetMapTitle": "Map Widget",
	    "widgetPlainTextTitle": "Plain Text Widget",
	    "widgetPlainDataTitle": "Plain Data Widget",
	    "widgetThermometerTitle": "Thermometer Widget",
	    "widgetTrafficLightTitle": "Traffic Light Widget",
	    "widgetLastUpdate": "Last update",
	    "widgetName1": "BarGraph",
	    "widgetName2": "Gauge",
	    "widgetName3": "LineGraph",
	    "widgetName4": "Map",
	    "widgetName5": "PlainData",
	    "widgetName6": "PlainText",
	    "widgetName7": "Thermometer",
	    "widgetName8": "TrafficLight",

	    //Dashboard Config Menu
	    "dbTitle": "Title: ",
	    "dbConfig": "Configure ",
	    "addButton": "Add",
	    "configDownload": "Download",
	    "configUpload": "Upload",
	    "configImport": "Import from CMS",
	    "configExport": "Export to CMS",
	    "configSave": "Apply",
	    "warningConfigModified": "The Dashboard Configuration has been modified. Please apply or discard the changes before exporting or downloading the configuration.",
	    //Widget Configuration
	    "dataStreamUrl_Tooltip": "URL to a datastream",
	    "mqttEnabled_Tooltip": "If the Datastream should use MQTT",
	    "mqttUrl_Tooltip": "The Url to the MQTT Service",
	    "mqttBaseTopic_Tooltip": "The Topic for the DataStream to be watched",
	    "updateIntervalMs_Tooltip": "The updateinterval for a not MQTT widget in milliseconds",

	    "dateFormat": "yyyy/mm/dd hh:MM:ss",
	    //Map Widget
	    "zoom_Tooltip": "Standard Zoom Level",
	    "mapURL_Tooltip": "Url to retrieve the Map",
	    "attribution_Tooltip": "Attribution",
	    "latitude_Tooltip": "Startpoint latitude",
	    "longitude_Tooltip": "Startpoint longitude",
	    "overlays_Tooltip": "Add overlays here",
	    "title_Tooltip": "Title of the Widget",
	    "timeIntervalRelative_Tooltip": "Relative timeinterval",
	    "timeIntervalUnit_Tooltip": "Unit of the timeinterval",
	    "startTime_Tooltip": "Starttime for an absolute timeinterval",
	    "endTime_Tooltip": "Endtime for an absolute timeinterval",
	    "timeInterval_Tooltip": "Size of a relative timeinterval",

	    //GaugeWidgetData
	    "shadow_Tooltip": "Usage of a shadow",
	    "textColor_Tooltip": "Color of the text",
	    "tickmarksBigColor_Tooltip": "The color of the big tickmarks on the chart",
	    "tickmarksMediumColor_Tooltip": "The color of the medium tickmarks on the chart.",
	    "tickmarksSmallColor_Tooltip": "The color of the small tickmarks on the chart",
	    "backgroundColor_Tooltip": "The background color of the chart.",
	    "borderInnerColor_Tooltip": "This is the color of the inner border.",
	    "borderOuterColor_Tooltip": "This is the color of the outer border",
	    "borderOutlineColor_Tooltip": "This is the color of the border around the Gauge",
	    "needleColor_Tooltip": "This is the color of the needle",
	    "needleType_Tooltip": "The appearance of the needles. It can be triangle or line",
	    "needleTail_Tooltip": "Whether the tail for the needle is shown",
	    "centerpinRadius_Tooltip": "This is ths radius of the centerpin",
	    "titleTop_Tooltip": "Title on top of the Gauge, if any",
	    "titleTopSize_Tooltip": "Size of the title on top",
	    "titleTopColor_Tooltip": "Color of the title on top",
	    "titleBottom_Tooltip": "Title below the Gauge",
	    "titleBottomColor_Tooltip": "Color of the title below",
	    "titleBottomSize_Tooltip": "Size of the title below",
	    "labelsCentered_Tooltip": "Whether the labels are centered horizontally and vertically",
	    "labelsOffset_Tooltip": "This is the offset the labels are positioned at",
	    "textAccessible_Tooltip": "Allows DOM in places of canvas text",
	    "colorsRanges_Tooltip": "With this you can totally control the colors used on the chart",

	    //LineGraphWidget
	    "xscale_Tooltip": "Sets the x scale",
	    "backgroundGridBorder_Tooltip": "Determines whether a border line is drawn around the grid",
	    "backgroundGridVlines_Tooltip": "Determines whether to draw the vertical grid lines",
	    "backgroundBarcolor1_Tooltip": "The color of the background bars (1 of 2)",
	    "backgroundBarcolor2_Tooltip": "The color of the background bars (2 of 2)",
	    "backgroundGridColor_Tooltip": "The color of the background grid",
	    "tickmarks_Tooltip": "What kind of tickmarks to use on the chart",
	    "ticksize_Tooltip": "Sets size of the tickmarks",
	    "line_Tooltip": "Defines the different lines",
	    "lineColors_Tooltip": "Colors of the lines",
	    "titleXaxis_Tooltip": "Title on the X Axis",
	    "titleYaxis_Tooltip": "Title on the Y Axis",
	    "pointColor_Tooltip": "Color of the Points to draw",
	    "ymin_Tooltip": "Minimum value on the Y Axis",

	    //PlainDataWidget
	    "valueSize_Tooltip": "Fontsize of the Value",
	    "unitSize_Tooltip": "Fontsize of the Unit",
	    "unit_Tooltip": "Unit to show after the Value",

	    //PlainText
	    "textWidgetDefaultText": "Click on the Configuration Button to customize this text.",
	    "fontSize_Tooltip": "The fontsize for the text",
	    "text_Tooltip": "Text to display",

	    //Thermometer
	    "max_Tooltip": "Maximum of the Range",
	    "min_Tooltip": "Minimum of the Range",
	    "scaleVisible_Tooltip": "Defaulting to false, this controls whether the scale is visible",
	    "scaleDecimals_Tooltip": "This allows you to control the amount of decimals that the labels have. MIN: 0, MAX: 20",
	    "gutterLeft_Tooltip": "Space to the left",
	    "gutterRight_Tooltip": "Space to the right",
	    "valueLabel_Tooltip": "Enable the Value Label",

	    //TrafficLightWidget
	    "lower_Tooltip": "Value of the lower end of the Yellow Range",
	    "higher_Tooltip": "Value of the upper end of the Yellow Range"
	};
	exports.en = en;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _DashboardServicesDashboardServicesJs = __webpack_require__(9);

	var _ImportExportImportExportJs = __webpack_require__(26);

	var _DataModelDataModelProxyJs = __webpack_require__(1);

	var userEvents = null;
	var dashboardServices = null;
	var importExport = null;
	var dataModelProxy = null;

	/**
	 * Handles all Events triggered by the User
	 **/

	var UserEvents = (function () {
	    /**
	     * Implements Singleton
	     **/

	    function UserEvents() {
	        _classCallCheck(this, UserEvents);

	        if (!userEvents) {
	            userEvents = this;
	            dashboardServices = new _DashboardServicesDashboardServicesJs.DashboardServices();
	            importExport = new _ImportExportImportExportJs.ImportExport();
	            dataModelProxy = new _DataModelDataModelProxyJs.DataModelProxy();
	        }
	        return userEvents;
	    }

	    /**
	     * Loads the UserConfig
	     * @returns {UserConfig} The current UserConfig
	     */

	    _createClass(UserEvents, [{
	        key: 'loadUserConfig',
	        value: function loadUserConfig() {
	            return dashboardServices.loadUserConfig();
	        }

	        /**
	         * Sets the UserConfig
	         * @param {UserConfig} conf The new UserConfig to be set
	         */
	    }, {
	        key: 'setUserConfig',
	        value: function setUserConfig(conf) {
	            dashboardServices.setUserConfig(conf);
	        }

	        /**
	         * Applies the new configuration to the dashboard
	         */
	    }, {
	        key: 'dashboardConfigChanged',
	        value: function dashboardConfigChanged() {
	            var userConfig = userEvents.loadUserConfig();
	            dashboardServices.applyConfig(userConfig);
	        }

	        /**
	         * Adds a widget of the given type to the dashboard with the default configuration
	         * @param {int} type The type of the new widget. Int to type mapping can be found in main.js
	         */
	    }, {
	        key: 'addWidget',
	        value: function addWidget(type) {
	            dashboardServices.createWidget(type);
	        }

	        /**
	         * Remove existing Widget from dashboard with the supplied element itselve
	         * @param {String} id The id of the Widget. If id is not existing, none will be removed
	         */
	    }, {
	        key: 'removeWidget',
	        value: function removeWidget(id) {
	            dashboardServices.removeWidget(id);
	        }

	        /**
	         * Listener to be called when position or size of widgets changes
	         * @param event The Event which triggered the widget change
	         * @param items The items which were changed by the event
	         */
	    }, {
	        key: 'widgetChange',
	        value: function widgetChange(event, items) {
	            //if items is undefined, it was a remove event which is not handeled through this function
	            if (items) {
	                items.forEach(function (item) {
	                    var data = dataModelProxy.getWidgetData(item.id);
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
	        }
	    }, {
	        key: 'configureWidget',

	        /**
	         * Configure the widget with a specific id.
	         * This event will open a configuration dialog in order to specify every possible option.
	         * @param {String} id The id of the Widget. If the id is not existing, none will be configured.
	         */
	        value: function configureWidget(id) {
	            dashboardServices.configureWidget(id);
	        }

	        /**
	         * starts the import process from a local file system.
	         */
	    }, {
	        key: 'importConfig',
	        value: function importConfig() {
	            importExport.configJSONImport();
	        }

	        /**
	         * starts the export process to a local file system.
	         */
	    }, {
	        key: 'exportConfig',
	        value: function exportConfig() {
	            importExport.configJSONExport();
	        }

	        /**
	         * calls the function set from outside to take care of importing from CMS, if one was set
	         */
	    }, {
	        key: 'importFromCMS',
	        value: function importFromCMS() {
	            if (window.iotDB.onLoadConfig) {
	                window.iotDB.onLoadConfig();
	            }
	        }

	        /**
	         * calls the function set from outside to take care of exporting to CMS, if one was set
	         */
	    }, {
	        key: 'exportToCMS',
	        value: function exportToCMS() {
	            if (window.iotDB.onSaveConfig) {
	                window.iotDB.onSaveConfig();
	            }
	        }
	    }]);

	    return UserEvents;
	})();

	exports.UserEvents = UserEvents;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _WidgetFactoryJs = __webpack_require__(10);

	var _MapWidgetFactoryJs = __webpack_require__(13);

	var _DataModelConfigWidgetDataDataWidgetDataMapWidgetDataJs = __webpack_require__(5);

	var _ViewViewJs = __webpack_require__(6);

	var _DataModelDataModelProxyJs = __webpack_require__(1);

	var _ViewWidgetConfigurationViewJs = __webpack_require__(19);

	var dashboardServices = null;
	var dataModelProxy = null;
	var widgetFactory = null;
	var view = null;

	/**
	 * In charge of handling the creation of new widgets
	 **/

	var DashboardServices = (function () {
	    /**
	     * Implements Singleton
	     **/

	    function DashboardServices() {
	        _classCallCheck(this, DashboardServices);

	        if (!dashboardServices) {
	            dashboardServices = this;
	            widgetFactory = new _WidgetFactoryJs.WidgetFactory();
	            view = new _ViewViewJs.View();
	            dataModelProxy = new _DataModelDataModelProxyJs.DataModelProxy();
	        }
	        return dashboardServices;
	    }

	    /*
	     * Get the current UserConfig
	     * @return {UserConfig} The currently loaded UserConfig
	     */

	    _createClass(DashboardServices, [{
	        key: 'loadUserConfig',
	        value: function loadUserConfig() {
	            return dataModelProxy.getUserConfig();
	        }

	        /*
	         * Sets UserConfig to new UserConfig
	         * @param {UserConfig} conf the new UserConfig
	         */
	    }, {
	        key: 'setUserConfig',
	        value: function setUserConfig(conf) {
	            dataModelProxy.setUserConfig(conf);
	        }

	        /**
	         * Applies the given config to the dashboard
	         * @param the config to be applied
	         */
	    }, {
	        key: 'applyConfig',
	        value: function applyConfig(conf) {
	            $(".navbar-brand").text(conf.dashboardConfig.getTitle());
	            $("#conf_title").text(window.iotlg.dbConfig + conf.dashboardConfig.getTitle());
	        }

	        /**
	         * Creates a new Widget using the supplied parameters
	         * @param {int} type The type of the widget which should be created. Mappings int -> type can be seen in main.js
	         * If null defaults will be used
	         **/
	    }, {
	        key: 'createWidget',
	        value: function createWidget(type, params) {
	            //The function to be called once the widget is created
	            var callback = function callback(id, dataUpdate, configUpdate) {
	                //Get configurableData, position and size to save it in the datamodel
	                var result = view.getWidgetAttrFromId(id);
	                dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, params, result[0], result[1]);
	                /*dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, result[0], result[1]);*/
	            };
	            type = parseInt(type);
	            /*let widget = widgetFactory.createWidget(params, type, callback);*/
	            var widget = widgetFactory.createWidget(type, callback);
	            view.addWidget("iotdbWidget" + widget[0], widget[1]);
	        }

	        /**
	         * Creates a new Widget using the supplied parameters, at the given position and size
	         * @param {int} type The Type of the widget which will be created. Mappings int -> type can be seen in main.js
	         * @param {Object} position needs to have "x" and "y" attributes containing the position
	         * @param {Object} size needs to have "width" and "height" attributes containing the size
	         */
	    }, {
	        key: 'createWidgetWithPosAndSize',
	        value: function createWidgetWithPosAndSize(type, position, size, params) {
	            var callback = function callback(id, dataUpdate, configUpdate) {
	                dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, params, position, size);
	                /*dataModelProxy.addWidget(id, dataUpdate, configUpdate, type, position, size);*/
	            };
	            type = parseInt(type);
	            /*let widget = widgetFactory.createWidget(params, type, callback);*/
	            var widget = widgetFactory.createWidget(type, callback);
	            view.addWidgetAtPosition("iotdbWidget" + widget[0], widget[1], position.x, position.y, size.width, size.height);
	        }

	        /**
	         * Creates new widgets, based on the userConfig
	         * @param {object} data a widgetConfig
	         */
	    }, {
	        key: 'createWidgetsFromConfig',
	        value: function createWidgetsFromConfig(data) {
	            var configs = data.widgetDataArray;
	            for (var i = 0; i < configs.length; i++) {
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
	    }, {
	        key: 'removeWidget',
	        value: function removeWidget(id) {
	            // if a map is removed, the factory has to be informed to update the array of all layers
	            var data = dataModelProxy.getWidgetData(id);
	            if (data instanceof _DataModelConfigWidgetDataDataWidgetDataMapWidgetDataJs.MapWidgetData) {
	                new _MapWidgetFactoryJs.MapWidgetFactory(null).removeLayerGroup(id);
	            }
	            dataModelProxy.removeWidgetData(id);
	        }

	        /**
	         * Configure the widget with a specific id.
	         * This event will open a configuration dialog in order to specify every possible option.
	         * @param {String} id The id of the Widget. If the id is not existing, none will be configured.
	         */
	    }, {
	        key: 'configureWidget',
	        value: function configureWidget(id) {
	            var widgetConfigurationView = new _ViewWidgetConfigurationViewJs.WidgetConfigurationView(dataModelProxy.getWidgetData(id));
	        }
	    }]);

	    return DashboardServices;
	})();

	exports.DashboardServices = DashboardServices;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _GaugeWidgetFactoryJs = __webpack_require__(11);

	var _LineGraphWidgetFactoryJs = __webpack_require__(12);

	var _MapWidgetFactoryJs = __webpack_require__(13);

	var _PlainDataWidgetFactoryJs = __webpack_require__(14);

	var _PlainTextWidgetFactoryJs = __webpack_require__(15);

	var _ThermometerWidgetFactoryJs = __webpack_require__(16);

	var _TrafficLightWidgetFactoryJs = __webpack_require__(17);

	var _BarGraphWidgetFactoryJs = __webpack_require__(18);

	var _gaugeWidgetFactory = null;
	var _lineGraphWidgetFactory = null;
	var _barGraphWidgetFactory = null;
	var _mapWidgetFactory = null;
	var _thermometerWidgetFactory = null;
	var _plainDataWidgetFactory = null;
	var _plainTextWidgetFactory = null;
	var _trafficLightWidgetFactory = null;
	var _widgetFactory = null;
	var _nextWidgetId = null;

	//The default template for a widget using the canvas
	var _canvasWidgetTemplate = '\n        <div id="templateWidget" class="grid-stack-item-content">\n        <div class="widget-header">\n        <div class="widget-title">\n        Widget-Title & Info\n</div>\n    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>\n    </div>\n    <canvas id="templateWidgetCanvas" width="350" height="280"></canvas>\n    <div class="widget-footer">\n    <div class="lastUpdate" id="templateWidgetLastUpdate">\n    </div>\n    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">\n    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>\n    </button>\n    </div>\n    </div>';

	/**
	 * Responsible for creating widgets
	 **/

	var WidgetFactory = (function () {
	    //Implements singleton

	    function WidgetFactory() {
	        _classCallCheck(this, WidgetFactory);

	        if (!_widgetFactory) {
	            _widgetFactory = this;
	            _nextWidgetId = 0;
	            _gaugeWidgetFactory = new _GaugeWidgetFactoryJs.GaugeWidgetFactory(this);
	            _lineGraphWidgetFactory = new _LineGraphWidgetFactoryJs.LineGraphWidgetFactory(this);
	            _barGraphWidgetFactory = new _BarGraphWidgetFactoryJs.BarGraphWidgetFactory(this);
	            _mapWidgetFactory = new _MapWidgetFactoryJs.MapWidgetFactory(this);
	            _plainDataWidgetFactory = new _PlainDataWidgetFactoryJs.PlainDataWidgetFactory(this);
	            _plainTextWidgetFactory = new _PlainTextWidgetFactoryJs.PlainTextWidgetFactory(this);
	            _thermometerWidgetFactory = new _ThermometerWidgetFactoryJs.ThermometerWidgetFactory(this);
	            _trafficLightWidgetFactory = new _TrafficLightWidgetFactoryJs.TrafficLightWidgetFactory(this);
	        }
	        return _widgetFactory;
	    }

	    /**
	     * Creates a new widget in the dashboard
	     * @param {int} type The type of the widget to create. Mappings int -> Type can be seen in main.js
	     * @param {function} callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	     *           1. The id the widget has within the DOM
	     *           2. The function to call when new data has arrived, with the new data as an argument
	     * @return {Array} [id of the new Widget, html of the new widget], -1 of widget Type doesn't exist
	     **/

	    _createClass(WidgetFactory, [{
	        key: 'createWidget',
	        value: function createWidget(type, callback) {
	            //generate the next id
	            var id = _nextWidgetId++;
	            var html = "";
	            switch (type) {
	                case WIDGET_TYPE_GAUGE:
	                    html = _gaugeWidgetFactory.create(id, callback, _canvasWidgetTemplate);
	                    break;
	                case WIDGET_TYPE_LINEGRAPH:
	                    html = _lineGraphWidgetFactory.create(id, callback, _canvasWidgetTemplate);
	                    break;
	                case WIDGET_TYPE_BARGRAPH:
	                    html = _barGraphWidgetFactory.create(id, callback, _canvasWidgetTemplate);
	                    break;
	                case WIDGET_TYPE_MAP:
	                    html = _mapWidgetFactory.create(id, callback);
	                    break;
	                case WIDGET_TYPE_PLAINDATA:
	                    html = _plainDataWidgetFactory.create(id, callback);
	                    break;
	                case WIDGET_TYPE_PLAINTEXT:
	                    html = _plainTextWidgetFactory.create(id, callback);
	                    break;
	                case WIDGET_TYPE_THERMOMETER:
	                    html = _thermometerWidgetFactory.create(id, callback, _canvasWidgetTemplate);
	                    break;
	                case WIDGET_TYPE_TRAFFICLIGHT:
	                    html = _trafficLightWidgetFactory.create(id, callback);
	                    break;
	                default:
	                    alert("This type is yet to be implemented.");
	                    return -1;
	            }
	            return [id, html];
	        }

	        /**
	         * @return {String} The current time nicely formatted, Hours:Minutes:Seconds
	         */
	    }, {
	        key: 'getCurrentTimePretty',
	        value: function getCurrentTimePretty() {
	            var date = new Date();
	            var nums = [date.getHours(), date.getMinutes(), date.getSeconds()];
	            for (var i = 0; i < nums.length; i++) {
	                if (nums[i] < 10) {
	                    nums[i] = "0" + nums[i];
	                }
	            }
	            return nums[0] + ":" + nums[1] + ":" + nums[2];
	        }

	        /**
	         * Creates a Date string according to the set language.
	         * @param {Date} date The date to format
	         * @return {String} The date in the correct format
	         */
	    }, {
	        key: 'getTimePretty',
	        value: function getTimePretty(date) {
	            function elongate(int) {
	                return int < 10 ? "0" + int : "" + int;
	            }
	            var dateString = window.iotlg.dateFormat;

	            dateString = dateString.replace('yyyy', date.getFullYear()).replace("mm", elongate(date.getMonth() + 1)).replace("dd", elongate(date.getDate())).replace("hh", elongate(date.getHours())).replace("MM", elongate(date.getMinutes())).replace("ss", elongate(date.getSeconds()));

	            return dateString;
	        }
	    }]);

	    return WidgetFactory;
	})();

	exports.WidgetFactory = WidgetFactory;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _ViewViewJs = __webpack_require__(6);

	var _DataModelConfigWidgetConfigJs = __webpack_require__(4);

	var _gaugeWidgetFactory = null;
	var _widgetFactory = null;
	var _userEvents = null;

	/**
	 * Responsible for setting up new GaugeWidgets
	 **/

	var GaugeWidgetFactory = (function () {
	    //Implements singleton

	    function GaugeWidgetFactory(widgetFactory) {
	        _classCallCheck(this, GaugeWidgetFactory);

	        if (!_gaugeWidgetFactory) {
	            _gaugeWidgetFactory = this;
	            _widgetFactory = widgetFactory;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	        }
	        return _gaugeWidgetFactory;
	    }

	    /**
	     * This will return a properly formated Object, that return a propper array at config.key.value
	     * Arrays will be real array containing their data
	     * @param configurable Data that should be formated
	     * @return formated data
	     */

	    _createClass(GaugeWidgetFactory, [{
	        key: "_formatConfigurableData",
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            var res = [];
	                            for (var k in d.data) {
	                                res.push(d.data[k].data);
	                            }
	                            if (res.length == 1) {
	                                return res[0];
	                            } else {
	                                return res;
	                            }
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            return formattedObject;
	        }

	        /**
	         * Creates a new Gauge widget
	         * @param {String} id The id of the new widget
	         * @param {Function} callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @param {HTML} htmlTemplate The default template for Canvas widgets
	         **/
	    }, {
	        key: "create",
	        value: function create(id, callback, htmlTemplate) {
	            var _this = this;

	            var html = $('<div/>').prepend(htmlTemplate);

	            //create the id to be set in html
	            var htmlId = "iotdbWidget" + id;
	            var htmlIdSelector = "#" + htmlId;

	            //When html of widget is loaded, set up gauge in canvas
	            $("#templateWidgetCanvas").ready(function () {

	                //Replace dummy ids with real ones
	                $("#templateWidget").attr("id", htmlId);
	                $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
	                $("#templateWidgetCanvas").attr("id", htmlId + "-canvas");

	                //Resize inner map after 0.1 seconds
	                $("#" + ("" + htmlId)).parent().resize(function () {
	                    _gaugeWidgetFactory._resizeCanvas(htmlId);
	                });

	                // Set correct language for title
	                $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetGaugeTitle);

	                // Set remove callback
	                $(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                $(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                //Setup the actual gauge via RGraph
	                var gauge = new RGraph.Gauge({
	                    id: htmlId + '-canvas',
	                    min: 0,
	                    max: 100,
	                    value: 0,
	                    options: {
	                        anglesStart: RGraph.PI - RGraph.PI / 8,
	                        anglesEnd: RGraph.TWOPI + RGraph.PI / 8,
	                        shadow: false,
	                        textColor: '#FFFFFF',
	                        tickmarksBigColor: '#FFFFFF',
	                        tickmarksMediumColor: '#FFFFFF',
	                        tickmarksSmallColor: '#FFFFFF',
	                        colorsRanges: [],
	                        backgroundColor: '#000000',
	                        borderInner: '#000000',
	                        borderOuter: '#000000',
	                        borderOutline: '#000000',
	                        needleColors: ['#FF0000'],
	                        needleType: 'line',
	                        needleTail: true,
	                        centerpinRadius: 0.1,
	                        titleTop: '',
	                        titleTopSize: 12,
	                        titleTopColor: '#FFFFFF',
	                        titleBottom: '',
	                        titleBottomColor: '#FFFFFF',
	                        titleBottomSize: 12,
	                        labelsCentered: true,
	                        labelsOffset: 7,
	                        textAccessible: true,
	                        initialConfig: true
	                    }
	                }).draw();

	                //the DOM-Element to display the time of the last Update
	                var lastUpdate = $("#" + htmlId + "-lastUpdate")[0];

	                //Function to be called when new data arrives
	                var dataUpdate = function dataUpdate(data) {
	                    if (typeof data.Observations !== 'undefined') {
	                        //Apply several info from the DataStream
	                        var options = new _DataModelConfigWidgetConfigJs.WidgetConfig().getWidgetDataByID(htmlId).configurableData;
	                        if (options.titleTop.data == "") {
	                            options.titleTop = {
	                                data: data.DataStream_name,
	                                type: TYPE_STRING
	                            };
	                        }
	                        if (options.titleBottom.data == "" && data.DataStream_unitOfMeasurement) {
	                            options.titleBottom = {
	                                data: "(" + data.DataStream_unitOfMeasurement.symbol + ")",
	                                type: TYPE_STRING
	                            };
	                            configUpdate(options);
	                        }

	                        if (data.DataStream_unitOfMeasurement) {
	                            options.titleBottom.data = data.DataStream_unitOfMeasurement.symbol;
	                        }

	                        var date = new Date();
	                        lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

	                        var newValue = undefined;
	                        var maxTime = 0;
	                        for (var k in data.Observations) {
	                            if (new Date(data.Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
	                                maxTime = new Date(data.Observations[k].Observation_phenomenonTime).getTime();
	                                newValue = data.Observations[k].Observation_result;
	                                console.log("Value: ", newValue);
	                            }
	                        }
	                        gauge.value = newValue;
	                        gauge.grow({
	                            frames: 10
	                        });
	                    }

	                    var _view = new _ViewViewJs.View();
	                    if (_view.getLoadingWidgets().indexOf(htmlId) > -1) {
	                        _view.popLoading(htmlId);
	                    }
	                };

	                //Function to be called when new configuration arrives
	                var configUpdate = function configUpdate(config) {
	                    // format config properly
	                    config = _this._formatConfigurableData(config);
	                    html.find(".widget-title")[0].innerText = config.title.data;

	                    RGraph.reset(document.getElementById(htmlId + "-canvas"));
	                    gauge = new RGraph.Gauge({
	                        id: htmlId + '-canvas',
	                        min: config.min.data,
	                        max: config.max.data,
	                        value: gauge ? gauge.value : 7,
	                        options: {
	                            anglesStart: RGraph.PI - RGraph.PI / 8,
	                            anglesEnd: RGraph.TWOPI + RGraph.PI / 8,
	                            shadow: config.shadow.data,
	                            textColor: config.textColor.data,
	                            tickmarksBigColor: config.tickmarksBigColor.data,
	                            tickmarksMediumColor: config.tickmarksMediumColor.data,
	                            tickmarksSmallColor: config.tickmarksSmallColor.data,
	                            colorsRanges: config.colorsRanges.data,
	                            backgroundColor: config.backgroundColor.data,
	                            borderInner: config.borderInnerColor.data,
	                            borderOuter: config.borderOuterColor.data,
	                            borderOutline: config.borderOutlineColor.data,
	                            needleColors: [config.needleColor.data],
	                            needleType: config.needleType.data,
	                            needleTail: config.needleTail.data,
	                            centerpinRadius: config.centerpinRadius.data,
	                            titleTop: config.titleTop.data,
	                            titleTopSize: config.titleTopSize.data,
	                            titleTopColor: config.titleTopColor.data,
	                            titleBottom: config.titleBottom.data,
	                            titleBottomColor: config.titleBottomColor.data,
	                            titleBottomSize: config.titleBottomSize.data,
	                            labelsCentered: config.labelsCentered.data,
	                            labelsOffset: config.labelsOffset.data,
	                            textAccessible: config.textAccessible.data
	                        }
	                    }).draw();
	                };

	                callback(htmlId, dataUpdate, configUpdate);
	                _gaugeWidgetFactory._resizeCanvas(htmlId);
	            });
	            return html;
	        }

	        /**
	         * Called when canvas is resized, when widget is added to the dashboard, and when the resize handler (the arrow button) is released.
	         * @param htmlId The id of the widget whose canvas shall be resized.
	         * @private
	         */
	    }, {
	        key: "_resizeCanvas",
	        value: function _resizeCanvas(htmlId) {
	            var canvas = $("#" + htmlId + "-canvas");
	            var w = canvas.parent().width();
	            var h = canvas.parent().height();
	            canvas.attr("width", w);
	            canvas.attr("height", h);
	            RGraph.Clear(canvas[0]);
	            RGraph.Redraw();
	        }
	    }]);

	    return GaugeWidgetFactory;
	})();

	exports.GaugeWidgetFactory = GaugeWidgetFactory;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _ViewViewJs = __webpack_require__(6);

	var _lineGraphWidgetFactory = null;
	var _widgetFactory = null;
	var _userEvents = null;

	/**
	 * Responsible for setting up new LineWidgets
	 *
	 **/

	var LineGraphWidgetFactory = (function () {
	    //Implements singleton

	    function LineGraphWidgetFactory(widgetFactory) {
	        _classCallCheck(this, LineGraphWidgetFactory);

	        if (!_lineGraphWidgetFactory) {
	            _lineGraphWidgetFactory = this;
	            _widgetFactory = widgetFactory;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	        }
	        return _lineGraphWidgetFactory;
	    }

	    /**
	     * This will return a properly formated Object, that return a propper array at config.key.value
	     * Arrays will be real array containing their data
	     * @param configurable Data that should be formated
	     * @return formated data
	     */

	    _createClass(LineGraphWidgetFactory, [{
	        key: "_formatConfigurableData",
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};

	            // Check every key if it is an array.
	            // If it is an array, then make it a real one
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            for (var k in d.data) {
	                                return d.data[k].data;
	                            }
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            // return formatted configurableData
	            return formattedObject;
	        }

	        /**
	         * Formats a date according to the date format specified in the language pack
	         * @param date the date to format
	         * @param tzOffset time zone offset
	         * @return {string} date string
	         * @private
	         */
	    }, {
	        key: "_formatDate",
	        value: function _formatDate(date, tzOffset) {
	            var str = window.iotlg.dateFormat;
	            var actualDate = new Date();
	            actualDate.setTime(date.getTime() + this._getMilliseconds(tzOffset, UNIT_HOUR));
	            var hours = actualDate.getUTCHours();
	            var day = actualDate.getUTCDate();

	            str = str.replace("yyyy", actualDate.getUTCFullYear());
	            str = str.replace("mm", this._fillUp(actualDate.getUTCMonth() + 1, 2));
	            str = str.replace("dd", this._fillUp(day, 2));
	            str = str.replace("hh", this._fillUp(hours, 2));
	            str = str.replace("MM", this._fillUp(actualDate.getUTCMinutes(), 2));
	            str = str.replace("ss", this._fillUp(actualDate.getUTCSeconds(), 2));
	            str = str.replace(" ", "\n");
	            return str;
	        }
	    }, {
	        key: "_fillUp",
	        value: function _fillUp(num, length) {
	            return ("" + num).length < length ? this._fillUp("0" + num, length - 1) : num;
	        }

	        /**
	         * Private sort function will compare two arrays by theire value at the first position
	         *
	         * @param a Array with a number at first position
	         * @param b Array with a number at first postiion
	         * @private
	         **/
	    }, {
	        key: "_sortByFirstValue",
	        value: function _sortByFirstValue(a, b) {
	            if (a[0] === b[0]) {
	                return 0;
	            } else {
	                return new Date(a[0]) < new Date(b[0]) ? -1 : 1;
	            }
	        }

	        /**
	         * Private sort function will compare two arrays by theire value at the first position
	         *
	         * @param a Array with a number at first position
	         * @param b Array with a number at first postiion
	         * @private
	         **/
	    }, {
	        key: "_sortBySecondValue",
	        value: function _sortBySecondValue(a, b) {
	            if (a[1] === b[1]) {
	                return 0;
	            } else {
	                return new Date(a[1]) < new Date(b[1]) ? -1 : 1;
	            }
	        }

	        /**
	         * Private function to finde the bigest "reasonable" unit to label the difference
	         *
	         * @param {Date} date1 first date
	         * @param {Date} date2 second date
	         * @return Object with unit: constant, diffrence: diffrence in ms, starteDate: start, endDate: end
	         * @private
	         **/
	    }, {
	        key: "_calcBiggestTimeUnitDifference",
	        value: function _calcBiggestTimeUnitDifference(date1, date2) {
	            var timeDiff = Math.abs(date2.getTime() - date1.getTime());

	            // define start and end dates
	            var startDate = date1;
	            var endDate = date2;
	            if (startDate > date2) {
	                startDate = date2;
	                endDate = date1;
	            }

	            // calculate biggest time unit difference
	            if (timeDiff < 1000) {
	                return { unit: UNIT_MILLISECOND, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / 1000 < 60)) {
	                return { unit: UNIT_SECOND, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60) < 60)) {
	                return { unit: UNIT_MINUTE, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60 * 60) < 24)) {
	                return { unit: UNIT_HOUR, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60 * 60 * 24) < 31)) {
	                return { unit: UNIT_DAY, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60 * 60 * 24) < 365)) {
	                return { unit: UNIT_MONTH, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else {
	                return { unit: UNIT_YEAR, difference: timeDiff, startDate: startDate, endDate: endDate };
	            }
	        }

	        /**
	         * This method returns the amount of milliseconds for an value and unit
	         *
	         * @param {number} value Value of the time
	         * @param {number} unit_const Unit of the time
	         * @return amount of ms
	         */
	    }, {
	        key: "_getMilliseconds",
	        value: function _getMilliseconds(value, unit_const) {
	            switch (unit_const) {
	                case UNIT_MILLISECOND:
	                    return value;
	                case UNIT_SECOND:
	                    return value * 1000;
	                case UNIT_MINUTE:
	                    return value * 1000 * 60;
	                case UNIT_HOUR:
	                    return value * 1000 * 60 * 60;
	                case UNIT_DAY:
	                    return value * 1000 * 60 * 60 * 24;
	                case UNIT_MONTH:
	                    return value * 1000 * 60 * 60 * 24 * 31;
	                case UNIT_YEAR:
	                    return value * 1000 * 60 * 60 * 24 * 365;
	                default:
	                    console.error("Error, unknown unit constant");
	                    return value;
	            }
	        }

	        /**
	         * This methods generats an array of n strings of even distributed time stamps between start and End date
	         *
	         * @param startDate StartDate for the array
	         * @param endDate endDate for the array
	         * @param groups number of strings in the array
	         * @return Object with Array of labels for the graph (.label), start & endDate, interval length
	          */
	    }, {
	        key: "_calcLabelTicks",
	        value: function _calcLabelTicks(startDate, endDate, groups) {
	            var offset = -Math.ceil(new Date().getTimezoneOffset() / 60);
	            // Calculated intervall length
	            var unitTime = this._calcBiggestTimeUnitDifference(startDate, endDate);
	            var interval = Math.ceil(unitTime.difference / groups);
	            var labels = [];

	            // Create labels for each group
	            for (var n = 0; n < groups - 1; n++) {
	                labels.push([this._formatDate(new Date(unitTime.startDate.getTime() + interval * n), offset), new Date(unitTime.startDate.getTime() + interval * n).toUTCString()]);
	            }
	            // Add end date as last lable
	            labels.push([this._formatDate(new Date(unitTime.endDate.getTime()), offset), new Date(unitTime.endDate.getTime()).toUTCString()]);

	            // Return object
	            return { label: labels, interval: interval, startDate: unitTime.startDate, endDate: unitTime.endDate };
	        }

	        /*
	         * Convert data from the DataObserver to scatterData array
	         * @param data Data from the the DataObserver (Parsed via callback)
	         * @param color Color for each datapoint (Point!! not line)
	         * @return Sorted scatteredData array Format: [[[x,f1(x)],[x,f1(x)],[x,f1(x)],[x,f1(x)]],
	         *                                                [[x2,f2(x)],[x,f2(x)],[x,f2(x)],[x,f2(x)]]]
	         */
	    }, {
	        key: "_convertedDataToSccatterData",
	        value: function _convertedDataToSccatterData(data, color) {
	            var scatterData = [];
	            // update scatterData pice by pices
	            for (var n = 0; n < data.length; n++) {
	                scatterData.push([]);
	                if (typeof data[n].Observations !== 'undefined') {
	                    for (var i = 0; i < data[n].Observations.length; i++) {
	                        // insert Data into array
	                        scatterData[n].push([new Date(data[n].Observations[i].Observation_phenomenonTime).toUTCString(), data[n].Observations[i].Observation_result, color]);
	                    }
	                    // sort Data of one dataStream by time
	                    scatterData[n].sort(this._sortByFirstValue);
	                }
	            }
	            return scatterData;
	        }

	        /*
	         * Cut off data at min max
	         * @param min Date of min (Date Object)
	         * @param max Date of max (Date Object)
	         * @param scatterData scatterData that should be trimed
	         * @return min <= data <= max
	         */
	    }, {
	        key: "_trimData",
	        value: function _trimData(min, max, scatterData) {
	            var result = [];
	            for (var n = 0; n < scatterData.length; n++) {
	                // trim
	                result.push(scatterData[n].filter(function (coordinates) {
	                    return new Date(coordinates[0]) >= min && new Date(coordinates[0]) <= max;
	                }));
	            }
	            return result;
	        }

	        /*
	         * Calculated relative min and max for scattered Data
	         * @param scatterData scatterData
	         * @param delta Delat in ms
	         * return min max object with the format {min: min, max: max}
	         */
	    }, {
	        key: "_getRelativMinAndMax",
	        value: function _getRelativMinAndMax(scatterData, delta) {
	            var min = new Date();
	            var max = new Date();
	            var minAndMax = [];
	            scatterData.forEach(function (dataStream) {
	                if (dataStream.length >= 2) {
	                    minAndMax.push([dataStream[0][0], dataStream[dataStream.length - 1][0]]);
	                }
	                if (dataStream.length == 1) {
	                    minAndMax.push([dataStream[0][0], dataStream[0][0]]);
	                }
	            });
	            // Sort for min and set min
	            min = new Date(minAndMax.sort(this._sortByFirstValue)[0][0]);
	            // Sort for max and set max
	            max = new Date(minAndMax.sort(this._sortBySecondValue)[minAndMax.length - 1][1]);

	            // check if max is in future
	            if (max > new Date()) {
	                max = new Date();
	            }

	            // Check if min has to be reset
	            if (max.getTime() - min.getTime() > delta) {
	                min.setTime(max.getTime() - delta);
	            }

	            // return min max
	            return { min: min, max: max };
	        }

	        /**
	         * Creates a new LineGraph widget
	         * @param id The id of the new widget
	         * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @param htmlTemplate The default template for Canvas widgets
	         * @return The html of the Widget which should be inserted into the DOM
	         **/
	    }, {
	        key: "create",
	        value: function create(id, callback, htmlTemplate) {
	            var _this = this;

	            //Load the actual html to be displayed
	            //Load the actual html to be displayed !synchronously
	            var html = $('<div/>').prepend(htmlTemplate);

	            //create the id to be set in html
	            var htmlId = "iotdbWidget" + id;
	            var htmlIdSelector = "#" + htmlId;

	            //When html of widget is loaded, set up lineGraph in canvas
	            $("#templateWidgetCanvas").ready(function () {

	                //Replace dummy ids with real ones
	                $("#templateWidget").attr("id", htmlId);
	                $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
	                $("#templateWidgetCanvas").attr("id", htmlId + "-canvas");

	                //Resize inner map after 0.1 seconds
	                $("#" + ("" + htmlId)).parent().resize(function () {
	                    _lineGraphWidgetFactory._resizeCanvas(htmlId);
	                });

	                // Set correct language for title
	                $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetLineGraphTitle);

	                // Set remove callback
	                $(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                $(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                // Define variables
	                var timeRelative = undefined;
	                var scatterData = [[[0, 0, 'white']]];
	                var delta = undefined;
	                var timeIntervalUnit = undefined;
	                var scatterGraph = undefined;
	                var steps = 4;
	                var color = undefined;
	                var configurableOptions = undefined;
	                var labelTicks = {
	                    label: ""
	                };

	                //the DOM-Element to display the time of the last Update
	                var lastUpdate = $("#" + htmlId + "-lastUpdate")[0];

	                //Function to be called when new data arrives
	                var dataUpdate = function dataUpdate(data) {

	                    if (data[0] != undefined && data[0].Observations != undefined) {
	                        // Convert Data into the right format
	                        scatterData = _this._convertedDataToSccatterData(data, color);

	                        // Set min max values
	                        if (timeRelative) {
	                            var relMinMax = _this._getRelativMinAndMax(scatterData, delta);
	                            configurableOptions.xmin = relMinMax.min.toUTCString();
	                            configurableOptions.xmax = relMinMax.max.toUTCString();
	                        } else {}
	                        // min max have not changed, since they are absolute

	                        // trim Data according to new min and max values
	                        scatterData = _this._trimData(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), scatterData);

	                        // Update LastUpdated time of the LineGraphWidget
	                        lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

	                        // set X-Axis label correctly
	                        var _labelTicks = _this._calcLabelTicks(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), steps);
	                        configurableOptions.backgroundGridAutofitNumvlines = _labelTicks.label.length;
	                        configurableOptions.labels = _labelTicks.label;

	                        // Redraw scatter rgraph
	                        RGraph.reset(document.getElementById(htmlId + "-canvas"));
	                        scatterGraph = new RGraph.Scatter({ id: htmlId + "-canvas", data: scatterData, options: configurableOptions }).draw();
	                    }

	                    //id not important but needed in tests
	                    var _view = new _ViewViewJs.View("id");
	                    if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
	                        _view.popLoading(htmlId);
	                    }
	                };

	                //Function to be called when new configuration arrives
	                var configUpdate = function configUpdate(config) {
	                    // format config properly
	                    config = _this._formatConfigurableData(config);
	                    html.find(".widget-title")[0].innerText = config.title.data;

	                    //Check for absolute or rellativ and chose min max right
	                    timeRelative = config.timeIntervalRelative.data;
	                    timeIntervalUnit = config.timeIntervalUnit.data;
	                    var max = config.endTime.data.toUTCString();
	                    var min = config.startTime.data.toUTCString();
	                    delta = _this._getMilliseconds(config.timeInterval.data, timeIntervalUnit);

	                    // check if scatterGraph exists
	                    if (scatterData.length >= 1) {
	                        // set min max
	                        if (timeRelative) {
	                            var relMinMax = _this._getRelativMinAndMax(scatterData, delta);
	                            min = relMinMax.min.toUTCString();
	                            max = relMinMax.max.toUTCString();
	                        } else {}
	                        // Do nothing, since min, max is set

	                        // set X-Axis label correctly
	                        steps = config.labelSteps.data;
	                        labelTicks = _this._calcLabelTicks(new Date(min), new Date(max), steps);
	                    }

	                    if (config.ymin === undefined) {
	                        config.ymin = { data: 0, type: 0 };
	                    }

	                    color = config.pointColor.data;
	                    configurableOptions = {
	                        xmin: min,
	                        xmax: max,
	                        ymin: config.ymin.data,
	                        backgroundGridBorder: config.backgroundGridBorder.data,
	                        backgroundGridVlines: config.backgroundGridVlines.data,
	                        backgroundBarcolor1: config.backgroundBarcolor1.data,
	                        backgroundBarcolor2: config.backgroundBarcolor2.data,
	                        backgroundGridColor: config.backgroundGridColor.data,
	                        gutterLeft: 50,
	                        gutterBottom: 85,
	                        tickmarks: config.tickmarks.data,
	                        labels: labelTicks.label,
	                        noxaxis: true,
	                        textAngle: 45,
	                        backgroundGridAutofitNumvlines: labelTicks.label.length,
	                        ticksize: config.ticksize.data,
	                        line: config.line.data,
	                        lineColors: config.lineColors.data,
	                        titleXaxis: config.titleXaxis.data,
	                        titleXaxisPos: 0.1,
	                        titleYaxis: config.titleYaxis.data,
	                        titleYaxisPos: 0.15
	                    };

	                    RGraph.reset(document.getElementById(htmlId + "-canvas"));
	                    scatterGraph = new RGraph.Scatter({ id: htmlId + "-canvas", data: scatterData, options: configurableOptions }).draw();
	                };

	                callback(htmlId, dataUpdate, configUpdate);
	                _lineGraphWidgetFactory._resizeCanvas(htmlId);
	            });
	            return html;
	        }

	        /**
	         * Called when canvas is resized, when widget is added to the dashboard, and when the resize handler (the arrow button) is released.
	         * @param htmlId The id of the widget whose canvas shall be resized.
	         * @private
	         */
	    }, {
	        key: "_resizeCanvas",
	        value: function _resizeCanvas(htmlId) {
	            var canvas = $("#" + htmlId + "-canvas");
	            var w = canvas.parent().width();
	            var h = canvas.parent().height();
	            canvas.attr("width", w);
	            canvas.attr("height", h);
	            RGraph.Clear(canvas[0]);
	            RGraph.Redraw();
	        }
	    }]);

	    return LineGraphWidgetFactory;
	})();

	exports.LineGraphWidgetFactory = LineGraphWidgetFactory;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _ViewViewJs = __webpack_require__(6);

	var logging = false;

	var _mapWidgetFactory = null;
	var _widgetFactory = null;
	var _userEvents = null;

	var htmlTemplate = '<div id="mapWidget" class="grid-stack-item-content">\n        <div class="widget-header">\n        <div class="widget-title">\n        Widget-Title & Info\n</div>\n    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>\n    </div>\n    <div id="mapWidgetDiv" class="mapWidgets"></div>\n    <div class="widget-footer map-footer">\n    <div class="lastUpdate" id="templateWidgetLastUpdate">\n    </div>\n    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">\n    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>\n    </button>\n    </div>\n    </div>';

	/**
	 * Responsible for setting up new MapWidgets
	 *
	 **/

	var MapWidgetFactory = (function () {
	    //Implements singleton

	    function MapWidgetFactory(widgetFactory) {
	        _classCallCheck(this, MapWidgetFactory);

	        if (!_mapWidgetFactory) {
	            _mapWidgetFactory = this;
	            _widgetFactory = widgetFactory;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	            this.mapLayers = L.layerGroup();
	            this.mapIDs = [];
	        }
	        return _mapWidgetFactory;
	    }

	    /**
	     * Returns an array of all superLayers which contain all layers of a widget
	     * @returns the layers
	     */

	    _createClass(MapWidgetFactory, [{
	        key: 'getMapLayers',
	        value: function getMapLayers() {
	            return this.mapLayers.getLayers();
	        }

	        /**
	         * Upon widget removal, remove the corresponding superLayer from the array of all layers
	         * @param id
	         *      the id of the widget to be removed
	         */
	    }, {
	        key: 'removeLayerGroup',
	        value: function removeLayerGroup(id) {
	            for (var pair in this.mapIDs) {
	                if (this.mapIDs[pair].mapID == id) {
	                    this.mapLayers.removeLayer(this.mapIDs[pair].layerID);
	                }
	            }
	        }

	        /**
	         * This will return a properly formatted Object, that return a propper array at config.key.value
	         * Arrays will be real array containing their data
	         * @param configurable Data that should be formatted
	         * @return formatted data
	         */
	    }, {
	        key: '_formatConfigurableData',
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            return d.data;
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            return formattedObject;
	        }

	        /**
	         * Private sort function will compare two arrays by their time value
	         *
	         * @param a Array with a number at first position
	         * @param b Array with a number at first postiion
	         * @private
	         **/
	    }, {
	        key: '_sortByTime',
	        value: function _sortByTime(a, b) {
	            if (a.time === b.time) {
	                return 0;
	            } else {
	                return a.time < b.time ? -1 : 1;
	            }
	        }

	        /**
	         * Creates a new Map widget
	         * @param id The id of the new widget
	         * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @return The html of the Widget which should be inserted into the DOM
	         **/
	    }, {
	        key: 'create',
	        value: function create(id, callback) {
	            var _this = this;

	            var html = $('<div/>').prepend(htmlTemplate);

	            //create the id to be set in html
	            var htmlId = "iotdbWidget" + id;
	            var htmlIdSelector = '#' + htmlId;

	            //When html of widget is loaded, set up map in div
	            $("#mapWidgetDiv").ready(function () {

	                //Replace dummy ids with real ones
	                $("#mapWidget").attr("id", htmlId);
	                $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
	                $("#mapWidgetDiv").attr("id", htmlId + '-div');

	                // Set correct language for title
	                $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetMapTitle);

	                // Set remove callback
	                $(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                $(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                // set leaflet image path
	                L.Icon.Default.imagePath = window.iotBaseDir + 'res/LeafletImages/';

	                //the DOM-Element to display the time of the last Update
	                var lastUpdate = $('#' + htmlId + '-lastUpdate')[0];

	                // initialize a new map centered to the Karlsruhe Palace with a zoom level of 13
	                var map = L.map(htmlId + '-div').setView([49.014, 8.404], 13);

	                $("#" + htmlId).parent().resize(function () {
	                    return setTimeout(function () {
	                        map.invalidateSize();
	                    }, 200);
	                });

	                // disable map dragging because it interferes with widget dragging, navigation is still possible with arrow keys
	                map.dragging.disable();

	                map.on('popupopen', function (e) {});

	                // create map tiles and add them to the map
	                var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmV4dXJ5IiwiYSI6ImNpd3R2ZzY5djAwbzcydXFyazRsam80cDAifQ.TaIW3pR4RS3UuyZg61HV6g', {
	                    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>"
	                });
	                tiles.addTo(map);

	                var markerTypes = [];
	                var thresholds = [];

	                // create layer for geojson objects
	                var superLayer = L.geoJSON().addTo(map);

	                // add layer to the array of all layers of all maps
	                _this.mapLayers.addLayer(superLayer);
	                _this.mapIDs.push({
	                    mapID: htmlId,
	                    layerID: _this.mapLayers.getLayerId(superLayer)
	                });

	                // predefine traffic light marker icons for the three states
	                var greenTrafficLight = L.icon({
	                    iconUrl: window.iotBaseDir + 'res/TLgreen.svg',
	                    iconSize: [15, 35]
	                });
	                var redTrafficLight = L.icon({
	                    iconUrl: window.iotBaseDir + 'res/TLred.svg',
	                    iconSize: [15, 35]
	                });
	                var yellowTrafficLight = L.icon({
	                    iconUrl: window.iotBaseDir + 'res/TLyellow.svg',
	                    iconSize: [15, 35]
	                });

	                // function to be called when new data arrives
	                var dataUpdate = function dataUpdate(data) {
	                    superLayer.clearLayers();

	                    // update last update text
	                    lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

	                    for (var i = 0; i < data.length; i++) {
	                        // check for undefined thing location within data
	                        if (data[i].Thing_Locations !== undefined) {
	                            var thingLoc = data[i].Thing_Locations[data[i].Thing_Locations.length - 1];

	                            // check if the location's type is GeoJSON
	                            if (thingLoc.encodingType !== "application/vnd.geo+json") {
	                                console.error("Error, encoding type is not geoJSON");
	                            } else {
	                                var geoJson = undefined;
	                                var type = undefined;

	                                // check for invalid marker type
	                                if (markerTypes[i] !== undefined) {
	                                    type = markerTypes[i];
	                                }

	                                var newValue = undefined;
	                                var maxTime = undefined;

	                                // handle different marker type inputs
	                                switch (type) {
	                                    case MARKER_TYPE_PLAIN:
	                                        // add GeoJSON to map
	                                        geoJson = data[i].Thing_Locations[data[i].Thing_Locations.length - 1].location;
	                                        superLayer.addData(geoJson);
	                                        break;
	                                    case MARKER_TYPE_PLAINVALUE:
	                                        // add GeoJSON to map and assign a popup with the latest observation result and the unit of measurement to it, but do nothing if no observation is available
	                                        if (data[i].Observations == undefined) {
	                                            break;
	                                        }
	                                        geoJson = data[i].Thing_Locations[data[i].Thing_Locations.length - 1].location;
	                                        var unit = data[i].DataStream_unitOfMeasurement.symbol;

	                                        maxTime = 0;
	                                        for (var k in data[i].Observations) {
	                                            if (new Date(data[i].Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
	                                                maxTime = new Date(data[i].Observations[k].Observation_phenomenonTime).getTime();
	                                                newValue = data[i].Observations[k].Observation_result;
	                                            }
	                                        }

	                                        var popUpData = newValue.toString();

	                                        var popUp = undefined;
	                                        //append unit if there is one
	                                        if (unit !== undefined) {
	                                            popUp = L.popup({
	                                                autoPan: false,
	                                                autoClose: false
	                                            }).setContent("<center>" + popUpData.toString() + " " + unit + "</center>");
	                                        } else {
	                                            popUp = L.popup({
	                                                autoPan: false,
	                                                autoClose: false
	                                            }).setContent("<center>" + popUpData.toString() + "</center>");
	                                        }

	                                        marker = L.GeoJSON.geometryToLayer(geoJson);
	                                        marker.bindPopup(popUp).addTo(superLayer).openPopup();
	                                        break;
	                                    case MARKER_TYPE_TRAFFICLIGHT:
	                                        // add GeoJSON to map change the marker icon dynamically to a certain traffic light, but do nothing if no observation is available
	                                        if (data[i].Observations == undefined) {
	                                            break;
	                                        }
	                                        geoJson = data[i].Thing_Locations[data[i].Thing_Locations.length - 1].location;
	                                        var icon = undefined;

	                                        maxTime = 0;
	                                        for (var k in data[i].Observations) {
	                                            if (new Date(data[i].Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
	                                                maxTime = new Date(data[i].Observations[k].Observation_phenomenonTime).getTime();
	                                                newValue = data[i].Observations[k].Observation_result;
	                                            }
	                                        }
	                                        var value = newValue;

	                                        var getFName = function getFName(col) {
	                                            switch (col) {
	                                                case COLOR_RED:
	                                                    return redTrafficLight;
	                                                    break;
	                                                case COLOR_YELLOW:
	                                                    return yellowTrafficLight;
	                                                    break;
	                                                case COLOR_GREEN:
	                                                    return greenTrafficLight;
	                                                    break;
	                                                default:
	                                                    return greenTrafficLight;
	                                            }
	                                        };
	                                        if (value < thresholds[i].middle) {
	                                            icon = getFName(thresholds[i].lowerColor);
	                                        } else if (value <= thresholds[i].upper) {
	                                            icon = getFName(thresholds[i].middleColor);
	                                        } else {
	                                            icon = getFName(thresholds[i].upperColor);
	                                        }

	                                        var marker = L.GeoJSON.geometryToLayer(geoJson);
	                                        marker.setIcon(icon).addTo(superLayer);
	                                        break;
	                                    case MARKER_TYPE_HISTORY:
	                                        var hist = data[i].Thing_HistoricalLocations;
	                                        // sort historical locations by time
	                                        hist.sort(_this._sortByTime);

	                                        // make latitude/longitude array from historical locations
	                                        var latlngs = [];
	                                        for (var _i = 0; _i < hist.length; _i++) {
	                                            if (hist[_i].hasOwnProperty('Locations')) {
	                                                for (var j = 0; j < hist[_i].Locations.length; j++) {
	                                                    latlngs.push(L.GeoJSON.geometryToLayer(hist[_i].Locations[j].location).getLatLng());
	                                                }
	                                            }
	                                        }
	                                        // create history line from points
	                                        L.polyline(latlngs, {
	                                            color: 'red'
	                                        }).addTo(superLayer);
	                                        break;
	                                    default:
	                                        break;
	                                }
	                            }
	                        }
	                    }
	                    if (logging) console.log("LAYERS: ", _this.getMapLayers());

	                    var _view = new _ViewViewJs.View();
	                    if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
	                        _view.popLoading(htmlId);
	                    }
	                };

	                // function to be called when new configuration arrives
	                var configUpdate = function configUpdate(config) {
	                    // format config properly
	                    config = _this._formatConfigurableData(config);
	                    html.find(".widget-title")[0].innerText = config.title.data;

	                    // extract basic map options and set them
	                    map.setView(L.latLng(config.latitude.data, config.longitude.data), config.zoom.data);
	                    map.removeLayer(tiles);
	                    tiles = L.tileLayer(config.mapURL.data, {
	                        attribution: config.attribution.data
	                    }).addTo(map);

	                    // extract marker type and color ranges from the config and save them
	                    for (var i = 0; i < config.sensorThingsConfiguration.data.length; i++) {
	                        // read overlay type from config
	                        markerTypes[i] = config.sensorThingsConfiguration.data[i].overlayType.data;
	                        // read overlay type from config
	                        var middle = config.sensorThingsConfiguration.data[i].thresholdMiddle.data;
	                        var upper = config.sensorThingsConfiguration.data[i].thresholdUpper.data;
	                        var lowerColor = config.sensorThingsConfiguration.data[i].lowerRangeColor.data;
	                        var middleColor = config.sensorThingsConfiguration.data[i].middleRangeColor.data;
	                        var upperColor = config.sensorThingsConfiguration.data[i].upperRangeColor.data;
	                        thresholds[i] = {
	                            middle: middle,
	                            upper: upper,
	                            lowerColor: lowerColor,
	                            middleColor: middleColor,
	                            upperColor: upperColor
	                        };
	                    }
	                };

	                callback(htmlId, dataUpdate, configUpdate);
	            });
	            return html;
	        }
	    }]);

	    return MapWidgetFactory;
	})();

	exports.MapWidgetFactory = MapWidgetFactory;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _ViewViewJs = __webpack_require__(6);

	var _plainDataWidgetFactory = null;
	var _widgetFactory = null;
	var _userEvents = null;

	//The default template for a PlainDataWidget
	var htmlTemplate = '\n        <div id="templateWidget" class="grid-stack-item-content">\n        <div class="widget-header">\n        <div class="widget-title">\n        Widget-Title & Info\n</div>\n    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>\n    </div>\n    <div class="widget-footer">\n    <div class="lastUpdate" id="templateWidgetLastUpdate">\n    </div>\n    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">\n    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>\n    </button>\n    </div>\n    </div>';

	/**
	 * PlainData Widgets show a single observation value and its unit.
	 */

	var PlainDataWidgetFactory = (function () {
	    /**
	     * returns a plainDataWidgetFactory, implements singleton
	     */

	    function PlainDataWidgetFactory(widgetFactory) {
	        _classCallCheck(this, PlainDataWidgetFactory);

	        if (!_plainDataWidgetFactory) {
	            _plainDataWidgetFactory = this;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	            _widgetFactory = widgetFactory;
	        }
	        return _plainDataWidgetFactory;
	    }

	    /**
	     * This will return a properly formated Object, that returns a propper array at config.key.value
	     * Arrays will be real array containing their data
	     * @param configurable Data that should be formated
	     * @return formated data
	     * @private
	     */

	    _createClass(PlainDataWidgetFactory, [{
	        key: '_formatConfigurableData',
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            for (var k in d.data) {
	                                return d.data[k].data;
	                            }
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            return formattedObject;
	        }

	        /**
	         * Creates a new PlainText widget
	         * @param id The id of the new widget
	         * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @return The html of the Widget which should be inserted into the DOM
	         **/
	    }, {
	        key: 'create',
	        value: function create(id, callback) {
	            var _this = this;

	            var html = $('<div/>').prepend(htmlTemplate);

	            $("#templateWidgetCanvas").ready(function () {
	                //create the id to be set in html
	                var htmlId = "iotdbWidget" + id;
	                var htmlIdSelector = '#' + htmlId;

	                //Replace dummy ids with real ones
	                html.find("#templateWidget").attr("id", htmlId);
	                html.find("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");

	                var textContainer = document.createElement("DIV");
	                textContainer.className = "widget-text-container";
	                var textElement = document.createElement("SPAN");
	                textElement.className = "widget-text-element";
	                textElement.id = htmlId + "-textElement";
	                textContainer.appendChild(textElement);
	                var unitElement = document.createElement("SPAN");
	                unitElement.className = "widget-unit-element";
	                unitElement.id = htmlId + "-unitElement";
	                textContainer.appendChild(unitElement);
	                textElement.style.fontSize = "27px";
	                unitElement.style.fontSize = "22px";

	                var widget = html.find("#" + htmlId)[0];
	                widget.insertBefore(textContainer, html.find(".widget-footer")[0]);

	                // Set correct language for title
	                html.find(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetPlainTextTitle);

	                // Set remove callback
	                html.find(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                html.find(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                //Function to be called when the configuration of this widget changes
	                var configUpdate = function configUpdate(config) {

	                    // format config properly
	                    config = _this._formatConfigurableData(config);

	                    $(htmlIdSelector).find(".widget-title").text(config.title.data);
	                    $(htmlIdSelector).find("#" + htmlId + "-textElement").css("font-size", config.valueSize.data.toString() + "px");
	                    $(htmlIdSelector).find("#" + htmlId + "-unitElement").css("font-size", config.unitSize.data.toString() + "px");
	                    $(htmlIdSelector).find("#" + htmlId + "-unitElement").text(config.unit.data);
	                };

	                //Function to be called when new data arrives
	                var dataUpdate = function dataUpdate(data) {
	                    if (typeof data.Observations !== 'undefined') {
	                        var date = new Date();
	                        var newValue = undefined;
	                        var maxTime = 0;
	                        for (var k in data.Observations) {
	                            if (new Date(data.Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
	                                maxTime = new Date(data.Observations[k].Observation_phenomenonTime).getTime();
	                                newValue = data.Observations[k].Observation_result;
	                            }
	                        }
	                        $(htmlIdSelector).find('#' + htmlId + '-lastUpdate').text(window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty());
	                        $(htmlIdSelector).find(".widget-text-element").text(newValue.toString());
	                    }

	                    //id not important but needed in tests
	                    var _view = new _ViewViewJs.View("id");
	                    if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
	                        _view.popLoading(htmlId);
	                    }
	                };

	                callback(htmlId, dataUpdate, configUpdate);
	            });
	            return html;
	        }
	    }]);

	    return PlainDataWidgetFactory;
	})();

	exports.PlainDataWidgetFactory = PlainDataWidgetFactory;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _plainTextWidgetFactory = null;
	var _userEvents = null;

	//The default template for a widget using the canvas
	var htmlTemplate = "\n        <div id=\"templateWidget\" class=\"grid-stack-item-content\">\n        <div class=\"widget-header\">\n        <div class=\"widget-title\">\n        Widget-Title & Info\n</div>\n    <button type=\"button\" class=\"btn btn-danger remove-widget-button\" id=\"removeWidgetButton\">X</button>\n    </div>\n    <div class=\"widget-footer\">\n    <button class=\"btn btn-sm btn-default configureWidgetButton\" id=\"configureWidgetButton\" aria-label=\"Settings\">\n    <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n    </button>\n    </div>\n    </div>";
	/**
	 * Plaintext Widgets display static text and are not updated by any Servers.
	 */

	var PlainTextWidgetFactory = (function () {
	    //Implements singleton

	    function PlainTextWidgetFactory(widgetFactory) {
	        _classCallCheck(this, PlainTextWidgetFactory);

	        if (!_plainTextWidgetFactory) {
	            _plainTextWidgetFactory = this;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	        }
	        return _plainTextWidgetFactory;
	    }

	    /**
	     * This will return a properly formated Object, that return a propper array at config.key.value
	     * Arrays will be real array containing their data
	     * @param configurable Data that should be formated
	     * @return formated data
	     */

	    _createClass(PlainTextWidgetFactory, [{
	        key: "_formatConfigurableData",
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            for (var k in d.data) {
	                                return d.data[k].data;
	                            }
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            return formattedObject;
	        }

	        /**
	         * Creates a new PlainText widget
	         * @param id The id of the new widget
	         * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @return The html of the Widget which should be inserted into the DOM
	         **/
	    }, {
	        key: "create",
	        value: function create(id, callback) {
	            var _this = this;

	            var html = $('<div/>').prepend(htmlTemplate);

	            //create the id to be set in html
	            var htmlId = "iotdbWidget" + id;
	            var htmlIdSelector = "#" + htmlId;

	            //When html of widget is loaded, set up template in canvas
	            $("#templateWidgetCanvas").ready(function () {

	                //Replace dummy ids with real ones
	                html.find("#templateWidget").attr("id", htmlId);

	                var textContainer = document.createElement("DIV");
	                textContainer.className = "widget-text-container";
	                var textElement = document.createElement("SPAN");
	                textElement.className = "widget-text-element";
	                textElement.id = htmlId + "-textElement";
	                textContainer.appendChild(textElement);
	                textElement.innerText = window.iotlg.textWidgetDefaultText;
	                textContainer.style.fontSize = "27px";

	                var widget = html.find("#" + htmlId)[0];
	                widget.insertBefore(textContainer, html.find(".widget-footer")[0]);

	                // Set correct language for title
	                html.find(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetPlainTextTitle);

	                // Set remove callback
	                html.find(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                html.find(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                var configUpdate = function configUpdate(config) {

	                    // format config properly
	                    config = _this._formatConfigurableData(config);

	                    $(htmlIdSelector).find(".widget-text-element").text(config.text.data);
	                    $(htmlIdSelector).find(".widget-title").text(config.title.data);
	                    $(htmlIdSelector).find(".widget-text-element").css("font-size", config.fontSize.data.toString() + "px");
	                };

	                callback(htmlId, null, configUpdate);
	            });
	            return html;
	        }
	    }]);

	    return PlainTextWidgetFactory;
	})();

	exports.PlainTextWidgetFactory = PlainTextWidgetFactory;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _ViewViewJs = __webpack_require__(6);

	var _DataModelConfigWidgetConfigJs = __webpack_require__(4);

	var _thermometerWidgetFactory = null;
	var _widgetFactory = null;
	var _userEvents = null;

	/**
	 * Responsible for setting up new ThermometerWidgets
	 **/

	var ThermometerWidgetFactory = (function () {
	    //Implements singleton

	    function ThermometerWidgetFactory(widgetFactory) {
	        _classCallCheck(this, ThermometerWidgetFactory);

	        if (!_thermometerWidgetFactory) {
	            _thermometerWidgetFactory = this;
	            _widgetFactory = widgetFactory;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	        }
	        return _thermometerWidgetFactory;
	    }

	    /**
	     * This will return a properly formated Object, that return a propper array at config.key.value
	     * Arrays will be real array containing their data
	     * @param configurable Data that should be formated
	     * @return formated data
	     */

	    _createClass(ThermometerWidgetFactory, [{
	        key: "_formatConfigurableData",
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            for (var k in d.data) {
	                                return d.data[k].data;
	                            }
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            return formattedObject;
	        }

	        /**
	         * This will set a negative number of scale decimals to zero and a number of over twenty to twenty
	         * to prevent errors
	         * @param {int} scaleDecimals the number of scale decimals
	         * @returns {int} the corrected number
	         * @private
	         **/
	    }, {
	        key: "_correctScaleDecimals",
	        value: function _correctScaleDecimals(scaleDecimals) {
	            scaleDecimals = scaleDecimals < 0 ? 0 : scaleDecimals;
	            scaleDecimals = scaleDecimals > 20 ? 20 : scaleDecimals;
	            return scaleDecimals;
	        }

	        /**
	         * Creates a new Thermometer widget
	         * @param id The id of the new widget
	         * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @param htmlTemplate The default template for Canvas widgets
	         * @return The html of the Widget which should be inserted into the DOM
	         **/
	    }, {
	        key: "create",
	        value: function create(id, callback, htmlTemplate) {
	            var _this = this;

	            var html = $('<div/>').prepend(htmlTemplate);

	            //create the id to be set in html
	            var htmlId = "iotdbWidget" + id;
	            var htmlIdSelector = "#" + htmlId;
	            var _options = {
	                scaleVisible: true,
	                scaleDecimals: 2,
	                gutterLeft: 60,
	                gutterRight: 60,
	                valueLabel: false
	            };

	            //When html of widget is loaded, set up thermometer in canvas
	            $("#templateWidgetCanvas").ready(function () {

	                //Replace dummy ids with real ones and set canvas size
	                $("#templateWidget").attr("id", htmlId);
	                $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
	                $("#templateWidgetCanvas").attr("width", 160);
	                $("#templateWidgetCanvas").attr("id", htmlId + "-canvas");

	                //Resize inner map after 0.1 seconds
	                $("#" + ("" + htmlId)).parent().resize(function () {
	                    _thermometerWidgetFactory._resizeCanvas(htmlId);
	                });

	                // Set correct language for title
	                $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetThermometerTitle);

	                // Set remove callback
	                $(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                $(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                //create thermometer initially
	                var thermometer = undefined;
	                thermometer = new RGraph.Thermometer({
	                    id: htmlId + '-canvas',
	                    min: 0,
	                    max: 100,
	                    value: 7,
	                    options: _options
	                }).draw();

	                //the DOM-Element to display the time of the last Update
	                var lastUpdate = $("#" + htmlId + "-lastUpdate")[0];

	                //Function to be called when new data arrives
	                var dataUpdate = function dataUpdate(data) {
	                    //console.log("Data", data);
	                    if (data != undefined && data.Observations != undefined) {
	                        (function () {
	                            // update timestamp
	                            var date = new Date();
	                            lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

	                            // search most recent observation
	                            var newValue = undefined;
	                            var maxTime = 0;

	                            data.Observations.forEach(function (observation) {
	                                if (new Date(observation.Observation_phenomenonTime).getTime() > maxTime) {
	                                    maxTime = new Date(observation.Observation_phenomenonTime).getTime();
	                                    newValue = observation.Observation_result;
	                                    //console.log(newValue);
	                                }
	                            });

	                            if (newValue) {
	                                // set the thermometer to the most recent observation result
	                                if (thermometer == undefined) {
	                                    // Redraw thermometer rgraph if it doesnt exist
	                                    RGraph.reset(document.getElementById(htmlId + "-canvas"));
	                                    thermometer = new RGraph.Thermometer({
	                                        id: htmlId + "-canvas",
	                                        min: 0,
	                                        max: 100,
	                                        value: newValue,
	                                        options: _options
	                                    }).draw();
	                                } else {
	                                    thermometer.value = newValue;
	                                    thermometer.grow({
	                                        frames: 10
	                                    });
	                                }
	                            }
	                        })();
	                    }

	                    //id not important but needed in tests
	                    var _view = new _ViewViewJs.View("id");
	                    if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
	                        _view.popLoading(htmlId);
	                    }
	                };

	                //Function to be called when new configuration arrives
	                var configUpdate = function configUpdate(config) {

	                    // format config properly
	                    config = _this._formatConfigurableData(config);
	                    html.find(".widget-title")[0].innerText = config.title.data;
	                    // check for and correct a negative scale decimals number
	                    config.scaleDecimals.data = _this._correctScaleDecimals(config.scaleDecimals.data);

	                    _options = {
	                        scaleVisible: config.scaleVisible.data,
	                        scaleDecimals: config.scaleDecimals.data,
	                        gutterLeft: config.gutterLeft.data,
	                        gutterRight: config.gutterRight.data,
	                        valueLabel: config.valueLabel.data,
	                        titleSide: config.titleSide ? config.titleSide.data : ""
	                    };
	                    // redraw the thermometer and apply config changes
	                    RGraph.reset(document.getElementById(htmlId + "-canvas"));
	                    thermometer = new RGraph.Thermometer({
	                        id: htmlId + '-canvas',
	                        min: config.min.data,
	                        max: config.max.data,
	                        value: 0,
	                        options: _options
	                    }).draw();
	                };

	                callback(htmlId, dataUpdate, configUpdate);

	                //Thermometer should be centered after creation
	                _thermometerWidgetFactory._resizeCanvas(htmlId);
	            });
	            return html;
	        }

	        /**
	         * Called when the widget container is resized. Resizes the inner canvas and redraws the widget.
	         * @param htmlId Id of the widget.
	         * @private
	         */
	    }, {
	        key: "_resizeCanvas",
	        value: function _resizeCanvas(htmlId) {
	            var canvas = $("#" + htmlId + "-canvas");
	            canvas.parent().css("margin-left", "5%");
	            var w = canvas.parent().width();
	            var h = canvas.parent().height();
	            //Set bounds to ratio of w and h, because otherwise the thermometer looks terrible
	            if (h * 1.0 / w > 3) {
	                h = 3 * w;
	            } else if (h * 1.0 / w < 2.5) {
	                w = Math.max(h / 2.5, 170);
	                w = Math.min(w, 280);
	            }
	            canvas.attr("width", w);
	            canvas.attr("height", h);
	            canvas.parent().css("margin-left", (canvas.parent().width() - w) * 0.5);
	            RGraph.Clear(canvas[0]);
	            RGraph.Redraw();
	        }
	    }]);

	    return ThermometerWidgetFactory;
	})();

	exports.ThermometerWidgetFactory = ThermometerWidgetFactory;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _ViewViewJs = __webpack_require__(6);

	var logging = false;

	var _trafficLightWidgetFactory = null;
	var _widgetFactory = null;
	var _userEvents = null;

	var htmlTemplate = '\n        <div id="templateWidget" class="grid-stack-item-content">\n        <div class="widget-header">\n        <div class="widget-title">\n        Widget-Title & Info\n</div>\n    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>\n    </div>\n    <div class="widget-footer">\n    <div class="lastUpdate" id="templateWidgetLastUpdate">\n    </div>\n    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">\n    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>\n    </button>\n    </div>\n    </div>';

	/**
	 * Responsible for setting up new TrafficLight Widgets
	 **/

	var TrafficLightWidgetFactory = (function () {
	    //Implements singleton

	    function TrafficLightWidgetFactory(widgetFactory) {
	        _classCallCheck(this, TrafficLightWidgetFactory);

	        if (!_trafficLightWidgetFactory) {
	            _trafficLightWidgetFactory = this;
	            _widgetFactory = widgetFactory;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	        }
	        return _trafficLightWidgetFactory;
	    }

	    /**
	     * This will return a properly formated Object, that return a propper array at config.key.value
	     * Arrays will be real array containing their data
	     * @param configurable Data that should be formated
	     * @return formated data
	     */

	    _createClass(TrafficLightWidgetFactory, [{
	        key: '_formatConfigurableData',
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            for (var k in d.data) {
	                                return d.data[k].data;
	                            }
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            return formattedObject;
	        }

	        /**
	         * Creates a new TrafficLight widget
	         * @param {String} id The id of the new widget
	         * @param {function} callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @return {HTML} The html of the Widget which should be inserted into the DOM
	         **/
	    }, {
	        key: 'create',
	        value: function create(id, callback) {
	            var _this = this;

	            var html = $('<div/>').prepend(htmlTemplate);

	            //create the id to be set in html
	            var htmlId = "iotdbWidget" + id;
	            var htmlIdSelector = '#' + htmlId;

	            //When html of widget is loaded, set up traffic light in canvas
	            $("#templateWidgetCanvas").ready(function () {
	                var configuration = {};

	                //Replace dummy ids with real ones
	                html.find("#templateWidget").attr("id", htmlId);
	                html.find("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");

	                var trafficLight = document.createElement("DIV");
	                trafficLight.className = "traffic-light";
	                trafficLight.style.backgroundImage = "url('" + window.iotBaseDir + "res/TLred.svg')";

	                var widget = html.find("#" + htmlId)[0];
	                widget.insertBefore(trafficLight, html.find(".widget-footer")[0]);

	                // Set correct language for title
	                $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetTrafficLightTitle);

	                // Set remove callback
	                html.find(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                html.find(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                //the DOM-Element to display the time of the last Update
	                var lastUpdate = html.find('#' + htmlId + '-lastUpdate')[0];

	                //The function which is called with the new data
	                var dataUpdate = function dataUpdate(data) {
	                    var trafficLight = $('#' + htmlId + '.traffic-light')[0];
	                    var date = new Date();
	                    lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();
	                    if (!data.Observations) {
	                        return;
	                    }
	                    var newValue = undefined;
	                    var maxTime = 0;
	                    for (var k in data.Observations) {
	                        if (new Date(data.Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
	                            maxTime = new Date(data.Observations[k].Observation_phenomenonTime).getTime();
	                            newValue = data.Observations[k].Observation_result;
	                        }
	                    }

	                    var getFName = function getFName(col) {
	                        switch (col) {
	                            case COLOR_RED:
	                                return "red";
	                                break;
	                            case COLOR_YELLOW:
	                                return "yellow";
	                                break;
	                            case COLOR_GREEN:
	                                return "green";
	                                break;
	                            default:
	                                return "green";
	                        }
	                    };
	                    var image = undefined;
	                    if (newValue < configuration.lowerThreshold) {
	                        image = getFName(configuration.lowerColor);
	                        if (logging) console.log("lower");
	                    } else if (newValue <= configuration.upperThreshold) {
	                        image = getFName(configuration.middleColor);
	                        if (logging) console.log("middle");
	                    } else {
	                        image = getFName(configuration.upperColor);
	                        if (logging) console.log("upper");
	                    }

	                    //set the correct image
	                    $("#" + htmlId + " .traffic-light").css("background-image", "url('" + window.iotBaseDir + "res/TL" + image + ".svg')");

	                    //id not important but needed in tests
	                    var _view = new _ViewViewJs.View("id");
	                    if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
	                        _view.popLoading(htmlId);
	                    }
	                };

	                var configUpdate = (function (config) {
	                    // format config properly
	                    config = this._formatConfigurableData(config);
	                    $(htmlIdSelector).find(".widget-title").text(config.title.data);

	                    configuration.lowerThreshold = config.lower.data;
	                    configuration.upperThreshold = config.upper.data;
	                    configuration.lowerColor = config.lowerColor.data;
	                    configuration.middleColor = config.middleColor.data;
	                    configuration.upperColor = config.upperColor.data;
	                    if (logging) console.log("loaded config:", configuration);

	                    /*
	                    let trafficLight = $("#" + htmlId + " .traffic-light")[0];
	                    trafficLight.setAttribute("lower", config.lower.data);
	                    trafficLight.setAttribute("higher", config.higher.data);*/
	                }).bind(_this);
	                callback(htmlId, dataUpdate, configUpdate);
	            });
	            return html;
	        }
	    }]);

	    return TrafficLightWidgetFactory;
	})();

	exports.TrafficLightWidgetFactory = TrafficLightWidgetFactory;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _ViewViewJs = __webpack_require__(6);

	var _DataModelConfigWidgetConfigJs = __webpack_require__(4);

	var _barGraphWidgetFactory = null;
	var _widgetFactory = null;
	var _userEvents = null;

	/**
	 * Responsible for setting up new LineWidgets
	 *

	 **/

	var BarGraphWidgetFactory = (function () {
	    //Implements singleton

	    function BarGraphWidgetFactory(widgetFactory) {
	        _classCallCheck(this, BarGraphWidgetFactory);

	        if (!_barGraphWidgetFactory) {
	            _barGraphWidgetFactory = this;
	            _widgetFactory = widgetFactory;
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
	        }
	        return _barGraphWidgetFactory;
	    }

	    /**
	     * Formats a date according to the date format specified in the language pack
	     * @param date the date to format
	     * @param tzOffset time zone offset
	     * @return date string
	     * @private
	     */

	    _createClass(BarGraphWidgetFactory, [{
	        key: "_formatDate",
	        value: function _formatDate(date, tzOffset) {
	            var str = window.iotlg.dateFormat;
	            var actualDate = new Date();
	            actualDate.setTime(date.getTime() + this._getMilliseconds(tzOffset, UNIT_HOUR));
	            var hours = actualDate.getUTCHours();
	            var day = actualDate.getUTCDate();

	            str = str.replace("yyyy", actualDate.getUTCFullYear());
	            str = str.replace("mm", this._fillUp(actualDate.getUTCMonth() + 1, 2));
	            str = str.replace("dd", this._fillUp(day, 2));
	            str = str.replace("hh", this._fillUp(hours, 2));
	            str = str.replace("MM", this._fillUp(actualDate.getUTCMinutes(), 2));
	            str = str.replace("ss", this._fillUp(actualDate.getUTCSeconds(), 2));
	            str = str.replace(" ", "\n");
	            return str;
	        }

	        /**
	         * Fill upp arrray
	         */
	    }, {
	        key: "_fillUp",
	        value: function _fillUp(num, length) {
	            return ("" + num).length < length ? this._fillUp("0" + num, length - 1) : num;
	        }

	        /**
	         * This will return a properly formated Object, that return a propper array at config.key.value
	         * Arrays will be real array containing their data
	         * @return formatted configurableData
	         */
	    }, {
	        key: "_formatConfigurableData",
	        value: function _formatConfigurableData(configurable) {
	            var formattedObject = {};

	            // Check every key if it is an array.
	            // If it is an array, then make it a real one
	            for (var key in configurable) {
	                if (configurable[key].type == TYPE_ARRAY) {
	                    formattedObject[key] = {
	                        data: configurable[key].data.map(function (d) {
	                            for (var k in d.data) {
	                                return d.data[k].data;
	                            }
	                        })
	                    };
	                } else {
	                    formattedObject[key] = configurable[key];
	                }
	            }
	            // return formatted configurableData
	            return formattedObject;
	        }
	    }, {
	        key: "_fillUp",
	        value: function _fillUp(num, length) {
	            return ("" + num).length < length ? this._fillUp("0" + num, length - 1) : num;
	        }

	        /**
	         * Private sort function will compare two arrays by theire value at the first position
	         *
	         * @param a Array with a number at first position
	         * @param b Array with a number at first postiion
	         * @private
	         **/
	    }, {
	        key: "_sortByFirstValue",
	        value: function _sortByFirstValue(a, b) {
	            if (a[0] === b[0]) {
	                return 0;
	            } else {
	                return new Date(a[0]) < new Date(b[0]) ? -1 : 1;
	            }
	        }

	        /**
	         * Private sort function will compare two arrays by theire value at the first position
	         *
	         * @param a Array with a number at first position
	         * @param b Array with a number at first postiion
	         * @private
	         **/
	    }, {
	        key: "_sortBySecondValue",
	        value: function _sortBySecondValue(a, b) {
	            if (a[1] === b[1]) {
	                return 0;
	            } else {
	                return new Date(a[1]) < new Date(b[1]) ? -1 : 1;
	            }
	        }

	        /**
	         * Private function to finde the bigest "reasonable" unit to label the difference
	         *
	         * @param {Date} date1 first date
	         * @param {Date} date2 second date
	         * @return Object with unit: constant, diffrence: diffrence in ms, starteDate: start, endDate: end
	         * @private
	         **/
	    }, {
	        key: "_calcBiggestTimeUnitDifference",
	        value: function _calcBiggestTimeUnitDifference(date1, date2) {
	            var timeDiff = Math.abs(date2.getTime() - date1.getTime());

	            // define start and end dates
	            var startDate = date1;
	            var endDate = date2;
	            if (startDate > date2) {
	                startDate = date2;
	                endDate = date1;
	            }

	            // calculate biggest time unit difference
	            if (timeDiff < 1000) {
	                return { unit: UNIT_MILLISECOND, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / 1000 < 60)) {
	                return { unit: UNIT_SECOND, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60) < 60)) {
	                return { unit: UNIT_MINUTE, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60 * 60) < 24)) {
	                return { unit: UNIT_HOUR, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60 * 60 * 24) < 31)) {
	                return { unit: UNIT_DAY, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else if (Math.ceil(timeDiff / (1000 * 60 * 60 * 24) < 365)) {
	                return { unit: UNIT_MONTH, difference: timeDiff, startDate: startDate, endDate: endDate };
	            } else {
	                return { unit: UNIT_YEAR, difference: timeDiff, startDate: startDate, endDate: endDate };
	            }
	        }

	        /**
	         * This method returns the amount of milliseconds for an value and unit
	         *
	         * @param {number} value Value of the time
	         * @param {number} unit_const Unit of the time
	         * @return amount of ms
	         */
	    }, {
	        key: "_getMilliseconds",
	        value: function _getMilliseconds(value, unit_const) {
	            switch (unit_const) {
	                case UNIT_MILLISECOND:
	                    return value;
	                case UNIT_SECOND:
	                    return value * 1000;
	                case UNIT_MINUTE:
	                    return value * 1000 * 60;
	                case UNIT_HOUR:
	                    return value * 1000 * 60 * 60;
	                case UNIT_DAY:
	                    return value * 1000 * 60 * 60 * 24;
	                case UNIT_MONTH:
	                    return value * 1000 * 60 * 60 * 24 * 31;
	                case UNIT_YEAR:
	                    return value * 1000 * 60 * 60 * 24 * 365;
	                default:
	                    console.error("Error, unknown unit constant");
	                    return value;
	            }
	        }

	        /**
	         * This methods generats an array of n strings of even distributed time stamps between start and End date
	         *
	         * @param startDate StartDate for the array
	         * @param endDate endDate for the array
	         * @param groups number of strings in the array
	         * @return Object with Array of labels for the graph (.label), start & endDate, interval length
	         */
	    }, {
	        key: "_calcLabelTicks",
	        value: function _calcLabelTicks(startDate, endDate, groups) {
	            var offset = -Math.ceil(new Date().getTimezoneOffset() / 60);
	            // Calculated intervall length
	            var unitTime = this._calcBiggestTimeUnitDifference(startDate, endDate);
	            var interval = Math.ceil(unitTime.difference / groups);
	            var labels = [];

	            for (var n = 0; n < groups - 1; n++) {
	                labels.push(this._formatDate(new Date(unitTime.startDate.getTime() + interval * n), offset) + "\n - \n" + this._formatDate(new Date(unitTime.startDate.getTime() + interval * (n + 1)), offset));
	            }
	            labels.push(this._formatDate(new Date(unitTime.startDate.getTime() + interval * (groups - 1)), offset) + "\n - \n" + this._formatDate(new Date(unitTime.endDate.getTime()), offset));

	            return { label: labels, interval: interval, startDate: unitTime.startDate, endDate: unitTime.endDate };
	        }

	        /**
	         * This Function calculated the mean value of an array of numbers
	         * @param meanArray Array with numbers
	         * @return mean value
	         */
	    }, {
	        key: "_calcMeanFromArray",
	        value: function _calcMeanFromArray(meanArray) {
	            var mean = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = meanArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var data = _step.value;

	                    mean += data;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator["return"]) {
	                        _iterator["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            if (meanArray.length == 0) {
	                return mean;
	            } else {
	                return mean / meanArray.length;
	            }
	        }

	        /*
	         * Convert data from the DataObserver to barData array
	         * @param data Data from the the DataObserver (Parsed via callback)
	         * @return Sorted baredData array Format: [[[x,f1(x)],[x,f1(x)],[x,f1(x)],[x,f1(x)]],
	         *                                                [[x2,f2(x)],[x,f2(x)],[x,f2(x)],[x,f2(x)]]]
	         */
	    }, {
	        key: "_convertedDataToBarData",
	        value: function _convertedDataToBarData(data) {
	            var barData = [];
	            // update barData pice by pices
	            for (var n = 0; n < data.length; n++) {
	                barData.push([]);
	                if (typeof data[n].Observations !== 'undefined') {
	                    for (var i = 0; i < data[n].Observations.length; i++) {
	                        // insert Data into array
	                        barData[n].push([new Date(data[n].Observations[i].Observation_phenomenonTime).toUTCString(), data[n].Observations[i].Observation_result]);
	                    }
	                    // sort Data of one dataStream by time
	                    barData[n].sort(this._sortByFirstValue);
	                }
	            }
	            return barData;
	        }

	        /*
	         * Cut of data at min max
	         * @param min Date of min (Date Object)
	         * @param max Date of max (Date Object)
	         * @param barData barData that should be trimed
	         * @return min <= data <= max
	         */
	    }, {
	        key: "_trimData",
	        value: function _trimData(min, max, barData) {
	            var result = [];
	            for (var n = 0; n < barData.length; n++) {
	                // trim
	                result.push(barData[n].filter(function (coordinates) {
	                    return new Date(coordinates[0]) >= min && new Date(coordinates[0]) <= max;
	                }));
	            }
	            return result;
	        }

	        /*
	         * Calculated relativ min and max for bared Data
	         * @param barData barData
	         * @param delta Delat in ms
	         * return min max object with the format {min: min, max: max}
	         */
	    }, {
	        key: "_getRelativMinAndMax",
	        value: function _getRelativMinAndMax(barData, delta) {
	            var min = new Date();
	            var max = new Date();
	            var minAndMax = [];
	            barData.forEach(function (dataStream) {
	                if (dataStream.length >= 2) {
	                    minAndMax.push([dataStream[0][0], dataStream[dataStream.length - 1][0]]);
	                } else if (dataStream.length == 1) {
	                    minAndMax.push([dataStream[0][0], dataStream[0][0]]);
	                }
	            });

	            // Sort for min and set min
	            min = new Date(minAndMax.sort(this._sortByFirstValue)[0][0]);
	            // Sort for max and set max
	            max = new Date(minAndMax.sort(this._sortBySecondValue)[minAndMax.length - 1][1]);

	            // check if max is in future
	            if (max > new Date()) {
	                max = new Date();
	            }

	            // Check if min has to be reset
	            if (max.getTime() - min.getTime() > delta) {
	                min.setTime(max.getTime() - delta);
	            }

	            // return min max
	            return { min: min, max: max };
	        }

	        /**
	         * This function will group the data into n groups for the barGraph
	         *
	         * @param realBarData This array contains the data, that is parsed to the graph
	         * @param groupInterval The amount of bars/Groups of the bar graph
	         * @param labelTicks Contains the labels for each groupInterval
	         * @return BarData grouped, so the barGraph can display it porperly
	         */
	    }, {
	        key: "_groupData",
	        value: function _groupData(realBarData, groupInterval, labelTicks) {
	            var barData = [];
	            for (var n = 0; n < groupInterval; n++) {
	                barData.push([]);
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = realBarData[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var realData = _step2.value;

	                        var i = 0;
	                        var mean = 0;
	                        var meanArray = [];
	                        for (var _i = 0; _i < realData.length && new Date(realData[_i][0]) < new Date(labelTicks.startDate.getTime() + labelTicks.interval * (n + 1)); _i++) {
	                            if (new Date(realData[_i][0]) >= new Date(labelTicks.startDate.getTime() + labelTicks.interval * n)) {
	                                meanArray.push(realData[_i][1]);
	                            }
	                        }
	                        barData[n].push(this._calcMeanFromArray(meanArray));
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
	                            _iterator2["return"]();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }
	            }
	            return barData;
	        }

	        /**
	         * Creates a new LineGraph widget
	         * @param id The id of the new widget
	         * @param callback The function which will be called once the widget is all set up. Follow arguments will be passed:
	         *           1. The id the widget has within the DOM
	         *           2. The function to call when new data has arrived, with the new data as an argument
	         * @param htmlTemplate The default template for Canvas widgets
	         * @return The html of the Widget which should be inserted into the DOM
	         **/
	    }, {
	        key: "create",
	        value: function create(id, callback, htmlTemplate) {
	            var _this = this;

	            var html = $('<div/>').prepend(htmlTemplate);

	            //create the id to be set in html
	            var htmlId = "iotdbWidget" + id;
	            var htmlIdSelector = "#" + htmlId;

	            //When html of widget is loaded, set up barGraph in canvas
	            $("#templateWidgetCanvas").ready(function () {

	                //Replace dummy ids with real ones
	                $("#templateWidget").attr("id", htmlId);
	                $("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");
	                $("#templateWidgetCanvas").attr("id", htmlId + "-canvas");

	                //Resize inner canvas after resizing
	                $("#" + ("" + htmlId)).parent().resize(function () {
	                    _barGraphWidgetFactory._resizeCanvas(htmlId);
	                });

	                // Set correct language for title
	                $(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetBarGraphTitle);

	                // Set remove callback
	                $(htmlIdSelector).find("#removeWidgetButton").click(function () {
	                    _userEvents.removeWidget(htmlId);
	                });

	                // Set config callback
	                $(htmlIdSelector).find("#configureWidgetButton").click(function () {
	                    _userEvents.configureWidget(htmlId);
	                });

	                // Define variables
	                var timeRelative = undefined;
	                var barData = [[]];
	                var delta = undefined;
	                var timeIntervalUnit = undefined;
	                var realBarData = [];
	                var barGraph = undefined;
	                var min = undefined;
	                var max = undefined;
	                var color = undefined;
	                var configurableOptions = undefined;
	                var minAndMax = [];
	                var groupInterval = 3;
	                var labelTicks = {
	                    label: ""
	                };

	                //the DOM-Element to display the time of the last Update
	                var lastUpdate = $("#" + htmlId + "-lastUpdate")[0];

	                //Function to be called when new data arrives
	                var dataUpdate = function dataUpdate(data) {

	                    // check if data is actually something
	                    if (data[0] != undefined && data[0].Observations != undefined) {

	                        // Set time for last upadate
	                        var date = new Date();
	                        lastUpdate.innerText = window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty();

	                        // update barData
	                        realBarData = _this._convertedDataToBarData(data);

	                        // Set min max values
	                        if (timeRelative) {
	                            var relMinMax = _this._getRelativMinAndMax(realBarData, delta);
	                            configurableOptions.xmin = relMinMax.min.toUTCString();
	                            configurableOptions.xmax = relMinMax.max.toUTCString();
	                        } else {}
	                        // min max have not changed, since they are absolute

	                        // trim Data according to new min and max values
	                        realBarData = _this._trimData(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), realBarData);

	                        //calculate labels of barGraph
	                        labelTicks = _this._calcLabelTicks(new Date(configurableOptions.xmin), new Date(configurableOptions.xmax), groupInterval);
	                        barData = _this._groupData(realBarData, groupInterval, labelTicks);
	                        // console.log(labelTicks, groupInterval);

	                        // set X-Axis label correctly
	                        configurableOptions.labels = labelTicks.label;

	                        // Redraw barGraph rgraph
	                        RGraph.reset(document.getElementById(htmlId + "-canvas"));
	                        barGraph = new RGraph.Bar({ id: htmlId + "-canvas", data: barData, options: configurableOptions }).draw();
	                    }
	                    //id not important but needed in tests
	                    var _view = new _ViewViewJs.View("id");
	                    if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
	                        _view.popLoading(htmlId);
	                    }
	                };

	                //Function to be called when new configuration arrives
	                var configUpdate = function configUpdate(config) {

	                    // format config properly
	                    config = _this._formatConfigurableData(config);
	                    html.find(".widget-title")[0].innerText = config.title.data;

	                    //Check for absolute or rellativ and chose min max right
	                    timeRelative = config.timeIntervalRelative.data;
	                    timeIntervalUnit = config.timeIntervalUnit.data;
	                    max = config.endTime.data.toUTCString();
	                    min = config.startTime.data.toUTCString();
	                    delta = _this._getMilliseconds(config.timeInterval.data, timeIntervalUnit);

	                    // check if scatterGraph exists
	                    if (realBarData.length >= 1) {
	                        // set min max
	                        if (timeRelative) {
	                            var relMinMax = _this._getRelativMinAndMax(realBarData, delta);
	                            min = relMinMax.min.toUTCString();
	                            max = relMinMax.max.toUTCString();
	                        } else {}
	                        // Do nothing, since min, max is set

	                        // set X-Axis label correctly
	                        labelTicks = _this._calcLabelTicks(new Date(min), new Date(max), config.timeGroups.data);
	                        // console.log(labelTicks, config.timeGroups.data);
	                    }

	                    // View configuration
	                    // set title by config settings title:
	                    groupInterval = config.timeGroups.data;

	                    configurableOptions = {
	                        xmin: min,
	                        xmax: max,
	                        gutterLeft: 50,
	                        colors: config.colors.data,
	                        backgroundBarcolor1: config.backgroundBarcolor1.data,
	                        backgroundBarcolor2: config.backgroundBarcolor2.data,
	                        backgroundGrid: config.backgroundGrid.data,
	                        gutterBottom: 120,
	                        labels: labelTicks.label,
	                        titleXaxis: "Time intervals",
	                        titleXaxisPos: -0.1,
	                        titleYaxis: config.titleY.data,
	                        titleYaxisPos: 0.15
	                    };

	                    RGraph.reset(document.getElementById(htmlId + "-canvas"));
	                    barGraph = new RGraph.Bar({ id: htmlId + "-canvas", data: barData, options: configurableOptions }).draw();
	                };

	                callback(htmlId, dataUpdate, configUpdate);
	                _barGraphWidgetFactory._resizeCanvas(htmlId);
	            });
	            return html;
	        }

	        /**
	         * Called when canvas is resized, when widget is added to the dashboard, and when the resize handler (the arrow button) is released.
	         * @param htmlId The id of the widget whose canvas shall be resized.
	         * @private
	         *
	         */
	    }, {
	        key: "_resizeCanvas",
	        value: function _resizeCanvas(htmlId) {
	            var canvas = $("#" + htmlId + "-canvas");
	            var w = canvas.parent().width();
	            var h = canvas.parent().height();
	            canvas.attr("width", w);
	            canvas.attr("height", h);
	            RGraph.Clear(canvas[0]);
	            RGraph.Redraw();
	        }
	    }]);

	    return BarGraphWidgetFactory;
	})();

	exports.BarGraphWidgetFactory = BarGraphWidgetFactory;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ConfigTableRowFactoryJs = __webpack_require__(20);

	var _ViewJs = __webpack_require__(6);

	var _wtData = null;
	var _widgetConfigurableData = null;
	var _widgetId = null;
	var _widgetConfigurationView = null;

	/**
	 * This class represents a widget configuration service for a specific widget.
	 * When creating this object a configuration window will show up,
	 * where every detail of the widget will be configurable.
	 *
	 **/

	var WidgetConfigurationView = (function () {
	    /**
	     * Constructor of the widget configuration service, implements singleton
	     * @param widgetData wtData object of the widget that should be configured.
	     **/

	    function WidgetConfigurationView(widgetData) {
	        var _this = this;

	        _classCallCheck(this, WidgetConfigurationView);

	        if (!_widgetConfigurableData) {
	            // create new instance
	            _widgetConfigurationView = this;
	            _widgetConfigurationView._configTableRowFactory = new _ConfigTableRowFactoryJs.ConfigTableRowFactory();
	            // configure close and save button
	            $("#widget_conf_close").click(function (e) {
	                return _this._toggleView(_widgetConfigurableData);
	            });
	            $("#widget_conf_save").click(function (e) {
	                return _this._saveExit();
	            });
	        }

	        // set up configuration of this service
	        _wtData = widgetData;
	        _widgetId = _wtData.getID();

	        //access via this needed for testing purposes
	        this.widgetConfigurableData = _widgetConfigurableData = _wtData.getConfigurableData();

	        // create view and display it :)
	        this._toggleView(_widgetConfigurableData);
	    }

	    /**
	     * Save the edited key value map in the wtData and toggle view
	     * @private
	     */

	    _createClass(WidgetConfigurationView, [{
	        key: '_saveExit',
	        value: function _saveExit() {
	            _widgetConfigurationView._createConfigurableData();

	            //should start loading new data soon
	            if ([WIDGET_TYPE_PLAINTEXT].indexOf(_wtData.type) == -1 && _widgetConfigurableData.sensorThingsConfiguration.data[0].data.dataStreamUrl.data.length > 0) new _ViewJs.View().pushLoading(_widgetId);

	            _wtData.setConfigurableData(_widgetConfigurableData);
	            this._toggleView(_widgetConfigurableData);
	        }

	        /**
	         * Gets the relevant information out of any possible type of structure of DOM elements to create a ConfigurableData object.
	         * @param tr Table row out of which to get data
	         * @param key Name of the configurable feature
	         * @param configurableData ConfigurableData object to append new data to
	         * @returns {{value: *, type: *, options: *}|{failedAttribute: string}} The configurable data object in case of success, or else an object containing the attribute where the parsing error occurred.
	         * @private
	         */
	    }, {
	        key: '_extractValue',
	        value: function _extractValue(tr, key, configurableData) {
	            var value = undefined,
	                type = undefined,
	                options = null;
	            switch ($(tr).attr('class')) {
	                case "widget-config-array-input":
	                    if (configurableData[key] == null) {
	                        configurableData[key] = {};
	                    }
	                    type = TYPE_ARRAY;
	                    value = _widgetConfigurationView._getConfArray(tr, configurableData[key].data);
	                    break;
	                case "widget-config-object-input":
	                    if (configurableData == null) configurableData = {};
	                    if (configurableData[key] == null) {
	                        configurableData[key] = {};
	                    }
	                    type = TYPE_OBJECT;
	                    value = _widgetConfigurationView._getConfObject(tr, configurableData[key].data);
	                    break;
	                case "widget-config-item":
	                    var input = $(tr).find(".widget-config-data");
	                    switch ($(input).attr("input_fmt")) {
	                        case "string":
	                            type = TYPE_STRING;
	                            value = $(input).find(".widget-config-input").val();
	                            //Assuming no invalid input is possible here.
	                            break;
	                        case "int":
	                            type = TYPE_INTEGER;
	                            value = parseInt($(input).find(".widget-config-input").val());
	                            if (isNaN(value)) {
	                                return {
	                                    failedAttribute: key
	                                };
	                            }
	                            break;
	                        case "date":
	                            type = TYPE_DATE;
	                            var str = $(input).find(".widget-config-input").val();
	                            value = this._configTableRowFactory._dateAddMinutes(new Date(str + "Z"), new Date().getTimezoneOffset());
	                            if (value == "Invalid Date" || value < new Date(0)) {
	                                return {
	                                    failedAttribute: key
	                                };
	                            }
	                            break;
	                        case "dropdown":
	                            type = TYPE_DROPDOWN;
	                            value = parseInt($(input).find(".widget-config-input").find("option:selected").val());
	                            var options = {};
	                            $(input).find(".widget-config-input").find("option").each(function () {
	                                options[$(this).text()] = $(this).val();
	                            });
	                            //Assuming no invalid input is possible here.
	                            break;
	                        case "number":
	                            type = TYPE_NUMBER;
	                            value = parseFloat($(input).find(".widget-config-input").val());
	                            if (isNaN(value)) {
	                                return {
	                                    failedAttribute: key
	                                };
	                            }
	                            break;
	                        case "color":
	                            type = TYPE_COLOR;
	                            value = $(input).find(".widget-config-input").val();
	                            if (!/^#[0-9A-F]{6}$/i.test(value)) {
	                                return {
	                                    failedAttribute: key
	                                };
	                            }
	                            break;
	                        case "checkbox":
	                            type = TYPE_BOOLEAN;
	                            value = $(input).find(".widget-config-input").prop("checked");
	                            if (typeof value != "boolean") {
	                                return {
	                                    failedAttribute: key
	                                };
	                            }
	                            break;
	                        case "fssearch":
	                            type = TYPE_FUZZY_SENSOR_SEARCH;
	                            value = $(input).find(".urlBox").val();
	                            break;
	                        default:
	                            type = TYPE_OTHER;
	                            console.log("unrecognized: ", $(input), $(input).attr("input_fmt"));
	                            break;
	                    }
	                    break;
	                default:
	                    //standard: ""
	                    type = TYPE_OTHER;
	                    value = $(tr).find(".widget-config-data").find("input").val();
	                    break;
	            }
	            return {
	                value: value,
	                type: type,
	                options: options
	            };
	        }

	        /**
	         * Creates a ConfigurableDataObject out of the current configuration table and saves it in widgetConfigurableData.
	         * @private
	         */
	    }, {
	        key: '_createConfigurableData',
	        value: function _createConfigurableData() {
	            //deep clone for restoration
	            var oldConfig = jQuery.extend(true, {}, _widgetConfigurableData);

	            var myTable = $("#widget_conf_table");
	            var len = $(myTable).children().length;
	            for (var k = 0; k < len; k++) {
	                var tr = $(myTable).children()[k];
	                var key = $(tr).find(".widget-conf-label").attr("key-id");
	                var value = this._extractValue(tr, key, _widgetConfigurableData, null);

	                //Error handling
	                if (value.failedAttribute) {
	                    alert("Parsing error at attribute \"" + value.failedAttribute + "\". Saving aborted, old configuration restored.\nPlease verify the current value.");
	                    //restore old config
	                    _widgetConfigurableData = oldConfig;
	                    return;
	                }

	                _widgetConfigurableData[key].data = value.value;
	                _widgetConfigurableData[key].type = value.type;
	            }
	        }

	        /**
	         * Creates an array structure out of a configuration and all of its subcomponents.
	         * @param {HTML} tr Configuration Table row out of which to extract array
	         * @param {Object} res object to insert array entries in
	         * @returns {Array}
	         * @private
	         */
	    }, {
	        key: '_getConfArray',
	        value: function _getConfArray(tr, res) {
	            res = [];
	            var tbody = $(tr).find("tbody.widget-config-array-table").first();
	            var len = $(tbody).children().length;
	            for (var k = 0; k < len; k++) {
	                var object = $(tbody).children()[k];
	                var key = $(object).find(".widget-conf-label").attr("key-id");
	                var value = this._extractValue(object, key, res);

	                //Error handling
	                if (value.failedAttribute) {
	                    return value;
	                }

	                if (res == null) res = [];
	                if (res[key] == null) res[key] = {};
	                res[key].data = value.value;
	                res[key].type = value.type;
	                res[key].options = value.options;
	            }
	            return res;
	        }

	        /**
	         * Creates an object structure out of a configuration and all of its subcomponents.
	         * @param {HTML} tr Configuration Table row out of which to extract object
	         * @param {Object} res object to insert object attributes in
	         * @returns {Object} the finished object structure
	         * @private
	         */
	    }, {
	        key: '_getConfObject',
	        value: function _getConfObject(tr, res) {
	            var tbody = $(tr).find("tbody.widget-config-object-table").first();
	            var len = tbody.children().length;
	            for (var k = 0; k < len; k++) {
	                var object = tbody.children()[k];
	                var key = $(object).find(".widget-conf-label").attr("key-id");
	                var value = this._extractValue(object, key, res);

	                //Error handling
	                if (value.failedAttribute) {
	                    return value;
	                }

	                if (res == null) res = {};
	                if (res[key] == null) res[key] = {};
	                res[key].data = value.value;
	                res[key].type = value.type;
	                res[key].options = value.options;
	            }
	            return res;
	        }

	        /**
	         * This method toggles the view of the configuration service and displays it.
	         * @private
	         */
	    }, {
	        key: '_toggleView',
	        value: function _toggleView(wConfigurableData) {
	            var conf = $("div.conf-popup#configureWidget");
	            if (conf.hasClass("open")) {
	                conf.css("animationName", "animateOut");
	            } else {
	                //load DatastreamList for Searching
	                _widgetConfigurationView._configTableRowFactory.loadDataStreamList();

	                conf.find("#widget_conf_title").text("Configure widget: " + wConfigurableData.title.data);

	                // Add an editable table of every configurable data to the window
	                var confTable = $("#widget_conf_table");
	                confTable.html('');
	                for (var k in wConfigurableData) {
	                    if (wConfigurableData.hasOwnProperty(k)) {
	                        var key = k;
	                        var htmlId = key + '-' + _widgetId + '-config';

	                        confTable.append(_widgetConfigurationView._configTableRowFactory.create(key, wConfigurableData[key], htmlId));
	                    }
	                }
	                conf.css("animationName", "animateIn");
	            }

	            conf.toggleClass("open");
	        }
	    }]);

	    return WidgetConfigurationView;
	})();

	exports.WidgetConfigurationView = WidgetConfigurationView;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _DataModelDataModelProxy = __webpack_require__(1);

	var _SensorThingsCommunicationSensorThingsCommunicationsJs = __webpack_require__(21);

	var _SearchSearchJs = __webpack_require__(25);

	var logging = false;

	var _configTableRowFactory = null;
	var _dataStreamList = null;
	/**
	 * Creates rows for individual options of widget configurations.
	 * The values of these options can be build of single values, arrays and objects.
	 */

	var ConfigTableRowFactory = (function () {

	    /**
	     * Constructor of the widget configuration service, implements singleton
	     * @returns {ConfigTableRowFactory} Singleton object
	     */

	    function ConfigTableRowFactory() {
	        _classCallCheck(this, ConfigTableRowFactory);

	        if (!_configTableRowFactory) {
	            _configTableRowFactory = this;
	            this.dataModelProxy = new _DataModelDataModelProxy.DataModelProxy();
	            this.sensorThingsCommunications = new _SensorThingsCommunicationSensorThingsCommunicationsJs.SensorThingsCommunications();
	            this.search = new _SearchSearchJs.Search();
	        }
	        return _configTableRowFactory;
	    }

	    /**
	     * retrieves the list of Datastreams of all registered Servers
	     */

	    _createClass(ConfigTableRowFactory, [{
	        key: 'loadDataStreamList',
	        value: function loadDataStreamList() {
	            var _this = this;

	            this._dataStreamList = [];
	            var servers = this.dataModelProxy.getUserConfig().getDashboardConfig().getServerList();
	            var serverID = 0;

	            var _loop = function (server) {
	                if (logging) console.log("Retrieving Datastreams from Server:", servers[server].url);
	                var sID = serverID;
	                var cb = function cb(a) {
	                    this.dataStreamListAvailable(a, sID);
	                };
	                _this.sensorThingsCommunications.getDataStreamList(servers[server].url, cb.bind(_this));
	                serverID++;
	            };

	            for (var server in servers) {
	                _loop(server);
	            }
	        }

	        /**
	         * callbackFuction for retrieving all Datastreams
	         * @param {Object} list the list of DataStreams of a server
	         * @param {integer} serverID the id of the server the Datastreams originate from
	         */
	    }, {
	        key: 'dataStreamListAvailable',
	        value: function dataStreamListAvailable(list, serverID) {
	            if (logging) console.log("Datastreams", list);
	            list.forEach(function (e) {
	                e["server-id"] = serverID;
	            });
	            this._dataStreamList = this._dataStreamList.concat(list);
	        }

	        /**
	         * creates the UI from the configuration
	         * @param key the key for the configuration Element
	         * @param tree the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         */
	    }, {
	        key: 'create',
	        value: function create(key, tree, htmlId) {
	            switch (tree.type) {
	                case TYPE_COLOR:
	                    return _configTableRowFactory._createColorRow(key, tree.data, htmlId);
	                case TYPE_STRING:
	                    return _configTableRowFactory._createStringRow(key, tree.data, htmlId);
	                case TYPE_INTEGER:
	                    return _configTableRowFactory._createIntegerRow(key, tree.data, htmlId);
	                case TYPE_BOOLEAN:
	                    return _configTableRowFactory._createCheckboxRow(key, tree.data, htmlId);
	                case TYPE_ARRAY:
	                    return _configTableRowFactory._createArrayRow(key, tree.data, htmlId);
	                case TYPE_DATE:
	                    return _configTableRowFactory._createDateRow(key, tree.data, htmlId);
	                case TYPE_DROPDOWN:
	                    return _configTableRowFactory._createDropdownRow(key, tree.data, tree.options, htmlId);
	                case TYPE_NUMBER:
	                    return _configTableRowFactory._createNumberRow(key, tree.data, htmlId);
	                case TYPE_FUZZY_SENSOR_SEARCH:
	                    return _configTableRowFactory._createFSSearchRow(key, tree.data, htmlId);
	                case TYPE_OBJECT:
	                    return _configTableRowFactory._createObjectRow(key, tree.data, htmlId);
	                default:
	                    return _configTableRowFactory._createSimpleRow(key, tree.data, tree.type, htmlId);
	            }
	        }

	        /**
	         * creates a String input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createStringRow',
	        value: function _createStringRow(key, value, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="string"><input class="widget-config-input" type="text" value="' + value + '" id="' + htmlId + '"></td>');
	            return tr;
	        }

	        /**
	         * creates a Integer input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createIntegerRow',
	        value: function _createIntegerRow(key, value, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="int"><input class="widget-config-input" type="number" step="1" value="' + value + '" id="' + htmlId + '"></td>');
	            return tr;
	        }

	        /**
	         * creates a Date input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createDateRow',
	        value: function _createDateRow(key, value, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="date"><input class="widget-config-input" type="datetime-local" value="' + this._dateAddMinutes(value, -1 * new Date().getTimezoneOffset()).toISOString().substring(0, value.toISOString().length - 2) + '" id="' + htmlId + '"></td>');
	            return tr;
	        }

	        /**
	         * creates a Dropdown input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createDropdownRow',
	        value: function _createDropdownRow(key, value, options, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            var optionsText = "";
	            for (var k in options) {
	                if (value == options[k]) {
	                    optionsText = optionsText + '<option value="' + options[k] + '" selected>' + k + '</option>';
	                } else {
	                    optionsText = optionsText + '<option value="' + options[k] + '">' + k + '</option>';
	                }
	            }
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="dropdown"><select class="widget-config-input" id="' + htmlId + '">' + optionsText + '</select></td>');
	            return tr;
	        }

	        /**
	         * creates a floating point number input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createNumberRow',
	        value: function _createNumberRow(key, value, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="number"><input class="widget-config-input" type="number" value="' + value + '" id="' + htmlId + '"></td>');
	            return tr;
	        }

	        /**
	         * Click handler for the Search
	         * @param e
	         * @private
	         */
	    }, {
	        key: '_selectedResult',
	        value: function _selectedResult(e) {
	            var target = $(e.target).filter("li");
	            if (target.length <= 0) {
	                target = $(e.target).parent().filter("li");
	                if (target.length <= 0) {
	                    target = $(e.target).parent().parent().filter("li");
	                }
	            }
	            var keyID = $(target).attr("key-id");
	            var serverID = $(target).attr("server-id");
	            var tbody = $(target).parent().parent().parent().parent().parent();
	            $(tbody).find(".searcher").val("");
	            $(tbody).find(".list").html("");
	            $(tbody).find(".urlBox").val(this._dataStreamList.find(function (e) {
	                return e["@iot.id"] == keyID && e["server-id"] == serverID;
	            })["@iot.selfLink"]);
	        }

	        /**
	         * callback for change of the search-field
	         * updates the search results
	         * @param evt
	         * @private
	         */
	    }, {
	        key: '_refreshSearchResults',
	        value: function _refreshSearchResults(evt) {
	            var output = [];
	            var tr = $(evt.target).parent().parent().parent().parent().parent().parent();
	            var list = $(tr).find(".list");
	            var searcher = $(tr).find(".searcher");

	            //applySearch
	            var searchResult = this.search.search(this._dataStreamList, $(searcher).val(), false);

	            for (var k in searchResult) {
	                var _name = searchResult[k].name;
	                var description = searchResult[k].description;

	                var observationType = searchResult[k].observationType;
	                var phenomenonTime = searchResult[k].phenomenonTime;
	                if (searchResult[k].unitOfMeasurement != null) {
	                    var unitOfMeasurementDefinition = searchResult[k].unitOfMeasurement.definition;
	                    var unitOfMeasurementName = searchResult[k].unitOfMeasurement.name;
	                    var unitOfMeasurementSymbol = searchResult[k].unitOfMeasurement.symbol;
	                }
	                var id = searchResult[k]["@iot.id"];
	                var serverID = searchResult[k]["server-id"];
	                var url = searchResult[k]["@iot.selfLink"];

	                output.push('<li class="list-group-item serverSelector" key-id=' + id + ' server-id=' + serverID + '><h3><p class="label label-default search-label">' + _name + "</p></h3><h6>" + description + '</h6></li>');
	            }
	            if (searchResult.length <= 0 && $(searcher).val() != "") output.push('<li class="list-group-item"><h3><p class="label label-default">no Results</p></h3></li>');

	            if ($(searcher).val() != "") {
	                $(list).html('<ul class="list-group">' + output.join('') + '</ul>');
	            } else {
	                $(list).html("");
	            }
	            $(list).find(".serverSelector").off("click");
	            $(list).find(".serverSelector").on("click", this._selectedResult.bind(this));
	        }

	        /**
	         * creates a Datastream-search input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createFSSearchRow',
	        value: function _createFSSearchRow(key, value, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td>' + '<td class="widget-config-data" input_fmt="fssearch">' + '<table class="fssearchTable">' + '<tbody class="fssearchTBody">' + '<tr>' + '<td class="well">' + '<div class="url-box-wrapper" style="white-space: nowrap"><label class="search-box-label">' + ' URL:' + '</label>' + '<input class="urlBox form-control" type="url" name="url" placeholder="plain URL to' + ' datastream"' + ' value="' + value + '">' + '</div>' + '</td>' + '</tr>' + '<tr class="searchFormTableRow">' + '<td class="well">' + '<div class="url-box-wrapper">' + '<label class="search-box-label">Search:</label>' + '<input type="search" class="searcher form-control" value="" placeholder="search datastreams for URL">' + '</div>' + '<div class="list search-result-list">' + '</div>' + '</td>' + '</tr>' + '</tbody>' + '</table>' + '</td>');

	            $(tr).find(".searcher").off("keyup");
	            $(tr).find(".searcher").on("keyup", this._refreshSearchResults.bind(this));

	            return tr;
	        }

	        /**
	         * creates a Colorpicker input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createColorRow',
	        value: function _createColorRow(key, value, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="color"><input class="widget-config-input" type="color" value="' + value + '" id="' + htmlId + '"></td>');
	            return tr;
	        }

	        /**
	         * creates a Checkbox input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createCheckboxRow',
	        value: function _createCheckboxRow(key, value, htmlId) {
	            var tr = $("<tr class='widget-config-item'></tr>");
	            var checked = value == true ? " checked" : "";
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="checkbox"><input class="widget-config-input" type="checkbox" id="' + htmlId + '"' + checked + '></td>');
	            return tr;
	        }

	        /**
	         * creates a simple input Element
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createSimpleRow',
	        value: function _createSimpleRow(key, value, type, htmlId) {
	            var tr = $("<tr></tr>");
	            $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="simple"><input class="widget-config-input" type="' + type + '" value="' + value + '" id="' + htmlId + '"></td>');
	            return tr;
	        }

	        /**
	         * creates a Array of input Elements
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createArrayRow',
	        value: function _createArrayRow(key, data, htmlId) {
	            var tr = $("<tr class='widget-config-array-input'></tr>");
	            $(tr).html("<td ><div class='conf-array-title-row'><span class='widget-conf-label' key-id='" + key + "'>" + key + "</span> <button class='add-entry-button'>Add <span class='entry-counter badge'>" + data.length + "</span></button></div></td>");
	            var table = $("<table></table>");
	            var td = $(tr).find("td");
	            $(td).attr("colspan", 2);
	            $(td).append(table);

	            $(table).html("<tbody class='widget-config-array-table'></tbody>");
	            var tbody = $(table).find(".widget-config-array-table");

	            for (var i in data) {
	                var obj = _configTableRowFactory.create(i, data[i], htmlId + "-" + i);
	                $(tbody).append(obj);
	            }

	            $(tbody).children().append(_configTableRowFactory._getRemoveButton());
	            $(tr).find(".add-entry-button").off("click");
	            $(tr).find(".add-entry-button").on("click", function (e) {
	                _configTableRowFactory._addEntry($(e.target).parent().parent().find("button").parent().parent().parent());
	            });
	            return tr;
	        }

	        /**
	         * creates a Object with input Elements
	         * @param key the key for the configuration Element
	         * @param value the data of the configuration Element
	         * @param htmlId the id of the configuration Element
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_createObjectRow',
	        value: function _createObjectRow(key, data, htmlId) {
	            var tr = $("<tr class='widget-config-object-input'></tr>");
	            $(tr).html("<td class='widget-conf-label' key-id='" + key + "'>" + key + "</td>");
	            var td_table = $("<td></td>");
	            var table = $("<table></table>");
	            $(td_table).append(table);
	            $(tr).append(td_table);
	            $(table).html("<tbody class='widget-config-object-table'>");
	            var tbody = $(table).find(".widget-config-object-table");
	            for (var k in data) {
	                if (data.hasOwnProperty(k)) {
	                    $(table).append(_configTableRowFactory.create(k, data[k], htmlId + "-" + k));
	                }
	            }
	            return tr;
	        }

	        /**
	         * Adds a number of minutes to the given date
	         * @param date Date to add minutes to
	         * @param offset number of minutes to add to date
	         * @return {Date} Resulting date
	         * @private
	         */
	    }, {
	        key: '_dateAddMinutes',
	        value: function _dateAddMinutes(date, offset) {
	            return new Date(date.getTime() + offset * 1000 * 60);
	        }

	        /**
	         * Callback for the add button. Adds a new Entry to a table
	         * @param tr
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_addEntry',
	        value: function _addEntry(tr) {
	            var table = $(tr).children().children().children().filter("tbody");
	            var count = $(table).children().filter(".widget-config-object-input").length;
	            $(table).append($(table).children().filter(".widget-config-object-input").last().clone());
	            $(table).children().filter(".widget-config-object-input").last().children().filter(".widget-conf-label").text(count);
	            $(table).children().filter(".widget-config-object-input").last().children().filter(".widget-conf-label").attr("key-id", count);
	            $(table).find(".tr-delete.close").off("click");
	            $(table).find(".tr-delete.close").on("click", function (e) {
	                _configTableRowFactory._removeEntry(e);
	                return true;
	            });
	            count++;
	            $(table).parent().parent().children().filter("div").children().filter("button").children().filter(".entry-counter").text(count);
	            $(table).find(".add-entry-button").off("click");
	            $(table).find(".add-entry-button").on("click", function (e) {
	                _configTableRowFactory._addEntry($(e.target).parent().parent().find("button").parent().parent().parent());
	                return true;
	            });

	            $(table).find(".searcher").off("keyup");
	            $(table).find(".searcher").on("keyup", this._refreshSearchResults.bind(this));
	            var list = $(table).find(".list");
	            $(list).find(".serverSelector").off("click");
	            $(list).find(".serverSelector").on("click", this._selectedResult.bind(this));
	        }

	        /**
	         * Callback for the remove button. Removes an Entry from a table
	         * @param e
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_removeEntry',
	        value: function _removeEntry(e) {
	            var table = $(e.target).parent().parent().parent();
	            var count = $(table).children().filter(".widget-config-object-input").length;
	            if (count <= 1) {
	                alert("Cannot delete last Array Object!");
	                return;
	            }
	            $(e.target).parent().parent().remove();
	            $(table).parent().parent().children().filter("div").children().filter("button").children().filter(".entry-counter").text(count - 1);
	            for (var i = 0; i < count; i++) {
	                table.children().filter(".widget-config-object-input").eq(i).children().filter(".widget-conf-label").text(i);
	                table.children().filter(".widget-config-object-input").eq(i).children().filter(".widget-conf-label").attr("key-id", i);
	            }
	        }

	        /**
	         * creates a remove button
	         * @returns the HTML
	         * @private
	         */
	    }, {
	        key: '_getRemoveButton',
	        value: function _getRemoveButton() {
	            var tr_span = $("<td></td>");
	            var span = $("<span class='tr-delete close'>x</span>");
	            $(span).off("click");
	            $(span).on("click", function (e) {
	                _configTableRowFactory._removeEntry(e);
	                return true;
	            });
	            $(tr_span).append(span);
	            return tr_span;
	        }
	    }]);

	    return ConfigTableRowFactory;
	})();

	exports.ConfigTableRowFactory = ConfigTableRowFactory;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ServerQueryJs = __webpack_require__(22);

	var _MQTTHandleJs = __webpack_require__(24);

	var _STParserJs = __webpack_require__(23);

	var sensorThingsCommunications = null;

	/**
	 * This class is the main class for handleing Communication with the STServer
	 *
	 * This class has the following properties:
	 * myDataModel       -- reference to the DataModel
	 * myDataObserver    -- reference to the DataObserver
	 * mqttHandles       -- list of all registered MQTT Handles
	 * nextID            -- the id for the next registering MQTT Handle
	 *
	 */

	var SensorThingsCommunications = (function () {

	    /**
	     * Implements Singleton.
	     * @returns {SensorThingsCommunications} the Singleton object.
	     */

	    function SensorThingsCommunications() {
	        _classCallCheck(this, SensorThingsCommunications);

	        if (!sensorThingsCommunications) {
	            sensorThingsCommunications = this;
	            this.mqttHandles = {};
	            this.nextID = 1;
	        }
	        return sensorThingsCommunications;
	    }

	    /**
	     * Creates a simple one-time query to the specified URL
	     * @param {string} queryURL the URL to use
	     * @param {Object} params the ParameterMap
	     * @param {function} callback the callback to write the Data
	     * @param {Date} obsStart start-date of the filter for the Observations
	     * @param {Date} obsEnd end-date of the filter for the Observations
	     */

	    _createClass(SensorThingsCommunications, [{
	        key: 'createQuery',
	        value: function createQuery(queryURL, params, callback, obsStart, obsEnd) {
	            new _ServerQueryJs.ServerQuery().createQuery(queryURL, params, callback, obsStart, obsEnd);
	        }

	        /**
	         * Calls a simple one-time query without decoding and adding the selectors to the URL
	         * @param {string} query the query. This has to be a syntactically correct and complete queryURL
	         * @param {function} callback the callback to write the Data
	         */
	    }, {
	        key: 'createDirectQuery',
	        value: function createDirectQuery(query, callback) {
	            new _ServerQueryJs.ServerQuery().createDirectQuery(query, callback);
	        }

	        /**
	         * Calls a simple one-time query with Paging
	         * @param {string} query the query. This has to be a syntactically correct and complete queryURL
	         * @param {function} callback the callback to write the Data
	         */
	    }, {
	        key: 'createDirectQueryPaging',
	        value: function createDirectQueryPaging(query, callback) {
	            new _ServerQueryJs.ServerQuery().createDirectQueryPaging(query, callback);
	        }

	        /**
	         * Gathers a list of all Datastreams on a SensorThingsServer
	         * @param {string} url the URL to the Server
	         * @param {function} callback a Callback to write the list to
	         */
	    }, {
	        key: 'getDataStreamList',
	        value: function getDataStreamList(url, callback) {
	            var selectors = "/Datastreams?$top=100";
	            this.createDirectQueryPaging(url + selectors, callback);
	        }

	        /**
	         * Registers one or multiple MQTT queries to the specified URL
	         *
	         * @param {Object} parameterMap the ParameterMap
	         * @param {string} query the queryString
	         * @param {string} baseTopic the topic to navigate to the Datastream
	         * @param {function} callback a callback to call if new Data is available
	         * @returns {number} the id of the created mqttPack
	         */
	    }, {
	        key: 'registerMQTT',
	        value: function registerMQTT(parameterMap, query, baseTopic, callback) {
	            var topics = this._generateTopics(parameterMap);
	            var myID = this.nextID;
	            this.nextID = this.nextID + 1;
	            this.mqttHandles[myID] = [];
	            var callbackProxy = function callbackProxy(data) {
	                callback(data);
	            };
	            var queryParts = {
	                serverURL: query,
	                genericTopic: baseTopic
	            };

	            for (var k in topics) {
	                var mqtt = new _MQTTHandleJs.MQTTHandle();

	                /*ServerURL must look like: "<ServerIP>:<WebsocketPort>/mqtt" */
	                /*Entity/Topic must look like: "v1.0/Datastreams(<DS Number>)/Observations"*/

	                mqtt.registerMQTT(queryParts.serverURL, queryParts.genericTopic + topics[k], callbackProxy);
	                this.mqttHandles[myID].push(mqtt);
	            }
	            return myID;
	        }

	        /**
	         * removes a MQTT-Handle
	         * @param {number} myID then ID of the MQTT Handle to be removed
	         * @returns {boolean} success
	         */
	    }, {
	        key: 'unregister',
	        value: function unregister(myID) {
	            if (this.mqttHandles[myID] != null) {
	                for (var k in this.mqttHandles[myID]) {
	                    this.mqttHandles[myID][k].unregister();
	                }
	                this.mqttHandles[myID] = null;
	                return true;
	            } else {
	                return false;
	            }
	        }

	        /**
	         * generates the topics for MQTT Queries. A Query which requests Data from multiple topics has to be split up into multiple MMQTT Queries.
	         * @param {Object} pM the ParameterMap
	         * @returns {Array} a List of the Topics to subuscribe to
	         * @private
	         */
	    }, {
	        key: '_generateTopics',
	        value: function _generateTopics(pM) {
	            var topics = [];
	            var _addTopic = function _addTopic(topic) {
	                if (!topics.some(function (t) {
	                    return t == topic;
	                })) {
	                    topics.push(topic);
	                }
	            };

	            if (pM.DataStream_name || pM.DataStream_description || pM.DataStream_observationType || pM.DataStream_unitOfMeasurement || pM.DataStream_observedArea || pM.DataStream_phenomenonTime || pM.DataStream_resultTime) {
	                _addTopic("");
	            }
	            if (pM.Observation_phenomenonTime || pM.Observation_resultTime || pM.Observation_result || pM.Observation_resultQuality || pM.Observation_validTime || pM.Observation_parameters) {
	                _addTopic("/Observations");
	            }
	            if (pM.FeatureOfInterest_name || pM.FeatureOfInterest_description || pM.FeatureOfInterest_encodingType || pM.FeatureOfInterest_feature) {
	                _addTopic("/Observations/FeatureOfInterest");
	            }
	            if (pM.ObservedProperty_name || pM.ObservedProperty_definition || pM.ObservedProperty_description) {
	                _addTopic("/ObservedProperty");
	            }
	            if (pM.Sensor_name || pM.Sensor_description || pM.Sensor_encodingType || pM.Sensor_metadata) {
	                _addTopic("/Sensor");
	            }
	            if (pM.Thing_name || pM.Thing_description || pM.Thing_properties) {
	                _addTopic("/Thing");
	            }
	            if (pM.Thing_HistoricalLocations) {
	                _addTopic("/Thing/HistoricalLocations");
	            }
	            if (pM.Thing_Location_name || pM.Thing_Location_description || pM.Thing_Location_encodingType || pM.Thing_Location_location) {
	                _addTopic("/Thing/Location");
	            }
	            return topics;
	        }
	    }]);

	    return SensorThingsCommunications;
	})();

	exports.SensorThingsCommunications = SensorThingsCommunications;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _STParserJs = __webpack_require__(23);

	var logging = false;

	/**
	 * This class does the actual Communication/Querying to the Server
	 *
	 */

	var ServerQuery = (function () {
	    function ServerQuery() {
	        _classCallCheck(this, ServerQuery);
	    }

	    _createClass(ServerQuery, [{
	        key: "createQuery",

	        /**
	         * runs a Query to the SensorThingsServer
	         * @param {string} queryURL the URL
	         * @param {parameterMap} parameterMap the parameterMap
	         * @param {function} callback Callback function
	         * @param {string} obsStart the start date for the request
	         * @param {string} obsEnd the end date for the request. If boolean value false, no end date will be set
	         */
	        value: function createQuery(queryURL, parameterMap, callback, obsStart, obsEnd) {
	            if (queryURL.length <= 0 || queryURL == " ") {
	                if (logging) console.log("invalid URL");
	                callback(null);
	                return;
	            }
	            var containsParams = false;
	            if (queryURL != "" && queryURL != null) containsParams = queryURL.indexOf("?") >= 0;
	            var selectors = new _STParserJs.STParser().createSelectors(parameterMap, containsParams, obsStart, obsEnd);
	            var cb = function cb(a) {
	                if (logging) console.log("decoding", a);
	                new _STParserJs.STParser().decodeQuery(a, callback);
	            };
	            this.createDirectQueryPaging(queryURL + selectors, cb);
	        }

	        /**
	         * creates a single Query without appending the selectors, but with pageing
	         * @param {string} query the URL to query from
	         * @param {function} callback the function to call once completed
	         */
	    }, {
	        key: "createDirectQueryPaging",
	        value: function createDirectQueryPaging(query, callback) {
	            if (logging) {
	                console.log("Querying: ", "'" + query + "'");
	            }
	            $.ajax({
	                type: "GET",
	                crossDomain: true,
	                url: query,
	                timeout: 120000,
	                dataType: "json",
	                error: function error(xhr, status, _error) {
	                    if (window.printAJAXerrors) console.log("AJAX ERROR:", _error, status, xhr);
	                    callback(null);
	                },
	                success: function success(jsonResponse) {
	                    var result = jsonResponse;
	                    new _STParserJs.STParser().retrieveAdditionalPages(result, callback);
	                }
	            });
	        }

	        /**
	         * runs a Query to the SensorThingsServer, without paging, without appending the selectors
	         * @param {string} query the Query
	         * @param {function} callback the function to call once completed
	         */
	    }, {
	        key: "createDirectQuery",
	        value: function createDirectQuery(query, callback) {
	            if (logging) {
	                console.log("Querying: ", "'" + query + "'");
	                callback(null);
	            }
	            $.ajax({
	                type: "GET",
	                crossDomain: true,
	                url: query,
	                timeout: 120000,
	                dataType: "json",
	                error: function error(xhr, status, _error2) {
	                    if (window.printAJAXerrors) console.log("AJAX ERROR:", _error2, status, xhr);
	                },
	                success: function success(jsonResponse) {
	                    var result = jsonResponse;
	                    callback(result);
	                }
	            });
	        }
	    }]);

	    return ServerQuery;
	})();

	exports.ServerQuery = ServerQuery;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _SensorThingsCommunicationsJs = __webpack_require__(21);

	var logging = false;
	var stParser = null;

	/**
	 * This class decodes several Things for the Communication with the SensorThingsServer
	 *
	 * This class has the following properties:
	 * stComm            -- reference to SensorThingsCommunications
	 *
	 */

	var STParser = (function () {

	    /**
	     * Implements Singleton.
	     * @returns {STParser} Singleton object
	     */

	    function STParser() {
	        _classCallCheck(this, STParser);

	        if (!stParser) {
	            stParser = this;
	            this.stComm = new _SensorThingsCommunicationsJs.SensorThingsCommunications();
	        }
	        return stParser;
	    }

	    /**
	     * Join two given pages from SensorThings API
	     * @param {Array|Object} first page
	     * @param {Array|Object} second page
	     * @returns {Object} the joined page
	     * @private
	     */

	    _createClass(STParser, [{
	        key: "_joinObjectOrArray",
	        value: function _joinObjectOrArray(obj1, obj2) {
	            if (obj1 instanceof Array) {
	                if (obj2 instanceof Array) {
	                    return obj1.concat(obj2);
	                } else {
	                    return obj1;
	                }
	            } else if (obj1 === null || obj2 === null) {
	                return null;
	            } else {
	                for (var k in obj1) {
	                    if (obj1.hasOwnProperty(k)) {
	                        obj1[k] = this._joinObjectOrArray(obj1[k], obj2[k]);
	                    }
	                }
	                return obj1;
	            }
	        }

	        /**
	         * make a Deep copy of a given Array
	         * @param {Array} array the array to clone
	         * @returns {Array} the clone
	         * @private
	         */
	    }, {
	        key: "_clone",
	        value: function _clone(array) {
	            var clone = [];
	            for (var i in array) {
	                clone[i] = array[i];
	            }
	            return clone;
	        }

	        /**
	         * Returns the Object from the given object at the given path
	         * @param {Object} object the Object which contains the requested data
	         * @param {String} path the path in the given Object to the requested data
	         * @returns {Object} the requested Data
	         * @private
	         */
	    }, {
	        key: "_getParam",
	        value: function _getParam(object, path) {
	            var first = path[0];
	            if (path.length <= 0 || first == null || first == "") return object;
	            var pathClone = this._clone(path);
	            pathClone.shift();
	            return this._getParam(object[first], pathClone);
	        }

	        /**
	         * Set the Object from the given Object at the given Path w/ the given value
	         * @param {Object} object the Object which contains the data to be set
	         * @param {String} path the path to the data to be set
	         * @param {Object} value the data to be set
	         * @returns {Object} the modified Object
	         * @private
	         */
	    }, {
	        key: "_setParam",
	        value: function _setParam(object, path, value) {
	            var first = path[0];
	            if (path.length == 1) {
	                object[first] = value;
	                return object;
	            } else if (path.length <= 0 || first == null || first == "") {
	                object = value;
	                return value;
	            }
	            var pathClone = this._clone(path);
	            pathClone.shift();

	            object[first] = this._setParam(object[first], pathClone, value);
	            return object;
	        }

	        /**
	         * Deletes Object of the given object at the given path
	         * @param {Object} object the Object which contains the Object to be deleted
	         * @param {String} path the Path to find the Object to delete within the given Object
	         * @returns {Object} the modified Object
	         * @private
	         */
	    }, {
	        key: "_deleteParam",
	        value: function _deleteParam(object, path) {
	            if (path.length <= 1) {
	                if (object == null) return null;
	                delete object[path[0]];
	                return object;
	            }
	            var first = path[0];
	            var pathClone = this._clone(path);
	            pathClone.shift();
	            if (first == "") {
	                if (path[1] != null) {
	                    object[first] = this._deleteParam(object, pathClone);
	                    return object;
	                }
	                object = undefined;
	                return undefined;
	            }
	            object[first] = this._deleteParam(object[first], pathClone);
	            return object;
	        }

	        /**
	         * checks which pages have to be queried and implicitly
	         * querys those pages, merges the responses and calls the
	         * "done" function with the merged response
	         * @param {Object} response the response
	         * @param {function} done the function to call once completed
	         * @private
	         */
	    }, {
	        key: "_readAdditionalPages",
	        value: function _readAdditionalPages(response, done) {
	            var queryList = [];
	            var _writeNextLinks = (function (responseArray, path) {
	                for (var k in this._getParam(responseArray, path)) {
	                    if (k.search("@iot.nextLink") >= 0) {
	                        var myPath = this._clone(path);
	                        var myUrlPath = this._clone(path);
	                        var pathend = k.substring(0, k.search("@iot.nextLink"));
	                        if (pathend != "" && pathend != null) myPath.push(pathend);
	                        myUrlPath.push(k);
	                        var obj = {
	                            path: myPath,
	                            urlPath: myUrlPath
	                        };
	                        queryList.push(obj);
	                        if (logging) console.log("adding:", k, myPath, obj);
	                    } else if (this._getParam(responseArray, path)[k] instanceof Object || this._getParam(responseArray, path)[k] instanceof Array) {
	                        var myPath = this._clone(path);
	                        myPath.push(k);
	                        _writeNextLinks(responseArray, myPath);
	                    }
	                }
	            }).bind(this);
	            _writeNextLinks(response, []);
	            var myDone = function myDone(resp) {
	                done(resp);
	            };
	            this._checkPaging(response, queryList, myDone.bind(this));
	        }

	        /**
	         * pulls the necessary new Pages
	         * @param {Object} response the response recieved from the Server
	         * @param {Array} queryList a List of the pages to query
	         * @param {function} doneFunc a function to call once completed
	         * @private
	         */
	    }, {
	        key: "_checkPaging",
	        value: function _checkPaging(response, queryList, doneFunc) {
	            var _this = this;

	            if (logging) console.log("checkPaging", queryList);
	            if (queryList.length > 0) {
	                var _ret = (function () {
	                    var i = queryList.length - 1;
	                    if (queryList[i] == null || queryList[i].path == null || queryList[i].urlPath == null) {
	                        doneFunc(response);
	                        return {
	                            v: undefined
	                        };
	                    }
	                    var queryPath = queryList[i].path;
	                    var urlPath = queryList[i].urlPath;
	                    queryList.pop();
	                    var url = _this._getParam(response, urlPath);
	                    if (queryPath == null || url == null) {
	                        doneFunc(response);
	                        return {
	                            v: undefined
	                        };
	                    }
	                    var cb = (function (myData) {
	                        if (myData == null) doneFunc(response);
	                        if (logging) console.log("retrieved", this._getParam(response, queryPath), myData);
	                        var joined = this._joinObjectOrArray(this._getParam(response, queryPath), myData);
	                        response = this._setParam(response, queryPath, joined);
	                        if (logging) console.log("retrieved and joined", response, joined, queryPath);
	                        this._checkPaging(response, queryList, doneFunc);
	                    }).bind(_this);
	                    if (logging) console.log("retrieving", response, urlPath, _this._getParam(response, urlPath));
	                    response = _this._setParam(response, urlPath, undefined);
	                    _this._deleteParam(response, urlPath);
	                    _this.stComm.createDirectQueryPaging(url, cb.bind(_this));
	                })();

	                if (typeof _ret === "object") return _ret.v;
	            } else {
	                doneFunc(response);
	            }
	        }

	        /**
	         * retrieves additional Pages
	         * @param {Object} response The response recieved from the Server
	         * @param {function} doneFunc The function to call once completed
	         */
	    }, {
	        key: "retrieveAdditionalPages",
	        value: function retrieveAdditionalPages(response, doneFunc) {
	            if (logging) console.log("retrievingAddPages", response);
	            if (response.value != null) {
	                response.value["@iot.nextLink"] = response["@iot.nextLink"];
	                response = response.value;
	            }
	            this._readAdditionalPages(response, doneFunc);
	        }

	        /**
	         * Decodes a response from a Server to the format used by the Software
	         * @param {object} response The response from the Server which has to be decoded
	         * @param {function} doneFunc The function to call once completed
	         */
	    }, {
	        key: "decodeQuery",
	        value: function decodeQuery(response, doneFunc) {
	            if (response == null) {
	                doneFunc({});
	                console.log("ERROR");
	                return;
	            }
	            stParser._rewriteParams(response, doneFunc);
	        }

	        /**
	         * Rewrite the local data w/ the given response data
	         * @param {object} response The response from the Server which has to be decoded
	         * @param {function} doneFunc The function to call once completed
	         * @private
	         */
	    }, {
	        key: "_rewriteParams",
	        value: function _rewriteParams(response, doneFunc) {
	            var data = {};
	            if (logging) console.log('timed input data', response);
	            data.DataStream_id = response["@iot.id"];
	            data.DataStream_name = response.name;
	            data.DataStream_description = response.description;
	            data.DataStream_observationType = response.observationType;
	            data.DataStream_unitOfMeasurement = response.unitOfMeasurement;
	            data.DataStream_observedArea = response.observedArea;
	            data.DataStream_phenomenonTime = response.phenomenonTime;
	            data.DataStream_resultTime = response.resultTime;

	            if (response.Observations != null && response.Observations.length > 0) {
	                data.Observations = [];
	                for (var i in response.Observations) {
	                    data.Observations[i] = {};
	                    data.Observations[i].Observation_id = response.Observations[i]["@iot.id"];
	                    data.Observations[i].Observation_phenomenonTime = response.Observations[i].phenomenonTime;
	                    data.Observations[i].Observation_resultTime = response.Observations[i].resultTime;
	                    data.Observations[i].Observation_result = response.Observations[i].result;
	                    data.Observations[i].Observation_resultQuality = response.Observations[i].resultQuality;
	                    data.Observations[i].Observation_validTime = response.Observations[i].validTime;
	                    data.Observations[i].Observation_parameters = response.Observations[i].parameters;
	                    if (response.Observations[i].FeatureOfInterest != null) {
	                        data.Observations[i].FeatureOfInterest_name = response.Observations[i].FeatureOfInterest.name;
	                        data.Observations[i].FeatureOfInterest_description = response.Observations[i].FeatureOfInterest.description;
	                        data.Observations[i].FeatureOfInterest_encodingType = response.Observations[i].FeatureOfInterest.encodingType;
	                        data.Observations[i].FeatureOfInterest_feature = response.Observations[i].FeatureOfInterest.feature;
	                    }
	                }
	            }

	            if (response.ObservedProperty != null) {
	                data.ObservedProperty_name = response.ObservedProperty.name;
	                data.ObservedProperty_definition = response.ObservedProperty.definition;
	                data.ObservedProperty_description = response.ObservedProperty.description;
	            }
	            if (response.Sensor != null) {
	                data.Sensor_name = response.Sensor.name;
	                data.Sensor_description = response.Sensor.description;
	                data.Sensor_encodingType = response.Sensor.encodingType;
	                data.Sensor_metadata = response.Sensor.metadata;
	            }
	            if (response.Thing != null) {
	                data.Thing_name = response.Thing.name;
	                data.Thing_description = response.Thing.description;
	                data.Thing_properties = response.Thing.properties;
	                data.Thing_HistoricalLocations = response.Thing.HistoricalLocations;
	            }

	            if (response.Thing != null && response.Thing.Locations != null && response.Thing.Locations.length > 0) {
	                data.Thing_Locations = [];
	                for (var i in response.Thing.Locations) {
	                    data.Thing_Locations[i] = {};
	                    if (response.Thing.Locations[i] != null) {
	                        data.Thing_Locations[i].id = response.Thing.Locations[i]["@iot.id"];
	                        data.Thing_Locations[i].name = response.Thing.Locations[i].name;
	                        data.Thing_Locations[i].description = response.Thing.Locations[i].description;
	                        data.Thing_Locations[i].encodingType = response.Thing.Locations[i].encodingType;
	                        data.Thing_Locations[i].location = response.Thing.Locations[i].location;
	                    }
	                }
	            }
	            doneFunc(data);
	        }

	        /**
	         * creates the selectors
	         * @param {Object} parameterMap the parameterMap
	         * @param {Boolean} containsParams specifies if the ? is already in the String
	         * @param {Date} obsStart start-Date of the requested time-Interval
	         * @param {Date} obsEnd end-Date of the requested time-Interval
	         * @returns {String} the selectors for the requests
	         */
	    }, {
	        key: "createSelectors",
	        value: function createSelectors(pM, containsParams, obsStart, obsEnd) {
	            var sel = {};
	            sel.dataStream = {};
	            sel.observation = {};
	            sel.featureOfInterest = {};
	            sel.observedProperty = {};
	            sel.sensor = {};
	            sel.thing = {};
	            sel.historicalLocations = {};
	            sel.location = {};

	            if (pM.DataStream_name || pM.DataStream_description || pM.DataStream_observationType || pM.DataStream_unitOfMeasurement || pM.DataStream_observedArea || pM.DataStream_phenomenonTime || pM.DataStream_resultTime) {
	                sel.dataStream.required = true;
	            }
	            if (pM.Observation_phenomenonTime || pM.Observation_resultTime || pM.Observation_result || pM.Observation_resultQuality || pM.Observation_validTime || pM.Observation_parameters) {
	                sel.observation.required = true;
	            }
	            if (pM.FeatureOfInterest_name || pM.FeatureOfInterest_description || pM.FeatureOfInterest_encodingType || pM.FeatureOfInterest_feature) {
	                sel.featureOfInterest.required = true;
	            }
	            if (pM.ObservedProperty_name || pM.ObservedProperty_definition || pM.ObservedProperty_description) {
	                sel.observedProperty.required = true;
	            }
	            if (pM.Sensor_name || pM.Sensor_description || pM.Sensor_encodingType || pM.Sensor_metadata) {
	                sel.sensor.required = true;
	            }
	            if (pM.Thing_name || pM.Thing_description || pM.Thing_properties) {
	                sel.thing.required = true;
	            }
	            if (pM.Thing_HistoricalLocations) {
	                sel.historicalLocations.required = true;
	            }
	            if (pM.Thing_Location_name || pM.Thing_Location_description || pM.Thing_Location_encodingType || pM.Thing_Location_location) {
	                sel.location.required = true;
	            }

	            //append the start to the selectors
	            var expand = {};
	            if (sel.observation.required) {
	                expand["Observations"] = {};
	            }
	            if (sel.featureOfInterest.required) {
	                if (expand["Observations"] == null) {
	                    expand["Observations"] = {};
	                }
	                expand["Observations"]["FeatureOfInterest"] = {};
	            }
	            if (sel.observedProperty.required) {
	                expand["ObservedProperty"] = {};
	            }
	            if (sel.sensor.required) {
	                expand["Sensor"] = {};
	            }
	            if (sel.thing.required) {
	                expand["Thing"] = {};
	            }
	            if (sel.historicalLocations.required) {
	                if (expand["Thing"] == null) {
	                    expand["Thing"] = {};
	                }
	                expand["Thing"]["HistoricalLocations"] = {};
	                expand["Thing"]["HistoricalLocations"]["Locations"] = {};
	            }
	            if (sel.location.required) {
	                if (expand["Observations"] == null) {
	                    expand["Observations"] = {};
	                }
	                expand["Thing"]["Locations"] = {};
	            }

	            var addExpands = (function (expands, delim, start, end) {
	                var qS = "";
	                if (Object.keys(expands).length > 0) {
	                    for (var k in expands) {
	                        var mySubs = addExpands(expands[k], ";", start, end);
	                        if (mySubs == "") {
	                            var par = "";
	                            if (k.search("Observations") >= 0) {
	                                if (start) {
	                                    par = "$orderby=phenomenonTime desc" + delim + "$filter=phenomenonTime gt " + start;
	                                    if (end) {
	                                        par = par + " and phenomenonTime lt " + end;
	                                    }
	                                    qS = qS + k + "(" + "$top=1000" + delim + par + ")" + ",";
	                                } else {
	                                    qS = qS + k + "(" + "$top=1" + delim + "$orderby=phenomenonTime desc)" + ",";
	                                }
	                            } else {
	                                qS = qS + k + "($top=1000)" + ",";
	                            }
	                        } else {
	                            var par = "";
	                            if (k.search("Observations") >= 0) {
	                                if (start) {
	                                    par = "$orderby=phenomenonTime desc" + delim + "$filter=phenomenonTime gt " + start;
	                                    if (end) {
	                                        par = par + " and phenomenonTime lt " + end;
	                                    }
	                                    par = par + delim;
	                                } else {
	                                    qS = qS + k + "(" + "$top=1" + delim + "$orderby=phenomenonTime desc" + delim + "$expand=" + mySubs + ")" + ",";
	                                }
	                            }
	                            qS = qS + k + "(" + "$top=1000" + delim + par + "$expand=" + mySubs + ")" + ",";
	                        }
	                    }
	                    return qS.substring(0, qS.length - 1);
	                } else {
	                    return qS;
	                }
	            }).bind(this);

	            var querySelector = "?$top=1000";
	            if (containsParams) querySelector = "&$top=1000";
	            if (Object.keys(expand).length > 0) {
	                querySelector = querySelector + "&$expand=";
	                var end = obsEnd ? new Date(obsEnd).toISOString() : false;
	                querySelector = querySelector + addExpands(expand, ";", new Date(obsStart).toISOString(), end);
	            }
	            return querySelector;
	        }
	    }]);

	    return STParser;
	})();

	exports.STParser = STParser;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _STParserJs = __webpack_require__(23);

	var mqttServerClients = [];

	var MQTTHandle = (function () {
	    function MQTTHandle() {
	        _classCallCheck(this, MQTTHandle);
	    }

	    _createClass(MQTTHandle, [{
	        key: '_getClient',

	        /**
	         * returns or creates the client for the requested Server URL
	         * @param serverURL the MQTT URL of the selected server
	         * @param onConnected a function to call once connected
	         * @returns {Object} the requested client if it exists, null if it had to be created
	         * @private
	         */
	        value: function _getClient(serverURL, onConnected) {
	            for (var k in mqttServerClients) {
	                if (mqttServerClients[k] != null && mqttServerClients[k].serverURL == serverURL) {
	                    if (onConnected != null) onConnected(mqttServerClients[k]);
	                    return mqttServerClients[k];
	                }
	            }

	            var client = mqtt.connect(serverURL);
	            var clientObject = {
	                client: client,
	                serverURL: serverURL,
	                registeredTopics: []
	            };
	            client.on('connect', function () {
	                console.log("conected to ", serverURL);
	                if (onConnected != null) onConnected(clientObject);
	            });
	            client.on('message', (function (topic, message) {
	                var messageStr = new String();
	                for (var i = 0; i < message.length; i++) {
	                    messageStr += String.fromCharCode(message[i]);
	                }
	                var messageObj = JSON.parse(messageStr);
	                var doneFunc = (function (decodedMsg) {
	                    this._getTopic(serverURL, topic).callback(decodedMsg, topic);
	                }).bind(this);

	                var data = {
	                    "Observations": [messageObj]
	                };

	                new _STParserJs.STParser().decodeQuery(data, doneFunc);
	            }).bind(this));
	            mqttServerClients.push(clientObject);
	            return null;
	        }

	        /**
	         * returns or creates the topic for the requested Server URL
	         * @param {string} serverURL the MQTT URL of the selected server
	         * @param {string} topic the requested topic
	         * @returns {Object} the Topic Object if the client exists, null if the client had to be created
	         * @private
	         */
	    }, {
	        key: '_getTopic',
	        value: function _getTopic(serverURL, topic) {
	            var clientObj = this._getClient(serverURL, null);
	            if (clientObj != null) {
	                if (clientObj.registeredTopics[topic] == null) {
	                    clientObj.client.subscribe(topic);
	                    clientObj.registeredTopics[topic] = {};
	                }
	                return clientObj.registeredTopics[topic];
	            } else {
	                return null;
	            }
	        }

	        /**
	         * registers a new MQTT Handle to the Server
	         *
	         * @param {string} url the query-URL, must look like: "<ServerIP>:<WebsocketPort>/mqtt"
	         * @param {string} entity the Queried entity, must look like: "v1.0/Datastreams(<DS Number>)/Observations"
	         * @param {function} cb a callback to notify about new data
	         * @returns {boolean} if the MQTT could be registered synchronously(true) or will be created asynchronously(false)
	         */
	    }, {
	        key: 'registerMQTT',
	        value: function registerMQTT(serverUrl, entity, cb) {
	            var topic = this._getTopic(serverUrl, entity);
	            this.serverURL = serverUrl;
	            this.topic = entity;
	            if (topic == null) {
	                this._getClient(serverUrl, (function (client) {
	                    this._getTopic(serverUrl, entity).callback = cb;
	                }).bind(this));
	                return false;
	            } else {
	                topic.callback = cb;
	                return true;
	            }
	        }

	        /**
	         * deletes the Query again
	         */
	    }, {
	        key: 'unregister',
	        value: function unregister() {
	            this._getClient(this.serverURL, (function (clientObj) {
	                clientObj.client.unsubscribe(this.topic);
	                if (Object.keys(clientObj.registeredTopics).length <= 0) {
	                    var i = mqttServerClients.findIndex(function (clObj) {
	                        return clObj.serverURL == this.serverURL;
	                    });
	                    clObj.end();
	                    mqttServerClients.splice(i, 1);
	                }
	            }).bind(this));
	        }
	    }]);

	    return MQTTHandle;
	})();

	exports.MQTTHandle = MQTTHandle;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _search = null;

	/**
	 * In charge of the fuzzy Search on all the datastreams
	 */

	var Search = (function () {

	    /**
	     * Return a search object, implements Singleton.
	     * @returns {Search} Singleton search object.
	     */

	    function Search() {
	        _classCallCheck(this, Search);

	        if (!_search) {
	            _search = this;
	            this.a = null;
	        }
	        return _search;
	    }

	    /**
	     * method executes the search across the datastreams
	     * @param {Datastreams} a  Array of DataStreams
	     * @param {String} searchTerm search term
	     * @param {Boolean} onlyUnit only Unit; default = false
	     */

	    _createClass(Search, [{
	        key: "search",
	        value: function search(a, searchTerm, onlyUnit) {
	            if (onlyUnit) {
	                this.onlyUnit = onlyUnit;
	            } else {
	                this.onlyUnit = false;
	            }

	            var res = [];

	            if (!(a instanceof Array || searchTerm instanceof String)) {
	                return res;
	            }

	            if (a != undefined) {
	                for (var k = 0; k < a.length; k++) {
	                    if (_search.fuzzySearch(a[k].description, searchTerm) && !onlyUnit) {
	                        res.push(a[k]);
	                    } else if (_search.fuzzySearch(a[k].name, searchTerm) && !onlyUnit) {
	                        res.push(a[k]);
	                    } else if (_search.fuzzySearch(a[k].unitOfMeasurement.name, searchTerm)) {
	                        res.push(a[k]);
	                    } else if (_search.fuzzySearch(a[k].unitOfMeasurement.symbol, searchTerm)) {
	                        res.push(a[k]);
	                    }
	                }
	            }
	            return res;
	        }

	        /**
	         * method executes a atomic search request
	         * true = a modification of param search was found in param str
	         * false = else
	         * @param {String} str - context
	         * @param {String} search - search term
	         * @returns {boolean} True if a match for the search term was found, false else
	         */
	    }, {
	        key: "fuzzySearch",
	        value: function fuzzySearch(str, search) {
	            if (!search || !str) {
	                return false;
	            }
	            var hay = str.toLowerCase(),
	                i = 0,
	                n = -1,
	                l = undefined;
	            search = search.toLowerCase();
	            for (; l = search[i++];) if (! ~(n = hay.indexOf(l, n + 1))) return false;
	            return true;
	        }
	    }]);

	    return Search;
	})();

	exports.Search = Search;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ParserParserJs = __webpack_require__(27);

	var _DataModelDataModelProxyJs = __webpack_require__(1);

	var _importExport = null;

	/**
	 * In charge of handeling Im- and Export actions
	 */

	var ImportExport = (function () {
	    /**
	     * Implements Singleton
	     * @constructor
	     **/

	    function ImportExport() {
	        _classCallCheck(this, ImportExport);

	        if (!_importExport) {
	            _importExport = this;
	            this.parser = new _ParserParserJs.Parser();
	            this.dataModelProxy = new _DataModelDataModelProxyJs.DataModelProxy();
	            this._tree = null;
	            this._jsonData = null;
	        }
	        return _importExport;
	    }

	    /**
	     * starts the jsonFile import from local file system.
	     * Start a system file chooser, and notifies import export if file was selected
	     */

	    _createClass(ImportExport, [{
	        key: 'configJSONImport',
	        value: function configJSONImport() {
	            var fileSelector = document.createElement('input');
	            fileSelector.setAttribute('type', 'file');
	            //It's forbidden to choose multiple data
	            fileSelector.setAttribute('multiple', 'false');
	            //It's only allowed to load json data
	            fileSelector.setAttribute('accept', '.json');
	            fileSelector.addEventListener("change", function () {
	                _importExport._insertFile(fileSelector);
	            }, false);
	            fileSelector.click();
	        }

	        /**
	         * Starts a download of the currently loaded userConfig. The file will be placed
	         * in the download folder
	         * @return {boolean} true, if it works
	         */
	    }, {
	        key: 'configJSONExport',
	        value: function configJSONExport() {
	            var userConfig = this.dataModelProxy.getUserConfig();
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
	    }, {
	        key: '_insertFile',
	        value: function _insertFile(fileSelector) {
	            if (!fileSelector.value) {
	                console.error("Path missing.");
	            } else {
	                (function () {
	                    var file = fileSelector.files[0];
	                    var reader = new FileReader();
	                    reader.onload = function () {
	                        var data = reader.result;
	                        this._tree = _importExport.parser.configLoad(data);
	                        _importExport.dataModelProxy.importNewUserConfig(this._tree);
	                        window.hideConfig();
	                    };
	                    reader.readAsText(file);
	                })();
	            }
	        }

	        /**
	         * Starts an import of the given userConfig which will then be loaded into the dashboard
	         * @param {String} userConfig JSON-File w/ userConfig
	         * @returns {object} userConfig
	         */
	    }, {
	        key: 'configFileImport',
	        value: function configFileImport(userConfig) {
	            this._tree = this.parser.configLoad(userConfig);
	            _importExport.dataModelProxy.importNewUserConfig(this._tree);
	            return this._tree;
	        }

	        /**
	         * Gets the currently loaded userConfig and returns it
	         * @return {String} UserConfig
	         */
	    }, {
	        key: 'configFileExport',
	        value: function configFileExport() {
	            var userConfig = this.dataModelProxy.getUserConfig();
	            this._jsonData = this.parser.configStore(userConfig);
	            return this._jsonData;
	        }

	        /**
	         * Returns the current date as a String.
	         * @returns {String} current date string
	         * @private
	         */
	    }, {
	        key: '_getCurrentDate',
	        value: function _getCurrentDate() {
	            var today = new Date();
	            var mi = today.getMinutes();
	            var hh = today.getHours();
	            var dd = today.getDate();
	            var mo = today.getMonth() + 1;
	            var yyyy = today.getFullYear();

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
	    }]);

	    return ImportExport;
	})();

	exports.ImportExport = ImportExport;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _parser = null;
	var tree = null;

	/**
	 * Checks the config jsonString and parses it into a tree
	 * which can then be used inside our dataModel
	 */

	var Parser = (function () {
	    /**
	     * Returns a Parser object, implements singleton
	     * @return {Parser} Singleton Parser object
	     */

	    function Parser() {
	        _classCallCheck(this, Parser);

	        if (!_parser) {
	            _parser = this;
	            this.tree = {
	                "dashboardConfig": {
	                    "serverList": [],
	                    "title": ""
	                },
	                "widgetConfig": {
	                    "widgetDataArray": []
	                }
	            };
	        }
	        return this;
	    }

	    /**
	     * method gets a json-string with a userConfig and translates it to (json-)tree.
	     * Takes a JSON-String with a userConfig and translates it into the tree
	     * which we use inside our dataModel
	     * @param {String} str the JSON-String with the userConfig
	     * @returns {Object} the created Tree
	     */

	    _createClass(Parser, [{
	        key: "configLoad",
	        value: function configLoad(str) {
	            var tree = JSON.parse(str);

	            for (var k in tree.widgetConfig.widgetDataArray) {
	                for (var m in tree.widgetConfig.widgetDataArray[k].configurableData) {
	                    var temp = null;
	                    switch (tree.widgetConfig.widgetDataArray[k].configurableData[m].type) {
	                        case TYPE_INTEGER:
	                            //Find a integer
	                            temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
	                            tree.widgetConfig.widgetDataArray[k].configurableData[m].data = parseInt(temp);
	                            break;

	                        case TYPE_BOOLEAN:
	                            //Find a boolean
	                            temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
	                            tree.widgetConfig.widgetDataArray[k].configurableData[m].data = this.makeBoolean(temp);
	                            break;

	                        case TYPE_ARRAY:
	                            //Find a array
	                            temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
	                            tree.widgetConfig.widgetDataArray[k].configurableData[m].data = temp;
	                            break;

	                        case TYPE_DATE:
	                            //Find a date
	                            temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
	                            tree.widgetConfig.widgetDataArray[k].configurableData[m].data = new Date(temp);
	                            break;

	                        case TYPE_DROPDOWN:
	                            //Find a dropdown
	                            temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
	                            tree.widgetConfig.widgetDataArray[k].configurableData[m].data = parseInt(temp);
	                            break;

	                        case TYPE_NUMBER:
	                            //Find a number
	                            temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
	                            tree.widgetConfig.widgetDataArray[k].configurableData[m].data = parseFloat(temp);
	                            break;

	                        default:
	                            break;
	                    }
	                }
	            }
	            return tree;
	        }

	        /**
	         * method returns true or false depending on the given string
	         *
	         * @param {string} string representation of a boolean
	         * @returns {boolean}
	         */
	    }, {
	        key: "makeBoolean",
	        value: function makeBoolean(str) {
	            if (str == 'true') {
	                return true;
	            } else if (str == 'false') {
	                return false;
	            } else {
	                return str;
	            }
	        }

	        /**
	         * configStore
	         *
	         * method translates a (json-)tree object (the userConfig) to a json-string
	         *
	         * @param {Array} (json-)tree
	         * @returns {String} json-string
	         */
	    }, {
	        key: "configStore",
	        value: function configStore(data) {
	            this.tree = {
	                "dashboardConfig": {
	                    "serverList": [],
	                    "title": ""
	                },
	                "widgetConfig": {
	                    "widgetDataArray": []
	                }
	            };
	            this.tree.dashboardConfig.title = data.getDashboardConfig().getTitle();
	            this.tree.dashboardConfig.serverList = data.getDashboardConfig().getServerList();

	            var widgetDataArray = data.getWidgetConfig().getConfigContent();

	            for (var i = 0; i < widgetDataArray.length; i++) {
	                this._parseQueryWidget(widgetDataArray[i]);
	            }
	            return JSON.stringify(this.tree);
	        }

	        /**
	         * Parses all String dates in the given userConfig to Date objects.
	         * @param userConfig
	         */
	    }, {
	        key: "parseDates",
	        value: function parseDates(userConfig) {
	            for (var i in userConfig.widgetConfig.widgetDataArray) {
	                var widgetData = userConfig.widgetConfig.widgetDataArray[i].configurableData;
	                for (var attr in widgetData) {
	                    if (typeof widgetData[attr].type == "number" && widgetData[attr].type == 5) {
	                        widgetData[attr].data = new Date(widgetData[attr].data);
	                    }
	                }
	            }
	            return userConfig;
	        }

	        /**
	         *
	         * @param widgetData
	         * @private
	         */
	    }, {
	        key: "_parseQueryWidget",
	        value: function _parseQueryWidget(widgetData) {
	            var temp = {
	                "configurableData": widgetData.configurableData,
	                "position": widgetData.position,
	                "size": widgetData.size,
	                "type": widgetData.type
	            };
	            this.tree.widgetConfig.widgetDataArray.push(temp);
	        }
	    }]);

	    return Parser;
	})();

	exports.Parser = Parser;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ViewJs = __webpack_require__(6);

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _userConfigurationView = null;
	var _view = null;
	var _userEvents = null;

	var UserConfigurationView = (function () {
	    function UserConfigurationView() {
	        _classCallCheck(this, UserConfigurationView);

	        if (!_userConfigurationView) {
	            _userConfigurationView = this;
	            _view = new _ViewJs.View();
	            _userEvents = new _UserEventsUserEventsJs.UserEvents();
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

	    _createClass(UserConfigurationView, [{
	        key: '_getServerTableRowDummy',
	        value: function _getServerTableRowDummy(server) {
	            var tr = document.createElement("TR");
	            tr.innerHTML = "<td>" + server.name + "</td><td>" + server.url + "</td><td><span class='tr-delete close' style='font-size: large'/>x</td>";
	            tr.querySelector(".tr-delete").onclick = function (e) {
	                return _userConfigurationView._removeServer(e);
	            };
	            return tr;
	        }

	        /**
	         * Creates the last row for the the server table inside the Dashboard Configuration, where another server can be added.
	         * @private
	         */
	    }, {
	        key: '_getServerTableAddRow',
	        value: function _getServerTableAddRow() {
	            var tr = document.createElement("TR");
	            tr.innerHTML = "<td><input id='conf-server-name'></td><td><input id='conf-server-url'></td><td><button" + " class='btn btn-success conf-btn-add-server'>" + window.iotlg.addButton + "</button></td>";
	            return tr;
	        }

	        /**
	         * Toggles the visibility of the configuration dialog.
	         * @private
	         */
	    }, {
	        key: '_toggleConfigure',
	        value: function _toggleConfigure() {
	            var _this = this;

	            var conf = $("div.conf-popup#configure");
	            if (conf.hasClass("open")) {
	                _userConfigurationView._setModified(false);
	                conf.css("animationName", "animateOut");
	                window.hideConfig = function () {};
	            } else {
	                (function () {
	                    //about to be opened
	                    var confData = _userEvents.loadUserConfig();
	                    conf.find("#conf_title").text(window.iotlg.dbConfig + " " + confData.dashboardConfig.getTitle());

	                    conf.find("#conf-label-title").text(window.iotlg.dbTitle);
	                    conf.find("#conf-input-title").val(confData.dashboardConfig.getTitle());

	                    conf.find("#conf-label-servers").text(window.iotlg.serverList);
	                    var serverTable = conf.find(".conf-server-table");
	                    serverTable.html("");
	                    confData.dashboardConfig.getServerList().forEach(function (server) {
	                        serverTable.append(_userConfigurationView._getServerTableRowDummy(server));
	                    });
	                    serverTable.append(_userConfigurationView._getServerTableAddRow());
	                    $(".conf-btn-add-server").click(function () {
	                        return _userConfigurationView._addServer();
	                    });
	                    $(".tr-delete.close").click(function (e) {
	                        return _userConfigurationView._removeServer(e);
	                    });
	                    conf.css("animationName", "animateIn");
	                    window.hideConfig = _this._toggleConfigure.bind(_this);
	                })();
	            }

	            conf.toggleClass("open");
	        }

	        /**
	         * Adds a server to the configuration server list (but not to the DashboardConfig server list).
	         * @private
	         */
	    }, {
	        key: '_addServer',
	        value: function _addServer() {
	            var serverTable = $(".conf-server-table")[0];
	            var inputTitle = $("#conf-server-name");
	            var inputUrl = $("#conf-server-url");
	            if (inputTitle.val() == "" || inputUrl.val() == "") return;
	            var server = {
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
	    }, {
	        key: '_removeServer',
	        value: function _removeServer(e) {
	            var target = e.target;
	            target.parentElement.parentElement.remove();
	            _userConfigurationView._setModified(true);
	        }

	        /**
	         * Saves the content of the DashboardConfig popup menu and stores the values as the new DashboardConfig.
	         * @private
	         */
	    }, {
	        key: '_saveConfig',
	        value: function _saveConfig() {
	            var confData = _userEvents.loadUserConfig();

	            var title = $("#conf-input-title").val();
	            confData.dashboardConfig.setTitle(title);

	            var serverList = [];
	            var servers = $(".conf-server-table tr");

	            servers.each(function (index) {
	                serverList.push({
	                    name: servers[index].childNodes[0].innerHTML,
	                    url: servers[index].childNodes[1].innerHTML
	                });
	            });
	            // Remove invalid entry for the last row
	            serverList.pop();

	            serverList.sort(function (s1, s2) {
	                if (s1.name != s2.name) return s1.name.localeCompare(s2.name);else return s1.url.localeCompare(s2.url);
	            });

	            confData.dashboardConfig.setServerList(serverList);
	            _userConfigurationView._setModified(false);
	        }

	        /**
	         * If modified, disables the buttons for exporting the Configuration.
	         * @param modified
	         * @private
	         */
	    }, {
	        key: '_setModified',
	        value: function _setModified(modified) {
	            _userConfigurationView.modified = modified;
	        }

	        /**
	         * Shows a File Selection Dialog and tries to import the selected configuation file.
	         * @private
	         */
	    }, {
	        key: '_importConfig',
	        value: function _importConfig() {
	            _userEvents.importConfig();
	        }

	        /**
	         * Downloads the current configuration into the local Downloads directory.
	         * @private
	         */
	    }, {
	        key: '_exportConfig',
	        value: function _exportConfig() {
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
	    }, {
	        key: '_importFromCMS',
	        value: function _importFromCMS() {
	            _userEvents.importFromCMS();
	        }

	        /**
	         * Notifies user events that the user wants to export the config to CMS
	         * @private
	         */
	    }, {
	        key: '_exportToCMS',
	        value: function _exportToCMS() {
	            if (_userConfigurationView.modified) {
	                alert(window.iotlg.warningConfigModified);
	                return;
	            }
	            _userEvents.exportToCMS();
	        }
	    }]);

	    return UserConfigurationView;
	})();

	exports.UserConfigurationView = UserConfigurationView;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _DataObserverJs = __webpack_require__(30);

	var _DataModelDataModelJs = __webpack_require__(2);

	var _SensorThingsCommunicationSensorThingsCommunicationsJs = __webpack_require__(21);

	var dataQueryObserverProxy = null;
	var logging = false;

	/**
	 * is the Interface for other Modules to the DataObserver
	 *
	 * This class has the following properties:
	 * myDataModel       -- reference to the DataModel
	 * myDataObserver    -- reference to the DataObserver
	 *
	 */

	var DataQueryObserverProxy = (function () {
	    _createClass(DataQueryObserverProxy, [{
	        key: '_getMilliseconds',

	        /**
	         * converts a value & unit combination of a timeinterval to a count of milliseconds
	         * @param {int} value the count of <units>
	         * @param {int} unit_const the constant for a timeunit
	         * @return {int} the count of milliseconds 
	         */
	        value: function _getMilliseconds(value, unit_const) {
	            switch (unit_const) {
	                case UNIT_MILLISECOND:
	                    return value;
	                    break;
	                case UNIT_SECOND:
	                    return value * 1000;
	                    break;
	                case UNIT_MINUTE:
	                    return value * 1000 * 60;
	                    break;
	                case UNIT_HOUR:
	                    return value * 1000 * 60 * 60;
	                    break;
	                case UNIT_DAY:
	                    return value * 1000 * 60 * 60 * 24;
	                    break;
	                case UNIT_MONTH:
	                    return value * 1000 * 60 * 60 * 24 * 31;
	                    break;
	                case UNIT_YEAR:
	                    return value * 1000 * 60 * 60 * 24 * 365;
	                    break;

	                default:
	                    console.error("Error, unknown unit constant");
	                    return value;
	            }
	        }

	        /** Observer update function
	         * @param {boolean} added boolean, shows if the datapoint was added
	         * @param {boolean} removed boolean, shows if the datapoint was removed
	         * if added and removed are true, it handles it as a change.
	         * @param {Object} dataWidgetData the updated Element
	         */
	    }, {
	        key: 'update',
	        value: function update(added, removed, dataWidgetData) {
	            if (logging) console.log("update Event", dataWidgetData.getQueryIDs());
	            if (removed) {
	                var queryIDs = dataWidgetData.getQueryIDs();
	                for (var k in queryIDs) {
	                    this.myDataObserver.deleteQuery(queryIDs[k]);
	                }
	            }
	            if (added) {
	                var myParameterMap = dataWidgetData.getParameterMap();
	                var myID = [];

	                var callback = dataWidgetData.getDataCallback();

	                var queryParams = dataWidgetData.getQueryParams();

	                for (var k in queryParams) {

	                    var url = queryParams[k].data.dataStreamUrl.data;
	                    var mqttEn = queryParams[k].data.mqttEnabled.data;
	                    var mqttUrl = queryParams[k].data.mqttUrl.data;
	                    var mqttBaseTopic = queryParams[k].data.mqttBaseTopic.data;
	                    var updateInterval = queryParams[k].data.updateIntervalMs.data;
	                    var timeData = dataWidgetData.getConfigurableData();

	                    if (mqttEn) {
	                        myID.push(this.myDataObserver.newMQTTQuery(myParameterMap, mqttUrl, mqttBaseTopic, callback[k]));
	                    } else {
	                        if (timeData.startTime != null && timeData.endTime != null && timeData.timeInterval != null && timeData.timeIntervalUnit != null && timeData.timeIntervalRelative != null) {
	                            var obsStart = timeData.startTime.data;
	                            var obsEnd = timeData.endTime.data;
	                            var obsSize = this._getMilliseconds(timeData.timeInterval.data, timeData.timeIntervalUnit.data);
	                            if (logging) console.log("obsSize", timeData.timeInterval.data, timeData.timeIntervalUnit.data, obsSize);
	                            var obsRel = timeData.timeIntervalRelative.data;

	                            myID.push(this.myDataObserver.newQuery(myParameterMap, updateInterval, url, callback[k], obsStart, obsEnd, obsSize, obsRel));
	                        } else {
	                            myID.push(this.myDataObserver.newQuery(myParameterMap, updateInterval, url, callback[k], 0, 0, -1, true));
	                        }
	                    }
	                }
	                dataWidgetData.setQueryIDs(myID);
	            }
	        }

	        /**
	         * gathers a list of all Datastreams on a SensorThingsServer
	         * @param {string} url the URL to the Server
	         * @param {function} callback a Callback to write the list to
	         * @return {Array} the List of DataStreams on a SensorThingsServer
	         */
	    }, {
	        key: 'getDataStreamList',
	        value: function getDataStreamList(url, callback) {
	            //only forwarded from SensorThingsCommunications
	            new _SensorThingsCommunicationSensorThingsCommunicationsJs.SensorThingsCommunications().getDataStreamList(url, callback);
	        }

	        /** Implements Singleton.
	         * @return {DataQueryObserverProxy} Singleton DataQueryObserverProxy object.
	         */
	    }]);

	    function DataQueryObserverProxy() {
	        _classCallCheck(this, DataQueryObserverProxy);

	        if (!dataQueryObserverProxy) {
	            dataQueryObserverProxy = this;
	            this.myDataObserver = new _DataObserverJs.DataObserver();
	            this.myDataModel = new _DataModelDataModelJs.DataModel();
	            this.myDataModel.getUserConfig().getWidgetConfig().registerDataStreamsObserver(this.update.bind(this));
	        }
	        return dataQueryObserverProxy;
	    }

	    return DataQueryObserverProxy;
	})();

	exports.DataQueryObserverProxy = DataQueryObserverProxy;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _DataQuerySynchronizingJs = __webpack_require__(31);

	var _QueryRandomDataQueryJs = __webpack_require__(34);

	var _QueryTimedQueryJs = __webpack_require__(33);

	var _QueryMQTTQueryJs = __webpack_require__(32);

	var _SensorThingsCommunicationSensorThingsCommunicationsJs = __webpack_require__(21);

	var dataObserver = null;

	/**
	 * manages DataQuerySynchronizing
	 * 
	 * This class has the following properties:
	 * syncFreq                     -- the frequency with which the DataObserver works
	 * queryIDcounter               -- the QueryID counter
	 * running                      -- if a querying batch is running
	 * lastRan                      -- when the last querying batch ran
	 * myTimer                      -- the timer to start new querying batches
	 * mySensorThingsCommunication  --reference to SensorThingsCommunications
	 * myDataQuerySynchronizing     --reference to DataQuerySynchronizing
	 * 
	 */

	var DataObserver = (function () {

	    /** @class
	     * @param syncFreq the Frequency with which the DataObserver works.
	     */

	    function DataObserver() {
	        var mySyncFreq = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];

	        _classCallCheck(this, DataObserver);

	        if (!dataObserver) {
	            dataObserver = this;
	            this.sync = this.mySyncFunction.bind(this);
	            this.mySensorThingsCommunication = new _SensorThingsCommunicationSensorThingsCommunicationsJs.SensorThingsCommunications();
	            this.queryIDcounter = 0;
	            this.syncFreq = mySyncFreq;
	            this.myDataQuerySynchronizing = new _DataQuerySynchronizingJs.DataQuerySynchronizing();
	            this.myTimer = window.setInterval(this.sync, this.syncFreq);
	            this.running = false;
	        }
	        return dataObserver;
	    }

	    /** registers a new Query
	     * @param interval the interval in which the datastream should be refreshed
	     * @param query the Query as a String
	     * @param dataModelRef a function to update the data.
	     * the function should look like:
	     * function(data){}
	     * where data is a Key-Value-Pair
	     * @param {Date} obsStart the start date of the Observation Scope if not relative
	     * @param {Date} obsEnd the end date of the Observation Scope if not relative
	     * @param {int} obsSize the size of the Observation Scope if relative
	     * @param {boolean} obsRel if the Observation Scope is relative
	     * @return the ID of the newly-created Query
	     */

	    _createClass(DataObserver, [{
	        key: 'newQuery',
	        value: function newQuery(myParameterMap, interval, query, dataModelRef, obsStart, obsEnd, obsSize, obsRel) {
	            this.queryIDcounter += 1;
	            var myID = this.queryIDcounter;
	            var myQuery = new _QueryTimedQueryJs.TimedQuery(myParameterMap, interval, query, dataModelRef, obsStart, obsEnd, obsSize, obsRel);
	            myQuery.setQueryID(myID);
	            this.myDataQuerySynchronizing.addQuery(myQuery);
	            return myID;
	        }

	        /** registers a new MQTTQuery
	         * @param myParameterMap the ParameterMap
	         * @param query the Query as a String
	         * @param baseTopic the Base of the Topic(the part to navigate to the Datastream)
	         * @param dataModelRef a function to update the data.
	         * the function should look like:
	         * function(data){}
	         * where data is a Key-Value-Pair
	         * @return the ID of the newly-created Query
	         */
	    }, {
	        key: 'newMQTTQuery',
	        value: function newMQTTQuery(myParameterMap, query, baseTopic, dataModelRef) {
	            this.queryIDcounter += 1;
	            var myID = this.queryIDcounter;
	            this.myDataQuerySynchronizing.addQuery(new _QueryMQTTQueryJs.MQTTQuery(myParameterMap, query, baseTopic, dataModelRef));
	            return myID;
	        }

	        /** registers a new RandomDataQuery
	         * used for testing purposes
	         * @param myParameterMap the ParameterMap
	         * @param dataModelRef a function to update the data.
	         * @return the ID of the newly-created Query
	         */
	    }, {
	        key: 'newRandomQuery',
	        value: function newRandomQuery(myParameterMap, dataModelRef) {
	            this.queryIDcounter += 1;
	            var myID = this.queryIDcounter;
	            this.myDataQuerySynchronizing.addQuery(new _QueryRandomDataQueryJs.RandomDataQuery(myParameterMap, dataModelRef));
	            return myID;
	        }

	        /** deletes a Query or MQTTQuery
	         * @param myID the ID of the object which should be deleted
	         */
	    }, {
	        key: 'deleteQuery',
	        value: function deleteQuery(myID) {
	            this.myDataQuerySynchronizing.removeQuery(myID);
	        }

	        /** sets a new Sync Frequency
	         * @param mySyncFreq the new Sync Frequency
	         */
	    }, {
	        key: 'setSyncFreq',
	        value: function setSyncFreq(mySyncFreq) {
	            clearInterval(this.myTimer);
	            this.syncFreq = mySyncFreq;
	            this.myTimer = window.setInterval(this.sync, this.syncFreq);
	        }

	        /** gets the Sync Frequency
	         * @returns the Sync Frequency
	         */
	    }, {
	        key: 'getSyncFreq',
	        value: function getSyncFreq() {
	            return this.syncFreq;
	        }

	        /** 
	         * performs one sync of the currently "expired" Data
	         * @private
	         */
	    }, {
	        key: 'mySyncFunction',
	        value: function mySyncFunction() {
	            if (!this.running || this.lastRan + 100 * this.getSyncFreq() < new Date().getTime()) {
	                this.lastRan = new Date().getTime();
	                this.running = true;
	                this.myDataQuerySynchronizing.clearRegisteredQueries();
	                this.myDataQuerySynchronizing.registerTimedQueries();
	                var callback = function callback() {
	                    this.running = false;
	                };
	                this.myDataQuerySynchronizing.loadRegistered(callback.bind(this));
	            }
	        }
	    }]);

	    return DataObserver;
	})();

	exports.DataObserver = DataObserver;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _QueryMQTTQueryJs = __webpack_require__(32);

	var _QueryTimedQueryJs = __webpack_require__(33);

	var _QueryRandomDataQueryJs = __webpack_require__(34);

	var _SensorThingsCommunicationSensorThingsCommunicationsJs = __webpack_require__(21);

	var logging = false;

	/** 
	 * Synchronizes the Queries to the SensorThingsServer to prevent unneccesary Traffic.
	 *
	 * This class has the following properties:
	 * queryList         -- saves all Querys
	 * registeredQueries -- saves the Querys which should be retrived in this "tick"
	 *
	 */

	var DataQuerySynchronizing = (function () {

	    /**
	     * Constructor method of DataQuerySynchronizing.
	     */

	    function DataQuerySynchronizing() {
	        _classCallCheck(this, DataQuerySynchronizing);

	        this.queryList = [];
	        this.registeredQueries = [];
	        return this;
	    }

	    /** adds a new Query to the Query-Scheduling
	     * @param {Object} query the query object that should be added. Has to implement QueryTypeInterface.
	     */

	    _createClass(DataQuerySynchronizing, [{
	        key: 'addQuery',
	        value: function addQuery(query) {
	            this.queryList.push(query);
	            if (logging) console.log("QueryList", this.queryList);
	        }

	        /** removes and destroys a query
	         * @param {int} myID the ID of the Query
	         */
	    }, {
	        key: 'removeQuery',
	        value: function removeQuery(myID) {
	            for (var k in this.registeredQueries) {
	                if (this.registeredQueries[k].getQueryID() == myID) {
	                    this.registeredQueries.splice(k, 1);
	                }
	            }
	            for (var k in this.queryList) {
	                if (this.queryList[k].getQueryID() == myID) {
	                    var query = this.queryList[k];
	                    this.queryList.splice(k, 1);
	                    query.destroy();
	                }
	            }
	        }

	        /** called to iterate through all Queries and add the relevant ones to a seperate list
	         */
	    }, {
	        key: 'registerTimedQueries',
	        value: function registerTimedQueries() {
	            for (var k in this.queryList) {
	                if (this.queryList[k].registerIfNeeded(Date.now())) {
	                    this.registeredQueries.push(this.queryList[k]);
	                }
	            }
	        }

	        /**
	         * add the missing Parameters to the ParameterList
	         * @params params {Array} the parameterList to autocomplete
	         * @returns {Array} the completed parameterList 
	         * @private
	         */
	    }, {
	        key: '_completeParameterList',
	        value: function _completeParameterList(params) {
	            params.DataStream_name = params.DataStream_name || false;
	            params.DataStream_description = params.DataStream_description || false;
	            params.DataStream_observationType = params.DataStream_observationType || false;
	            params.DataStream_unitOfMeasurement = params.DataStream_unitOfMeasurement || false;
	            params.DataStream_observedArea = params.DataStream_observedArea || false;
	            params.DataStream_phenomenonTime = params.DataStream_phenomenonTime || false;
	            params.DataStream_resultTime = params.DataStream_resultTime || false;
	            params.Observation_phenomenonTime = params.Observation_phenomenonTime || false;
	            params.Observation_resultTime = params.Observation_resultTime || false;
	            params.Observation_result = params.Observation_result || false;
	            params.Observation_resultQuality = params.Observation_resultQuality || false;
	            params.Observation_validTime = params.Observation_validTime || false;
	            params.Observation_parameters = params.Observation_parameters || false;
	            params.FeatureOfInterest_name = params.FeatureOfInterest_name || false;
	            params.FeatureOfInterest_description = params.FeatureOfInterest_description || false;
	            params.FeatureOfInterest_encodingType = params.FeatureOfInterest_encodingType || false;
	            params.FeatureOfInterest_feature = params.FeatureOfInterest_feature || false;
	            params.ObservedProperty_name = params.ObservedProperty_name || false;
	            params.ObservedProperty_definition = params.ObservedProperty_definition || false;
	            params.ObservedProperty_description = params.ObservedProperty_description || false;
	            params.Sensor_name = params.Sensor_name || false;
	            params.Sensor_description = params.Sensor_description || false;
	            params.Sensor_encodingType = params.Sensor_encodingType || false;
	            params.Sensor_metadata = params.Sensor_metadata || false;
	            params.Sensor_properties = params.Sensor_properties || false;
	            params.Thing_name = params.Thing_name || false;
	            params.Thing_HistoricalLocations = params.Thing_HistoricalLocations || false;
	            params.Thing_Location_name = params.Thing_Location_name || false;
	            params.Thing_Location_description = params.Thing_Location_description || false;
	            params.Thing_Location_encodingType = params.Thing_Location_encodingType || false;
	            params.Thing_Location_location = params.Thing_Location_location || false;
	            return params;
	        }

	        /**
	         * called after registerTimedQueries. it loads the data for all Queries in the seperate list
	         * @param callback {function} Function to call when all requests have been dealt with
	         */
	    }, {
	        key: 'loadRegistered',
	        value: function loadRegistered(callback) {
	            var _this = this;

	            var results = [];

	            //retrieve which data is wanted
	            for (var k in this.registeredQueries) {
	                if (this.registeredQueries[k] instanceof _QueryTimedQueryJs.TimedQuery) {
	                    (function () {
	                        var url = _this.registeredQueries[k].getQueryString();
	                        var parameterList = _this.registeredQueries[k].getParameterMap();
	                        var obsStart = _this.registeredQueries[k].getObsStart();
	                        var obsEnd = _this.registeredQueries[k].getObsEnd();
	                        var containsSameDate = function containsSameDate(e) {
	                            return e.obsStart == obsStart && e.obsEnd == obsEnd;
	                        };
	                        if (!results[url]) {
	                            results[url] = [];
	                            results[url].push({
	                                parameterList: parameterList,
	                                obsStart: obsStart,
	                                obsEnd: obsEnd,
	                                qID: [_this.registeredQueries[k].getQueryID()]
	                            });
	                        } else if (results[url].some(containsSameDate)) {
	                            var q = results[url].find(containsSameDate);
	                            q.qID.push(_this.registeredQueries[k].getQueryID());
	                            for (var p in parameterList) {
	                                if (q.parameterList == null) q.parameterList = {};
	                                q.parameterList[p] = q.parameterList[p] || parameterList[p];
	                            }
	                        } else {
	                            results[url].push({
	                                parameterList: parameterList,
	                                obsStart: obsStart,
	                                obsEnd: obsEnd,
	                                qID: [_this.registeredQueries[k].getQueryID()]
	                            });
	                        }
	                    })();
	                }
	            }

	            var allRequestsDone = (function () {
	                var _this2 = this;

	                var _loop = function (k) {
	                    if (_this2.registeredQueries[k] instanceof _QueryTimedQueryJs.TimedQuery) {
	                        var obsStart = _this2.registeredQueries[k].getObsStart;
	                        var obsEnd = _this2.registeredQueries[k].getObsEnd;
	                        var matchingID = function matchingID(e) {
	                            return e.qID.some((function (e) {
	                                if (this.registeredQueries[k] == null) return;
	                                return e == this.registeredQueries[k].getQueryID();
	                            }).bind(this));
	                        };
	                        var obj = results[_this2.registeredQueries[k].getQueryString()].find(matchingID.bind(_this2));
	                        if (obj != null) {
	                            _this2.registeredQueries[k].callIt(obj.result);
	                        } else {
	                            _this2.registeredQueries[k].callIt(null);
	                        }
	                    } else {
	                        _this2.registeredQueries[k].callIt(null);
	                    }
	                };

	                //send the wanted data to the endpoints which requested them

	                for (var k in this.registeredQueries) {
	                    _loop(k);
	                }
	                callback();
	            }).bind(this);

	            //retrieve the wanted data
	            var calledRequests = 0;

	            var _loop2 = function (k) {
	                var _loop3 = function (i) {
	                    var url = k;
	                    var params = _this._completeParameterList(results[k][i].parameterList);
	                    var obsStart = results[k][i].obsStart;
	                    var obsEnd = results[k][i].obsEnd;
	                    var cb = function cb(data) {
	                        results[k][i].result = data;
	                        calledRequests = calledRequests - 1;
	                        if (calledRequests <= 0) {
	                            allRequestsDone();
	                        }
	                    };
	                    calledRequests = calledRequests + 1;
	                    if (!(obsStart instanceof Date) || !(obsEnd instanceof Date) || obsStart.getTime() <= obsEnd.getTime()) {
	                        new _SensorThingsCommunicationSensorThingsCommunicationsJs.SensorThingsCommunications().createQuery(url, params, cb.bind(_this), obsStart, obsEnd);
	                    } else {
	                        cb(null);
	                    }
	                };

	                for (var i in results[k]) {
	                    _loop3(i);
	                }
	            };

	            for (var k in results) {
	                _loop2(k);
	            }
	            if (calledRequests <= 0) {
	                allRequestsDone();
	            }
	        }

	        /** called to clear the separate List after one iteration
	         */
	    }, {
	        key: 'clearRegisteredQueries',
	        value: function clearRegisteredQueries() {
	            this.registeredQueries = [];
	        }
	    }]);

	    return DataQuerySynchronizing;
	})();

	exports.DataQuerySynchronizing = DataQuerySynchronizing;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _SensorThingsCommunicationSensorThingsCommunicationsJs = __webpack_require__(21);

	var logging = false;

	/**
	 * represents a Query which is updated via MQTT.
	 *
	 * This class has the following properties:
	 * queryId           -- in a Dashboard unique identidier number for a Query
	 * handle            -- handle to a MQTT object
	 * callback          -- the callback to refresh the Data in the DataModel
	 *
	 */

	var MQTTQuery = (function () {

	    /** @param myHandle the interval to update this stream with
	     * @param myCallback the callback to refresh the Data in the DataModel
	     */

	    function MQTTQuery(myParameterMap, query, baseTopic, myCallback) {
	        _classCallCheck(this, MQTTQuery);

	        if (logging) console.log("new MQTTQuery Object");
	        this.setCallback(myCallback);
	        this.setParameterMap(myParameterMap);
	        this.setHandleID(new _SensorThingsCommunicationSensorThingsCommunicationsJs.SensorThingsCommunications().registerMQTT(myParameterMap, query, baseTopic, myCallback));
	    }

	    /**
	     * sets the ParameterMap
	     * @param {object} myParameterMap the ParameterMap
	     */

	    _createClass(MQTTQuery, [{
	        key: "setParameterMap",
	        value: function setParameterMap(myParameterMap) {
	            this.parameterMap = myParameterMap;
	        }

	        /**
	         * Gets the ParameterMap.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            return this.parameterMap;
	        }

	        /** Sets the matching handleID.
	         * @param {integer} myID the new matching HandleID
	         */
	    }, {
	        key: "setHandleID",
	        value: function setHandleID(myID) {
	            this.handleID = myID;
	        }

	        /** Returns the matching HandleID.
	         * @returns the matching HandleID
	         */
	    }, {
	        key: "getHandleID",
	        value: function getHandleID() {
	            return this.handleID;
	        }

	        /** Returns true if the data has to be retrieved from the Server.
	         * @param time the time since startup in milliseconds
	         * @returns false
	         */
	    }, {
	        key: "registerIfNeeded",
	        value: function registerIfNeeded(time) {
	            return false;
	        }

	        /** get the queryId
	         * @return the queryId
	         */
	    }, {
	        key: "getQueryID",
	        value: function getQueryID() {
	            return this.queryId;
	        }

	        /** set the queryId
	         * @param n the new queryId
	         */
	    }, {
	        key: "setQueryID",
	        value: function setQueryID(n) {
	            this.queryId = n;
	        }

	        /** set the callback
	         * @param c the new callback
	         */
	    }, {
	        key: "setCallback",
	        value: function setCallback(c) {
	            this.callback = c;
	        }

	        /** get the callback
	         * @return the current callback
	         */
	    }, {
	        key: "getCallback",
	        value: function getCallback() {
	            return this.callback;
	        }

	        /** calls the callback.
	         * Only for internal use
	         */
	    }, {
	        key: "callIt",
	        value: function callIt(myData) {
	            if (this.callback) {
	                this.callback(myData);
	            }
	        }

	        /** destroys the current Query
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            new _SensorThingsCommunicationSensorThingsCommunicationsJs.SensorThingsCommunications().unregister(this.getHandleID);
	            delete this;
	        }
	    }]);

	    return MQTTQuery;
	})();

	exports.MQTTQuery = MQTTQuery;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _SensorThingsCommunicationSensorThingsCommunicationsJs = __webpack_require__(21);

	var logging = false;

	/**
	 * represents a Query that will only be repeatadly retrieved.
	 *
	 * This class has the following properties:
	 * queryId          -- in a Dashboard unique identidier number for a Query
	 * interval         -- the interval, a datastream is refreshed
	 * query            -- the Query as a String
	 * lastCalled       -- the time, the Query was refreshed the last time
	 * callback         -- the callback to refresh the Data in the Datamodel
	 *
	 */

	var TimedQuery = (function () {

	    /** @class
	     * @param myInterval the interval to update this stream with
	     * @param myQuery the query to use
	     * @param myCallback the callback to refresh the Data in the Datamodel
	     */

	    function TimedQuery(myParameterMap, myInterval, myQuery, myCallback, obsStart, obsEnd, obsSize, obsRel) {
	        _classCallCheck(this, TimedQuery);

	        this.interval = myInterval;
	        this.query = myQuery;
	        this.callback = myCallback;
	        this.lastCalled = 0;
	        this.lastDataCalled = 0;
	        this.obsStart = obsStart;
	        this.obsEnd = obsEnd;
	        this.obsSize = obsSize;
	        this.obsRel = obsRel;
	        this.onlyLatest = this.obsSize < 0;
	        this.setParameterMap(myParameterMap);
	        if (logging) console.log("creating a new timed Query to", myQuery);
	    }

	    /**
	     * sets the ParameterMap
	     * @param { object } the ParameterMap
	     */

	    _createClass(TimedQuery, [{
	        key: "setParameterMap",
	        value: function setParameterMap(myParameterMap) {
	            this.parameterMap = myParameterMap;
	        }

	        /**
	         * gets the ParameterMap
	         * @returns { object } the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            return this.parameterMap;
	        }

	        /** returns true, if the Data has to be retrieved from the Server.
	         * @param {number} time the time since Jan 1, 1980 in milliseconds
	         * @returns {boolean} if the Query has to be sent
	         */
	    }, {
	        key: "registerIfNeeded",
	        value: function registerIfNeeded(time) {
	            if (time > this.interval + this.lastCalled) {
	                this.lastCalled = Date.now();
	                return true;
	            }
	            return false;
	        }

	        /** get the queryId
	         * @return {number} the queryId
	         */
	    }, {
	        key: "getQueryID",
	        value: function getQueryID() {
	            return this.queryId;
	        }

	        /** set the queryId
	         * @param {number} n the new queryId
	         */
	    }, {
	        key: "setQueryID",
	        value: function setQueryID(n) {
	            this.queryId = n;
	        }

	        /** get the queryString
	         * @return {string} the queryString
	         */
	    }, {
	        key: "getQueryString",
	        value: function getQueryString() {
	            return this.query;
	        }

	        /** set the queryString
	         * @param {string} q the new queryString
	         */
	    }, {
	        key: "setQueryString",
	        value: function setQueryString(q) {
	            if (logging) console.log(this.getQueryID(), "setting QueryString to", q);
	            this.query = q;
	        }

	        /** substract ms from d1
	         * @param {Date} d1 the Date to substract from
	         * @param {number} ms the miliseconds to substract
	         * @return {Date} the calculated Date
	         */
	    }, {
	        key: "_subtractDate",
	        value: function _subtractDate(d1, ms) {
	            return new Date(d1.getTime() - ms);
	        }

	        /**
	         * deletes all Observations older than size milliseconds
	         * @param {Array} array an Array of Observations
	         * @param {number} size the maximum age of the Observation
	         * @return {Array} the modified Array
	         */
	    }, {
	        key: "_deleteOld",
	        value: function _deleteOld(array, size) {
	            return array.filter(function (e) {
	                var pass = new Date(e.Observation_phenomenonTime).getTime() > new Date().getTime() - size;
	                return pass;
	            });
	        }

	        /**
	         * gets the Date of the start of the time-scope
	         * @return {Date} the start of the time-scope to generate the next Query to
	         */
	    }, {
	        key: "getObsStart",
	        value: function getObsStart() {
	            if (this.onlyLatest) {
	                return false;
	            } else if (this.lastDataCalled != 0) {
	                return new Date(this.lastDataCalled);
	            } else {
	                if (this.obsRel) {
	                    return this._subtractDate(new Date(), this.obsSize);
	                } else {
	                    return this.obsStart;
	                }
	            }
	        }

	        /**
	         * gets the Date of the end of the time-scope
	         * @return {Date} the end of the time-scope to generate the next Query to
	         */
	    }, {
	        key: "getObsEnd",
	        value: function getObsEnd() {
	            if (this.obsRel) {
	                return false;
	            } else {
	                return this.obsEnd;
	            }
	        }

	        /**
	         * returns the phenomenonTime of the latest Observation
	         * @param {Array} myObs an Array of Observations
	         * @return {number} the phenomenonTime of the latest Observation in milliseconds since Jan 1, 1980
	         */
	    }, {
	        key: "_getLatestTime",
	        value: function _getLatestTime(myObs) {
	            var latest = 0;
	            for (var k in myObs) {
	                var time = new Date(myObs[k].Observation_phenomenonTime).getTime();
	                if (time > latest) latest = time;
	            }
	            if (logging) console.log("found latest:", latest, myObs);
	            return latest;
	        }

	        /**
	         * calls the callback.
	         * Only for internal use
	         * @param {Object} myData the new Data
	         */
	    }, {
	        key: "callIt",
	        value: function callIt(myData) {
	            if (this.callback && myData != null) {
	                //this.lastDataCalled = new Date().getTime();
	                if (logging && myData.Observations != null && myData.Observations.length > 0) console.log("new Data pushed", this.getQueryID());
	                if (this.curData == null) {
	                    this.curData = myData;
	                    this.lastDataCalled = this._getLatestTime(this.curData.Observations);
	                } else if (myData.Observations != null && this.curData.Observations != null) {
	                    var array = [];
	                    myData.Observations = array.concat(myData.Observations, this.curData.Observations);
	                    if (this.obsRel) myData.Observations = this._deleteOld(myData.Observations, this.obsSize);
	                    this.curData = myData;
	                    this.lastDataCalled = this._getLatestTime(this.curData.Observations);
	                } else if (myData.Observations == null) {
	                    if (this.obsRel && this.curData.Observations != null) {
	                        this.curData.Observations = this._deleteOld(this.curData.Observations, this.obsSize);
	                    }
	                    myData.Observations = this.curData.Observations;
	                    this.curData = myData;
	                }
	                this.callback(this.curData);
	            }
	        }

	        /** destroys the current Query
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            delete this;
	        }
	    }]);

	    return TimedQuery;
	})();

	exports.TimedQuery = TimedQuery;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/** 
	 * a Query which only generates random Data.
	 * only for internal & testing purposes
	 *
	 * This class has the following properties:
	 * interval         -- the Time between 2 Querys
	 * lastCalled       -- the Time since Jan,1,1970 of the last Query
	 * callback         -- the Callback to write the Data
	 * 
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RandomDataQuery = (function () {

	    /** 
	     * @param myParameterMap the ParameterMap
	     * @param myCallback the callback to refresh the Data in the Datamodel
	     */

	    function RandomDataQuery(myParameterMap, myCallback) {
	        _classCallCheck(this, RandomDataQuery);

	        this.interval = 1000;
	        this.lastCalled = 0;
	        this.callback = myCallback;
	        this.setParameterMap(myParameterMap);
	        this.myObservations = [];
	        this.currentID = 1;
	        this.callIt = this.callMe.bind(this);
	    }

	    /**
	     * sets the ParameterMap
	     * @param { object } the ParameterMap
	     */

	    _createClass(RandomDataQuery, [{
	        key: "setParameterMap",
	        value: function setParameterMap(myParameterMap) {
	            this.parameterMap = myParameterMap;
	        }

	        /**
	         * gets the ParameterMap
	         * @returns { object } the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            return this.parameterMap;
	        }

	        /** get the queryId
	         * @return the queryId
	         */
	    }, {
	        key: "getQueryID",
	        value: function getQueryID() {
	            return this.queryId;
	        }

	        /** set the queryId
	         * @param n the new queryId
	         */
	    }, {
	        key: "setQueryID",
	        value: function setQueryID(n) {
	            this.queryId = n;
	        }

	        /** returns true, if the Data has to be retrieved from the Server.
	         * @param time the time since Jan,1,1970 in milliseconds
	         * @returns if the Query has to be sent
	         */
	    }, {
	        key: "registerIfNeeded",
	        value: function registerIfNeeded(time) {
	            return time > this.interval + this.lastCalled;
	        }

	        /** calls the callback.
	         * Only for internal use
	         * @param {Object} the new Data
	         */
	    }, {
	        key: "callMe",
	        value: function callMe(myData) {
	            this.lastCalled = Date.now();
	            var params = this.getParameterMap();
	            if (this.callback) {
	                this.currentID = this.currentID + 1;

	                var data = {};
	                var curTime = new Date().toISOString();
	                var result = Math.floor(Math.sin(this.currentID) * 50) + 50;

	                //set the requested data
	                //========================================
	                data.DataStream_id = 0;
	                data.DataStream_name = params.DataStream_name ? "Random Data Stream" : undefined;
	                data.DataStream_description = params.DataStream_description ? "Random Data Stream" : undefined;
	                data.DataStream_observationType = params.DataStream_observationType ? "Random" : undefined;
	                data.DataStream_unitOfMeasurement = params.DataStream_unitOfMeasurement ? "ran" : undefined;
	                data.DataStream_observedArea = params.DataStream_observedArea ? {} : undefined;
	                data.DataStream_phenomenonTime = params.DataStream_phenomenonTime ? curTime : undefined;
	                data.DataStream_resultTime = params.DataStream_resultTime ? curTime : undefined;
	                var newObservation = {};
	                newObservation.Observation_id = this.currentID;
	                newObservation.Observation_phenomenonTime = params.Observation_phenomenonTime ? curTime : undefined;
	                newObservation.Observation_resultTime = params.Observation_resultTime ? curTime : undefined;
	                newObservation.Observation_result = params.Observation_result ? result : undefined;
	                newObservation.Observation_resultQuality = params.Observation_resultQuality ? {} : undefined;
	                newObservation.Observation_validTime = params.Observation_validTime ? curTime + "P24H" : undefined;
	                newObservation.Observation_parameters = params.Observation_parameters ? {
	                    randomData: true
	                } : undefined;
	                newObservation.FeatureOfInterest_name = params.FeatureOfInterest_name ? "Random Feature" : undefined;
	                newObservation.FeatureOfInterest_description = params.FeatureOfInterest_description ? "Random Feature" : undefined;
	                newObservation.FeatureOfInterest_encodingType = params.FeatureOfInterest_encodingType ? "application/vnd.geo+json" : undefined;
	                newObservation.FeatureOfInterest_feature = params.FeatureOfInterest_feature ? {
	                    type: "Point",
	                    coordinates: [-117.05, 51.05]
	                } : undefined;
	                this.myObservations.push(newObservation);
	                data.Observations = this.myObservations;

	                data.ObservedProperty_name = params.ObservedProperty_name ? "Random" : undefined;
	                data.ObservedProperty_definition = params.ObservedProperty_definition ? "Random" : undefined;
	                data.ObservedProperty_description = params.ObservedProperty_description ? "Random" : undefined;
	                data.Sensor_name = params.Sensor_name ? "Random Sensor" : undefined;
	                data.Sensor_description = params.Sensor_description ? "Random Sensor" : undefined;
	                data.Sensor_encodingType = params.Sensor_encodingType ? "application/pdf" : undefined;
	                data.Sensor_metadata = params.Sensor_metadata ? "Random Sensor" : undefined;
	                data.Thing_name = params.Thing_name ? "Random" : undefined;
	                data.Thing_description = params.Sensor_description ? "Random" : undefined;
	                data.Thing_properties = params.Sensor_properties ? {
	                    reference: "first"
	                } : undefined;
	                data.Thing_HistoricalLocations = params.Thing_HistoricalLocations ? [{
	                    time: curTime
	                }, {
	                    time: curTime
	                }] : undefined;
	                data.Thing_Locations = [];

	                var loc = {};
	                loc.id = 1;
	                loc.name = params.Thing_Location_name ? "Random Sensor Location" : undefined;
	                loc.description = params.Thing_Location_description ? "Random Sensor Location" : undefined;
	                loc.encodingType = params.Thing_Location_encodingType ? "application/vnd.geo+json" : undefined;
	                loc.location = params.Thing_Location_location ? {
	                    type: "Point",
	                    coordinates: [8.404, 49.014]
	                } : undefined;

	                data.Thing_Locations.push(loc);

	                //========================================

	                this.callback(data);
	            }
	        }

	        /** destroy the current Query
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            delete this;
	        }
	    }]);

	    return RandomDataQuery;
	})();

	exports.RandomDataQuery = RandomDataQuery;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	/**
	 * PlainTextWidgetData is the datamodel of a plainTextWidget widget
	 */

	var PlainTextWidgetData = (function () {

	    /**
	     * Constructs new LineGraphWidgetData with an ID
	     * @param {string} id
	     *      id
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function PlainTextWidgetData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, PlainTextWidgetData);

	        this.id = id;
	        this.type = WIDGET_TYPE_PLAINTEXT;

	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // Most recent data
	        this.allData = [];

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuraion
	     * @param {object} args
	     *      the attributes
	     */

	    _createClass(PlainTextWidgetData, [{
	        key: 'setAttributes',
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: '_initConfigurableData',
	        value: function _initConfigurableData() {
	            this.configurableData = {
	                // View configuration
	                text: {
	                    data: window.iotlg.textWidgetDefaultText,
	                    type: TYPE_STRING
	                },
	                title: {
	                    data: 'Plaintext Widget',
	                    type: TYPE_STRING
	                },
	                fontSize: {
	                    data: 27,
	                    type: TYPE_INTEGER
	                }
	            };
	        }

	        /**
	         * Registers a callback function from the view
	         * @param {function} dataFunc
	         *      data callback function
	         * @param {function} configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: 'registerViewCallback',
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.configCallbacks.push(configFunc);
	            configFunc(this.configurableData);
	            //  this.dataCallbacks.push(dataFunc);
	            //  dataFunc(this.allData);
	        }

	        /**
	         * Deletes Widget
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: 'getID',
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: 'getType',
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: 'getPosition',
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return {object} QueryParams
	         */
	    }, {
	        key: 'getQueryParams',
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: 'getQueryIDs',
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         * @return {object} object containing all configurable fields and their values
	         */
	    }, {
	        key: 'getConfigurableData',
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: 'setConfigurableData',
	        value: function setConfigurableData(configurableData) {
	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: 'setPosition',
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: 'setSize',
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: 'setQueryID',
	        value: function setQueryID(queryID) {
	            this.queryID = queryID;
	        }
	    }]);

	    return PlainTextWidgetData;
	})();

	exports.PlainTextWidgetData = PlainTextWidgetData;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _UserEventsUserEventsJs = __webpack_require__(8);

	var _dashboardConfig = null;

	/**
	 * Class stores the Dashboard Configuration
	 */

	var DashboardConfig = (function () {

	    /**
	     * Implements Singleton.
	     * @return {DashboardConfig} DashboardConfig Singleton object
	     */

	    function DashboardConfig() {
	        _classCallCheck(this, DashboardConfig);

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

	            this._userEvents = new _UserEventsUserEventsJs.UserEvents();
	        }
	        return _dashboardConfig;
	    }

	    /**
	     * Getter for title.
	     * @return {string} The title
	     */

	    _createClass(DashboardConfig, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return this.title;
	        }

	        /**
	         * Getter for ServerList
	         * @return {Array} ServerList
	         */
	    }, {
	        key: "getServerList",
	        value: function getServerList() {
	            return this.serverList;
	        }

	        /**
	         * Setter for title
	         * @param {string} title The new title
	         */
	    }, {
	        key: "setTitle",
	        value: function setTitle(title) {
	            this.title = title;
	            this._userEvents.dashboardConfigChanged();
	        }

	        /**
	         * Setter for serverList
	         * @param {Array} serverList The new ServerList
	         */
	    }, {
	        key: "setServerList",
	        value: function setServerList(serverList) {
	            this.serverList = serverList;
	            this._userEvents.dashboardConfigChanged();
	        }
	    }]);

	    return DashboardConfig;
	})();

	exports.DashboardConfig = DashboardConfig;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	/**
	 * GaugeWidgetData is the datamodel of a gauge widget
	 */

	var GaugeWidgetData = (function () {

	    /**
	     * Constructs new LineGraphWidgetData with an ID
	     * @param {string} id
	     *      id
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function GaugeWidgetData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, GaugeWidgetData);

	        this.id = id;
	        this.type = WIDGET_TYPE_GAUGE;

	        // WidgetView Callback to notify for changed Data
	        this.dataCallbacks = [];
	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // Most recent data
	        this.allData = [];

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuraion
	     * @param {object} args
	     *      the attributes, has attributes "position" and "size"
	     */

	    _createClass(GaugeWidgetData, [{
	        key: "setAttributes",
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * returns a list of booleans representing, which Data is needed.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            var pm = {
	                DataStream_name: true,
	                DataStream_description: false,
	                DataStream_observationType: false,
	                DataStream_unitOfMeasurement: false,
	                DataStream_observedArea: false,
	                DataStream_phenomenonTime: true,
	                DataStream_resultTime: false,
	                Observation_phenomenonTime: false,
	                Observation_resultTime: false,
	                Observation_result: true,
	                Observation_resultQuality: false,
	                Observation_validTime: false,
	                Observation_parameters: false,
	                FeatureOfInterest_name: false,
	                FeatureOfInterest_description: false,
	                FeatureOfInterest_encodingType: false,
	                FeatureOfInterest_feature: false,
	                ObservedProperty_name: false,
	                ObservedProperty_definition: false,
	                ObservedProperty_description: false,
	                Sensor_name: false,
	                Sensor_description: false,
	                Sensor_encodingType: false,
	                Sensor_metadata: false,
	                Thing_name: false,
	                Thing_description: false,
	                Thing_properties: false,
	                Thing_HistoricalLocations: false,
	                Thing_Location_name: false,
	                Thing_Location_description: false,
	                Thing_Location_encodingType: false,
	                Thing_Location_location: false
	            };
	            return pm;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: "_initConfigurableData",
	        value: function _initConfigurableData() {
	            this.configurableData = {
	                // View configuration
	                title: {
	                    data: 'Gauge Widget',
	                    type: TYPE_STRING
	                },
	                min: {
	                    data: 0,
	                    type: TYPE_NUMBER
	                },
	                max: {
	                    data: 100,
	                    type: TYPE_NUMBER
	                },
	                shadow: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                textColor: {
	                    data: '#000000',
	                    type: TYPE_COLOR
	                },
	                tickmarksBigColor: {
	                    data: '#000055',
	                    type: TYPE_COLOR
	                },
	                tickmarksMediumColor: {
	                    data: '#000033',
	                    type: TYPE_COLOR
	                },
	                tickmarksSmallColor: {
	                    data: '#000000',
	                    type: TYPE_COLOR
	                },
	                backgroundColor: {
	                    data: '#FFFFFF',
	                    type: TYPE_COLOR
	                },
	                borderInnerColor: {
	                    data: '#FFFFFF',
	                    type: TYPE_COLOR
	                },
	                borderOuterColor: {
	                    data: '#EEEEEE',
	                    type: TYPE_COLOR
	                },
	                borderOutlineColor: {
	                    data: '#BBBBBB',
	                    type: TYPE_COLOR
	                },
	                needleColor: {
	                    data: '#FF0000',
	                    type: TYPE_COLOR
	                },
	                needleType: {
	                    data: 'line',
	                    type: TYPE_STRING
	                },
	                needleTail: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                centerpinRadius: {
	                    data: 7,
	                    type: TYPE_NUMBER
	                },
	                titleTop: {
	                    data: "",
	                    type: TYPE_STRING
	                },
	                titleTopSize: {
	                    data: 15,
	                    type: TYPE_INTEGER
	                },
	                titleTopColor: {
	                    data: '#000000',
	                    type: TYPE_COLOR
	                },
	                titleBottom: {
	                    data: "",
	                    type: TYPE_STRING
	                },
	                titleBottomColor: {
	                    data: '#000000',
	                    type: TYPE_COLOR
	                },
	                titleBottomSize: {
	                    data: 12,
	                    type: TYPE_INTEGER
	                },
	                labelsCentered: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                labelsOffset: {
	                    data: 7,
	                    type: TYPE_INTEGER
	                },
	                textAccessible: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                colorsRanges: {
	                    data: [{
	                        data: {
	                            lower: {
	                                data: 60,
	                                type: TYPE_NUMBER
	                            },
	                            upper: {
	                                data: 80,
	                                type: TYPE_NUMBER
	                            },
	                            color: {
	                                data: '#FFFF00',
	                                type: TYPE_COLOR
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }, {
	                        data: {
	                            lower: {
	                                data: 80,
	                                type: TYPE_NUMBER
	                            },
	                            upper: {
	                                data: 100,
	                                type: TYPE_NUMBER
	                            },
	                            color: {
	                                data: '#FF0000',
	                                type: TYPE_COLOR
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                },
	                // Data filter
	                timeIntervalRelative: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                timeIntervalUnit: {
	                    data: UNIT_MONTH,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        second: UNIT_SECOND,
	                        minute: UNIT_MINUTE,
	                        hour: UNIT_HOUR,
	                        day: UNIT_DAY,
	                        month: UNIT_MONTH,
	                        year: UNIT_YEAR
	                    }
	                },
	                timeInterval: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                startTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },
	                endTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },

	                // ST configuration Attention: mulitple Sensors are possible
	                sensorThingsConfiguration: {
	                    data: [{
	                        data: {
	                            dataStreamUrl: {
	                                data: '',
	                                type: TYPE_FUZZY_SENSOR_SEARCH
	                            },
	                            mqttEnabled: {
	                                data: false,
	                                type: TYPE_BOOLEAN
	                            },
	                            mqttUrl: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            mqttBaseTopic: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            updateIntervalMs: {
	                                data: 1000,
	                                type: TYPE_INTEGER
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                }
	            };
	        }

	        /**
	         * DataObserver pushes new data, callback methods from view are executed with new data
	         * @param {object} data
	         *      new data
	         */
	    }, {
	        key: "newData",
	        value: function newData(data) {
	            this.allData = data;
	            for (var k in this.dataCallbacks) {
	                this.dataCallbacks[k](this.allData);
	            }
	        }

	        /**
	         * Registers a callback function from the view
	         * @param {function} dataFunc
	         *      data callback function
	         * @param {function} configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: "registerViewCallback",
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.dataCallbacks.push(dataFunc);
	            this.configCallbacks.push(configFunc);
	            dataFunc(this.allData);
	            configFunc(this.configurableData);
	        }

	        /**
	         * @returns {function} (this:LineGraphWidgetData)
	         */
	    }, {
	        key: "getDataCallback",
	        value: function getDataCallback() {
	            return [this.newData.bind(this)];
	        }

	        /**
	         * Deletes Widget
	         * This function destroys every observing entity
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	            this.dataCallbacks = [];
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: "getID",
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return QueryParams
	         */
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: "getQueryIDs",
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         */
	    }, {
	        key: "getConfigurableData",
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: "setConfigurableData",
	        value: function setConfigurableData(configurableData) {
	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: "setPosition",
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: "setQueryIDs",
	        value: function setQueryIDs(queryIDs) {
	            this.queryIDs = queryIDs;
	        }
	    }]);

	    return GaugeWidgetData;
	})();

	exports.GaugeWidgetData = GaugeWidgetData;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	/**
	 * BarGraphData is the datamodel of a BarGraph widget
	 */

	var BarGraphData = (function () {

	    /**
	     * Constructs new BarGraphData with an ID
	     * @param {string} id
	     *      id of the new widget data object
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function BarGraphData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, BarGraphData);

	        this.id = id;
	        this.type = WIDGET_TYPE_BARGRAPH;

	        // WidgetView Callback to notify for changed Data
	        this.dataCallbacks = [];
	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // Set dataObserverCallbacks up
	        this.dataObserverCallbacks = [this.newData.bind(this)];

	        // Most recent data
	        this.allData = [];
	        this.allData.push([]);

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuration, that beeing size and position
	     * @param {object} args
	     *      the attributes
	     */

	    _createClass(BarGraphData, [{
	        key: "setAttributes",
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * returns a list of booleans representing, which Data is needed.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            var pm = {
	                DataStream_name: true,
	                DataStream_description: false,
	                DataStream_observationType: false,
	                DataStream_unitOfMeasurement: true,
	                DataStream_observedArea: false,
	                DataStream_phenomenonTime: false,
	                DataStream_resultTime: false,
	                Observation_phenomenonTime: true,
	                Observation_resultTime: true,
	                Observation_result: true,
	                Observation_resultQuality: false,
	                Observation_validTime: false,
	                Observation_parameters: false,
	                FeatureOfInterest_name: false,
	                FeatureOfInterest_description: false,
	                FeatureOfInterest_encodingType: false,
	                FeatureOfInterest_feature: false,
	                ObservedProperty_name: false,
	                ObservedProperty_definition: false,
	                ObservedProperty_description: false,
	                Sensor_name: false,
	                Sensor_description: false,
	                Sensor_encodingType: false,
	                Sensor_metadata: false,
	                Thing_name: false,
	                Thing_description: false,
	                Thing_properties: false,
	                Thing_HistoricalLocations: false,
	                Thing_Location_name: false,
	                Thing_Location_description: false,
	                Thing_Location_encodingType: false,
	                Thing_Location_location: false
	            };
	            return pm;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: "_initConfigurableData",
	        value: function _initConfigurableData() {
	            var nextHourTime = new Date();
	            nextHourTime.setMinutes(new Date().getMinutes() + 1);
	            this.configurableData = {
	                // View configuration
	                title: {
	                    data: 'BarGraph Widget',
	                    type: TYPE_STRING
	                },
	                colors: {
	                    data: [{
	                        data: {
	                            barColor: {
	                                data: '#000000',
	                                type: TYPE_COLOR
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                },
	                backgroundBarcolor1: {
	                    data: '#ffffff',
	                    type: TYPE_COLOR
	                },
	                backgroundBarcolor2: {
	                    data: '#ffffff',
	                    type: TYPE_COLOR
	                },
	                backgroundGrid: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                // there will be more, be pacient :)

	                // Data filter
	                timeIntervalRelative: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                timeIntervalUnit: {
	                    data: UNIT_MINUTE,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        second: UNIT_SECOND,
	                        minute: UNIT_MINUTE,
	                        hour: UNIT_HOUR,
	                        day: UNIT_DAY,
	                        month: UNIT_MONTH,
	                        year: UNIT_YEAR
	                    }
	                },
	                timeInterval: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                timeGroups: {
	                    data: 3,
	                    type: TYPE_INTEGER
	                },
	                startTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },
	                endTime: {
	                    data: nextHourTime,
	                    type: TYPE_DATE
	                },

	                // ST configuration Attention: mulitple Sensors are possible
	                sensorThingsConfiguration: {
	                    data: [{
	                        data: {
	                            dataStreamUrl: {
	                                data: '',
	                                type: TYPE_FUZZY_SENSOR_SEARCH
	                            },
	                            mqttEnabled: {
	                                data: false,
	                                type: TYPE_BOOLEAN
	                            },
	                            mqttUrl: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            mqttBaseTopic: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            updateIntervalMs: {
	                                data: 1000,
	                                type: TYPE_INTEGER
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                },

	                titleY: {
	                    data: "New 9GAG memes",
	                    type: TYPE_STRING
	                }
	            };
	        }

	        /**
	         * DataObserver pushes new data, callback methods from view are executed with new data
	         * @param data
	         *      The new data
	         */
	    }, {
	        key: "newData",
	        value: function newData(data) {
	            this.allData[0] = data;
	            for (var k in this.dataCallbacks) {
	                this.dataCallbacks[k](this.allData);
	            }
	        }

	        /**
	         * Registers a callback function from the view
	         * @param {function} dataFunc
	         *      data callback function
	         * @param {function} configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: "registerViewCallback",
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.dataCallbacks.push(dataFunc);
	            this.configCallbacks.push(configFunc);
	            dataFunc(this.allData);
	            configFunc(this.configurableData);
	        }

	        /**
	         * @returns {function} (this:LineGraphWidgetData)
	         */
	    }, {
	        key: "getDataCallback",
	        value: function getDataCallback() {
	            return this.dataObserverCallbacks;
	        }

	        /**
	         * Deletes Widget
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	            this.dataCallbacks = [];
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: "getID",
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return {object} QueryParams
	         */
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: "getQueryIDs",
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         */
	    }, {
	        key: "getConfigurableData",
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: "setConfigurableData",
	        value: function setConfigurableData(configurableData) {
	            this._buildDataCallbacks(configurableData.sensorThingsConfiguration.data);

	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: "setPosition",
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: "setQueryIDs",
	        value: function setQueryIDs(queryIDs) {
	            this.queryIDs = queryIDs;
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: "_buildDataCallbacks",
	        value: function _buildDataCallbacks(sensorThingsConfiguration) {
	            var _this = this;

	            if (logging) console.log("building my Datacallbacks");
	            // clear data array
	            this.allData = [];
	            this.dataObserverCallbacks = [];

	            var n = 0;
	            //Add callback for each dataStreamUrl

	            var _loop = function (stconfig) {
	                // creat callback for dataStreamUrl
	                _this.allData.push([]);
	                var pos = n;
	                _this.dataObserverCallbacks.push((function (data) {
	                    if (logging && data != null && data.Observations != null && data.Observations.length > 0) console.log("pushing data:", data, pos);
	                    this.allData[pos] = data;
	                    for (var k in this.dataCallbacks) {
	                        this.dataCallbacks[k](this.allData);
	                    }
	                }).bind(_this));
	                n++;
	            };

	            for (var stconfig in sensorThingsConfiguration) {
	                _loop(stconfig);
	            }
	            if (logging) console.log("Build " + n + " DataCallbacks");
	        }
	    }]);

	    return BarGraphData;
	})();

	exports.BarGraphData = BarGraphData;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	var logging = false;

	/**
	 * LineGraphWidgetData is the datamodel of a line graph widget
	 */

	var LineGraphWidgetData = (function () {

	    /**
	     * Constructs new LineGraphWidgetData with an ID
	     * @param {string} id
	     *      id
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function LineGraphWidgetData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, LineGraphWidgetData);

	        this.id = id;
	        this.type = WIDGET_TYPE_LINEGRAPH;

	        // WidgetView Callback to notify for changed Data
	        this.dataCallbacks = [];
	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // set data observerCallbacks up
	        this.dataObserverCallbacks = [this.newData.bind(this)];

	        // Most recent data
	        this.allData = [];
	        this.allData.push([]);

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuraion
	     * @param {object} args
	     *      the attributes
	     */

	    _createClass(LineGraphWidgetData, [{
	        key: "setAttributes",
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: "_initConfigurableData",
	        value: function _initConfigurableData() {
	            var nextHourTime = new Date();
	            nextHourTime.setMinutes(new Date().getMinutes() + 1);
	            this.configurableData = {
	                // View configuration
	                title: {
	                    data: 'LineGraph Widget',
	                    type: TYPE_STRING
	                },
	                backgroundGridBorder: {
	                    data: false,
	                    type: TYPE_BOOLEAN
	                },
	                backgroundGridVlines: {
	                    data: false,
	                    type: TYPE_BOOLEAN
	                },
	                backgroundBarcolor1: {
	                    data: '#FFFFFF',
	                    type: TYPE_COLOR
	                },
	                backgroundBarcolor2: {
	                    data: '#FFFFFF',
	                    type: TYPE_COLOR
	                },
	                backgroundGridColor: {
	                    data: '#000000',
	                    type: TYPE_COLOR
	                },
	                tickmarks: {
	                    data: 'circle',
	                    type: TYPE_STRING
	                },
	                ticksize: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                line: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                lineColors: {
	                    data: [{
	                        data: {
	                            lineColor: {
	                                data: '#000000',
	                                type: TYPE_COLOR
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                },

	                titleXaxis: {
	                    data: 'Time',
	                    type: TYPE_STRING
	                },
	                titleYaxis: {
	                    data: 'Y-Axis',
	                    type: TYPE_STRING
	                },
	                ymin: {
	                    data: 0,
	                    type: TYPE_NUMBER
	                },
	                pointColor: {
	                    data: '#000000',
	                    type: TYPE_COLOR
	                },
	                labelSteps: {
	                    data: 4,
	                    type: TYPE_INTEGER
	                },

	                // Data filter
	                timeIntervalRelative: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                timeIntervalUnit: {
	                    data: UNIT_MINUTE,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        second: UNIT_SECOND,
	                        minute: UNIT_MINUTE,
	                        hour: UNIT_HOUR,
	                        day: UNIT_DAY,
	                        month: UNIT_MONTH,
	                        year: UNIT_YEAR
	                    }
	                },
	                timeInterval: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                startTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },
	                endTime: {
	                    data: nextHourTime,
	                    type: TYPE_DATE
	                },

	                // ST configuration Attention: mulitple Sensors are possible
	                sensorThingsConfiguration: {
	                    data: [{
	                        data: {
	                            dataStreamUrl: {
	                                data: '',
	                                type: TYPE_FUZZY_SENSOR_SEARCH
	                            },
	                            mqttEnabled: {
	                                data: false,
	                                type: TYPE_BOOLEAN
	                            },
	                            mqttUrl: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            mqttBaseTopic: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            updateIntervalMs: {
	                                data: 1000,
	                                type: TYPE_INTEGER
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                }
	            };
	        }

	        /**
	         * returns a list of booleans representing, which Data is needed.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            var pm = {
	                DataStream_name: true,
	                DataStream_description: false,
	                DataStream_observationType: false,
	                DataStream_unitOfMeasurement: true,
	                DataStream_observedArea: false,
	                DataStream_phenomenonTime: false,
	                DataStream_resultTime: false,
	                Observation_phenomenonTime: true,
	                Observation_resultTime: false,
	                Observation_result: true,
	                Observation_resultQuality: false,
	                Observation_validTime: false,
	                Observation_parameters: false,
	                FeatureOfInterest_name: false,
	                FeatureOfInterest_description: false,
	                FeatureOfInterest_encodingType: false,
	                FeatureOfInterest_feature: false,
	                ObservedProperty_name: false,
	                ObservedProperty_definition: false,
	                ObservedProperty_description: false,
	                Sensor_name: false,
	                Sensor_description: false,
	                Sensor_encodingType: false,
	                Sensor_metadata: false,
	                Thing_name: false,
	                Thing_description: false,
	                Thing_properties: false,
	                Thing_HistoricalLocations: false,
	                Thing_Location_name: false,
	                Thing_Location_description: false,
	                Thing_Location_encodingType: false,
	                Thing_Location_location: false
	            };
	            return pm;
	        }

	        /**
	         * TODO: Update description
	         * new data arrives via this method
	         * callback methods from view are executed with incoming new data
	         * @param data
	         *      new data
	         */
	    }, {
	        key: "newData",
	        value: function newData(data) {
	            this.allData[0] = data;
	            for (var k in this.dataCallbacks) {
	                this.dataCallbacks[k](this.allData);
	            }
	        }

	        /**
	         * Registers a callback function from the view
	         * @param dataFunc
	         *      data callback function
	         * @param configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: "registerViewCallback",
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.dataCallbacks.push(dataFunc);
	            this.configCallbacks.push(configFunc);
	            configFunc(this.configurableData);
	            dataFunc(this.allData);
	        }

	        /**
	         * @returns {function} (this:LineGraphWidgetData)}
	         */
	    }, {
	        key: "getDataCallback",
	        value: function getDataCallback() {
	            return this.dataObserverCallbacks;
	        }

	        /**
	         * Deletes Widget
	         * This function destroys every observing entity
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	            this.dataCallbacks = [];
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: "getID",
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return QueryParams
	         */
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: "getQueryIDs",
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         */
	    }, {
	        key: "getConfigurableData",
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: "setConfigurableData",
	        value: function setConfigurableData(configurableData) {
	            this._buildDataCallbacks(configurableData.sensorThingsConfiguration.data);

	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: "setPosition",
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: "setQueryIDs",
	        value: function setQueryIDs(queryIDs) {
	            this.queryIDs = queryIDs;
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: "_buildDataCallbacks",
	        value: function _buildDataCallbacks(sensorThingsConfiguration) {
	            var _this = this;

	            // clear data array
	            this.allData = [];
	            this.dataObserverCallbacks = [];

	            var n = 0;
	            //Add callback for each dataStreamUrl

	            var _loop = function (stconfig) {
	                // creat callback for dataStreamUrl
	                _this.allData.push([]);
	                var pos = n;
	                _this.dataObserverCallbacks.push((function (data) {
	                    if (logging && data != null && data.Observations != null && data.Observations.length > 0) console.log("pushing data:", data, pos);
	                    this.allData[pos] = data;
	                    for (var k in this.dataCallbacks) {
	                        this.dataCallbacks[k](this.allData);
	                    }
	                }).bind(_this));
	                n++;
	            };

	            for (var stconfig in sensorThingsConfiguration) {
	                _loop(stconfig);
	            }
	            if (logging) console.log("Build " + n + " DataCallbacks");
	        }
	    }]);

	    return LineGraphWidgetData;
	})();

	exports.LineGraphWidgetData = LineGraphWidgetData;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	var PlainDataWidgetData = (function () {

	    /**
	     * Constructs new PlainDataWidgetData with an ID
	     * @param {string} id
	     *      id
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function PlainDataWidgetData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, PlainDataWidgetData);

	        this.id = id;
	        this.type = WIDGET_TYPE_PLAINDATA;

	        // WidgetView Callback to notify for changed Data
	        this.dataCallbacks = [];
	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // Most recent data
	        this.allData = [];

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuraion
	     * @param {object} args
	     *      the attributes
	     */

	    _createClass(PlainDataWidgetData, [{
	        key: "setAttributes",
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * returns a list of booleans representing, which Data is needed.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            var pm = {
	                DataStream_name: false,
	                DataStream_description: false,
	                DataStream_observationType: false,
	                DataStream_unitOfMeasurement: true,
	                DataStream_observedArea: false,
	                DataStream_phenomenonTime: false,
	                DataStream_resultTime: false,
	                Observation_phenomenonTime: true,
	                Observation_resultTime: false,
	                Observation_result: true,
	                Observation_resultQuality: false,
	                Observation_validTime: false,
	                Observation_parameters: false,
	                FeatureOfInterest_name: false,
	                FeatureOfInterest_description: false,
	                FeatureOfInterest_encodingType: false,
	                FeatureOfInterest_feature: false,
	                ObservedProperty_name: false,
	                ObservedProperty_definition: false,
	                ObservedProperty_description: false,
	                Sensor_name: false,
	                Sensor_description: false,
	                Sensor_encodingType: false,
	                Sensor_metadata: false,
	                Thing_name: false,
	                Thing_description: false,
	                Thing_properties: false,
	                Thing_HistoricalLocations: false,
	                Thing_Location_name: false,
	                Thing_Location_description: false,
	                Thing_Location_encodingType: false,
	                Thing_Location_location: false
	            };
	            return pm;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: "_initConfigurableData",
	        value: function _initConfigurableData() {
	            this.configurableData = {
	                // View configuration
	                title: {
	                    data: "Plain Data Widget",
	                    type: TYPE_STRING
	                },
	                valueSize: {
	                    data: 160,
	                    type: TYPE_INTEGER
	                },
	                unitSize: {
	                    data: 135,
	                    type: TYPE_INTEGER
	                },
	                unit: {
	                    data: "°C",
	                    type: TYPE_STRING
	                },

	                // Data filter
	                timeIntervalRelative: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                timeIntervalUnit: {
	                    data: UNIT_MONTH,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        second: UNIT_SECOND,
	                        minute: UNIT_MINUTE,
	                        hour: UNIT_HOUR,
	                        day: UNIT_DAY,
	                        month: UNIT_MONTH,
	                        year: UNIT_YEAR
	                    }
	                },
	                timeInterval: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                startTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },
	                endTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },

	                // ST configuration Attention: mulitple Sensors are possible
	                sensorThingsConfiguration: {
	                    data: [{
	                        data: {
	                            dataStreamUrl: {
	                                data: '',
	                                type: TYPE_FUZZY_SENSOR_SEARCH
	                            },
	                            mqttEnabled: {
	                                data: false,
	                                type: TYPE_BOOLEAN
	                            },
	                            mqttUrl: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            mqttBaseTopic: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            updateIntervalMs: {
	                                data: 1000,
	                                type: TYPE_INTEGER
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                }
	            };
	        }

	        /**
	         * DataObserver pushes new data, callback methods from view are executed with new data
	         * @param {object} data
	         *      new data
	         */
	    }, {
	        key: "newData",
	        value: function newData(data) {
	            this.allData = data;
	            for (var k in this.dataCallbacks) {
	                this.dataCallbacks[k](this.allData);
	            }
	        }

	        /**
	         * Registers a callback function from the view
	         * @param {function} dataFunc
	         *      data callback function
	         * @param {function} configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: "registerViewCallback",
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.dataCallbacks.push(dataFunc);
	            this.configCallbacks.push(configFunc);
	            dataFunc(this.allData);
	            configFunc(this.configurableData);
	        }

	        /**
	         * @returns {function} (this:LineGraphWidgetData)
	         */
	    }, {
	        key: "getDataCallback",
	        value: function getDataCallback() {
	            //return this.myNewData;
	            return [this.newData.bind(this)];
	        }

	        /**
	         * Deletes Widget
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	            this.dataCallbacks = [];
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: "getID",
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return QueryParams
	         */
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: "getQueryIDs",
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         */
	    }, {
	        key: "getConfigurableData",
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: "setConfigurableData",
	        value: function setConfigurableData(configurableData) {
	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: "setPosition",
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: "setQueryIDs",
	        value: function setQueryIDs(queryIDs) {
	            this.queryIDs = queryIDs;
	        }
	    }]);

	    return PlainDataWidgetData;
	})();

	exports.PlainDataWidgetData = PlainDataWidgetData;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	var ThermometerWidgetData = (function () {

	    /**
	     * Constructs new ThermometerWidgetData with an ID
	     * @param {string} id
	     *      id
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function ThermometerWidgetData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, ThermometerWidgetData);

	        this.id = id;
	        this.type = WIDGET_TYPE_THERMOMETER;

	        // WidgetView Callback to notify for changed Data
	        this.dataCallbacks = [];
	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // Most recent data
	        this.allData = [];

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuraion
	     * @param {object} args
	     *      the attributes
	     */

	    _createClass(ThermometerWidgetData, [{
	        key: "setAttributes",
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * returns a list of booleans representing, which Data is needed.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            var pm = {
	                DataStream_name: true,
	                DataStream_description: false,
	                DataStream_observationType: false,
	                DataStream_unitOfMeasurement: true,
	                DataStream_observedArea: false,
	                DataStream_phenomenonTime: false,
	                DataStream_resultTime: false,
	                Observation_phenomenonTime: true,
	                Observation_resultTime: false,
	                Observation_result: true,
	                Observation_resultQuality: false,
	                Observation_validTime: false,
	                Observation_parameters: false,
	                FeatureOfInterest_name: false,
	                FeatureOfInterest_description: false,
	                FeatureOfInterest_encodingType: false,
	                FeatureOfInterest_feature: false,
	                ObservedProperty_name: false,
	                ObservedProperty_definition: false,
	                ObservedProperty_description: false,
	                Sensor_name: false,
	                Sensor_description: false,
	                Sensor_encodingType: false,
	                Sensor_metadata: false,
	                Thing_name: false,
	                Thing_description: false,
	                Thing_properties: false,
	                Thing_HistoricalLocations: false,
	                Thing_Location_name: false,
	                Thing_Location_description: false,
	                Thing_Location_encodingType: false,
	                Thing_Location_location: false
	            };
	            return pm;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: "_initConfigurableData",
	        value: function _initConfigurableData() {
	            this.configurableData = {
	                // View configuration
	                title: {
	                    data: 'Thermometer Widget',
	                    type: TYPE_STRING
	                },

	                titleSide: {
	                    data: "",
	                    type: TYPE_STRING
	                },

	                min: {
	                    data: 0,
	                    type: TYPE_NUMBER
	                },
	                max: {
	                    data: 100,
	                    type: TYPE_NUMBER
	                },
	                scaleVisible: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                scaleDecimals: {
	                    data: 2,
	                    type: TYPE_INTEGER
	                },
	                gutterLeft: {
	                    data: 60,
	                    type: TYPE_INTEGER
	                },
	                gutterRight: {
	                    data: 60,
	                    type: TYPE_INTEGER
	                },
	                valueLabel: {
	                    data: false,
	                    type: TYPE_BOOLEAN
	                },

	                // Data filter
	                timeIntervalRelative: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                timeIntervalUnit: {
	                    data: UNIT_MONTH,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        second: UNIT_SECOND,
	                        minute: UNIT_MINUTE,
	                        hour: UNIT_HOUR,
	                        day: UNIT_DAY,
	                        month: UNIT_MONTH,
	                        year: UNIT_YEAR
	                    }
	                },
	                timeInterval: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                startTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },
	                endTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },

	                // ST configuration Attention: mulitple Sensors are possible
	                sensorThingsConfiguration: {
	                    data: [{
	                        data: {
	                            dataStreamUrl: {
	                                data: '',
	                                type: TYPE_FUZZY_SENSOR_SEARCH
	                            },
	                            mqttEnabled: {
	                                data: false,
	                                type: TYPE_BOOLEAN
	                            },
	                            mqttUrl: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            mqttBaseTopic: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            updateIntervalMs: {
	                                data: 1000,
	                                type: TYPE_INTEGER
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                }
	            };
	        }

	        /**
	         * DataObserver pushes new data, callback methods from view are executed with new data
	         * @param {object} data
	         *      new data
	         */
	    }, {
	        key: "newData",
	        value: function newData(data) {
	            this.allData = data;
	            for (var k in this.dataCallbacks) {
	                this.dataCallbacks[k](this.allData);
	            }
	        }

	        /**
	         * Registers a callback function from the view
	         * @param {function} dataFunc
	         *      data callback function
	         * @param {function} configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: "registerViewCallback",
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.dataCallbacks.push(dataFunc);
	            this.configCallbacks.push(configFunc);
	            dataFunc(this.allData);
	            configFunc(this.configurableData);
	        }

	        /**
	         * @returns {function} (this:LineGraphWidgetData)
	         */
	    }, {
	        key: "getDataCallback",
	        value: function getDataCallback() {
	            //return this.myNewData;
	            return [this.newData.bind(this)];
	        }

	        /**
	         * Deletes Widget
	         * This function destroys every observing entity
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	            this.dataCallbacks = [];
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: "getID",
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return QueryParams
	         */
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: "getQueryIDs",
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * Get update interval in ms
	         * @return update interval in ms
	         */
	    }, {
	        key: "getUpdateIntervalMs",
	        value: function getUpdateIntervalMs() {
	            return this.configurableData.updateIntervalMs.data;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         */
	    }, {
	        key: "getConfigurableData",
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: "setConfigurableData",
	        value: function setConfigurableData(configurableData) {
	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: "setPosition",
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: "setQueryIDs",
	        value: function setQueryIDs(queryIDs) {
	            this.queryIDs = queryIDs;
	        }
	    }]);

	    return ThermometerWidgetData;
	})();

	exports.ThermometerWidgetData = ThermometerWidgetData;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ViewViewJs = __webpack_require__(6);

	var _WidgetConfigJs = __webpack_require__(4);

	var TrafficLightWidgetData = (function () {

	    /**
	     * Constructs new TrafficLightWidgetData with an ID
	     * @param {string} id
	     *      id
	     * @param {object} args
	     *      arguments to init configurable data
	     */

	    function TrafficLightWidgetData(id) {
	        var args = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, TrafficLightWidgetData);

	        this.id = id;
	        this.type = WIDGET_TYPE_TRAFFICLIGHT;

	        // WidgetView Callback to notify for changed Data
	        this.dataCallbacks = [];
	        // WidgetView Callback to notify for changed WidgetConfiguration
	        this.configCallbacks = [];

	        // Most recent data
	        this.allData = [];

	        // Init WidgetConfiguration
	        this._initConfigurableData();
	        // set widget Data Attributes
	        this.setAttributes(args);
	        // Get view and widgetConfig
	        this.view = new _ViewViewJs.View();
	        this.widgetConfig = new _WidgetConfigJs.WidgetConfig();
	    }

	    /**
	     * Sets the attributes needed for configuraion
	     * @param {object} args
	     *      the attributes
	     */

	    _createClass(TrafficLightWidgetData, [{
	        key: "setAttributes",
	        value: function setAttributes(args) {
	            this.position = args.position;
	            this.size = args.size;
	        }

	        /**
	         * returns a list of booleans representing, which Data is needed.
	         * @returns {object} the parameterMap
	         */
	    }, {
	        key: "getParameterMap",
	        value: function getParameterMap() {
	            var pm = {
	                DataStream_name: true,
	                DataStream_description: false,
	                DataStream_observationType: false,
	                DataStream_unitOfMeasurement: false,
	                DataStream_observedArea: false,
	                DataStream_phenomenonTime: false,
	                DataStream_resultTime: false,
	                Observation_phenomenonTime: true,
	                Observation_resultTime: false,
	                Observation_result: true,
	                Observation_resultQuality: false,
	                Observation_validTime: false,
	                Observation_parameters: false,
	                FeatureOfInterest_name: false,
	                FeatureOfInterest_description: false,
	                FeatureOfInterest_encodingType: false,
	                FeatureOfInterest_feature: false,
	                ObservedProperty_name: false,
	                ObservedProperty_definition: false,
	                ObservedProperty_description: false,
	                Sensor_name: false,
	                Sensor_description: false,
	                Sensor_encodingType: false,
	                Sensor_metadata: false,
	                Thing_name: false,
	                Thing_description: false,
	                Thing_properties: false,
	                Thing_HistoricalLocations: false,
	                Thing_Location_name: false,
	                Thing_Location_description: false,
	                Thing_Location_encodingType: false,
	                Thing_Location_location: false
	            };
	            return pm;
	        }

	        /**
	         * This function inits every configurable data with their default
	         * @private
	         */
	    }, {
	        key: "_initConfigurableData",
	        value: function _initConfigurableData() {
	            this.configurableData = {
	                // View configuration
	                title: {
	                    data: 'Traffic Light Widget',
	                    type: TYPE_STRING
	                },
	                // Here is a lot of space for more configuration
	                lower: {
	                    data: 33,
	                    type: TYPE_NUMBER
	                },
	                upper: {
	                    data: 67,
	                    type: TYPE_NUMBER
	                },
	                lowerColor: {
	                    data: COLOR_GREEN,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        red: COLOR_RED,
	                        yellow: COLOR_YELLOW,
	                        green: COLOR_GREEN
	                    }
	                },
	                middleColor: {
	                    data: COLOR_YELLOW,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        red: COLOR_RED,
	                        yellow: COLOR_YELLOW,
	                        green: COLOR_GREEN
	                    }
	                },
	                upperColor: {
	                    data: COLOR_RED,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        red: COLOR_RED,
	                        yellow: COLOR_YELLOW,
	                        green: COLOR_GREEN
	                    }
	                },
	                // Data filter
	                timeIntervalRelative: {
	                    data: true,
	                    type: TYPE_BOOLEAN
	                },
	                timeIntervalUnit: {
	                    data: UNIT_MONTH,
	                    type: TYPE_DROPDOWN,
	                    options: {
	                        second: UNIT_SECOND,
	                        minute: UNIT_MINUTE,
	                        hour: UNIT_HOUR,
	                        day: UNIT_DAY,
	                        month: UNIT_MONTH,
	                        year: UNIT_YEAR
	                    }
	                },
	                timeInterval: {
	                    data: 5,
	                    type: TYPE_INTEGER
	                },
	                startTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },
	                endTime: {
	                    data: new Date(),
	                    type: TYPE_DATE
	                },

	                // ST configuration Attention: mulitple Sensors are possible
	                sensorThingsConfiguration: {
	                    data: [{
	                        data: {
	                            dataStreamUrl: {
	                                data: '',
	                                type: TYPE_FUZZY_SENSOR_SEARCH
	                            },
	                            mqttEnabled: {
	                                data: false,
	                                type: TYPE_BOOLEAN
	                            },
	                            mqttUrl: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            mqttBaseTopic: {
	                                data: '',
	                                type: TYPE_STRING
	                            },
	                            updateIntervalMs: {
	                                data: 1000,
	                                type: TYPE_INTEGER
	                            }
	                        },
	                        type: TYPE_OBJECT
	                    }],
	                    type: TYPE_ARRAY
	                }
	            };
	        }

	        /**
	         * DataObserver pushes new data, callback methods from view are executed with new data
	         * @param {object} data
	         *      new data
	         */
	    }, {
	        key: "newData",
	        value: function newData(data) {
	            this.allData = data;
	            for (var k in this.dataCallbacks) {
	                this.dataCallbacks[k](this.allData);
	            }
	        }

	        /**
	         * Registers a callback function from the view
	         * @param {function} dataFunc
	         *      data callback function
	         * @param {function} configFunc
	         *      configuration callback function
	         */
	    }, {
	        key: "registerViewCallback",
	        value: function registerViewCallback(dataFunc, configFunc) {
	            this.dataCallbacks.push(dataFunc);
	            this.configCallbacks.push(configFunc);
	            dataFunc(this.allData);
	            configFunc(this.configurableData);
	        }

	        /**
	         * @returns {function} (this:LineGraphWidgetData)
	         */
	    }, {
	        key: "getDataCallback",
	        value: function getDataCallback() {
	            //return this.myNewData;
	            return [this.newData.bind(this)];
	        }

	        /**
	         * Deletes Widget
	         * This function destroys every observing entity
	         */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.view.removeWidget(this.id);
	            this.dataCallbacks = [];
	        }

	        /**
	         * Getter for ID
	         * @return {string} The ID
	         */
	    }, {
	        key: "getID",
	        value: function getID() {
	            return this.id;
	        }

	        /**
	         * Getter for Type
	         * @return {number} The type
	         */
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this.type;
	        }

	        /**
	         * Getter for position
	         * @return {object} the position with attributes heigth and width
	         */
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }

	        /**
	         * Getter for size
	         * @return {object} The size with attributes x and y
	         */
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.size;
	        }

	        /**
	         * Get Query Params
	         * @return QueryParams
	         */
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            return this.configurableData.sensorThingsConfiguration.data;
	        }

	        /**
	         * Getter for queryIDs
	         * @return {object} The QueryIDs
	         */
	    }, {
	        key: "getQueryIDs",
	        value: function getQueryIDs() {
	            return this.queryIDs;
	        }

	        /**
	         * This function returns a key value map of the data, that is configurable
	         */
	    }, {
	        key: "getConfigurableData",
	        value: function getConfigurableData() {
	            return this.configurableData;
	        }

	        /**
	         * This function sets the configurable data of this WidgetData
	         * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
	         */
	    }, {
	        key: "setConfigurableData",
	        value: function setConfigurableData(configurableData) {
	            this.configurableData = configurableData;
	            for (var k in this.configCallbacks) {
	                this.configCallbacks[k](this.configurableData);
	            }
	            this.widgetConfig.widgetDataChanged(this.id);
	        }

	        /**
	         * Setter for position
	         * @param {object} position The new position, with attributes width and height
	         */
	    }, {
	        key: "setPosition",
	        value: function setPosition(position) {
	            this.position = position;
	        }

	        /**
	         * Setter for size
	         * @param {object} size The new size, with x and y attributes
	         */
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	        }

	        /**
	         * Setter for queryID
	         * @param {object} queryID the new queryID
	         */
	    }, {
	        key: "setQueryIDs",
	        value: function setQueryIDs(queryIDs) {
	            this.queryIDs = queryIDs;
	        }
	    }]);

	    return TrafficLightWidgetData;
	})();

	exports.TrafficLightWidgetData = TrafficLightWidgetData;

/***/ })
/******/ ]);