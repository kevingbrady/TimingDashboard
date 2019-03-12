/**
 * Created by kgb on 9/12/17.
 */

var React = require("react");

import {connect} from "react-redux"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import "../components/react-bootstrap-table-all.min.css";

let tableData = [];
let boundaryclocks = {};
let transparentclocks = {};
let mostRecentAnnounceMessage;


@connect(store => ({

    data: store.message_reducer.AnnounceMessages,
    }
))
export default class Announce_Message_Table extends React.Component {

    constructor(){
        super();
        this.state = {

            isLoading: true,
        }

    };

    shouldComponentUpdate(nextProps) {

        return(nextProps.data !== this.props.data);
    }

    componentDidMount(){

        this.setState({
            isLoading: false,
        });
    }

    render() {

        for(let key in this.props.data) {

            mostRecentAnnounceMessage = this.props.data[key];

            let rowData = {

                "clockidentity": mostRecentAnnounceMessage['clockidentity'],
                "GMClockIdentity": mostRecentAnnounceMessage['GMClockIdentity'],
                "GMClockClass": mostRecentAnnounceMessage['GMClockClass'],
                "GMClockVariance": mostRecentAnnounceMessage['GMClockVariance'],
                "GMClockAccuracy": mostRecentAnnounceMessage['GMClockAccuracy'],
                "ETH_DST": mostRecentAnnounceMessage['ETH_DST'],
                "priority_1": mostRecentAnnounceMessage['priority_1'],
                "priority_2": mostRecentAnnounceMessage['priority_2'],
                "timesource": mostRecentAnnounceMessage['timesource'],
                "sequence_id": mostRecentAnnounceMessage['sequence_id'],
                "timestamp": mostRecentAnnounceMessage['sniff_timestamp'],
            };

            if (tableData.length === 0) {

                tableData.push(rowData);

            } else if (mostRecentAnnounceMessage['sniff_timestamp'] !== tableData[tableData.length - 1].timestamp) {


                tableData.push(rowData);

            }

            if (mostRecentAnnounceMessage.clockidentity === mostRecentAnnounceMessage.GMClockIdentity) {

                if (!(mostRecentAnnounceMessage.clockidentity in transparentclocks)) {

                    transparentclocks[mostRecentAnnounceMessage.clockidentity] = mostRecentAnnounceMessage;

                }
                else {

                    for (let tclock in transparentclocks) {

                        if (mostRecentAnnounceMessage.sniff_timestamp - transparentclocks[tclock].sniff_timestamp > 60) {

                            delete(transparentclocks[tclock])
                        }
                    }
                }

            } else {

                if (!(mostRecentAnnounceMessage.clockidentity in boundaryclocks)) {

                    boundaryclocks[mostRecentAnnounceMessage.clockidentity] = mostRecentAnnounceMessage;
                }
                else {

                    for (let bclock in boundaryclocks) {

                        if (mostRecentAnnounceMessage.sniff_timestamp - boundaryclocks[bclock].sniff_timestamp > 60) {

                            delete(boundaryclocks[bclock])
                        }
                    }

                }
            }
        }
        return (


                <div className="container Announce_Message_Table">
                    <div className="container-table">
                        <table className="table message">
                            <thead>
                            <tr>
                                <th>Announce Messages</th>
                            </tr>
                            </thead>
                        </table>
                        <BootstrapTable className="IncomingMessages" scrollTop={ 'Bottom' } data={ tableData }
                                        height={ 600 } bodyStyle={{overflow: 'overlay'}}
                                        options={{noDataText: 'Connect to an Interface to Start Reading Announce Messages'}}
                                        striped condensed>
                            <TableHeaderColumn dataField="clockidentity" headerAlign="center" dataAlign="center"
                                               width="14%">Clock ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="GMClockIdentity" headerAlign="center" dataAlign="center"
                                               width="14%">GM ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="GMClockClass" headerAlign="center" dataAlign="center"
                                               width="7%">GM Class</TableHeaderColumn>
                            <TableHeaderColumn dataField="GMClockVariance" headerAlign="center" dataAlign="center"
                                               width="9%">GM Variance</TableHeaderColumn>
                            <TableHeaderColumn dataField="GMClockAccuracy" headerAlign="center" dataAlign="center"
                                               width="9%">GM Accuracy</TableHeaderColumn>
                            <TableHeaderColumn dataField="ETH_DST" headerAlign="center" dataAlign="center" width="12%">Ethernet</TableHeaderColumn>
                            <TableHeaderColumn dataField="priority_1" headerAlign="center" dataAlign="center"
                                               width="5%">P1</TableHeaderColumn>
                            <TableHeaderColumn dataField="priority_2" headerAlign="center" dataAlign="center"
                                               width="5%">P2</TableHeaderColumn>
                            <TableHeaderColumn dataField="timesource" headerAlign="center" dataAlign="center"
                                               width="8%">Timesource</TableHeaderColumn>
                            <TableHeaderColumn dataField="sequence_id" headerAlign="center" dataAlign="center"
                                               width="5%">Seq ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="timestamp" headerAlign="center" dataAlign="center" width="12%"
                                               isKey={ true }>Timestamp</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>Transparent Clocks</th>
                            <th style={{textAlign: 'center'}}>Boundary Clocks</th>
                        </tr>
                        </thead>
                        <tbody>
                        <td style={{valign: 'top'}}>
                            <ul>
                                { Object.keys(transparentclocks).map(function (clock) {

                                    return (

                                        <li><p style={{
                                            textAlign: 'center',
                                            backgroundColor: 'green',
                                            color: 'whitesmoke'
                                        }}>Clock ID: {clock}</p><p style={{
                                            textAlign: 'center',
                                            backgroundColor: 'green',
                                            color: 'whitesmoke'
                                        }}>GMClock ID: { transparentclocks[clock].GMClockIdentity }</p></li>

                                    )

                                })}
                            </ul>

                        </td>
                        <td style={{valign: 'top'}}>
                            <ul>
                                {Object.keys(boundaryclocks).map(function (clock) {

                                    return (

                                        <li><p
                                            style={{textAlign: 'center', backgroundColor: 'blue', color: 'whitesmoke'}}>
                                            Clock ID: {clock}</p><p
                                            style={{textAlign: 'center', backgroundColor: 'blue', color: 'whitesmoke'}}>
                                            GMClock ID: { boundaryclocks[clock].GMClockIdentity }</p></li>

                                    )

                                })}
                            </ul>

                        </td>

                        </tbody>
                    </table>

                </div>

            )

        }
}

/*

<TableHeaderColumn dataField="timestamp" isKey={true}>Timestamp</TableHeaderColumn>
   
*/