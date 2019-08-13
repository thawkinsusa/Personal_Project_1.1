
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../Container/userReducer';
import { Redirect } from 'react-router-dom';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    loginUser = () => {
        this.props.login(this.state.username, this.state.password);
    };

    render() {
        let { username, password } = this.state;
        let { user } = this.props;
        if (user.loggedIn) return <Redirect to="/heroes" />;
        return (
            <div className='login-container'>
                <div className='login-title'>
                    Login
                    </div>
                <div className='login-inside'>
                    Username:
            <input className='input-user-sub' type="text"
                        value={username}
                        name="username"
                        onChange={this.handleChange}></input>
                    Password:
            <input className='input-user-sub' type="password"
                        value={password}
                        name="password"
                        onChange={this.handleChange}></input>
                </div>
                <button className='login-button' onClick={this.loginUser}>Login</button>
                <button className='login-button' onClick={this.loginUser}>Login</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.user;
}

export default connect(
    mapStateToProps,
    { login }
)(Login);