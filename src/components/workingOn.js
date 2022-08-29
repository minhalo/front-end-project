import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import loading from "../assets/gif/working_on.gif"
import "./workingOn.scss"

class Workon extends Component {
    state = {
        expandedMenu: {}
    };



    render() {
        return (
            <Fragment>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img className='img-chatbot-login' src={loading} alt="loading..." />
                    <p>Working on...</p>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workon);
