// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		trim: true,
		minlength: [2, "First name must be at least two characters long"],
		required: [true, "First name is required"]
	},
	last_name: {
		type: String,
		trim: true,
		minlength: [2, "Last name must be at least two characters long"],
		required: [true, "Last name is required"]
	},
	username: {
		type: String,
		trim: true,
		minlength: [6, "Username must be at least six characters long"],
		required: [true, "Username is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		minlength: [8, "Email must be at least 8 characters long"],
		maxlength: [32, "Email cannot be longer than 32 characters"],
		validate: {
			validator: (value) => {
				return /^([A-Za-z0-9._\-]+)@([a-zA-Z0-9._\-]+)\.([a-zA-Z]+)$/.test(value);
			},
			message: "Email must be a valid format"
		},
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [8, "Password must be at least 8 characters long"],
		validate: {
			validator: (value) => {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
			},
			message: "Password failed validation, you must have at least 1 number, uppercase, and special character"
		}
	},
	birthday: {
		type: Date,
		required: [true, "Must enter a birthday"],
		validate: {
			validator: (dob) => {
				let birthday = new Date(dob);
				let currDate = new Date();
				let difference = currDate - birthday;
				let age = Math.floor(difference/31536000000)
				return (age >= 18)
			},
			message: "Must be 18 or older to register"
		}
	},
	bicycles: [ { 
		type: Schema.Types.ObjectId, ref: 'Bicycle' 
	}]
	},
	{ timestamps: true }
);

var User = mongoose.model('User', UserSchema);