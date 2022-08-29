import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { ThemeProvider } from 'react-bootstrap';


class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
   
    render() {
        return (
            <ThemeProvider>
               <h1>Policy</h1>
               <p>1. No</p>
               <p>2. No</p>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
