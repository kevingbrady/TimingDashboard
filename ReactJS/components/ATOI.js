/**
 * Created by kgb on 9/14/17.
 */
var React = require('react');
import {connect} from "react-redux"

let mostRecentAnnounceMessage;
let data;
let ATOITable;

@connect(store => ({

    data: store.message_reducer.AnnounceMessages,

    }

))
export default class ATOI extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.data !== this.props.data);
    }


    render() {

        for(let key in this.props.data) {

            data = this.props.data[key];
            mostRecentAnnounceMessage = {
                clockidentity: data['clockidentity'],
                ETH_DST: data['ETH_DST'],
                displayname: data['ATOI_DisplayName'],
                key: data['ATOI_Key'],
                offset: data['ATOI_Offset'],
                tlvtype: data['ATOI_TLVType'],
                jumpseconds: data['ATOI_JumpSeconds'],
                timeOfNextJump: data['ATOI_TimeOfNextJump'],
                sequence_id: data['sequence_id'],
                timestamp: data['sniff_timestamp'],

            };
            ATOITable = Object.keys(mostRecentAnnounceMessage).map(function (field) {

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
                    <table className="table table-bordered ATOI">
                        <thead>
                        <tr>
                            <th>ATOI Test</th>
                        </tr>
                        </thead>
                        <tbody>
                        { ATOITable }
                        </tbody>
                    </table>
                </div>
            )
    }
}
