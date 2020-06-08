import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import TwitterLogin from "react-twitter-login";
import MicrosoftLogin from "react-microsoft-login";
import InstagramLogin from 'react-instagram-login';
import axios from 'axios';
import { url } from '../server-conn';

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          Keys: {}
        };

        this.getKeys();
    }

    getKeys = () => {    
        axios.get(url + '/authKeys/')
        .then(res => {
            this.setState({Keys: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    responseTwitter = (err, data) => {
        console.log(err, data);
    };

    responseMicrosoft = (err, data) => {
        console.log(err, data);
    };

    responseInstagram = (response) => {
        console.log(response);
    };


    componentClicked = (response) => {
        console.log("clicked");
    };

    render() {
        if(this.state.Keys.GOOGLE_CLIENTID==undefined)
            return(<div>Loading</div>);
         
        return (
            <React.Fragment>
                <div>
                    <GoogleLogin
                            clientId={this.state.Keys.GOOGLE_CLIENTID}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                </div>
                <div>
                    <GoogleLogin
                            clientId={this.state.Keys.GOOGLE_CLIENTID}
                            render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                            )}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                </div>
                <div>
                <FacebookLogin
                    appId={this.state.Keys.FACEBOOK_APPID}
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
                </div>
                <div>
                <FacebookLogin
                    appId={this.state.Keys.FACEBOOK_APPID}
                    autoLoad
                    callback={this.responseFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>This is my custom FB button</button>
                    )}
                    />
                </div>
                <div>
                    <TwitterLogin
                        authCallback={this.responseTwitter}
                        consumerKey={this.state.Keys.TWITTER_KEY}
                        consumerSecret={this.state.Keys.TWITTER_SECRET}
                        callbackUrl="https://reactwebdemo.azurewebsites.net/login"
                        buttonTheme="dark_short"
                    />            
                </div>
                <div>
                    <TwitterLogin
                        authCallback={this.responseTwitter}
                        consumerKey={this.state.Keys.TWITTER_KEY}
                        consumerSecret={this.state.Keys.TWITTER_SECRET}
                        callbackUrl=""
                        buttonTheme="dark_short"
                        children={<button>Twitter login</button>}
                    />            
                </div>
                <div>
                    <MicrosoftLogin 
                        clientId={this.state.Keys.MICROSOFT_APPID} 
                        buttonTheme="light_short"
                        authCallback={this.responseMicrosoft} 
                    />
                </div>
                <div>
                    <MicrosoftLogin 
                        clientId={this.state.Keys.MICROSOFT_APPID} 
                        buttonTheme="light_short"
                        authCallback={this.responseMicrosoft} 
                        children={<button>Microsoft login</button>}
                    />
                </div>
                <div>
                    <InstagramLogin
                        clientId={this.state.Keys.INSTAGRAM_CLIENTID}
                        onSuccess={this.responseInstagram}
                        onFailure={this.responseInstagram}
                    >
                        <FontAwesome
                            name="instagram"
                        />
                        <span> Login with Instagram</span>
                    </InstagramLogin>
                </div>
                <FontAwesome name="rocket"/>
            </React.Fragment>

        );
    }
}

export default Login;
