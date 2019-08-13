import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hero from '../Components/Hero/Hero'
import { getAllHeroes } from '../Container/heroReducer';
import { Redirect } from 'react-router-dom';

class Heroes extends Component {
    constructor() {
        super()
        this.state = {
            heroes: []
        }
    }
    componentDidMount() {

        this.props.getAllHeroes()
            .then(res => {
                console.log('res', res);
                this.setState({ heroes: res.value });
            })

    }

    render() {
        console.log(this.props);
        let { heroes } = this.state
        let { user, error, redirect} = this.props
        if (!user.user.loggedIn) return <div>Loading</div>;
        if (!user || error || redirect) return <Redirect to="/login" />;
        return (


                <div className='hero-container'>{heroes.map(hero => {
                    return (<div>
                        <Hero hero={hero} key={heroes.id} ></Hero>
                    </div>)
                })}
                </div>


        )
    }

}

function mapStateToProps(state) {
    return { user: state.user, heroes: state.heroes };
}

export default connect(
    mapStateToProps,
    { getAllHeroes }
)(Heroes);