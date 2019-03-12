/**
 * Created by kgb on 9/13/17.
 */
const React = require("react");

import {connect} from "react-redux"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactLoading from 'react-loading';
import NavigationBar from "../Navbar"
import Announce_Message_Table from "../components/Announce_Message_Table"
import BMCA from "../components/BMCA"
import Holdover from  "../components/Holdover"
import LeapSecond from "../components/LeapSecond"
import ATOI from "../components/ATOI"
import MulticastMAC from "../components/MulticastMAC"
import RESTAPI from "../components/RESTAPI"

@connect(store => ({

    announce_messages: store.announce_message_reducer,

    }
))
export default class DashboardContainer extends React.Component{

    constructor(props) {
    super(props);
    }

    renderLoading() {
    return (
      <div className="container">
        <div className="row">
          <div style = {{alignContent: 'center', position: 'absolute'}} className="col-sm-12">
            <ReactLoading type="bars" color="#444"/>
          </div>
        </div>
      </div>
    )
  }
  render() {

      if (this.props.announce_messages.data === undefined) {

          return this.renderLoading()
      }
      else {

          return (

              <Router>
                  <div>
                      <NavigationBar/>
                      <Switch>
                          <Route exact path={'/'} component={() => <Announce_Message_Table data={this.props.announce_messages.data}/>}/>
                          <Route exact path={'/BMCA'} component={() => <BMCA data={this.props.announce_messages.data[this.props.announce_messages.data.length - 1]}/>}/>
                          <Route exact path={'/Holdover'} component={() => <Holdover data={this.props.announce_messages.data[this.props.announce_messages.data.length - 1]}/>}/>
                          <Route exact path={'/LeapSecond'} component={() => <LeapSecond data={this.props.announce_messages.data[this.props.announce_messages.data.length - 1]}/>}/>
                          <Route exact path={'/ATOI'} component={() => <ATOI data={this.props.announce_messages.data[this.props.announce_messages.data.length - 1]}/>}/>
                          <Route exact path={'/MulticastMAC'} component={() => <MulticastMAC data={this.props.announce_messages.data[this.props.announce_messages.data.length - 1]}/>}/>
                          <Route exact path={'/RESTAPI'} component={() => <RESTAPI /> }/>
                      </Switch>
                  </div>
              </Router>


          )
      }
  }




}


/*

 <BrowserRouter>
                    <div>
                    <Navbar />
                    <Switch>
                        <Route exactly component= {BMCA} pattern="/BMCA" />
                        <Route exactly component= {Holdover} pattern="/Holdover" />
                        <Route exactly component= {LeapSecond} pattern="/LeapSecond" />
                        <Route exactly component= {ATOI} pattern="/ATOI" />
                    </Switch>
                    </div>
                </BrowserRouter>

{announce_messages.data !== undefined &&
              <Announce_Message_Table data={announce_messages.data} />}
                */