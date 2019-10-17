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

} from 'mdbreact';

//> CSS
import './tabsettingscontainer.scss';

class TabSettingsContainer extends React.Component {

    state = {
        activeItemOuterTabs: 0,
        activeItemInnerPills: 0,
    };
    
    toggleOuterTabs = tab => e => {
        if (this.state.activeItemOuterTabs2 !== tab) {
        this.setState({
            activeItemOuterTabs: tab
        });
        }
    };
    
    toggleInnerPills = tab => e => {
        if (this.state.activeItemInnerPills !== tab) {
        this.setState({
            activeItemInnerPills: tab
        });
        }
    };

    render() {
        console.log(this.props);
        return (
            null
        );
    }
}

export default TabSettingsContainer;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
