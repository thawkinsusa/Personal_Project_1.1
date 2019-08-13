
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { teamRegistration } from '../../Container/teamReducer';
import { Redirect } from 'react-router-dom'
class TeamRegistration extends Component {
    constructor() {
        super()
        this.state = {
            team_name: '',
            team_image: '',
            team_creation_date: ''

        }
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
        this.time()
    };

    time = () => {
        let d = new Date();
        let n = d.toLocaleDateString();
        return this.setState({ team_creation_date: n })
    }

    pageRedirect = () => {
        if (this.props.teamRegistration())
            return <Redirect to='/teamPage' />
    }

    teamRegistration = () => {
        let { team_name, team_image, team_creation_date } = this.state;
        let { id } = this.props.user.user
        this.props.teamRegistration(team_name, team_image, team_creation_date, id);

    };

    render() {
        let { team_name, team_image } = this.state
        let { team, error, redirect, user } = this.props;
        if (team.team[0] || error || redirect) return <Redirect to="/heroes" />;
        if (!user || error || redirect) return <Redirect to="/login" />;
        return (
            <div className='team-registration'>
                <div className='team-registration-title'>
                    Team Signup
            </div>
                <div className='inputs-user'>
                    Team Name:
                <input className='input-user-sub' type="text"
                        value={team_name}
                        name="team_name"
                        onChange={this.handleChange}></input>
                    Team Image:
                <input className='input-user-sub' type="text"
                        value={team_image}
                        name="team_image"
                        onChange={this.handleChange}></input>
                </div>
                <button onClick={this.teamRegistration}>Register</button>
            </div>
        )
    }
}
        
function mapStateToProps(state) {
    return { team: state.team, user: state.user };
}

export default connect(
    mapStateToProps,
    { teamRegistration }
)(TeamRegistration);