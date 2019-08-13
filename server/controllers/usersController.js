const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  login: async function (req, res) {
    let { user_name, user_password, user_email, user_image, user_creation_date } = req.body;
    const db = req.app.get('db');
    let [existingUser] = await db.get_user_by_username(user_name);
    if (!existingUser) return res.status(401).send('Username not found');
    let result = await bcrypt.compare(user_password, existingUser.user_password);
    if (result) {
      req.session.user = {
        user_name: existingUser.user_name,
        id: existingUser.id,
        user_email: existingUser.user_email,
        user_image: existingUser.user_image,
        user_creation_date: existingUser.user_creation_date,
        loggedIn: true
      };
      res.send(req.session.user);
    } else res.status(401).send('Username or password incorrect');
  },
  async register(req, res) {
    let { user_name, user_password, user_email, user_image, user_creation_date } = req.body;
    console.log('req',req.body)
    const db = req.app.get('db');
    let [existingUser] = await db.get_user_by_username([user_name]);
    if (existingUser) return res.status(400).send('Username already exists');
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(user_password, salt);
    let [user] = await db.create_user([user_name, hash, user_email, user_image, user_creation_date]);
    console.log('hit user creation 2', user);
    req.session.user = { user_name: user.user_name, user_email, user_image, user_creation_date, id: user.id, loggedIn: true  };
    console.log('hit user creation 3', req.session.user);
    res.send(req.session.user);
  },
  async logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser(req, res) {
    res.send(req.session.user);
  },

  getUsers: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_users()
      .then(users => res.status(200).send(users))
      .catch(err => {
        res.status(500).send({ errorMessage: "get users is broken !@#$" });
        console.log(err)
      });
  }
}
