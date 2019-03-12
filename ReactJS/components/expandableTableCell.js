/**
 * Created by kgb on 9/26/17.
 */

var React = require('react');

export default class expandableTableCell extends React.Component{

    render(){

        let clock = this.props.clock;
        return (
            <tr><td></td><td></td><td>
                    <ul>
                        <li>{clock.clockidentity}</li>
                        <li>{clock.GMClockIdentity}</li>
                        <li>{clock.GMClockClass}</li>
                        <li>{clock.GMClockVariance}</li>
                        <li>{clock.GMClockAccuracy}</li>
                        <li>{clock.priority_1}</li>
                        <li>{clock.priority_2}</li>
                        <li>{clock.sniff_timestamp}</li>
                        <li>{clock.sequence_id}</li>
                        <li>{clock.STATE}</li>
                    </ul>
                    </td></tr>
        )


    }


}