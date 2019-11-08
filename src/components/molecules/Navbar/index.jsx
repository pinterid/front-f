//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBContainer,
    MDBSmoothScroll,
    MDBDropdown,
    MDBDropdownToggle,
    MDBIcon,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBModal,
    MDBModalBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBModalFooter,
    MDBFormInline,
} from 'mdbreact';

//> Images
// Logo
import { ReactComponent as Logo } from  '../../../assets/content/logo.svg';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapseID: "",
        };
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    closeCollapse = collapseID => () => {
        window.scrollTo(0, 0);
        this.state.collapseID === collapseID && this.setState({ collapseID: "" });
    };

    // Get navbar mode
    _getMode = () => {
        let opts = {};
        if(this.props.mode){
            opts['dark'] = 'dark';
        } else {
            opts['light'] = 'light';
        }
        return opts;
    }

    toggleLogin = () => {
      this.setState({
        modalLogin: !this.state.modalLogin
      });
    }

    toggleRegister = () => {
      this.setState({
        modalRegister: !this.state.modalRegister
      });
    }

    render(){
        const overlay = (
        <div
            id="sidenav-overlay"
            style={{ backgroundColor: "transparent" }}
            onClick={this.toggleCollapse("mainNavbarCollapse")}
        />
        );

        const { collapseID } = this.state;
        return(
            <div>
                <MDBContainer>
                  <MDBModal isOpen={this.state.modalLogin} toggle={this.toggleLogin}>
                    <MDBModalBody>
                      <MDBContainer>
                        <MDBRow>
                          <MDBCol md="8">
                            <form>
                              <p className="h5 text-center mb-4">Sign in</p>
                              <div className="grey-text">
                                <MDBInput
                                  label="Type your email"
                                  icon="envelope"
                                  group
                                  type="email"
                                  validate
                                  error="wrong"
                                  success="right"
                                />
                                <MDBInput
                                  label="Type your password"
                                  icon="lock"
                                  group
                                  type="password"
                                  validate
                                />
                              </div>
                              <div className="text-center">
                                <MDBBtn>Login</MDBBtn>
                              </div>
                            </form>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBContainer>
                        <MDBRow>
                          <MDBCol md="8">
                            <div>
                              <p>Not a member? <a onClick={this.toggleRegister}>Sign Up</a></p>
                              <p>Forgot <a>Password?</a></p>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>
                <MDBContainer>
                  <MDBModal isOpen={this.state.modalRegister} toggle={this.toggleRegister}>
                    <MDBModalBody>
                      <MDBContainer>
                        <MDBRow>
                          <MDBCol md="6">
                            <form>
                              <p className="h5 text-center mb-4">Sign up</p>
                              <div className="grey-text">
                                <MDBInput
                                  label="Your name"
                                  icon="user"
                                  group
                                  type="text"
                                  validate
                                  error="wrong"
                                  success="right"
                                />
                                <MDBInput
                                  label="Your email"
                                  icon="envelope"
                                  group
                                  type="email"
                                  validate
                                  error="wrong"
                                  success="right"
                                />
                                <MDBInput
                                  label="Confirm your email"
                                  icon="exclamation-triangle"
                                  group
                                  type="text"
                                  validate
                                  error="wrong"
                                  success="right"
                                />
                                <MDBInput
                                  label="Your password"
                                  icon="lock"
                                  group
                                  type="password"
                                  validate
                                />
                              </div>
                              <div className="text-center">
                                <MDBBtn color="primary">Register</MDBBtn>
                              </div>
                            </form>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                    </MDBModalBody>
                  </MDBModal>
                </MDBContainer>
                <MDBNavbar
                color={this.props.mode ? ("agency-dark") : ("white")} {...this._getMode()}
                expand="md"
                fixed="top"
                scrolling
                >
                <MDBContainer>
                    <MDBNavbarBrand
                      href="/"
                      className="py-0 font-weight-bold"
                      >
                      <Logo id="logo" height="50" width="50"/>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                    onClick={this.toggleCollapse("mainNavbarCollapse")}
                    />
                    <MDBCollapse
                    id="mainNavbarCollapse"
                    isOpen={this.state.collapseID}
                    navbar
                    >
                    <MDBNavbarNav left>
                      <MDBNavItem>
                        <MDBFormInline waves>
                          <div className="md-form my-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                          </div>
                        </MDBFormInline>
                      </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBDropdownItem divider />
                    <MDBNavbarNav right>
                      <MDBNavItem>
                        <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" className="mr-1" />Profile
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="dropdown-default" left basic>
                            <MDBDropdownItem onClick={alert}>My account</MDBDropdownItem>
                            <MDBDropdownItem onClick={this.toggleLogin}>Log in</MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBNavItem>
                    </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            {collapseID && overlay}
            </div>
        )
    }
}

export default Navbar;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */