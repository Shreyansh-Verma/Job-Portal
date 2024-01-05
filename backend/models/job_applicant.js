const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const job_applicant_schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	Institute_Name:{
		type: String,
		required: false
	},
	Start_year:{
		type:Number,
		required:false
    },
    End_year:{
        type:Number,
        required:false
    }
});

module.exports = User = mongoose.model("Users", UserSchema);