import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../Container/userReducer';
import { logoutTeam } from '../../Team/Container/teamReducer';
import { logoutHero } from '../../Hero/Container/heroReducer';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })

    }
    localLogOut = async () => {
        await this.props.logout()
        await this.props.logoutTeam()
        await this.props.logoutHero()
        this.props.history.push('/login')
    }

    render() {

        return (
            <div>
                <header className='header'>
                    <div className='logo'>Battle.Me</div>
                    <nav className='menu-options'>
                        <Link to='/register'><button className='nav-link'> Register </button></Link>
                        <Link to='/teamRegistration'><button className='nav-link'> Team Creator </button></Link>
                        <Link to='/dashboard'><button className='nav-link'> Dashboard </button></Link>
                        <Link to='/heroes'><button className='nav-link'> Heroes </button></Link>
                        <Link to='/login'><button className='nav-link'> Login </button></Link>
                        <button onClick={this.localLogOut} className="nav-link">Logout</button>
                    </nav>
                    <button className='menu-btn-content' onClick={this.toggleMenu}>
                        <i class="fa fa-bars"></i>
                    </button>
                </header>
                {
                    this.state.showMenu
                        ? (<div className="nav-drop-down">
                            <button onClick={this.localLogOut} className="nav-link-drop">Logout</button>
                        </div>
                        ) : (null)}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { state };
}

export default withRouter(connect(
    mapStateToProps,
    { logout, logoutTeam, logoutHero }
)(Nav));