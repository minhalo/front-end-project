import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { ThemeProvider } from 'react-bootstrap';
import '../component/menu.scss'

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activate: false
        }

    }

    logout = () => {
        this.props.processLogout()
    }

    active = () => {
        this.setState({
            activate: !this.state.activate
        })
    }


    async componentDidMount() {
        var scrollableElement = document.body; //document.getElementById('scrollableElement');

        scrollableElement.addEventListener('wheel', checkScrollDirection);

        async function checkScrollDirection(event) {
            if (checkScrollDirectionIsUp(event)) {
                document.getElementById("homepage").style.height = "50px";
                await new Promise(resolve => setTimeout(resolve, 150));
                document.getElementById("testt").style.display = "block";
            } else {
                document.getElementById("homepage").style.height = "0px";
                document.getElementById("testt").style.display = "none";


            }
        }

        function checkScrollDirectionIsUp(event) {
            if (event.wheelDelta) {
                return event.wheelDelta > 0;
            }
            return event.deltaY < 0;
        }
    }



    render() {
        return (
            <ThemeProvider>
                {/* <button onClick={() => this.logout()}>ok</button> */}
                <div className='container-homepage'>
                    <div id='homepage' className='header-homepage'>
                        <p id='testt'>ok</p>
                    </div>
                    <div className='test'></div>
                    <div className='test'></div>
                    <div className='test'></div>
                </div>
            </ThemeProvider>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
