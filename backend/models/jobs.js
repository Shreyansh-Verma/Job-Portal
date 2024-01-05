const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	title: {
		type: String,
		required: false
    },
    name: {
		type: String,
		required: false
    },
    email: {
		type: String,
		required: false
    },
    maxposition: {
		type: String,
		required: false
    },
    maxpost: {
		type: String,
		required: false
  },
  acceptedusers:{
    type:Number,
    default:0
  },
	date:{
        type: Date,
		required: false
    },
    skill:[],
    time : { 
    type: Number, 
    default: (new Date()).getTime() ,
    required:false
    },
    duration: {
		type: String,
		required: false
    },
    typeofjob: {
		type: String,
		required: false
	},
    salary: {
		type: String,
		required: false
    },
    Rating: {
		type: Number,
		required: false
    },
    deadline:{
      type: Date,
      required: false
    },
    appleuser:[
        {
          dateofjoin:{
            type:Date
          },
          jobtitle:{
            type:String
          },
          jobtype:{
            type:String
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
            name:{
              type:String,
              required:false
            },
            rating:{
              type:Number,
              required:false
            },
            dateapplied:{
              type:Date,
              required:false
            },
            sop:{
            type:String,
            required: false
            },
            emailuser:{
                type:String,
                required:false
            },
            status:{
              type:String,
              default:"applied"
            }
        }
    ]
})
module.exports =jobs = mongoose.model("jobs", UserSchema);
