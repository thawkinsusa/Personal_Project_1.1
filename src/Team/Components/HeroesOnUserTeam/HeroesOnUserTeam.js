import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTeamMember } from '../../Container/teamReducer';
class HeroesOnUserTeam extends Component {


    addUser = () => {
        let  userId  = this.props.user.id;
        let  teamId  = this.props.teamId;
        this.props.addTeamMember(userId, teamId)
        
    };

    render() {


        return (
            <div className="users-container">

                <div className='user-list'>

                    <div className='user'>
                        <p><img src={this.props.user.user_image} className='image-container' /> User Name: {this.props.user.user_name}<button onClick={this.addUser}> Add user to team </button></p>
                    </div>
                </div>

            </div>
        )
    }

}






export default connect(
    null,
    { addTeamMember }
)(HeroesOnUserTeam);