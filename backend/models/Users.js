const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	Register_as:{
		type:String,
		required:false
	},
	Password:{
		type:String,
		required:false
	},
	bio:{
		type:String,
		required:false
	},
	contact:{
		type:String,
		required:false
	},
	Education:[
		{
			institutename:{
				type :String,
				required:false
			},
			startyear:{
				type : String,
				required:false
			},
			endyear:{
				type:String,
				required:false
			}

		}
	],
	skill:[],
	Appliedjob:[
		{
			jobid:{
				type:String,
				required:false
			},
			jobtitle:{
				type:String,
				required:false
			},
			dateofjoining:{
				type:String,
				required:false
			},
			salary:{
				type:String,
				required:false
			},
			nameofrecruiter:{
				type:String,
				required:false
			},
			status:{
				type:String,
				default:"applied",
				required:false
			},
			rating:{
				type:String,
				required:false
			}

		}
	]

});
module.exports = User = mongoose.model("Users", UserSchema);
