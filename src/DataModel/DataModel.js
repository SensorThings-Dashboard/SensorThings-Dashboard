import {
    UserConfig
} from './Config/UserConfig.js';
import {
    DashboardConfig
} from './Config/DashboardConfig.js';

let _dataModel = null;

/**
 * Implements the essential/central class of the whole DataModel
 */
export class DataModel {
    /**
     * Implementation of Singleton-Construction
     */
    constructor() {
        if (!_dataModel) {
            _dataModel = this;
            this._userConfig = new UserConfig();
            this._dashboardConfig = new DashboardConfig();
            this._observers = [];
        }
        return _dataModel;
    }

    /**
     * Adds an observer to the list of observers. When new data comes in
     * the observer is then notified by calling its notify() method
     * @param observer the object that should be notified when new Data comes in
     * @returns {DataModel} the updated DataModel
     */
    observe(observer) {
        this._observers.push(observer);
        return this;
    }

    /**
     * Notifies all observers
     * @private
     */
    _notify() {
        for (let observer in this._observers) {
            observer.notify();
        }
    }

    /**
     * Getter for UserConfig
     * @return {UserConfig} the currently loaded userConfig
     */
    getUserConfig() {
        return this._userConfig;
    }

    /**
     * Setter for UserConfig
     * @param {Object} userConfig new UserConfig
     */
    setUserConfig(userConfig) {
        this._userConfig = userConfig;
    }
}