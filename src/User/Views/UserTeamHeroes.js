import React, { Component } from 'react';
import { connect } from 'react-redux';
import Heroes from '../../../Team/Components/HeroesOnUserTeam/HeroesOnUserTeam'
import { getUsers } from '../../Container/userReducer';
class UserTeamHeroes extends Component {
    constructor() {
        super()
        this.state = {
            heroes: []
        }
    }

    componentDidMount() {
        this.props.get()
            .then(res => {
                console.log('res', res);
                this.setState({ heroes: res.value });
            })
    }

    render() {
        console.log('props on already added heroes', this.props);
        let { users } = this.state
        return (
            <div className="hero-container">
                <div>{users.map(heroes => {
                    return (<div>
                        <Heroes heroes={heroes} key={heroes.id} teamId={this.props.match.params.teamId}></Heroes>
                    </div>)
                })}
                </div>
            </div>

        )
    }

}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(
    mapStateToProps,
    { getUsers }
)(UserTeamHeroes);