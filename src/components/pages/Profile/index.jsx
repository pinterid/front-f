//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> Additional modules
import queryString from 'query-string';

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

//> Utils
import * as gitLab from '../../../utilities/GitLabUtils';
import * as gitHub from '../../../utilities/GitHubUtils';
import * as connector from '../../../utilities/ConnectorUtils';

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
import { mergeDeep } from 'apollo-utilities';

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
    data: undefined,
    contrib: undefined,
    users: {
      gitlab: undefined,
      github: undefined,
    }
  }

  componentDidMount = () => {
    this.getParams();
  }

  createData = () => {
    /*> GitLab Util
    * The point of this utility is to get specific data
    * of a specific user.
    *
    * Usage:
    * gitLab
    * .get('<GitLab server>', '<username>')
    * .then(res => console.log(res));
    */
    console.log(this.state.users);
    var deepMerge = require('deepmerge');
    const call = async () => {
      let objects = []
      console.log(this.state.users)
      if(this.state.users.gitlab){
        this.state.users.gitlab.forEach(async (username)=>{
          console.log(username)
          await gitLab.get('gitlab.htl-villach.at', username).then(res => {
            objects.push(res)
          })
        })
      }
      if(this.state.users.github){
        this.state.users.github.forEach(async (username)=>{
          console.log(username)
          await gitHub.get(username).then(res => {
            objects.push(res)
          })
        })
      }
        
        //const obj1 = await gitLab.get('gitlab.htl-villach.at', 'kleberf')
        //const obj2 = await gitHub.get('schettn')
        //const obj3 = {...obj1, ...obj2}
        //const test = connector.getCalendarFromStructure(obj3)

        //console.log(obj3,connector.getCalendarFromStructure(obj3))
        //let mergedObjects = {};
        if(objects){
          console.log("Deep",deepMerge(...objects))
        }
      
      console.log(objects)
      //console.log(mergedObjects)
      const contribObjects = null
        this.setState({
          user: {
            contrib: contribObjects,
            data: contribObjects
          }
        }, () => this.fetchData());
    }
    call();

    // Get calendar years from local storage
    // ---> JSON.parse(window.localStorage.getItem("test"))
  }

  getParams = () => {
    const params = this.props.location.search;

    let qs = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let paramGitHub = qs.github;
    let paramGitLab = qs.gitlab;

    let usersGitHub = undefined;
    let usersGitLab = undefined;

    if(paramGitHub){
      usersGitHub = paramGitHub.split(' ');
    }
    if(paramGitLab){
      usersGitLab = paramGitLab.split(' ');
    }

    this.setState({
      users: {
        gitlab: usersGitLab ? usersGitLab : undefined,
        github: usersGitHub ? usersGitHub : undefined,
      }
    }, () => this.createData())
  }

  fetchData = async () => {
    let data = this.state.user.data;
    let contrib = this.state.user.contrib;
    if(data && contrib){
      let dataJSON = data;
      let contribJSON = contrib;
      if(dataJSON && contribJSON){
        console.log(dataJSON,contribJSON);
        this.setState({
          data: dataJSON,
          contrib: contribJSON,
        });
      }
    }

  }

  render() {
      
    // Debugging access point - get username from router
    //console.log("User via GET param: "+username);

    const { user } = this.state;

    let data = undefined;
    let contrib = undefined;

    if(this.state.user){
      data = this.state.user.data;
      contrib = this.state.user.contrib;
    }

    console.log(data, contrib);

    // Debugging access point - state
    //console.log(this.state);

    if(data && contrib){
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
                  contributions={contrib[contrib.length - 1]}
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