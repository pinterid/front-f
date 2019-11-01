//> React
// Contains all the functionality necessary to define React components
import React from 'react';

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { 
    MDBRow,
    MDBCol,
}  from 'mdbreact';

//> Helpers
import changeHue from '../../helpers/changeHue.js';

//> CSS
import './calendar.scss';

const months = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
]

class Calender2D extends React.Component {
    constructor(props) {
    super(props);
    this.myInput = React.createRef();

    this.state = {
        width: 0,
        hue: 0,
    }
    }

    updateDimensions = () => {
    this.setState({ 
            width: this.myInput.current.offsetWidth,
    });
    };

    componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidMount = () => {
    // Add resize listener
    window.addEventListener('resize', this.updateDimensions);

    let contributions = this.props.contributions.years;
    let cnew = contributions[0];
    //console.log(cnew);

    this.setState({
        width: this.myInput.current.offsetWidth,
        contributionsList: cnew
    }, () => this.countContribs());

    // Color RGB cycling
    //let intervalID = window.setInterval(this.cycleHue, 70);

    
    }

    cycleHue = () => {
    if(this.state.hue > 365){
        this.setState({
        hue: 0
        });
    }
    this.setState({
        hue: this.state.hue + 1
    });
    }

    countContribs = () => {
    if(this.state.contributionsList){
        return this.state.contributionsList.totalContributions;
    } else {
        return null;
    }
    
    }

    getEachMonth = (pos) => {
    // Create new empty array
    let month = new Array();

    // Get current month
    let current = new Date().getMonth();

    // Have each month two times
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    month[12] = "Jan";
    month[13] = "Feb";
    month[14] = "Mar";
    month[15] = "Apr";
    month[16] = "May";
    month[17] = "Jun";
    month[18] = "Jul";
    month[19] = "Aug";
    month[20] = "Sep";
    month[21] = "Oct";
    month[22] = "Nov";
    month[23] = "Dec";
    
    return month[current+pos];
    }
    
    render() {
    //console.log(this.state);
    //console.log(this.state.contributionsList);
    return (
        <div id="calendar2d">
        <div className="text-right">
            <h3 className="font-weight-bold d-inline-block">{this.countContribs()}</h3>
            <span> contributions in the last year</span>
        </div>
        <MDBRow className="text-center">
        {months.map((month, key) => {
            return(
            <MDBCol size="months" key={key}>
                <small>{this.getEachMonth(key)}</small>
            </MDBCol>
            );
        })}          
        </MDBRow>
        <div ref={this.myInput}>
            <svg className="calendar" height={this.state.width/53*7}>
            {this.state.contributionsList && this.state.contributionsList.weeks.map((week, wkey) => {
                return(
                week.map((day, dkey) => {
                    if(wkey === 0){
                    return(
                        <rect
                        key={wkey+"-"+dkey}
                      y={(this.state.width/53*7) + this.state.width/53*dkey - (week.length * (this.state.width/53))}
                        x={0}
                        width={this.state.width/53}
                        height={this.state.width/53}
                        data-data={day.date}
                        data-count={day.total}
                        fill={changeHue(day.color,this.state.hue)}
                        >
                        
                        </rect>
                    )
                    } else {
                    return(
                        <rect
                        key={wkey+"-"+dkey}
                        y={this.state.width/53*dkey}
                        x={this.state.width/53*wkey}
                        width={this.state.width/53}
                        height={this.state.width/53}
                        data-data={day.date}
                        data-count={day.total}
                        fill={changeHue(day.color,this.state.hue)}
                        >
                        
                        </rect>
                    )
                    }
                    
                    })
                )
            })}
            
            </svg>
        </div>
        </div>
    )
    }
}
export default Calender2D;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */