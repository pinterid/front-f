//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
    MDBTabPane,
} from 'mdbreact';

class Projects extends React.Component {
    
    render(){
        return(
            <MDBTabPane tabId={this.props.id} role="tabpanel">
            {this.props.repos &&
                <>
                <h3 className="font-weight-bold mt-4">Repositories</h3>
                <ul>
                    {this.props.repos.map((repo, key) => {
                        return(
                            <li key={key}>
                            <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            {repo.name}
                            </a>
                            </li>
                        );
                    })}
                </ul>
                </>
            }
            </MDBTabPane>
        )
    }
}

export default Projects;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */