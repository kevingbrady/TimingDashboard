/**
 * Created by kgb on 2/20/18.
 */


var React = require('react');
import {connect} from "react-redux"
let mostRecentAnnounceMessage, PDV;

@connect(store => ({

    data: store.message_reducer.AnnounceMessages,

    }

))
export default class PacketDelayVariation extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (nextProps.data !== this.props.data);
    }
    render(){

        for(let key in this.props.data) {

            let data = this.props.data[key];
            mostRecentAnnounceMessage = {
                clockidentity: data['clockidentity'],
                origintimestampseconds: parseFloat(data['origintimestampseconds']),
                origintimestampnanoseconds: parseFloat(data['origintimestampnanoseconds']),
                utcoffset: parseFloat(data['utc_offset']),
                sequence_id: data['sequence_id'],
                timestamp: parseFloat(data['sniff_timestamp']),
            };
            PDV = mostRecentAnnounceMessage.timestamp - ((mostRecentAnnounceMessage.origintimestampseconds + (mostRecentAnnounceMessage.origintimestampnanoseconds * 1e-9)));
            //console.log(PDV);
        }
        return (

            <div className="container">
                <p> { PDV }</p>
            </div>

            )
    }


}