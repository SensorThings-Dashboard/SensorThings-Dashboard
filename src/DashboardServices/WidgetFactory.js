import {
    GaugeWidgetFactory
} from './GaugeWidgetFactory.js';
import {
    LineGraphWidgetFactory
} from './LineGraphWidgetFactory.js';
import {
    MapWidgetFactory
} from './MapWidgetFactory.js';
import {
    PlainDataWidgetFactory
} from './PlainDataWidgetFactory.js';
import {
    PlainTextWidgetFactory
} from './PlainTextWidgetFactory.js';
import {
    ThermometerWidgetFactory
} from './ThermometerWidgetFactory.js';
import {
    TrafficLightWidgetFactory
} from './TrafficLightWidgetFactory.js';
import {
    BarGraphWidgetFactory
} from './BarGraphWidgetFactory.js';

let _gaugeWidgetFactory = null;
let _lineGraphWidgetFactory = null;
let _barGraphWidgetFactory = null;
let _mapWidgetFactory = null;
let _thermometerWidgetFactory = null;
let _plainDataWidgetFactory = null;
let _plainTextWidgetFactory = null;
let _trafficLightWidgetFactory = null;
let _widgetFactory = null;
let _nextWidgetId = null;

//The default template for a widget using the canvas
let _canvasWidgetTemplate = `
        <div id="templateWidget" class="grid-stack-item-content">
        <div class="widget-header">
        <div class="widget-title">
        Widget-Title & Info
</div>
    <button type="button" class="btn btn-danger remove-widget-button" id="removeWidgetButton">X</button>
    </div>
    <canvas id="templateWidgetCanvas" width="350" height="280"></canvas>
    <div class="widget-footer">
    <div class="lastUpdate" id="templateWidgetLastUpdate">
    </div>
    <button class="btn btn-sm btn-default configureWidgetButton" id="configureWidgetButton" aria-label="Settings">
    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
    </button>
    </div>
    </div>`;

/**
 * Responsible for creating widgets
 **/
export class WidgetFactory {
    //Implements singleton
    constructor() {
        if (!_widgetFactory) {
            _widgetFactory = this;
            _nextWidgetId = 0;
            _gaugeWidgetFactory = new GaugeWidgetFactory(this);
            _lineGraphWidgetFactory = new LineGraphWidgetFactory(this);
            _barGraphWidgetFactory = new BarGraphWidgetFactory(this);
            _mapWidgetFactory = new MapWidgetFactory(this);
            _plainDataWidgetFactory = new PlainDataWidgetFactory(this);
            _plainTextWidgetFactory = new PlainTextWidgetFactory(this);
            _thermometerWidgetFactory = new ThermometerWidgetFactory(this);
            _trafficLightWidgetFactory = new TrafficLightWidgetFactory(this);
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
    createWidget(type, callback) {
        //generate the next id
        let id = _nextWidgetId++;
        let html = "";
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
    getCurrentTimePretty() {
        let date = new Date();
        let nums = [date.getHours(), date.getMinutes(), date.getSeconds()];
        for (let i = 0; i < nums.length; i++) {
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
    getTimePretty(date) {
        function elongate(int) {
            return int < 10 ? "0" + int : "" + int;
        }
        let dateString = window.iotlg.dateFormat;

        dateString = dateString.replace('yyyy', date.getFullYear())
            .replace("mm", elongate(date.getMonth() + 1))
            .replace("dd", elongate(date.getDate()))
            .replace("hh", elongate(date.getHours()))
            .replace("MM", elongate(date.getMinutes()))
            .replace("ss", elongate(date.getSeconds()));

        return dateString;
    }
}