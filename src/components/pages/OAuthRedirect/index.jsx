import React from 'react';
import { MDBContainer} from 'mdbreact';
class Redirect extends React.Component
{
    getRedirect = async () => {
        // Get name of window which was set by the parent to be the unique request key
        const requestKey = window.name;
        // Update corresponding entry with the redirected url which should contain either access token or failure reason in the query parameter / hash
        window.localStorage.setItem(requestKey, window.location.href);
        window.close();
    }
    render () {
        return (
            <MDBContainer>
                <html onLoad={this.getRedirect()}>
                    <head>
                        <title>React Simple Auth - Redirect</title>
                    </head>
                    <body>
                        <h1>React Simple Auth</h1>
                    </body>
                </html>
            </MDBContainer>
        );
    }
}
export default Redirect;