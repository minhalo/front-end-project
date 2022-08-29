import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { handleRegister } from '../../services/userService';

import '../Auth/register.scss'
import { ThemeProvider, Form } from 'react-bootstrap';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            cpassword: '',

            check_box: false,

            errCode: '',
            errMessage: '',
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnChangeCPassword = (event) => {
        this.setState({
            cpassword: event.target.value
        })
    }

    handleReg = async () => {
        this.setState({
            errCode: '',
            errMessage: '',
        })
        try {
            let data = await handleRegister(this.state.username, this.state.password, this.state.cpassword)
            if (data && data.errCode === 0 && this.state.check_box) {
                window.location.href = "/login"
            }
            else {
                if (!this.state.check_box) {
                    this.setState({
                        errCode: 4,
                        errMessage: "Please agree with policy",
                    })
                }
                else {
                    this.setState({
                        errCode: data.errCode,
                        errMessage: data.message,
                    })
                }

                ///
                if (this.state.errCode === 1 || this.state.errCode === 3) {
                    const input = document.getElementById('input-username-register');
                    input.style.border = '1px solid red';
                }
                else if (this.state.errCode === 2) {
                    const input = document.getElementById('input-password-register');
                    input.style.border = '1px solid red';
                    const inputss = document.getElementById('input-confirm-register');
                    inputss.style.border = '1px solid red';
                }
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }
    }

    policy = () => {
        this.setState({
            check_box: !this.state.check_box
        })
    }

    page_policy = () => {
        window.open("policy")
    }


    render() {
        return (
            <ThemeProvider>
                <div className='container_for_register d-flex justify-content-center align-items-center'>
                    <div className='display-out-login flex-column justify-content-center align-items-center'>
                        <h1 className='text-danger text-justify'>
                            ERROR: 403. Content: Access denied
                        </h1>
                        <h3 className='text-justify error_login'>
                            Reason: <br />
                            Out of pixel.
                            Please try to log again by another device.
                        </h3>
                    </div>
                    <div className='container_child_for_register d-flex flex-row justify-content-center'>
                        <div className='container_child_for_div_reg'>
                            <h3 className='text-center pt-3'>Register</h3>
                            <Form.Group className="mb-3 pt-4" >
                                <Form.Label className='username-label-register'>Username</Form.Label>
                                <input id='input-username-register' type="text" className="form-control form-input-register-username" placeholder="Recipient's username" aria-label="Recipient's username" onChange={(event) => this.handleOnChangeUsername(event)} />
                            </Form.Group>
                            <div className="text-register-error">
                                {this.state.errCode && (this.state.errCode === 3 || this.state.errCode === 1) ? <p>{this.state.errMessage}</p> : null}
                            </div>
                            <Form.Group className="mb-3" >
                                <Form.Label className='password-label-register'>Password</Form.Label>
                                <input id='input-password-register' type="text" className="form-control form-input-register-register" placeholder="Recipient's Password" aria-label="Recipient's Password" onChange={(event) => this.handleOnChangePassword(event)} />
                            </Form.Group>
                            <div className="text-register-error">
                                {this.state.errCode && this.state.errCode === 2 ? <p>{this.state.errMessage}</p> : null}
                            </div>
                            <Form.Group className="mb-3" >
                                <Form.Label className='cpassword-label-register'>Confirm Password</Form.Label>
                                <input id='input-confirm-register' type="text" className="form-control" placeholder="Recipient's Confirm password" aria-label="Recipient's Confirm Password" onChange={(event) => this.handleOnChangeCPassword(event)} />
                            </Form.Group>
                            <div className="form-check">
                                <input onClick={() => this.policy()} type="checkbox" className="form-check-input" />
                                <label className="form-check-label">Confirm policy, read in <i onClick= {()=>this.page_policy()} style={{color: 'blue',cursor: 'pointer'}} href='/policy'>here</i></label>
                            </div>
                            <div className="text-register-error">
                                {this.state.errCode && this.state.errCode === 4 ? <p>{this.state.errMessage}</p> : null}
                            </div>

                            <div className='d-flex justify-content-center align-items-center pt-4'>
                                <button onClick={() => this.handleReg()} className="button-50">Button 50</button>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
