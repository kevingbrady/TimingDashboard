/**
 * Created by kgb on 9/14/17.
 */
var React = require('react');
var startHoldover = 0;
var holdover = '';
var startHoldoverTime = 0;
var endHoldoverTime = 0;

var startRecovery = 0;
var recovery = '';
var startRecoveryTime = 0;
var endRecoveryTime = 0;
var classtest = '';

var startGPSUnlock = 0;
var GPSLock = '';

let mostRecentAnnounceMessage;
let data;
let HoldoverTable;
let result;

import { input_code } from '../middleware/input_functions'
import {connect} from "react-redux"

@connect(store => ({

    data: store.message_reducer.AnnounceMessages,

    }
))
export default class Holdover extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.data !== this.props.data);
    }

    render() {

        for(let key in this.props.data) {

            data = this.props.data[key];
            mostRecentAnnounceMessage = {
                'clockidentity': data['clockidentity'],
                'GMClockID': data['GMClockIdentity'],
                'Destination Ethernet': data['ETH_DST'],
                'GMClockClass': data['GMClockClass'],
                'GMClockVariance': data['GMClockVariance'],
                'GMClockAccuracy': data['GMClockAccuracy'],
                'time_traceable': data['timetraceable'],
                'frequency_traceable': data['frequencytraceable'],
                'timesource': input_code(data['timesource'], 'timesource'),
                'sequence_id': data['sequence_id'],
                'timestamp': parseFloat(data['sniff_timestamp']),
                'Holdover': '',
                'Recovery': '',
                'GPSLock': '',

            };

            result = Holdover_Test(startHoldover, startRecovery, mostRecentAnnounceMessage, data['GMClockClass']);
            startHoldover = result[0];
            startRecovery = result[1];
            mostRecentAnnounceMessage = result[2];
            classtest = classTest(data['GMClockClass'], data['GMClockAccuracy'], mostRecentAnnounceMessage);
            mostRecentAnnounceMessage.GMClockClass = input_code(mostRecentAnnounceMessage.GMClockClass, 'clockclass') + ' ( ' + mostRecentAnnounceMessage.GMClockClass + ' ) ' + '  ( ' + classtest + ' ) ';
            mostRecentAnnounceMessage.GMClockAccuracy = input_code(mostRecentAnnounceMessage.GMClockAccuracy, 'clockaccuracy');

            if (parseInt(data['GMClockClass']) !== 6 && startGPSUnlock === 0) {

                startGPSUnlock = mostRecentAnnounceMessage.timestamp;
            }
            else if (parseInt(data['GMClockClass']) !== 6) {

                mostRecentAnnounceMessage.GPSLock = 'The last time GPS was locked was ' + (mostRecentAnnounceMessage.timestamp - startGPSUnlock) + ' seconds ago';
            }
            else {

                startGPSUnlock = 0;
            }

            HoldoverTable = Object.keys(mostRecentAnnounceMessage).map(function (field) {
                mostRecentAnnounceMessage.Holdover = holdover;
                mostRecentAnnounceMessage.Recovery = recovery;
                return (
                    <tr>
                        <td>{field}</td>
                        <td>{mostRecentAnnounceMessage[field]}</td>
                    </tr>
                )

            });
        }
        return (

                <div className="container">
                    <table className="table table-bordered Holdover">
                        <thead>
                        <tr>
                            <th>Holdover Test</th>
                        </tr>
                        </thead>
                        <tbody>
                        { HoldoverTable }
                        </tbody>

                    </table>

                </div>
            )
    }
}

function classTest(clockclass, clockaccuracy, mostRecentAnnounceMessage){

    if(clockclass === 6 && clockaccuracy < 34){

        return('Clock Class switched to ' + clockclass);

    } else {

        if (clockclass === 7 && clockaccuracy <= 34) {

            return ('Clock Class switched to ' + clockclass);

        } else if (clockclass === 52 && clockaccuracy === 35) {

            return ('Clock Class switched to ' + clockclass);

        } else if (clockclass === 187 && clockaccuracy > 35) {

            return ('Clock Class switched to ' + clockclass);
        }

        return ('Clock Class Failed to Switch on Change in Clock Accuracy');

    }
}

function Holdover_Test(startHoldover, startRecovery,  mostRecentAnnounceMessage, classcode){


    if(classcode === 7 && startHoldover === 0) {

                startHoldoverTime = mostRecentAnnounceMessage.timestamp;
                startHoldover = 1;
                holdover = '';

    }

    if(classcode === 52 && startHoldover === 1){

        endHoldoverTime = mostRecentAnnounceMessage.timestamp;
        if((endHoldoverTime - startHoldoverTime) >= 5){

            holdover = 'Clock Stayed Within 250 ns   [ ' +  (endHoldoverTime - startHoldoverTime) + ' seconds ]';
        }
        startHoldover = 0;
    }

    if(classcode === 187 && startRecovery === 0){


        startRecoveryTime = mostRecentAnnounceMessage.timestamp;
        startRecovery = 1;
        recovery = '';
    }

    if(classcode === 6 && startRecovery === 1){

        endRecoveryTime = mostRecentAnnounceMessage.timestamp;
        recovery = 'Recovery Time was  ' + (endRecoveryTime - startRecoveryTime) + ' seconds';
        startRecovery = 0;

    }


    return([startHoldover, startRecovery,  mostRecentAnnounceMessage]);
}