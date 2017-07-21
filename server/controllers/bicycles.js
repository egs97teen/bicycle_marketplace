var mongoose = require('mongoose');
var Bicycle = mongoose.model('Bicycle');
var User = mongoose.model('User');

module.exports = {
	create: (req, res) => {
		if (req.session.user_id) {
			User.findOne({_id: req.session.user_id }, (err, user) => {
				if (err) {
					console.log("ERROR FINDING USER");
					var errors = [];
					for (var i in err) {
						errors.push(err[i].message);
					}
					return res.status(400).send(errors);
				} else {
					var bicycle = new Bicycle(req.body);
					bicycle._user = user._id;

					bicycle.save( (err, saved_bike) => {
						if (err) {
							console.log("BIKE NOT SAVED");
							var errors = [];
							for (var i in err) {
								errors.push(err[i].message);
							}
							return res.status(400).send(errors);
						} else {
							console.log("SUCCESSFULLY SAVED BIKE", bicycle);
							user.bicycles.push(bicycle);

							user.save( (err) => {
								if (err) {
									console.log("ERROR SAVING USER WITH BIKE", err);
									var errors = [];
									for (var i in err) {
										errors.push(err[i].message);
									}
									return res.status(400).send(errors);
								} else {
									console.log("SUCCESSFULLY ADDED BIKE TO USER", user);
									return res.json(true);
								}
							})
						}
					})
				}
			})
		} else {
			console.log("NO SESSION");
			let errors = ["No session"];
			return res.status(400).send(errors);
		}
	},

	find_all: (req, res) => {
		Bicycle.find({}, (err, bikes) => {
			if (err) {
				console.log("ERROR GETTING ALL BIKES");
				var errors = [];
				for (var i in err) {
					errors.push(err[i].message);
				}
				return res.status(400).send(errors);
			} else {
				console.log("GOT ALL BIKES");
				return res.json(bikes);
			}
		})
	},

	user_bikes: (req, res) => {
		if (req.session.user_id) {
			Bicycle.find({_user: req.session.user_id}).sort('createdAt').exec( (err, bikes) => {
				if (err) {
					console.log("ERROR GETTING ALL BIKES");
					var errors = [];
					for (var i in err) {
						errors.push(err[i].message);
					}
					return res.status(400).send(errors);
				} else {
					console.log("BIKE QUERY", bikes);
					return res.json(bikes);
				}
			})
		}
	},

	update: (req, res) => {
		Bicycle.findOne({_id: req.params.bike_id}, (err, bike) => {
			if (err) {
				console.log("ERROR FINDING THE BIKE");
				var errors = [];
				for (var i in err) {
					errors.push(err[i].message);
				}
				return res.status(400).send(errors);
			} else {
				console.log("FOUND THE BIKE TO BE UPDATED");
				var bicycle = new Bicycle(req.body);
				bicycle.save( (err) => {
					if (err) {
						console.log("ERR")
					} else {
						return res.json(true);
					}
				})
			}
		})
	},

	delete: (req, res) => {
		Bicycle.remove({_id: req.params.bike_id}, (err, bike) => {
			if (err) {
				var errors = [];
				for (var i in err) {
					errors.push(err[i].message);
				}
			} else {
				res.json(true);
			}
		})
	}
}