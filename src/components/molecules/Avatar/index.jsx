//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { 
    MDBAvatar
}  from 'mdbreact';

class Avatar extends React.Component {
    render() {
    return (
        <MDBAvatar className="mx-auto white">
        <img
            src={this.props.url}
            alt={this.props.alt}
            className="rounded-circle img-fluid"
        />
        </MDBAvatar>
    );
    }
}
export default Avatar;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */