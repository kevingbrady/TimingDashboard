import { render } from "react-dom"
import ReactLoading from 'react-loading';
import PacketDelayVariation from "./components/PacketDelayVariation";
const React = require("react");
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'babel-polyfill';
import './Dashboard.css'

import NavigationBar from "./Navbar"
import Announce_Message_Table from "./components/Announce_Message_Table"
import BMCA from "./components/BMCA"
import Holdover from  "./components/Holdover"
import LeapSecond from "./components/LeapSecond"
import ATOI from "./components/ATOI"
import MulticastMAC from "./components/MulticastMAC"
import RESTAPI from "./components/RESTAPI"

import * as announceMessageActions from "./actions/announceMessageActions"
import * as pdelayMessageActions from  "./actions/pdelayMessageActions"

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux"
import { Provider, connect } from "react-redux"
import thunk from "redux-thunk"
import * as reducers from "./reducers/reducers"

let finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
let reducer = combineReducers(reducers);
let store = finalCreateStore(reducer);

@connect(store => ({

        AnnounceMessages: store.message_reducer.AnnounceMessages,

    }
))
export default class Dashboard extends React.Component {

    componentDidMount(){

        let getMessages = function() {

            store.dispatch(announceMessageActions.fetchAnnounceMessages());
            store.dispatch(pdelayMessageActions.fetchPDelayMessages());
            setTimeout(getMessages, 200);

        }.bind(this);
        setTimeout(getMessages, 0);

    }


    render() {

        if (this.props.AnnounceMessages !== undefined) {

            return (

                <Announce_Message_Table/>
            )
        }
        else {

            return (

                <div>
                    <ReactLoading type="bars" color="#444"/>
                </div>

            )
        }
    }

}

render(
     <Provider store={store}>
         <Router>
                  <div>
                      <NavigationBar/>
                      <Switch>
                          <Route exact path={'/'} component={() => <Dashboard/>}/>
                          <Route exact path={'/BMCA'} component={() => <BMCA/>}/>
                          <Route exact path={'/Holdover'} component={() => <Holdover/>}/>
                          <Route exact path={'/LeapSecond'} component={() => <LeapSecond/>}/>
                          <Route exact path={'/ATOI'} component={() => <ATOI/>}/>
                          <Route exact path={'/MulticastMAC'} component={() => <MulticastMAC/>}/>
                          <Route exact path={'/RESTAPI'} component={() => <RESTAPI/>}/>
                          <Route exact path={'/PacketDelayVariation'} component={() => <PacketDelayVariation/>}/>
                      </Switch>
                  </div>
         </Router>
     </Provider>
  ,
    document.getElementById('Dashboard'));


  /*

 render(

    <Provider store={store}>
    <Dashboard/>
    </Provider>
  ,
    document.getElementById('Dashboard'));



componentDidMount() {


        setInterval(function(){
            store.dispatch(announceMessageActions.fetchMessages())
        }, 1000)

        store.dispatch(announceMessageActions.fetchMessages())
    }

 <Router>
                    <div>
                    <NavigationBar/>
                    <Switch>
                        <Route exact path={'/'} component={() => <Announce_Message_Table data={this.state.AnnounceMessages}/>}/>
                        <Route exact path={'/BMCA'} component={() => <BMCA data={this.state.AnnounceMessages[this.state.AnnounceMessages.length - 1]}/>}/>
                        <Route exact path={'/Holdover'} component={()=> <Holdover data={this.state.AnnounceMessages[this.state.AnnounceMessages.length - 1]}/>}/>
                        <Route exact path={'/LeapSecond'} component={() => <LeapSecond data={this.state.AnnounceMessages[this.state.AnnounceMessages.length - 1]}/>}/>
                        <Route exact path={'/ATOI'} component={() => <ATOI data={this.state.AnnounceMessages[this.state.AnnounceMessages.length - 1]}/>}/>
                        <Route exact path={'/MulticastMAC'} component={() => <MulticastMAC data={this.state.PDelayMessages[this.state.PDelayMessages.length - 1]}/>}/>
                        <Route exact path={'/RESTAPI'} component={RESTAPI}/>
                    </Switch>
                    </div>
                </Router>
};*/
