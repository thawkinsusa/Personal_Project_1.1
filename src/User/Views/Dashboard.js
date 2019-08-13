import React, { Component } from 'react';
import { Redirect, Link, error } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../Container/userReducer';
import { getTeam } from '../../Team/Container/teamReducer';
import UserInfo from '../Components/Info/UserInfo'

class Dashboard extends Component {

    render() {
        console.log(this.props)
        let { user, error, redirect } = this.props;
        if (!user || error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        return (
            <div className='dashboard'>
                <UserInfo />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state.user;
}

export default connect(
    mapStateToProps,
    { getUser, getTeam }
)(Dashboard);