//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBContainer,
    MDBTabPane,
    MDBTabContent,
    MDBNav,
    MDBNavItem,
    MDBNavLink,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBIcon,
} from 'mdbreact';

//> Components
import {
    TabContainer,
} from '../../molecules';

//> Data
const settings = [
    {
        title: "General",
        subtitles: [
            {
                title: "Profile"
            }
        ],
        icon: 'user'
    },
    {
        title: "Customization",
        subtitles: [
            {
                title: "Features"
            },
            {
                title: "Colors"
            },
            {
                title: "User profile"
            }
        ],
        icon: 'leaf'
    },
    {
        title: "Security",
        subtitles: [
            {
                title: "Login"
            }
        ],
        icon: 'lock'
    },
    {
        title: "API",
        subtitles: [
            {
                title: "Profile"
            }
        ],
        icon: 'network-wired'
    },
    {
        title: "Billing",
        icon: 'dollar-sign'
    },
    {
        title: "Stats",
        subtitles: [
            {
                title: "General"
            }
        ],
        icon: 'lock'
    },
    {
        title: "Sources",
        subtitles: [
            {
                title: "General"
            }
        ],
        icon: 'cloud'
    },
];

class Settings extends React.Component {
    render(){
        return(
            <MDBContainer>
                <h2 className="mt-5">Settings</h2>
                <TabContainer settings={settings} vertical />
            </MDBContainer>
        );
    }
}

export default Settings;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
