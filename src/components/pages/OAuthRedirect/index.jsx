//> React
// Contains all the functionality necessary to define React components
import React from "react";

class Redirect extends React.Component {

  componentDidMount = () => {
    this.getRedirect();
  }

  getRedirect = async () => {
      // Get name of window which was set by the parent to be the unique request key
      const requestKey = window.name;
      // Update corresponding entry with the redirected url which should contain either access token or failure reason in the query parameter / hash
      localStorage.setItem(requestKey, window.location.href);
      window.close();
  }

  render () {
    return (
      null
    );
  }
}
export default Redirect;

