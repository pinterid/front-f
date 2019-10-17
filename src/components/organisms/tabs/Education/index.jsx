//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBTabPane,
} from 'mdbreact';

class Education extends React.Component {
    
    render(){
        return(
            <MDBTabPane tabId={this.props.id} role="tabpanel">
            </MDBTabPane>
        )
    }
}

export default Education;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */