var express = require("express");
var router = express.Router();
const DButils = require("../DB_modules/DButils");
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/Register", async (req, res, next) => {
  try {
    const users = await DButils.execQuery("SELECT userName FROM Users");
    if (users.find((x) => x.username === req.body.username))
      throw { status: 409, message: "Username taken" };
    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    await DButils.execQuery(
      `INSERT INTO Users VALUES ('${req.body.username}', '${req.body.firstName}', '${req.body.lastName}',
        '${req.body.country}', '${hash_password}', '${req.body.email}', '${req.body.image_url}')`
    );
    res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    next(error);
  }
});

// LOGIN
router.post("/Login", async (req, res, next) => {
  try {
    const users = await DButils.execQuery("SELECT userName FROM Users");
    if (!users.find((x) => x.userName === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };
    const user = (
      await DButils.execQuery(
        `SELECT * FROM Users WHERE userName = '${req.body.username}'`
      )
    )[0];
    if (!bcrypt.compareSync(req.body.password, user.pass)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }
    // TO DO extra: MORE SECURE COOKIE
    req.session.id = user.userName;
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

// LOGOUT
router.post("/Logout", function (req, res) {
  if (!(req.session && req.session.id)) res.status(401).send('unauthorized');
  else {
    req.session.reset();
    res.send({ success: true, message: "logout succeeded" });
  }
});

module.exports = router;