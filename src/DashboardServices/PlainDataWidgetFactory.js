import {
    UserEvents
} from "../UserEvents/UserEvents.js";
import {
    View
} from '../View/View.js';

let _plainDataWidgetFactory = null;
let _widgetFactory = null;
let _userEvents = null;

//The default template for a PlainDataWidget
let htmlTemplate = `
        <div id="templateWidget" class="grid-stack-item-content">
        <div class="widget-header">
        <div class="widget-title">
        Widget-Title & Info
</div>
    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>
    </div>
    <div class="widget-footer">
    <div class="lastUpdate" id="templateWidgetLastUpdate">
    </div>
    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">
    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
    </button>
    </div>
    </div>`;

/**
 * PlainData Widgets show a single observation value and its unit.
 */
export class PlainDataWidgetFactory {
    /**
     * returns a plainDataWidgetFactory, implements singleton
     */
    constructor(widgetFactory) {
        if (!_plainDataWidgetFactory) {
            _plainDataWidgetFactory = this;
            _userEvents = new UserEvents();
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
    _formatConfigurableData(configurable) {
        let formattedObject = {};
        for (let key in configurable) {
            if (configurable[key].type == TYPE_ARRAY) {
                formattedObject[key] = {
                    data: configurable[key].data.map(function(d) {
                        for (let k in d.data) {
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
    create(id, callback) {
        let html = $('<div/>').prepend(htmlTemplate);

        $("#templateWidgetCanvas").ready(() => {
            //create the id to be set in html
            let htmlId = "iotdbWidget" + id;
            let htmlIdSelector = `#${htmlId}`;

            //Replace dummy ids with real ones
            html.find("#templateWidget").attr("id", htmlId);
            html.find("#templateWidgetLastUpdate").attr("id", htmlId + "-lastUpdate");

            let textContainer = document.createElement("DIV");
            textContainer.className = "widget-text-container";
            let textElement = document.createElement("SPAN");
            textElement.className = "widget-text-element";
            textElement.id = htmlId + "-textElement";
            textContainer.appendChild(textElement);
            let unitElement = document.createElement("SPAN");
            unitElement.className = "widget-unit-element";
            unitElement.id = htmlId + "-unitElement";
            textContainer.appendChild(unitElement);
            textElement.style.fontSize = "27px";
            unitElement.style.fontSize = "22px";

            let widget = html.find("#" + htmlId)[0];
            widget.insertBefore(textContainer, html.find(".widget-footer")[0]);

            // Set correct language for title
            html.find(htmlIdSelector).find(".widget-title").text(window.iotlg.widgetPlainTextTitle);

            // Set remove callback
            html.find(htmlIdSelector).find("#removeWidgetButton").click(function(e) {
                e.preventDefault();
                _userEvents.removeWidget(htmlId);
            });

            // Set config callback
            html.find(htmlIdSelector).find("#configureWidgetButton").click(function(e) {
                e.preventDefault();
                _userEvents.configureWidget(htmlId);
            });

            //Function to be called when the configuration of this widget changes
            let configUpdate = (config) => {

                // format config properly
                config = this._formatConfigurableData(config);

                $(htmlIdSelector).find(".widget-title").text(config.title.data);
                $(htmlIdSelector).find("#" + htmlId + "-textElement").css("font-size", config.valueSize.data.toString() + "px");
                $(htmlIdSelector).find("#" + htmlId + "-unitElement").css("font-size", config.unitSize.data.toString() + "px");
                $(htmlIdSelector).find("#" + htmlId + "-unitElement").text(config.unit.data);
            };

            //Function to be called when new data arrives
            let dataUpdate = (data) => {
                if (typeof data.Observations !== 'undefined') {
                    let date = new Date();
                    let newValue;
                    let maxTime = 0;
                    for (let k in data.Observations) {
                        if (new Date(data.Observations[k].Observation_phenomenonTime).getTime() > maxTime) {
                            maxTime = new Date(data.Observations[k].Observation_phenomenonTime).getTime();
                            newValue = data.Observations[k].Observation_result;
                        }
                    }
                    $(htmlIdSelector).find(`#${htmlId}-lastUpdate`).text(window.iotlg.widgetLastUpdate + ": " + _widgetFactory.getCurrentTimePretty());
                    $(htmlIdSelector).find(".widget-text-element").text(newValue.toString());
                }

                //id not important but needed in tests
                let _view = new View("id");
                if (_view.getLoadingWidgets().indexOf(htmlId) >= 0) {
                    _view.popLoading(htmlId);
                }
            };

            callback(htmlId, dataUpdate, configUpdate);
        });
        return html;

    }
}