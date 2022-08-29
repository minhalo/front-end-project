import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';


class System extends Component {
    render() {
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
