import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from '../../Container/userReducer';
import { Redirect } from 'react-router-dom';
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import { Notify } from 'react-redux-notify';
import 'react-redux-notify/dist/ReactReduxNotify.css';
const mySuccessNotification = {
    message: 'You have been logged in!',
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: 10000,
    canDismiss: true,
    icon: <i className="fa fa-check" />
  }

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            user_password: '',
            user_email: '',
            user_image: '',
            user_creation_date: ''
        }
    }

    handleClick(){
        const {createNotification} = this.props;
        createNotification(mySuccessNotification);
      }
    
    handleChange = e => {
        let { name, value } = e.target;
        this.time()
        this.setState({ [name]: value });
    };

    time = () => {
        let d = new Date();
        let n = d.toLocaleDateString();
        return this.setState({ user_creation_date: n })
    };

    registerUser = () => {
        let { user_name, user_password, user_email, user_image, user_creation_date } = this.state;
        this.props.register({user_name, user_password, user_email, user_image, user_creation_date});

    };

    render() {
        let { Notifications } = this.props
        console.log('this is props ', this.props);
        console.log(Notifications);
        let { user } = this.props
        if (user.user.id) return <Redirect to="/dashboard" />;
        let { user_name, user_password, user_email, user_image } = this.state
        return (
            <div className='register-primary-container'>
                <Notify/>
                <div className='register-title'>
                    Register
            </div>
                <div className='input-container'>
                    Username:
                <input className='registration-input' type="text"
                        value={user_name}
                        name="user_name"
                        onChange={this.handleChange}></input>
                    Password:
                <input className='registration-input' type="password"
                        value={user_password}
                        name="user_password"
                        onChange={this.handleChange}></input>
                    Email:
                <input className='registration-input' type="text"
                        value={user_email}
                        name="user_email"
                        onChange={this.handleChange}></input>
                    User Image:
                <input className='registration-input' type="text"
                        value={user_image}
                        name="user_image"
                        onChange={this.handleChange}></input>
                </div>
                <button onClick={this.registerUser}>Dispatch Notification!</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return ({ user: state.user })
}

const mapDispatchToProps = dispatch => ({
    createNotification: (config) => {
        dispatch(createNotification(config))
    },
    register: (payload) => {
        dispatch(register(payload))
    }
  })
   

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);