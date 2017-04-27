let _parser = null;
let tree = null;

/**
 * Checks the config jsonString and parses it into a tree
 * which can then be used inside our dataModel
 */
export class Parser {
    /**
     * Returns a Parser object, implements singleton
     * @return {Parser} Singleton Parser object
     */
    constructor() {
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
    configLoad(str) {
        let tree = JSON.parse(str);

        for (let k in tree.widgetConfig.widgetDataArray) {
            for (let m in tree.widgetConfig.widgetDataArray[k].configurableData) {
                let temp = null;
                switch (tree.widgetConfig.widgetDataArray[k].configurableData[m].type) {
                    case TYPE_INTEGER: //Find a integer
                        temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
                        tree.widgetConfig.widgetDataArray[k].configurableData[m].data = parseInt(temp);
                        break;

                    case TYPE_BOOLEAN: //Find a boolean
                        temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
                        tree.widgetConfig.widgetDataArray[k].configurableData[m].data = this.makeBoolean(temp);
                        break;

                    case TYPE_ARRAY: //Find a array
                        temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
                        tree.widgetConfig.widgetDataArray[k].configurableData[m].data = temp;
                        break;

                    case TYPE_DATE: //Find a date
                        temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
                        tree.widgetConfig.widgetDataArray[k].configurableData[m].data = new Date(temp);
                        break;

                    case TYPE_DROPDOWN: //Find a dropdown
                        temp = tree.widgetConfig.widgetDataArray[k].configurableData[m].data;
                        tree.widgetConfig.widgetDataArray[k].configurableData[m].data = parseInt(temp);
                        break;

                    case TYPE_NUMBER: //Find a number
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
    makeBoolean(str) {
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
    configStore(data) {
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

        let widgetDataArray = data.getWidgetConfig().getConfigContent();

        for (let i = 0; i < widgetDataArray.length; i++) {
            this._parseQueryWidget(widgetDataArray[i]);
        }
        return JSON.stringify(this.tree);
    }

    /**
     * Parses all String dates in the given userConfig to Date objects.
     * @param userConfig
     */
    parseDates(userConfig) {
        for (let i in userConfig.widgetConfig.widgetDataArray) {
            let widgetData = userConfig.widgetConfig.widgetDataArray[i].configurableData;
            for (let attr in widgetData) {
                if (typeof(widgetData[attr].type) == "number" && widgetData[attr].type == 5) {
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
    _parseQueryWidget(widgetData) {
        let temp = {
            "configurableData": widgetData.configurableData,
            "position": widgetData.position,
            "size": widgetData.size,
            "type": widgetData.type
        };
        this.tree.widgetConfig.widgetDataArray.push(temp);
    }
}
