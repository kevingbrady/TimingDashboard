/**
 * Created by kgb on 9/14/17.
 */

var React = require('react');

import { input_code } from '../middleware/input_functions';
import {connect} from "react-redux"

let LeapSecondTable;
let mostRecentAnnounceMessage;

@connect(store => ({

    data: store.message_reducer.AnnounceMessages,

    }

))
export default class LeapSecond extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.data !== this.props.data);
    }

    render() {

        for(let key in this.props.data) {

            let data = this.props.data[key];
            mostRecentAnnounceMessage = {
                clockidentity: data['clockidentity'],
                ETH_DST: data['ETH_DST'],
                utcoffset: data['utc_offset'],
                origintimestampseconds: parseFloat(data['origintimestampseconds']),
                utcreasonable: data['utcreasonable'],
                li_59: parseInt(data['li59']),
                li_61: parseInt(data['li61']),
                timesource: input_code(data['timesource'], 'timesource'),
                sequence_id: data['sequence_id'],
                timestamp: data['sniff_timestamp'],
                action: '',
            };

            if (mostRecentAnnounceMessage.li_59 === 1) {

                mostRecentAnnounceMessage.action = 'Negative Leap Second';

            } else if (mostRecentAnnounceMessage.li_61 === 1) {

                mostRecentAnnounceMessage.action = "Positive Leap Second";


            } else {

                mostRecentAnnounceMessage.action = "Do Nothing";
            }

            LeapSecondTable = Object.keys(mostRecentAnnounceMessage).map(function (field) {

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
                    <table className="table table-bordered LeapSecond">
                        <thead>
                        <tr>
                            <th>Leap Second Test</th>
                        </tr>
                        </thead>
                        <tbody>
                        {LeapSecondTable}
                        </tbody>

                    </table>

                </div>
            )
    }
}

 /*
                        <tr>
                            <td>ClockIdentity:</td>
                            <td>{clockidentity}</td>
                        </tr>
                        <tr>
                            <td>Destination Ethernet Address:</td>
                            <td>{ Ethernet } </td>
                        </tr>
                        <tr>
                            <td>Current UTC Offset:</td>
                            <td>{ utcoffset } </td>
                        </tr>
                        <tr>
                            <td>Origin Timestamp Seconds:</td>
                            <td>{ origintimestampseconds } </td>
                        </tr>
                        <tr>
                            <td>UTC Reasonable:</td>
                            <td>{ utcreasonable }  </td>
                        </tr>
                        <tr>
                            <td>li 59:</td>
                            <td>{ li59 } </td>
                        </tr>
                        <tr>
                            <td>li 61:</td>
                            <td>{ li61 } </td>
                        </tr>
                        <tr>
                            <td>Timesource:</td>
                            <td>{ timesource } </td>
                        </tr>
                        <tr>
                            <td>Sequence ID:</td>
                            <td>{ sequence_id } </td>
                        </tr>
                        <tr>
                            <td>Timestamp:</td>
                            <td>{ timestamp } </td>
                        </tr>
                        <tr>
                            <td>Action:</td>
                            <td>{ action }</td>
                        </tr>
                        */