const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { models } = require('../models')
require('dotenv').config();

isPasswordValid = (password) => {
	const validPassword = typeof password == 'string' &&
													password.trim() != '' &&
													password.trim().length >= parseInt(process.env.MIN_PW_LENGTH);
  return validPassword;
}

router.post('/signup', async (req, res, next) => {
	let userObj = req.body;
	if(!isPasswordValid(userObj.password)) next(new Error("Password not valid, must be at least 8 characters long"));
	else { 
		userObj.password = await bcrypt.hash(userObj.password, parseInt(process.env.SALT_ROUNDS));
		[ user, isCreated ] = await models.User.findByEmailOrCreate(userObj);
		if(isCreated){
			res.json({
				user,
				isCreated
			});
		}
		else next(new Error("User with this email already exists"));
	}
});

router.post('/signin', async (req, res, next) => {
	let userObj = req.body;
	let user = await models.User.findByEmail(userObj.email);
	if(!user) next(new Error("User with this email does not exist"));
	else {
		let isPasswordEqual = await bcrypt.compare(userObj.password, user.password);
		if(!isPasswordEqual) next(new Error("Password incorrect"));
		else {
			res.cookie('user_id', user.id, {
				httpOnly: true,
				secured: true,
				signed: true
			});
			res.json({
				msg: "Logged in"
			})
		}
	}
});

module.exports = router;