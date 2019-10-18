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
// To be added


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

  state = {
    data: undefined
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = async () => {
    let data = localStorage.getItem('DUMMY_DATA');
    if(data){
      let dataJSON = JSON.parse(data);
      if(dataJSON){
        this.setState({
          data: dataJSON
        });
      }
    }
  }

  render() {
    const { username } = this.props.match.params;
    
    // Debugging access point - get username from router
    //console.log("User via GET param: "+username);

    const { data } = this.state;

    // Debugging access point - state
    //console.log(this.state);

    if(data){
      return (
        
        <div id="profile">
          
          <MDBContainer className="pt-5">
            <MDBRow>
              <MDBCol md="4" className="text-center">
                <MDBCard testimonial>
                  <MDBCardUp color="info" />
                    <Avatar 
                    url={data.avatarUrl}
                    alt={data.name}
                    />
                    <Socialdata
                    status={data.status}
                    name={data.name}
                    company={data.company}
                    location={data.location}
                    email={data.email}
                    website={data.websiteUrl}
                    accounts={{
                      github: data,
                    }}
                    />
              </MDBCard>
              </MDBCol>
              <MDBCol md="8">
                <TabContainer items={tabitems} horizontal>
                  <OverviewTab
                  id={0}
                  contributions={data.contributions}
                  />
                  <ResumeTab
                  id={1}
                  />
                  <ProjectsTab
                  id={2}
                  repos={data.repos}
                  />
                  <EducationTab
                  id={3}
                  />
                </TabContainer>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Dashboard;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */