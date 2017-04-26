import {
    STParser
} from './STParser.js';

let mqttServerClients = [];

export class MQTTHandle {

    /**
     * returns or creates the client for the requested Server URL
     * @param serverURL the MQTT URL of the selected server
     * @param onConnected a function to call once connected
     * @returns {Object} the requested client if it exists, null if it had to be created
     * @private
     */
    _getClient(serverURL, onConnected) {
        for (let k in mqttServerClients) {
            if (mqttServerClients[k] != null && mqttServerClients[k].serverURL == serverURL) {
                if (onConnected != null) onConnected(mqttServerClients[k]);
                return mqttServerClients[k];
            }
        }

        let client = mqtt.connect(serverURL);
        let clientObject = {
            client: client,
            serverURL: serverURL,
            registeredTopics: []
        };
        client.on('connect', function() {
            console.log("conected to ", serverURL)
            if (onConnected != null) onConnected(clientObject);
        });
        client.on('message', function(topic, message) {
            let messageStr = new String();
            for (let i = 0; i < message.length; i++) {
                messageStr += String.fromCharCode(message[i]);
            }
            let messageObj = JSON.parse(messageStr);
            let doneFunc = function(decodedMsg) {
                this._getTopic(serverURL, topic).callback(decodedMsg, topic);
            }.bind(this);

            let data = {
                "Observations": [messageObj]
            };

            new STParser().decodeQuery(data, doneFunc);
        }.bind(this));
        mqttServerClients.push(clientObject);
        return null;

    }

    /**
     * returns or creates the topic for the requested Server URL
     * @param {string} serverURL the MQTT URL of the selected server
     * @param {string} topic the requested topic
     * @returns {Object} the Topic Object if the client exists, null if the client had to be created
     * @private
     */
    _getTopic(serverURL, topic) {
        let clientObj = this._getClient(serverURL, null);
        if (clientObj != null) {
            if (clientObj.registeredTopics[topic] == null) {
                clientObj.client.subscribe(topic);
                clientObj.registeredTopics[topic] = {};
            }
            return clientObj.registeredTopics[topic];
        } else {
            return null;
        }
    }

    /**
     * registers a new MQTT Handle to the Server
     *
     * @param {string} url the query-URL, must look like: "<ServerIP>:<WebsocketPort>/mqtt"
     * @param {string} entity the Queried entity, must look like: "v1.0/Datastreams(<DS Number>)/Observations"
     * @param {function} cb a callback to notify about new data
     * @returns {boolean} if the MQTT could be registered synchronously(true) or will be created asynchronously(false)
     */
    registerMQTT(serverUrl, entity, cb) {
        let topic = this._getTopic(serverUrl, entity);
        this.serverURL = serverUrl;
        this.topic = entity;
        if (topic == null) {
            this._getClient(serverUrl, function(client) {
                this._getTopic(serverUrl, entity).callback = cb;
            }.bind(this));
            return false;
        } else {
            topic.callback = cb;
            return true;
        }
    }

    /**
     * deletes the Query again
     */
    unregister() {
        this._getClient(this.serverURL, function(clientObj) {
            clientObj.client.unsubscribe(this.topic);
            if (Object.keys(clientObj.registeredTopics).length <= 0) {
                let i = mqttServerClients.findIndex(function(clObj) {
                    return (clObj.serverURL == this.serverURL);
                });
                clObj.end();
                mqttServerClients.splice(i, 1);
            }
        }.bind(this));
    }
}