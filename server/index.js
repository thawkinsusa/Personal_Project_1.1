require('dotenv').config({ path: __dirname + './../.env' });
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const hc = require('./controllers/heroesController')
const uc = require('./controllers/usersController')
const tc = require('./controllers/teamsController')
const initSession = require('./middleware/initSession');
const authCheck = require('./middleware/authCheck');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
console.log('conneciton string', CONNECTION_STRING);

const app = express();
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365
    }
  })
);
massive(CONNECTION_STRING).then(db => {
  console.log('db connection successful');
  app.set('db', db);

  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
})

app.use(initSession);

// users
app.post('/api/register', uc.register);
app.post('/api/login', uc.login);
app.get('/api/user', authCheck, uc.getUser);
app.get('/api/users', uc.getUsers);
app.delete('/api/logout', uc.logout);
// heroes
app.get('/api/teamHeroesByUserId/:id', hc.getHeroesTeamByUserId);
app.delete('/api/deleteTeamHero/:heroId', hc.deleteTeamHero);
app.get('/api/allHeroes', hc.getAllHeroes);
app.get('/api/heroById/:id', hc.getHeroesById);
app.put('/api/addHeroMember', hc.addTeamHero)
app.delete('/api/logoutHero', hc.logoutHero);
//teams
app.post('/api/teamSignup', tc.create);
app.get('/api/teams/:id', tc.getTeam);
app.delete('/api/deleteTeamMember/:userId', tc.deleteTeamMember);
app.get('/api/allTeams', tc.getAllTeams);
app.get('/api/teamMembers/:id', tc.getTeamMembers);
app.put('/api/addTeamMember', tc.addTeamMember)
app.delete('/api/logoutTeam', tc.logoutTeam);