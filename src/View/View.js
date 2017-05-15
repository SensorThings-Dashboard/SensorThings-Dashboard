import {
    en
} from "./langEn.js";
import {
    UserEvents
} from "../UserEvents/UserEvents.js";
import {
    UserConfigurationView
} from "./UserConfigurationView.js";
import {
    DataQueryObserverProxy
} from "../DataObserver/DataQueryObserverProxy.js";

let _view = null;
let _gridstack = null;
let _userEvents = null;
let _userConfigurationView = null;
let _cf = null;

let logging = false;

/**
 * Creates the dashboard as shown to the user. Handles the actual code for the dashboard, responsible for inserting and removing widgets.
 */
export class View {
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
    constructor(id, transparent, disableConfig, disableImExCMS, disableUpDownload, enableNoDistr, lang, callback) {
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
            _userEvents = new UserEvents();
            _userConfigurationView = new UserConfigurationView();
            new DataQueryObserverProxy();

            $(document).ready(_view._loadDashboardHTML);
        }

        return _view;
    }

    /**
     * Loads the HTML into the div element
     * @private
     */
    _loadDashboardHTML() {
        $("#iot-db").load(window.iotBaseDir + "iotwebdashboard.html", _view._initializeDashboard);
    }

    /**
     * sets up the dashboard once the HTML was loaded into the DOM
     * @private
     **/
    _initializeDashboard() {
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
        let widgetHeight = Math.round($("#" + _cf.id).width() * 0.8 * 60 / 800);
        let options = {
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
        $("#btn-configure").click(function(e) {
            e.preventDefault();
            return _userConfigurationView._toggleConfigure();
        });
        $("#addwidget_dropdown").ready(() => _view._loadDropdownItems());
        $("#conf_close").click(e => _userConfigurationView._toggleConfigure());
        $("#conf_save").click(e => _userConfigurationView._saveConfig());
        $("#conf_upload").click(() => _userConfigurationView._importConfig());
        $("#conf_download").click(e => _userConfigurationView._exportConfig());
        $("#conf_import").click(e => _userConfigurationView._importFromCMS());
        $("#conf_export").click(e => _userConfigurationView._exportToCMS());
        $("#btn-no-distraction").click(function(e) {
            e.preventDefault();
            return _view._toggleDistraction();
        });

        //Watch out for changes
        $("#conf-input-title").on('input', () => _userConfigurationView._setModified(true));

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
            let styleTag = $('<style>.remove-widget-button, .configureWidgetButton { display: none; }</style>');
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
    _setUpLanguage(lang) {
        if (lang === "en" || window[lang] === undefined) {
            window.iotlg = en;
        } else {
            //Set the correct language object
            window.iotlg = window[lang];

            //Fill default values for missing translations
            for (let key in en) {
                if (en.hasOwnProperty(key)) {
                    if (!window.iotlg.hasOwnProperty(key)) {
                        window.iotlg[key] = en[key];
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
    removeWidget(htmlId) {
        htmlId = `#${htmlId}`;
        _view._gridstack.removeWidget($(htmlId).parent());
    }

    /**
     * Adds a new Widget with the provided html to the dashboard
     * at the first free place
     * @param {int} id the html for the widget, saved by gridstack
     * @param {HTML} html the html for the widget
     **/
    addWidget(id, html) {
        // Add Widget to gridstack
        _view._gridstack.addWidget(html, 0, 0, 5, 5, true, null, null, null, null, id);
        //Add resize listener
        $(html).find(".ui-resizable-se").mouseup(e =>
            setTimeout(() => $(e.target.parentElement).find(".rgraph_domtext_wrapper").resize(), 300)
        );
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
    addWidgetAtPosition(id, html, x, y, width, height) {
        if (_view._gridstack === undefined) {
            return;
        }
        // Add Widget to gridstack
        _view._gridstack.addWidget(html, x, y, width, height);

        $(html).find(".ui-resizable-se").mouseup(e =>
            setTimeout(() => $(e.target.parentElement).find(".rgraph_domtext_wrapper").resize(), 300)
        );
        $(html).find(".rgraph_domtext_wrapper").resize();
    }

    /**
     * Get the size and position of a widget in the DOM
     * @param {String} id The id the widget has in the DOM, not the Gridstack Id!
     * @return {Array} [position, size], where position and size are objects with
     * x & y or width & height keys
     */
    getWidgetAttrFromId(id) {
        let result = $(`#${id}`).parent();
        let position = {
            "x": result.attr("data-gs-x"),
            "y": result.attr("data-gs-y")
        };
        let size = {
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
    _setAddWidgetItemOnClick(type) {
        let a = $('a[data-type=' + type + ']');
        a = a[0];
        a.onclick = function(e) {
            _userEvents.addWidget(e.target.getAttribute("data-type"));
        };
    }

    /**
     * Loads widget types into UI dynamically, add click handler
     * @private
     */
    _loadDropdownItems() {
        let menu = $('#addwidget_dropdown_menu')[0];
        let widgetTypes = _view._getWidgetTypes();
        menu.innerHTML = "";
        menu.style.padding = "0px 0";
        for (let index in widgetTypes) {
            let type = widgetTypes[index];
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
    _getDropdownMenuItem(type, name, resName) {
        let li = document.createElement("LI");
        li.classList.add("dropdown-item");
        li.innerHTML = `<a href="#" data-type="${type}">${name}</a>`;
        li.style.backgroundImage = `url('${window.iotBaseDir}res/${resName}.png')`;
        return li;
    }

    /**
     * Returns an Array of identifiers of widgets that are currently loading a new DataStream.
     * @return {Array} The loading widgets
     */
    getLoadingWidgets() {
        if (_view._loadingWidgets == undefined) {
            _view._loadingWidgets = [];
        }
        return _view._loadingWidgets;
    }

    /**
     * Adds the given widget identifier to the list of loading widgets and invokes the "loading" status.
     * @param id new loading widget
     */
    pushLoading(id) {
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
    popLoading(id) {
        if (_view._loadingWidgets == undefined) {
            _view._loadingWidgets = [];
        }
        let i = _view._loadingWidgets.indexOf(id);
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
    setLoading(loading) {
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
    _toggleDistraction() {
        $("#iot-db").toggleClass("no-distract");
        $(".rgraph_domtext_wrapper").resize();
    }


    /**
     * Returns a list of widget types.
     * @private
     * @returns {array} an array of Integers.
     */
     _getWidgetTypes() {
        return [WIDGET_TYPE_BARGRAPH, WIDGET_TYPE_GAUGE, WIDGET_TYPE_LINEGRAPH, WIDGET_TYPE_MAP, WIDGET_TYPE_PLAINDATA, WIDGET_TYPE_PLAINTEXT, WIDGET_TYPE_THERMOMETER, WIDGET_TYPE_TRAFFICLIGHT];
    }
}