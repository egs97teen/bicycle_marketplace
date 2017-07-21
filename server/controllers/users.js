var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require("bcrypt");

module.exports = {
	register: (req, res) => {
		User.findOne({email: req.body.email}, (err, check_email) => {
			if (check_email == null) {
				User.findOne({username: req.body.username}, (err, check_username) => {
					if (check_username == null){
						var user = new User(req.body);
						user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
						user.save( (err, saved_user) => {
							if (err) {
								console.log("ERROR SAVING", err);
								var errors = [];
								for (var i in err) {
									errors.push(err[i].message);
								}
								return res.status(400).send(errors);
							} else {
								console.log("SUCCESSFULLY SAVED USER", user)
								req.session.user_id = saved_user._id;
								return res.json(saved_user);
							}
						})
					} else {
						console.log("ERROR SAVING: Username already registered");
						let errors = ["Username already registered"];
						return res.status(400).send(errors);
					}
				})
			} else {
				console.log("ERROR SAVING: Email already registered");
				let errors = ["Email already registered"];
				return res.status(400).send(errors);
			}
		})
	},

	login: (req, res) => {
		User.findOne({email: req.body.email}, (err, user_login) => {
			if (user_login == null) {
				console.log("ERROR IN LOGIN: Email not registered");
				let errors = ["Email is not registered"];
				return res.status(400).send(errors);
			} else {
				if (bcrypt.compareSync(req.body.password, user_login.password)) {
					req.session.user_id = user_login._id;
					console.log("PASSWORDS MATCH");
					return res.json(user_login);
				} else {
					let errors = ["Enter the correct password"];
					return res.status(400).send(errors);
				}
			}
		})
	},

	check_session: (req, res) => {
		if(req.session.user_id) {
			User.findOne({_id: req.session.user_id}, (err, user) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					return res.json(user);
				}
			})
		} else {
			return res.status(400).send(err);
		}
	},

	find: (req, res) => {
		User.findOne({_id: req.session.user_id}, (err, user) => {
			if (err) {
				var errors = []
				for (var i in err) {
					errors.push(err[i].message)
				}
				return res.status(400).send(err);
			} else {
				return res.json(user);
			}
		})
	},

	logout: (req, res) => {
		req.session.destroy();
		return res.json(true);
	}
}