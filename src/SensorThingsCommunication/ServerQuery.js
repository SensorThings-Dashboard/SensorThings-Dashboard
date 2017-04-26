import {
    STParser
} from './STParser.js';

var logging = false;


/**
 * This class does the actual Communication/Querying to the Server
 *
 */
export class ServerQuery {

    /**
     * runs a Query to the SensorThingsServer
     * @param {string} queryURL the URL
     * @param {parameterMap} parameterMap the parameterMap
     * @param {function} callback Callback function
     * @param {string} obsStart the start date for the request
     * @param {string} obsEnd the end date for the request. If boolean value false, no end date will be set
     */
    createQuery(queryURL, parameterMap, callback, obsStart, obsEnd) {
        if (queryURL.length <= 0 || queryURL == " ") {
            if (logging) console.log("invalid URL");
            callback(null);
            return;
        }
        let containsParams = false;
        if (queryURL != "" && queryURL != null) containsParams = (queryURL.indexOf("?") >= 0);
        let selectors = new STParser().createSelectors(parameterMap, containsParams, obsStart, obsEnd);
        let cb = function(a) {
            if (logging) console.log("decoding", a);
            new STParser().decodeQuery(a, callback);
        };
        this.createDirectQueryPaging(queryURL + selectors, cb);
    }

    /**
     * creates a single Query without appending the selectors, but with pageing
     * @param {string} query the URL to query from
     * @param {function} callback the function to call once completed
     */
    createDirectQueryPaging(query, callback) {
        if (logging) {
            console.log("Querying: ", "'" + query + "'");
        }
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: query,
            timeout: 120000,
            dataType: "json",
            error: function(xhr, status, error) {
                if (window.printAJAXerrors) console.log("AJAX ERROR:", error, status, xhr);
                callback(null);
            },
            success: function(jsonResponse) {
                let result = jsonResponse;
                new STParser().retrieveAdditionalPages(result, callback);
            },
        });
    }

    /**
     * runs a Query to the SensorThingsServer, without paging, without appending the selectors
     * @param {string} query the Query
     * @param {function} callback the function to call once completed
     */
    createDirectQuery(query, callback) {
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
            error: function(xhr, status, error) {
                if (window.printAJAXerrors) console.log("AJAX ERROR:", error, status, xhr);
            },
            success: function(jsonResponse) {
                let result = jsonResponse;
                callback(result);
            }
        });
    }

}