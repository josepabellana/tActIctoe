const bcrypt = require('bcrypt');
const { Users } = require('../models')

async function register (req, res) {
  try {
    const { email, firstName, lastName, password } = req.body;
    const user = await Users.findOne({where: {email}});
    if (user) return res.status(409).send({error: '409', message: 'User already exists'})
    if (password === '') throw new Error(); // Todo: give message
    const hash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      ...req.body,
      password: hash
    });
    req.login(user, function(error) {
      if (error) throw new Error(); // Todo: give message
    })
    res.status(201).json("User created");
  } catch (error) {
    console.log(error);
    res.status(500).json({"statusCode": 200, "message": error});
  }
}

function logout (req, res) {
  try {
    if (req.user) {
      req.logout(function(error) {
        if (error) throw new Error();
      })
      res.status(200).json('User logged out')
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({"statusCode": 200, "message": error});
  }
}

module.exports = {register, logout};