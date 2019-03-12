/**
 * Created by kgb on 9/14/17.
 */

import { input_code } from '../middleware/input_functions';
import { RUN_BMCA } from '../middleware/runBMCA';
import { connect } from "react-redux"


const React = require('react');
var bestMasterClocks = {};
var allClocksDict = {};
var bestClocksOnPort = {};

let bestClocksDisplay;
let AllClocksDisplay;
let bestClocksOnPortDisplay;

var comparison = '';
var lastState = '';
var highlighted = {

    backgroundColor: 'green',
    color: 'whitesmoke',

};

var normal = {

    backgroundColor: 'lightgoldenrodyellow',
    color: 'black',

};

@connect(store => ({

    data: store.message_reducer.AnnounceMessages,

    }
))
export default class BMCA extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.data !== this.props.data);
    }

    render() {

        for(let key in this.props.data) {

            let data = this.props.data[key];

            let mostRecentAnnounceMessage = {

                IP_SRC: data['IP_SRC'],
                IP_DST: data['IP_DST'],
                ETH_SRC: data['ETH_SRC'],
                ETH_DST: data['ETH_DST'],
                sniff_timestamp: data['sniff_timestamp'],
                sequence_id: data['sequence_id'],
                clockidentity: data['clockidentity'],
                GMClockIdentity: data['GMClockIdentity'],
                localstepsremoved: data['localstepsremoved'],
                alternateMasterFlag: data['alternateMasterFlag'],
                GMClockClass: input_code(data['GMClockClass'], 'clockclass') + ' ( ' + data['GMClockClass'].toString() + ' )',
                GMClockAccuracy: input_code(data['GMClockAccuracy'], 'clockaccuracy'),
                GMClockVariance: data['GMClockVariance'],
                priority_1: data['priority_1'],
                priority_2: data['priority_2'],
                subdomain_number: data['subdomain_number'],
                twoStep: data['twostep'],
                timesource: input_code(data['timesource'], 'timesource'),
                STATE: (bestMasterClocks !== {} && lastState !== '') ? lastState : '',
                comparison: ''
            };

            let results = RUN_BMCA(mostRecentAnnounceMessage, bestMasterClocks, bestClocksOnPort, allClocksDict);
            mostRecentAnnounceMessage = results[0];
            bestMasterClocks = results[1];
            bestClocksOnPort = results[2];
            allClocksDict = results[3];
            //console.log(lastState);

            AllClocksDisplay = Object.keys(allClocksDict).map(function (subdomain) {

                return (
                    <tbody>
                    <tr>
                        <td style={{
                            backgroundColor: 'orangered',
                            color: 'whitesmoke',
                            border: 'none'
                        }}>{'Domain: ' + subdomain}</td>

                        {Object.keys(allClocksDict[subdomain]).map(function (port) {

                            return (
                                <tr>
                                    <td style={{
                                        backgroundColor: 'orangered',
                                        color: 'whitesmoke',
                                        border: 'none'
                                    }}></td>
                                    <td style={{
                                        backgroundColor: 'blue',
                                        color: 'whitesmoke',
                                        border: 'none'
                                    }}>{'Port: ' + port}</td>
                                    <tr>
                                        {Object.keys(allClocksDict[subdomain][port]).map(function (clock) {

                                            return (
                                                [<td style={{
                                                    backgroundColor: 'orangered',
                                                    color: 'whitesmoke',
                                                    borderTop: 'none',
                                                    borderLeft: 'none',
                                                    borderRight: 'none'
                                                }}></td>,
                                                    <td style={{
                                                        backgroundColor: 'blue',
                                                        color: 'whitesmoke',
                                                        borderTop: 'none',
                                                        borderLeft: 'none'
                                                    }}></td>,
                                                    <td>{'Clock ID: ' + clock}</td>]
                                            )

                                        })

                                        }
                                    </tr>

                                </tr>
                            )
                        })}
                    </tr>
                    </tbody>
                )

            });


            bestClocksOnPortDisplay = Object.keys(bestClocksOnPort).map(function (subdomain) {

                return (
                    <tbody>
                    {Object.keys(bestClocksOnPort[subdomain]).map(function (port) {

                        return (
                            <tr style={{display: 'table-row'}}>
                                <td style={{
                                    backgroundColor: 'orangered',
                                    color: 'whitesmoke',
                                    textAlign: 'center'
                                }}>{'Domain: ' + subdomain}</td>
                                <td style={{
                                    backgroundColor: 'blue',
                                    color: 'whitesmoke',
                                    textAlign: 'center'
                                }}>{'Port: ' + port}</td>
                                <td style={{textAlign: 'center'}}>{'Clock ID: ' + bestClocksOnPort[subdomain][port].clockidentity}</td>
                            </tr>
                        )
                    })}

                    </tbody>)

            });

            bestClocksDisplay = Object.keys(bestClocksOnPort).map(function (subdomain) {

                return (
                    <td style={{valign: 'top', backgroundColor: 'darkgrey'}}>
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td style={{
                                    backgroundColor: 'orangered',
                                    color: 'whitesmoke',
                                    textAlign: 'center'
                                }}>{'Domain: ' + subdomain}</td>
                            </tr>
                            {Object.keys(bestMasterClocks[subdomain]).map(function (clock) {

                                lastState = (bestMasterClocks[subdomain].STATE !== '' && bestMasterClocks[subdomain].clockidentity === mostRecentAnnounceMessage.clockidentity) ? bestMasterClocks[subdomain].STATE : lastState;
                                return (
                                    <tr>
                                        {(!['comparison', 'IP_SRC', 'IP_DST', 'subdomain_number', 'alternateMasterFlag'].includes(clock)) &&
                                        [<td
                                            style={(clock === bestMasterClocks[subdomain].comparison) ? highlighted : normal }>{clock}</td>,
                                            <td>{bestMasterClocks[subdomain][clock]}</td>]}
                                    </tr>
                                )

                            })

                            }
                            </tbody>
                        </table>
                    </td>
                )
            });
            }

            return (

                <div className="container BMCA">

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Devices Under Test</th>
                        </tr>
                        </thead>
                        { AllClocksDisplay }
                    </table>

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Best Clocks on Each Port</th>
                        </tr>
                        </thead>
                        { bestClocksOnPortDisplay }
                    </table>

                    <table className="table table-bordered bestMasterPacket">
                        <thead>
                        <tr>
                            <th>Best Master Clocks</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            { bestClocksDisplay }
                        </tr>
                        </tbody>
                    </table>

                </div>
            )
        }
}

/*

 */