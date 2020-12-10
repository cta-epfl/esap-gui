import React, {useState }  from 'react';

import { getVOTableAsJSON } from './ReactVOTable'
import SampGrid from './SampGrid'

export default function SampPage(props) {
    const [ myVOTable, setMyVOTable] = useState([]);

    const pingFunc = function (my_connection) {
        my_connection.notifyAll([new window.samp.Message("samp.app.ping", {})])
    }

    const register = () => {
        connector.register()
    }
    const unregister = () => {
        connector.unregister()
    }

    const handlePingClick = () => {
        connector.runWithConnection(pingFunc)
    }

    const handlePing = (cc, senderId, message, isCall) => {
        alert('handle samp.app.ping')
        if (isCall) {
            return {text: "ping to you, " + cc.getName(senderId)};
        }
    }

    const handleLoadVOTable = (cc, senderId, message, isCall) => {
        // alert('handle table.load.votable')
        var params = message["samp.params"];
        var origUrl = params["url"];
        var proxyUrl = cc.connection.translateUrl(origUrl);
        var xhr = window.samp.XmlRpcClient.createXHR();
        var e;

        xhr.open("GET", proxyUrl);
        xhr.onload = function() {
            var xml = xhr.responseXML;
            if (xml) {
                try {
                    let tableId = params["table-id"];
                    //alert(tableId)

                    // parse the VO Table in xml format
                    let results = getVOTableAsJSON(xml)

                    // assume a single resource and a single table for now
                    let table= results.resources[0].tables[0]

                    // add fieldnames and data to the state hook
                    // this will trigger a render of this component
                    setMyVOTable(table)
                }
                catch (e) {
                    alert("Error displaying table:\n" +
                        e.toString());
                }
            }
            else {
                alert("No XML response");
            }
        };
        xhr.onerror = function(err) {
            alert("Error getting table " + origUrl + "\n" +
                "(" + err + ")");
        };
        xhr.send(null);
    }

    var cc = new window.samp.ClientTracker();

    // attach eventhandlers
    var callHandler = cc.callHandler;

    callHandler["samp.app.ping"] = function(senderId, message, isCall) {
        handlePing(cc,senderId, message, isCall)
    };

    callHandler["table.load.votable"] = function(senderId, message, isCall) {
        handleLoadVOTable(cc,senderId, message, isCall)
    };


    var subs = cc.calculateSubscriptions();

    // initialize the connector
    var connector = new window.samp.Connector("astroview", {"samp.name": "AstroView"}, cc, subs)

    // only render when myVOTable has a value
    var renderSampGrid
    let fieldnames = myVOTable['fieldnames']
    if (fieldnames!==undefined) {
        renderSampGrid = <SampGrid fieldnames={fieldnames} votable_in_json={myVOTable}/>
    }

    return (
        <div className="App">
            <div>
                <h2>SAMP demo</h2>
                <p>Start a SAMP enabled application (like Topcat), register to the hub and transmit data from Topcat.</p>
                <button variant="outline-warning" onClick={() => register()}>register</button>&nbsp;
                <button variant="outline-success" onClick={() => handlePingClick()}>SAMP Ping</button>&nbsp;
                <button variant="outline-warning" onClick={() => unregister()}>unregister</button>&nbsp;

                {renderSampGrid}
            </div>
        </div>
    );
}