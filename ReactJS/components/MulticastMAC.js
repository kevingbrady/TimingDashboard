var React = require('react');
import {connect} from "react-redux"

let clockidentity;
let Ethernet;
let sequence_id;
let timestamp;
let result;
let data;


@connect(store => ({

    data: store.message_reducer.PDelayMessages,

    }
))
export default class MulticastMAC extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.data !== this.props.data);
    }

    render() {

        for(let key in this.props.data){

            data = this.props.data[key];
            if (data !== undefined) {

                clockidentity = data['clockidentity'];
                Ethernet = data['ETH_DST'];
                sequence_id = data['sequence_id'];
                timestamp = data['sniff_timestamp'];
                result = '';

                if (Ethernet === '01:80:c2:00:00:0e') {

                    result = "Path Delay Request Messages Have Correct MAC Address";

                }

                else {

                    result = "Path Delay Request Messages Do Not Have Correct MAC Address";

                }

                return (

                    <div className="container">
                        <table className="table table-bordered MulticastMAC">
                            <thead>
                            <tr>
                                <th>Multicast MAC Address Test</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>ClockIdentity:</td>
                                <td>{clockidentity}</td>
                            </tr>
                            <tr>
                                <td>Destination Ethernet Address:</td>
                                <td>{ Ethernet } </td>
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
                                <td>Result:</td>
                                <td>{ result }</td>
                            </tr>
                            </tbody>

                        </table>

                    </div>
                )
            }
            else {

                return (

                    <h3 style={{textAlign: 'center'}}>No Path Delay Request Messages Available</h3>
                )
            }
        }
    }
}
