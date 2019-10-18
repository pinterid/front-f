//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBTabPane,
    MDBRow,
    MDBCol,
    MDBNav,
    MDBNavItem,
    MDBNavLink,
    MDBIcon,
    MDBTabContent,
    MDBBadge,
} from 'mdbreact';

//> CSS
import './tabcontainer.scss';

class TabContainer extends React.Component {

    state = {
        activeItemInnerPills: 0,
        activeSubItem: 0,
        activeHorizontalItem: 0,
    };
    
    toggleOuterPills = (tab) => (e) => {
        if (this.state.activeItemInnerPills !== tab) {
            this.setState({
                activeItemInnerPills: tab
            });
        }
    };
    
    toggleSub = (tab) => (e) => {
        if (this.state.activeSubItem !== tab) {
            this.setState({
                activeSubItem: tab
            });
        }
    };

    toggleHorizontal = (tab) => (e) => {
        if (this.state.activeHorizontalItem !== tab) {
            this.setState({
                activeHorizontalItem: tab
            });
        }
    };

    render() {
        if(this.props.vertical){
            return (
                <MDBRow id="tabcontainer">
                    <MDBCol md="3">
                        <MDBNav pills color="primary" className="flex-column">
                        {this.props.settings.map((setting, key) => {
                            return(
                                <MDBNavItem key={key}>
                                    <MDBNavLink 
                                    to="#" 
                                    active={this.state.activeItemInnerPills === key} 
                                    onClick={this.toggleOuterPills(key)}
                                    className="text-left"
                                    >
                                    <MDBIcon icon={setting.icon} className="mr-2" /> {setting.title}
                                    </MDBNavLink>
                                </MDBNavItem>
                            )
                        })}
                        </MDBNav>
                    </MDBCol>
                    <MDBCol md="9">
                        <MDBTabContent activeItem={this.state.activeItemInnerPills}>
                        {this.props.settings && this.props.settings.map((setting, key) => {
                            return(
                                <>
                                    <MDBTabPane tabId={key} key={key}>
                                        <MDBNav className="nav-tabs mt-5">
                                        {setting.subtitles && setting.subtitles.map((subtitle, subkey) => {
                                            return(
                                                <MDBNavItem>
                                                    <MDBNavLink
                                                    to="#"
                                                    active={this.state.activeSubItem === subkey}
                                                    onClick={this.toggleSub(subkey)}
                                                    role="tab" >
                                                    {subtitle.title}
                                                    </MDBNavLink>
                                                </MDBNavItem>
                                            )
                                        })}
                                        </MDBNav>
                                        <MDBTabContent activeItem={this.state.activeSubItem} >
                                            {/* 
                                                To be added
                                            */}
                                        </MDBTabContent>
                                    </MDBTabPane>
                                </>
                            )
                        })}
                        </MDBTabContent>
                    </MDBCol>
                </MDBRow>
            );
        } else if(this.props.horizontal){
            return (
            <>
                <MDBNav className="nav-tabs mt-5">
                {this.props.items && this.props.items.map((item, key) => {
                if(item.visible){
                    return(
                    <MDBNavItem key={key}>
                        <MDBNavLink
                        to="#"
                        active={this.state.activeHorizontalItem === key}
                        onClick={this.toggleHorizontal(key)}
                        role="tab"
                        >
                        {item.title}
                        {item.notification &&
                            <MDBBadge pill color="danger"> </MDBBadge>
                        }
                        {item.pill &&
                            <MDBBadge className="ml-2" pill color="light">{item.pill}</MDBBadge>
                        }
                        </MDBNavLink>
                    </MDBNavItem>
                    );
                } else {
                    return null;
                }
                })}
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeHorizontalItem} >
                    {this.props.children}
                </MDBTabContent>
            </>
            );
        } else {
            return null
        }
        
        }
}

export default TabContainer;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
