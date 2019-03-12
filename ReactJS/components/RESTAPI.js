/**
 * Created by kgb on 10/3/17.
 */

var React = require('react');

export default class RESTAPI extends React.Component {

    render() {

        return(
            <div><h2>Django REST API Pages for PTP Messages</h2>
                <p>   </p>
                <p>   </p>
            <div className="container">

                <div style={{textAlign:'center'}}>

                <p>Full Announce Messages List: <a href = 'api/All_Announce_Messages'>All Announce Messages</a></p>
                <p>Full Path Delay Messages List: <a href = 'api/All_PDelay_Messages'>All Path Delay Messages</a></p>
                </div>
            </div>
            </div>
        )
    }
}

/*

<p>Individual Announce Messages By Key: <a href = 'api/Individual_Announce_Messages/1'> Individual Announce Messages</a></p>
<p>Individual Path Delay Messages By Key: <a href = 'api/Individual_PDelay_Messages/1'> Individual PDelay Messages</a></p>
 */