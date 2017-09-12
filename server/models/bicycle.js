// require mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var BicycleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required"]
	},
	description: {
		type: String,
		maxlength: [200],
		required: [true, "Description is required"]
	},
	price: {
		type: Number,
		min: [1, "Price must be at least $1"],
		required: [true, "Price is required"]
	},
	location: {
		type: String,
		required: [true, "Location is required"]
	},
	imageURL: {
		type: String,
		required: [true, "Image is required"]
	},
	_user: {
		type: Schema.Types.ObjectId, ref:'User'
	}
	},
	{ timestamps: true }
);

var Bicycle = mongoose.model('Bicycle', BicycleSchema);