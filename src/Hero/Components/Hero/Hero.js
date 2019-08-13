
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addHero } from '../../Container/heroReducer'
class Hero extends Component {

    addHero = () => {
        let userId = this.props.user.id
        let  teamId  = this.props.team.id
        let  heroId  = this.props.hero.id;
        this.props.addTeamHero(userId, teamId, heroId)
        
    };

    render() {
        console.log('props', this.props);


        return (

            <div className='hero-list'>

                <div className='hero'>
                    <p><button className='add-hero' onClick={this.addHero}>
                        <img src={this.props.hero.hero_image} className='image-container' alt='' />
                    </button></p>
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
    { addHero }
)(Hero);