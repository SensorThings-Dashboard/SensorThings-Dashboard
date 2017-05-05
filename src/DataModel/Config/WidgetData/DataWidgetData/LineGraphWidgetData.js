import {
    View
} from "../../../../View/View.js";
import {
    WidgetConfig
} from "../../WidgetConfig.js";

let logging = false;

/**
 * LineGraphWidgetData is the datamodel of a line graph widget
 */
export class LineGraphWidgetData {

    /**
     * Constructs new LineGraphWidgetData with an ID
     * @param {string} id
     *      id
     * @param {object} args
     *      arguments to init configurable data
     */
    constructor(id, args = {}) {
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
        this.view = new View();
        this.widgetConfig = new WidgetConfig();
    }

    /**
     * Sets the attributes needed for configuraion
     * @param {object} args
     *      the attributes
     */
    setAttributes(args) {
        this.position = args.position;
        this.size = args.size;
    }

    /**
     * This function inits every configurable data with their default
     * @private
     */
    _initConfigurableData()  {
        let nextHourTime = new Date();
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
        }
    }

    /**
     * returns a list of booleans representing, which Data is needed.
     * @returns {object} the parameterMap
     */
    getParameterMap() {
        let pm = {
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
            Thing_Location_location: false,
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
    newData(data) {
        this.allData[0] = data;
        for (let k in this.dataCallbacks) {
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
    registerViewCallback(dataFunc, configFunc) {
        this.dataCallbacks.push(dataFunc);
        this.configCallbacks.push(configFunc);
        configFunc(this.configurableData);
        dataFunc(this.allData);
    }

    /**
     * @returns {function} (this:LineGraphWidgetData)}
     */
    getDataCallback() {
        return this.dataObserverCallbacks;
    }

    /**
     * Deletes Widget
     * This function destroys every observing entity
     */
    destroy() {
        this.view.removeWidget(this.id);
        this.dataCallbacks = [];
    }

    /**
     * Getter for ID
     * @return {string} The ID
     */
    getID() {
        return this.id;
    }

    /**
     * Getter for Type
     * @return {number} The type
     */
    getType() {
        return this.type;
    }

    /**
     * Getter for position
     * @return {object} the position with attributes heigth and width
     */
    getPosition() {
        return this.position;
    }

    /**
     * Getter for size
     * @return {object} The size with attributes x and y
     */
    getSize() {
        return this.size;
    }

    /**
     * Get Query Params
     * @return QueryParams
     */
    getQueryParams() {
        return this.configurableData.sensorThingsConfiguration.data;
    }

    /**
     * Getter for queryIDs
     * @return {object} The QueryIDs
     */
    getQueryIDs() {
        return this.queryIDs;
    }

    /**
     * This function returns a key value map of the data, that is configurable
     */
    getConfigurableData() {
        return this.configurableData;
    }

    /**
     * This function sets the configurable data of this WidgetData
     * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
     */
    setConfigurableData(configurableData) {
        this._buildDataCallbacks(configurableData.sensorThingsConfiguration.data);

        this.configurableData = configurableData;
        for (let k in this.configCallbacks) {
            this.configCallbacks[k](this.configurableData);
        }
        this.widgetConfig.widgetDataChanged(this.id);
    }

    /**
     * Setter for position
     * @param {object} position The new position, with attributes width and height
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * Setter for size
     * @param {object} size The new size, with x and y attributes
     */
    setSize(size) {
        this.size = size;
    }

    /**
     * Setter for queryID
     * @param {object} queryID the new queryID
     */
    setQueryIDs(queryIDs) {
        this.queryIDs = queryIDs;
    }

    /**
     * @private
     */
    _buildDataCallbacks(sensorThingsConfiguration) {
        // clear data array
        this.allData = [];
        this.dataObserverCallbacks = [];

        let n = 0;
        //Add callback for each dataStreamUrl
        for (let stconfig in sensorThingsConfiguration) {
            // creat callback for dataStreamUrl
            this.allData.push([]);
            let pos = n;
            this.dataObserverCallbacks.push(function(data) {
                if (logging && data != null && data.Observations != null && data.Observations.length > 0) console.log("pushing data:", data, pos);
                this.allData[pos] = data;
                for (let k in this.dataCallbacks) {
                    this.dataCallbacks[k](this.allData);
                }
            }.bind(this));
            n++;
        }
        if (logging) console.log("Build " + n + " DataCallbacks");
    }
}