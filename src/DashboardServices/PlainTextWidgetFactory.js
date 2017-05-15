import {
    UserEvents
} from "../UserEvents/UserEvents.js";

let _plainTextWidgetFactory = null;
let _userEvents = null;

//The default template for a widget using the canvas
let htmlTemplate = `
        <div id="templateWidget" class="grid-stack-item-content">
        <div class="widget-header">
        <div class="widget-title">
        Widget-Title & Info
</div>
    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>
    </div>
    <div class="widget-footer">
    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">
    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
    </button>
    </div>
    </div>`;
/**
 * Plaintext Widgets display static text and are not updated by any Servers.
 */
export class PlainTextWidgetFactory {
    //Implements singleton
    constructor(widgetFactory) {
        if (!_plainTextWidgetFactory) {
            _plainTextWidgetFactory = this;
            _userEvents = new UserEvents();
        }
        return _plainTextWidgetFactory;
    }

    /**
     * This will return a properly formated Object, that return a propper array at config.key.value
     * Arrays will be real array containing their data
     * @param configurable Data that should be formated
     * @return formated data
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

        //create the id to be set in html
        let htmlId = "iotdbWidget" + id;
        let htmlIdSelector = `#${htmlId}`;

        //When html of widget is loaded, set up template in canvas
        $("#templateWidgetCanvas").ready(() => {

            //Replace dummy ids with real ones
            html.find("#templateWidget").attr("id", htmlId);

            let textContainer = document.createElement("DIV");
            textContainer.className = "widget-text-container";
            let textElement = document.createElement("SPAN");
            textElement.className = "widget-text-element";
            textElement.id = htmlId + "-textElement";
            textContainer.appendChild(textElement);
            textElement.innerText = window.iotlg.textWidgetDefaultText;
            textContainer.style.fontSize = "27px";

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

            let configUpdate = (config) => {

                // format config properly
                config = this._formatConfigurableData(config);

                $(htmlIdSelector).find(".widget-text-element").text(config.text.data);
                $(htmlIdSelector).find(".widget-title").text(config.title.data);
                $(htmlIdSelector).find(".widget-text-element").css("font-size", config.fontSize.data.toString() + "px");
            };

            callback(htmlId, null, configUpdate);
        });
        return html;

    }
}