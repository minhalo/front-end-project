import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import loading from "../assets/gif/spinner.gif"
import "./loadingIcon.scss"

class Icon extends Component {
    state = {
        expandedMenu: {}
    };



    render() {
        return (
            <Fragment>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img src={loading} alt="loading..." />
                    <p className='loading-text-login'>Loading...</p>
                    <h3>Hello, we are <i className='loading-text-login-bold'>FLAME</i></h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
