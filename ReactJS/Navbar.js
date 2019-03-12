/**
 * Created by kgb on 9/13/17.
 */

const React = require("react");
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
const ReactBootstrap = require('react-bootstrap');
let Navbar = ReactBootstrap.Navbar;
let NavItem = ReactBootstrap.NavItem;
let Nav = ReactBootstrap.Nav;
let NavDropdown = ReactBootstrap.NavDropdown;
let FormGroup = ReactBootstrap.FormGroup;
let FormControl = ReactBootstrap.FormControl;

export default class NavigationBar extends React.Component{

    shouldComponentUpdate(nextProps) {
        return (nextProps.data !== this.props.data);
    }

    render() {

        return (

            <Navbar inverse collapseOnSelect>
           <Navbar.Header>
            <Navbar.Brand componentClass="span">
              <Link to="/">Timing Testbed Dashboard</Link>
            </Navbar.Brand>
           <Navbar.Toggle />
           </Navbar.Header>
           <Navbar.Collapse>
            <Nav pullLeft>
              <NavDropdown title="Announce Message Tests" id="Announce Dropdown">
                  <LinkContainer to="/BMCA">
                  <NavItem>BMCA</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/Holdover">
                  <NavItem>Holdover</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/LeapSecond">
                  <NavItem>Leap Second</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/ATOI">
                  <NavItem>ATOI</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/PacketDelayVariation">
                  <NavItem>Packet Delay Variation</NavItem>
                  </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Path Delay Request Message Tests" id="Path Dropdown">
                <LinkContainer to="/MulticastMAC">
                  <NavItem>Multicast MAC Address</NavItem>
                  </LinkContainer>
              </NavDropdown>
                <LinkContainer to="/RESTAPI" >
                <NavItem>REST API</NavItem>
                </LinkContainer>
            </Nav>
               <Navbar.Form pullRight>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search"/>
                    </FormGroup>
                </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>


            )
        }

    }

/*


 */
