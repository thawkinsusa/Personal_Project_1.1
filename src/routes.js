import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './User/Views/Dashboard'
import Heroes from './Hero/Views/Heroes'
import Login from './User/Components/Login/Login'
import Registration from './User/Components/Registration/RegistrationUser'
import App  from './App'
import TeamRegistration from './Team/Components/Registration/TeamRegistration';
import Notifications from './Notifications/Components/Notifications/Notifications'

export default(
    <Switch>
        <Route exact path = '/' component={App}/>
        <Route path = '/dashboard' component={Dashboard}/>
        <Route path = '/register' component={Registration}/>
        <Route path = '/heroes' component={Heroes}/>
        <Route path = '/login' component={Login}/>
        <Route path = '/teamRegistration' component={TeamRegistration}/>
        <Route path = '/notifications' component={Notifications}/>
    </Switch>
)