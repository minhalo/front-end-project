import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { handleLogin } from '../../services/userService';
import { Form, ThemeProvider, Image } from 'react-bootstrap';
import Background_image_login from "../../assets/images/animation.webp"
import * as actions from "../../store/actions";
import '../Auth/login.scss'
import Icon from '../../components/loadingIcon';
import Avatar from 'react-avatar';
import WorkingOn from '../../components/workingOn';
import Header from '../header/header';


class Login extends Component {
    constructor(props) {
        super(props);
        this.arrayrandom = {
            random_for_login: [
                "Not provide your account to anyone else",
                "There many way to get your account, be careful",
                "Let change your account once time per week"
            ]
        }
        this.state = {
            username: '',
            password: '',
            errMessage: '',
            errCode: '',
            isOpen: false,
            check: Math.floor(Math.random() * this.arrayrandom.random_for_login.length),
            eye: 1,
            checkdatatype: '',
            loadingPage: false,
            isActive: false
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

    handleLogins = async () => {
        this.setState({
            errCode: '',
            errMessage: '',
        })
        try {

            let data = await handleLogin(this.state.username, this.state.password);
            if (data.errCode === 0) {
                this.setState({
                    loadingPage: true,
                })
                await new Promise(resolve => setTimeout(resolve, 3000));
                this.props.userLoginSuccess(data.access_token)
            }
            else {
                this.setState({
                    errCode: data.errCode,
                    errMessage: data.message,
                })
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


    chatbot = () => {
        this.setState({
            isActive: true
        })
    }

    chatbotreverve = () => {
        this.setState({
            isActive: false
        })
    }

    turn_password_to_hide = () => {
        this.setState({
            eye: 0
        })
        Array.prototype.slice.call(document.querySelectorAll('input[type="password"]'))
            .forEach(function (elt) {
                elt.setAttribute('type', 'show_text');
            });
    }

    turn_password_to_show = () => {
        this.setState({
            eye: 1
        })
        Array.prototype.slice.call(document.querySelectorAll('input[type="show_text"]'))
            .forEach(function (elt) {
                elt.setAttribute('type', 'password');
            });
    }

    render() {
        return (
            <ThemeProvider >
                <div className="background_for-Login">

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
                    <div className="d-flex flex-row">
                        <Image className='Background_image_login col-6' src={Background_image_login} />
                        <div className='d-flex flex-column col-6  justify-content-center container-right-login align-items-center'>
                            <Header />
                            {this.state.loadingPage ? <Icon /> :

                                <div className='block-container d-flex flex-column justify-content-center align-items-center'>
                                    <div className='Login_header'>
                                        <h3 >Login</h3>
                                    </div>
                                    <div className='form-container-login'>
                                        <Form.Group className="mb-3" controlId="username">
                                            <Form.Label className='username-label-login'>Username</Form.Label>
                                            <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" onChange={(event) => this.handleOnChangeUsername(event)} />
                                        </Form.Group>

                                        <div className='text-login-error'>
                                            {this.state.errCode &&  this.state.errCode === 2 ? <p>{this.state.errMessage}</p> : null}
                                        </div>

                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label className="password-label-login">Password</Form.Label>
                                            <div className='input-group'>
                                                <input type="password" className="form-control" placeholder="Recipient's password" aria-label="Recipient's password" onChange={(event) => this.handleOnChangePassword(event)} />
                                                <span className="input-group-text d-flex flex-column justify-content-center align-items-center span-eye">
                                                    {this.state.eye === 1 ?
                                                        <i className='fa fa fa-eye' onClick={() => this.turn_password_to_hide()} /> :
                                                        <i className='fa fa-eye-slash' onClick={() => this.turn_password_to_show()} />
                                                    }
                                                </span>
                                            </div>
                                        </Form.Group>

                                        <div className='text-login-error'>
                                            {this.state.errCode && (this.state.errCode === 1 || this.state.errCode === 3) ? <p>{this.state.errMessage}</p> : null}
                                        </div> 

                                        <Form.Group className='d-flex flex-column pb-3'>
                                            <a href='/test' className='text_for_change_password'>Forgot password</a>
                                            <a href="/register" className='text_for_change_create_account'>Create account</a>
                                        </Form.Group>
                                        <div className='d-flex flex-column'>
                                            <button className="button-49" onClick={() => this.handleLogins()}>Button</button>
                                            <Form.Text className="text_for_advice_login text-muted pt-2">
                                                {this.arrayrandom.random_for_login[this.state.check]}
                                            </Form.Text>
                                        </div>
                                    </div>

                                    <div className='chatbot-to-login' id='chatbot'
                                        style={{
                                            height: this.state.isActive ? "200px" : "3.5vh",
                                            background: "white"
                                        }}
                                    >
                                        <div
                                            className='header-chatbox-login'
                                            style={{
                                                fontSize: "2vh",
                                                display: "flex",
                                                paddingLeft: "10px",
                                                alignItems: "center"
                                            }}
                                        >
                                            <div
                                                onClick={() => this.chatbot()}
                                                className='d-flex flex-row align-items-center'
                                                style={{
                                                    width: "170px"
                                                }}
                                            >

                                                <Avatar
                                                    name="Admin" size="17" round={true} />
                                                <p
                                                    style={{
                                                        marginTop: "12px",
                                                        paddingLeft: "10px",
                                                        fontSize: "12px"
                                                    }}
                                                >Connect to Admin
                                                </p>
                                            </div>

                                            <div
                                                style={{
                                                    display: "block",
                                                    textDecoration: "none",
                                                    backgroundRepeat: "no-repeat"
                                                }}
                                                onClick={() => this.chatbotreverve()}
                                            >
                                                <i className="fa fa-times" aria-hidden="true" />
                                            </div>
                                        </div>
                                        <div className='chatbox-login-chatbot'>
                                            <div className='orange-message-login'>
                                                <div className='chat-orange-login'>Hi, I'm Minh</div>
                                            </div>
                                            <div className='blue-message-login'>
                                                <div className='chat-blue-login'>Hello Minh, I'm Duong</div>
                                            </div>
                                        </div>
                                        <div className='chat-for-chatbox-input d-flex justify-content-center align-items-center'>
                                            <div className='container-for-input-login d-flex justify-content-center align-items-center'>
                                                <input className='input-login-chatbox' placeholder='Text something' />
                                            </div>
                                        </div>
                                        {this.state.isActive === false ? null : <div className='working-on '><WorkingOn /></div>}

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </ThemeProvider >
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
