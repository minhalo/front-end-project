import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import '../header/header.scss'
import { ThemeProvider} from 'react-bootstrap';
import van from "../../assets/gif/van.gif"


class HeaderLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
  
    render() {

        return (
            <ThemeProvider>
                   <div className=' d-flex justify-content-center align-items-center'>
                        <img className='img-login-header' alt='login' src={van}/>
                   </div>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        //userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogin);
