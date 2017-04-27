let _search = null;

/**
 * In charge of the fuzzy Search on all the datastreams
 */
export class Search {

    /**
     * Return a search object, implements Singleton.
     * @returns {Search} Singleton search object.
     */
    constructor() {
        if (!_search) {
            _search = this;
            this.a = null;
        }
        return _search;
    }

    /**
     * method executes the search across the datastreams
     * @param {Datastreams} a  Array of DataStreams
     * @param {String} searchTerm search term
     * @param {Boolean} onlyUnit only Unit; default = false
     */
    search(a, searchTerm, onlyUnit) {
        if (onlyUnit) {
            this.onlyUnit = onlyUnit;
        } else {
            this.onlyUnit = false;
        }

        let res = [];

        if (!((a instanceof Array) || (searchTerm instanceof String))) {
            return res;
        }

        if (a != undefined) {
            for (let k = 0; k < a.length; k++) {
                if (_search.fuzzySearch(a[k].description, searchTerm) && !onlyUnit) {
                    res.push(a[k]);
                } else if (_search.fuzzySearch(a[k].name, searchTerm) && !onlyUnit) {
                    res.push(a[k]);
                } else if (_search.fuzzySearch(a[k].unitOfMeasurement.name, searchTerm)) {
                    res.push(a[k]);
                } else if (_search.fuzzySearch(a[k].unitOfMeasurement.symbol, searchTerm)) {
                    res.push(a[k]);
                }
            }
        }
        return res;
    }

    /**
     * method executes a atomic search request
     * true = a modification of param search was found in param str
     * false = else
     * @param {String} str - context
     * @param {String} search - search term
     * @returns {boolean} True if a match for the search term was found, false else
     */
    fuzzySearch(str, search) {
        if (!search || !str) {
            return false;
        }
        let hay = str.toLowerCase(),
            i = 0,
            n = -1,
            l;
        search = search.toLowerCase();
        for (; l = search[i++];)
            if (!~(n = hay.indexOf(l, n + 1))) return false;
        return true;
    };
}