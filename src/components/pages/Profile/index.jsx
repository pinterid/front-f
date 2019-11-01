//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBEdgeHeader,
    MDBFreeBird,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBCardBody,
    MDBIcon,
    MDBCard,
    MDBCardTitle,
    MDBCardImage,
    MDBCardText,
    MDBAnimation,
    MDBAvatar,
    MDBCardUp,
} from 'mdbreact';

//> Images
// To be added

//> Components
// Molecules
import {
    TabContainer,
    Avatar,
    Socialdata,
} from '../../molecules';
// Organisms
import {
    ResumeTab,
    ProjectsTab,
    OverviewTab,
    EducationTab,
} from '../../organisms/tabs';

//> Handlers

//> CSS
import './profile.scss';

//> Dummy data
// Tab headers
const tabitems = [
    { 
    title: "Overview",
    visible: true,
    pill: false,
    notification: false
    },
    {
    title: "Resume",
    visible: true,
    pill: false,
    notification: false
    },
    {
    title: "Projects",
    visible: true,
    pill: "22",
    notification: false
    },
    {
    title: "Education",
    visible: true,
    pill: "0",
    notification: true
    }
]

class Dashboard extends React.Component {
    render() {
        return null
    };
}
export default Dashboard;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */