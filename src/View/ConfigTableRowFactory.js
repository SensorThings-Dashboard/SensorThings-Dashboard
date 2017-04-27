import {
    DataModelProxy
} from '../DataModel/DataModelProxy';
import {
    SensorThingsCommunications
} from '../SensorThingsCommunication/SensorThingsCommunications.js';
import {
    Search
} from '../Search/Search.js';

let logging = false;

let _configTableRowFactory = null;
let _dataStreamList = null;
/**
 * Creates rows for individual options of widget configurations.
 * The values of these options can be build of single values, arrays and objects.
 */
export class ConfigTableRowFactory {

    /**
     * Constructor of the widget configuration service, implements singleton
     * @returns {ConfigTableRowFactory} Singleton object
     */
    constructor() {
        if (!_configTableRowFactory) {
            _configTableRowFactory = this;
            this.dataModelProxy = new DataModelProxy();
            this.sensorThingsCommunications = new SensorThingsCommunications();
            this.search = new Search();
        }
        return _configTableRowFactory;
    }

    /**
     * retrieves the list of Datastreams of all registered Servers
     */
    loadDataStreamList() {
        this._dataStreamList = [];
        let servers = this.dataModelProxy.getUserConfig().getDashboardConfig().getServerList();
        let serverID = 0;
        for (let server in servers) {
            if (logging) console.log("Retrieving Datastreams from Server:", servers[server].url);
            let sID = serverID;
            let cb = function(a) {
                this.dataStreamListAvailable(a, sID);
            };
            this.sensorThingsCommunications.getDataStreamList(servers[server].url, cb.bind(this));
            serverID++;
        }
    }

