import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let { user, error, redirect } = this.props;
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        return (
            <div className='user-container'>
                <img src={user.user_image} className='user-img' alt='' />>
                            <div className='user-info-container'>
                    <div className='user-info'>username: {user.user_name} Email: {user.user_email} Member since: {user.user_join_date}</div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state.user;
}

export default connect(
    mapStateToProps,
)(UserInfo);