import Mocha, {
    describe,
    it
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import {
    Parser
} from '../../src/Parser/Parser.js';

describe('Class Parser: Assistance method tests: ', () => {
    it('Parser constructor works', function(done)  {
        let parser = new Parser();
        expect(parser).to.be.instanceof(Object);
        done();
    });

    it('singleton construct', function(done)  {
        let parser1 = new Parser();
        let parser2 = new Parser();
        expect(parser1).to.eql(parser2);
        done();
    });

    it('makeBoolean check', function(done) {
        let parser = new Parser();
        expect(parser.makeBoolean("true")).equal(true);
        done();
    });
});

describe('Class Parser: Main functionality tests: ', () => {
    global.TYPE_COLOR = 0;
    global.TYPE_STRING = 1;
    global.TYPE_INTEGER = 2;
    global.TYPE_BOOLEAN = 3;
    global.TYPE_ARRAY = 4;
    global.TYPE_DATE = 5;
    global.TYPE_DROPDOWN = 6;
    global.TYPE_NUMBER = 7;
    global.TYPE_FUZZY_SENSOR_SEARCH = 8;
    global.TYPE_OBJECT = 9;
    global.TYPE_OTHER = 10;
    let parser = new Parser();
    let userConfigObj = {
      "dashboardConfig":{
        "serverList":[{
          "name":"Standard","url":"http://35.162.114.82:8080/SensorThingsServer-1.0/v1.0/"
        }],
        "title":"Auch hier hat jemand geschrieben"
      },
      "widgetConfig":{
        "widgetDataArray":[{
          "configurableData":{
            "title":{"data":"Der Titel wurde geändert","type":1},
            "min":{"data":0,"type":7},
            "max":{"data":100,"type":7},
            "shadow":{"data":true,"type":3},
            "textColor":{"data":"#000000","type":0},
            "tickmarksBigColor":{"data":"#000055","type":0},
            "tickmarksMediumColor":{"data":"#000033","type":0},
            "tickmarksSmallColor":{"data":"#000000","type":0},
            "backgroundColor":{"data":"#ffffff","type":0},
            "borderInnerColor":{"data":"#ffffff","type":0},
            "borderOuterColor":{"data":"#eeeeee","type":0},
            "borderOutlineColor":{"data":"#bbbbbb","type":0},
            "needleColor":{"data":"#ff0000","type":0},
            "needleType":{"data":"line","type":1},
            "needleTail":{"data":true,"type":3},
            "centerpinRadius":{"data":7,"type":7},
            "titleTop":{"data":"","type":1},
            "titleTopSize":{"data":15,"type":2},
            "titleTopColor":{"data":"#000000","type":0},
            "titleBottom":{"data":"","type":1},
            "titleBottomColor":{"data":"#000000","type":0},
            "titleBottomSize":{"data":12,"type":2},
            "labelsCentered":{"data":true,"type":3},
            "labelsOffset":{"data":7,"type":2},
            "textAccessible":{"data":true,"type":3},
            "colorsRanges":{"data":[{
              "data":{
                "lower":{"data":60,"type":7,"options":null},
                "upper":{"data":80,"type":7,"options":null},
                "color":{"data":"#ffff00","type":0,"options":null}},
                "type":9,"options":null},{
              "data":{
                "lower":{"data":80,"type":7,"options":null},
                "upper":{"data":100,"type":7,"options":null},
                "color":{"data":"#ff0000","type":0,"options":null}},
                "type":9,"options":null}],"type":4},
            "timeIntervalRelative":{"data":true,"type":3},
            "timeIntervalUnit":{
              "data":5,"type":6,
              "options":{"second":1,"minute":2,"hour":3,"day":4,"month":5,"year":6}
            },
            "timeInterval":{"data":5,"type":2},
            "startTime":{"data":"2017-04-04T09:14:44.600Z","type":5},
            "endTime":{"data":"2017-04-05T09:14:44.600Z","type":5},
            "sensorThingsConfiguration":{"data":[{
              "data":{
                "dataStreamUrl":{"data":"","type":8,"options":null},
                "mqttEnabled":{"data":false,"type":3,"options":null},
                "mqttUrl":{"data":"","type":1,"options":null},
                "mqttBaseTopic":{"data":"","type":1,"options":null},
                "updateIntervalMs":{"data":1000,"type":2,"options":null}},
                "type":9,"options":null
              }],
              "type":4
            }
          },
          "position":{"x":"0","y":"0"},
          "size":{"width":"5","height":"5"},"type":2
        }]
      }
    };
    for (let k in userConfigObj.widgetConfig.widgetDataArray) {
        for (let m in userConfigObj.widgetConfig.widgetDataArray[k].configurableData) {
            let temp = null;
            switch (userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].type) {
                case TYPE_INTEGER: //Find a integer
                    temp = userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data;
                    userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data = parseInt(temp);
                    break;

                case TYPE_BOOLEAN: //Find a boolean
                    temp = userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data;
                    userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data = temp;
                    break;

                case TYPE_ARRAY: //Find a array
                    temp = userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data;
                    userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data = temp;
                    break;

                case TYPE_DATE: //Find a date
                    temp = userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data;
                    userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data = new Date(temp);
                    break;

                case TYPE_DROPDOWN: //Find a dropdown
                    temp = userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data;
                    userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data = parseInt(temp);
                    break;

                case TYPE_NUMBER: //Find a number
                    temp = userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data;
                    userConfigObj.widgetConfig.widgetDataArray[k].configurableData[m].data = parseFloat(temp);
                    break;

                default:
                    break;
            }
        }
    }
    let userConfigStr = JSON.stringify(userConfigObj);

    it('Basic configLoad test', function(done) {
      expect(parser.configLoad(userConfigStr)).to.be.instanceof(Object);
      done();
    });

    it('Further configLoad test (section DeashboardConfig I)', function(done) {
      let testObj = parser.configLoad(userConfigStr);
      expect(testObj.dashboardConfig.serverList[0].name).equal(userConfigObj.dashboardConfig.serverList[0].name);
      done();
    });

    it('Further configLoad test (section DeashboardConfig II)', function(done) {
      let testObj = parser.configLoad(userConfigStr);
      expect(testObj.dashboardConfig.serverList[0].url).equal(userConfigObj.dashboardConfig.serverList[0].url);
      done();
    });

    it('Further configLoad test (section DeashboardConfig III)', function(done) {
      let testObj = parser.configLoad(userConfigStr);
      expect(testObj.dashboardConfig.title).equal(userConfigObj.dashboardConfig.title);
      done();
    });

    it('Further configLoad test (section WidgetConfig I)', function(done) {
      let testObj = parser.configLoad(userConfigStr);
      expect(testObj.widgetConfig.widgetDataArray).to.eql(userConfigObj.widgetConfig.widgetDataArray);
      done();
    });

    it('Further configLoad test (all)', function(done) {
      let testObj = parser.configLoad(userConfigStr);
      expect(testObj).to.eql(userConfigObj);
      done();
    });
});

describe('Class Parser: ParseDates test environment: ', () => {
  let userConfigObj = {
    "dashboardConfig":{
      "serverList":[{
        "name":"Standard","url":"http://35.162.114.82:8080/SensorThingsServer-1.0/v1.0/"
      }],
      "title":"Auch hier hat jemand geschrieben"
    },
    "widgetConfig":{
      "widgetDataArray":[{
        "configurableData":{
          "timeInterval":{"data":5,"type":2},
          "startTime":{"data":"2017-04-04T09:14:44.600Z","type":5},
          "endTime":{"data":"2017-04-05T09:14:44.600Z","type":5},
          "type":4
        },
        "position":{"x":"0","y":"0"},
        "size":{"width":"5","height":"5"},"type":2
      }]
    }
  };

  it('parseDates test', function(done)  {
      let parser = new Parser();
      let testObj = parser.parseDates(userConfigObj);
      expect(testObj.widgetConfig.widgetDataArray[0].configurableData.startTime.data).to.be.instanceof(Date);
      done();
  });
});
