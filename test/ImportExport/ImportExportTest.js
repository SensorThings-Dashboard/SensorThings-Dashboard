import Mocha, {
    describe,
    it
} from 'mocha';
import Chai, {
    expect
} from 'chai';
import {
    ImportExport
} from '../../src/ImportExport/ImportExport.js';
import {
    View
} from '../../src/View/View.js';
import Jsdom from 'mocha-jsdom';


/**
 * This one will test the ImportExport Class
 * @param string
 *      The displayed name of this test suite
 */
describe('Class ImportExport: Basic tests: ', () => {
    let _view = null;
    let $ = null;
    let L = null;
    Jsdom();

    let userConfigObj = {
      "dashboardConfig":{
        "serverList":[{
          "name":"Standard","url":"http://35.162.114.82:8080/SensorThingsServer-1.0/v1.0/"
        }],
        "title":"Auch hier hat jemand geschrieben"
      },
      "widgetConfig":{
        "widgetDataArray":[],
          "datastreamFunctions": []
      }
    };
    let userConfigStr = JSON.stringify(userConfigObj);

    // first initialization of view
    before(function(done) {
        // init window and jquery globaly
        global.$ = global.jQuery = require('jquery');
        $ = require('jquery');
        global.L = require('leaflet');
        new View("test")._setUpLanguage();
        $(document).on;
        done();
    });

    it('constructor works', function(done)  {
        let importExport = new ImportExport();
        expect(importExport).to.be.instanceof(Object);
        done();
    });

    it('configFileImport test', function(done) {
      let importExport = new ImportExport();
      let result = importExport.configFileImport(userConfigStr);
      expect(result).to.eql(userConfigObj);
      done();
    });

    it('configFileExport test', function(done) {
      let importExport = new ImportExport();
      let test = importExport.configFileExport();

      expect(test).to.be.a('string');
      done();
    });

    it('getCurrentDateTest', function(done) {
      let importExport = new ImportExport();
      let test = importExport._getCurrentDate();
      expect(test).to.be.a('string');
      done();
    });

    it('getCurrentDateTest2', function(done) {
      let importExport = new ImportExport();
      let test = importExport._getCurrentDate();
      expect(test).to.have.length(13);
      done();
    });
});