    /**
     * callbackFuction for retrieving all Datastreams
     * @param {Object} list the list of DataStreams of a server
     * @param {integer} serverID the id of the server the Datastreams originate from
     */
    dataStreamListAvailable(list, serverID) {
        if (logging) console.log("Datastreams", list);
        list.forEach(function(e) {
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
    create(key, tree, htmlId) {
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
    _createStringRow(key, value, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
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
    _createIntegerRow(key, value, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
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
    _createDateRow(key, value, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
        $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="date"><input class="widget-config-input" type="datetime-local" value="' + this._dateAddMinutes(value, (-1) * new Date().getTimezoneOffset()).toISOString().substring(0, value.toISOString().length - 2) + '" id="' + htmlId + '"></td>');
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
    _createDropdownRow(key, value, options, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
        let optionsText = "";
        for (let k in options) {
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
    _createNumberRow(key, value, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
        $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' + key + '</td><td class="widget-config-data" input_fmt="number"><input class="widget-config-input" type="number" value="' + value + '" id="' + htmlId + '"></td>');
        return tr;
    }

    /**
     * Click handler for the Search
     * @param e
     * @private
     */
    _selectedResult(e) {
        let target = $(e.target).filter("li");
        if (target.length <= 0) {
            target = $(e.target).parent().filter("li");
            if (target.length <= 0) {
                target = $(e.target).parent().parent().filter("li");
            }
        }
        let keyID = $(target).attr("key-id");
        let serverID = $(target).attr("server-id");
        let tbody = $(target).parent().parent().parent().parent().parent();
        $(tbody).find(".searcher").val("");
        $(tbody).find(".list").html("");
        $(tbody).find(".urlBox").val(this._dataStreamList.find(function(e) {
            return ((e["@iot.id"] == keyID) && (e["server-id"] == serverID));
        })["@iot.selfLink"]);
    }

    /**
     * callback for change of the search-field
     * updates the search results
     * @param evt
     * @private
     */
    _refreshSearchResults(evt) {
        var output = [];
        let tr = $(evt.target).parent().parent().parent().parent().parent().parent();
        let list = $(tr).find(".list");
        let searcher = $(tr).find(".searcher");

        //applySearch
        let searchResult = this.search.search(this._dataStreamList, $(searcher).val(), false);

        for (let k in searchResult) {
            let name = searchResult[k].name;
            let description = searchResult[k].description;

            let observationType = searchResult[k].observationType;
            let phenomenonTime = searchResult[k].phenomenonTime;
            if (searchResult[k].unitOfMeasurement != null) {
                let unitOfMeasurementDefinition = searchResult[k].unitOfMeasurement.definition;
                let unitOfMeasurementName = searchResult[k].unitOfMeasurement.name;
                let unitOfMeasurementSymbol = searchResult[k].unitOfMeasurement.symbol;
            }
            let id = searchResult[k]["@iot.id"];
            let serverID = searchResult[k]["server-id"];
            let url = searchResult[k]["@iot.selfLink"];

            output.push('<li class="list-group-item serverSelector" key-id=' + id + ' server-id=' + serverID + '><h3><p class="label label-default search-label">' + name + "</p></h3><h6>" + description + '</h6></li>');
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
    _createFSSearchRow(key, value, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
        $(tr).html('<td class="widget-conf-label" key-id="' + key + '" title="' + window.iotlg[key + "_Tooltip"] + '">' +
            key +
            '</td>' +
            '<td class="widget-config-data" input_fmt="fssearch">' +
            '<table class="fssearchTable">' +
            '<tbody class="fssearchTBody">' +
            '<tr>' +
            '<td class="well">' +
            '<div class="url-box-wrapper" style="white-space: nowrap"><label class="search-box-label">' +
            ' URL:' +
            '</label>' +
            '<input class="urlBox form-control" type="url" name="url" placeholder="plain URL to' +
            ' datastream"' +
            ' value="' + value + '">' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '<tr class="searchFormTableRow">' +
            '<td class="well">' +
            '<div class="url-box-wrapper">' +
            '<label class="search-box-label">Search:</label>' +
            '<input type="search" class="searcher form-control" value="" placeholder="search datastreams for URL">' + '</div>' +
            '<div class="list search-result-list">' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '</td>');


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
    _createColorRow(key, value, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
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
    _createCheckboxRow(key, value, htmlId) {
        let tr = $("<tr class='widget-config-item'></tr>");
        let checked = value == true ? " checked" : "";
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
    _createSimpleRow(key, value, type, htmlId) {
        let tr = $("<tr></tr>");
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
    _createArrayRow(key, data, htmlId) {
        let tr = $("<tr class='widget-config-array-input'></tr>");
        $(tr).html("<td ><div class='conf-array-title-row'><span class='widget-conf-label' key-id='" + key + "'>" + key + "</span> <button class='add-entry-button'>Add <span class='entry-counter badge'>" + data.length + "</span></button></div></td>");
        let table = $("<table></table>");
        let td = $(tr).find("td");
        $(td).attr("colspan", 2);
        $(td).append(table);

        $(table).html("<tbody class='widget-config-array-table'></tbody>");
        let tbody = $(table).find(".widget-config-array-table");

        for (let i in data) {
            let obj = _configTableRowFactory.create(i, data[i], htmlId + "-" + i);
            $(tbody).append(obj);
        }

        $(tbody).children().append(_configTableRowFactory._getRemoveButton());
        $(tr).find(".add-entry-button").off("click");
        $(tr).find(".add-entry-button").on("click", function(e) {
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
    _createObjectRow(key, data, htmlId) {
        let tr = $("<tr class='widget-config-object-input'></tr>");
        $(tr).html("<td class='widget-conf-label' key-id='" + key + "'>" + key + "</td>");
        let td_table = $("<td></td>");
        let table = $("<table></table>");
        $(td_table).append(table);
        $(tr).append(td_table);
        $(table).html("<tbody class='widget-config-object-table'>");
        let tbody = $(table).find(".widget-config-object-table");
        for (let k in data) {
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
    _dateAddMinutes(date, offset) {
        return new Date(date.getTime() + offset * 1000 * 60);
    }

    /**
     * Callback for the add button. Adds a new Entry to a table
     * @param tr
     * @returns the HTML
     * @private
     */
    _addEntry(tr) {
        let table = $(tr).children().children().children().filter("tbody");
        let count = $(table).children().filter(".widget-config-object-input").length;
        $(table).append($(table).children().filter(".widget-config-object-input").last().clone());
        $(table).children().filter(".widget-config-object-input").last().children().filter(".widget-conf-label").text(count);
        $(table).children().filter(".widget-config-object-input").last().children().filter(".widget-conf-label").attr("key-id", count);
        $(table).find(".tr-delete.close").off("click");
        $(table).find(".tr-delete.close").on("click", function(e) {
            _configTableRowFactory._removeEntry(e);
            return true;
        });
        count++;
        $(table).parent().parent().children().filter("div").children().filter("button").children().filter(".entry-counter").text(count);
        $(table).find(".add-entry-button").off("click");
        $(table).find(".add-entry-button").on("click", function(e) {
            _configTableRowFactory._addEntry($(e.target).parent().parent().find("button").parent().parent().parent());
            return true;
        });


        $(table).find(".searcher").off("keyup");
        $(table).find(".searcher").on("keyup", this._refreshSearchResults.bind(this));
        let list = $(table).find(".list");
        $(list).find(".serverSelector").off("click");
        $(list).find(".serverSelector").on("click", this._selectedResult.bind(this));
    }

    /**
     * Callback for the remove button. Removes an Entry from a table
     * @param e
     * @returns the HTML
     * @private
     */
    _removeEntry(e) {
        let table = $(e.target).parent().parent().parent();
        let count = $(table).children().filter(".widget-config-object-input").length;
        if (count <= 1) {
            alert("Cannot delete last Array Object!");
            return;
        }
        $(e.target).parent().parent().remove();
        $(table).parent().parent().children().filter("div").children().filter("button").children().filter(".entry-counter").text(count - 1);
        for (let i = 0; i < count; i++) {
            table.children().filter(".widget-config-object-input").eq(i).children().filter(".widget-conf-label").text(i);
            table.children().filter(".widget-config-object-input").eq(i).children().filter(".widget-conf-label").attr("key-id", i);
        }
    }

    /**
     * creates a remove button
     * @returns the HTML
     * @private
     */
    _getRemoveButton() {
        let tr_span = $("<td></td>");
        let span = $("<span class='tr-delete close'>x</span>");
        $(span).off("click");
        $(span).on("click", function(e) {
            _configTableRowFactory._removeEntry(e);
            return true;
        });
        $(tr_span).append(span);
        return tr_span;
    }
}