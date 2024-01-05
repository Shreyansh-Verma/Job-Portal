var express = require("express");
var router = express.Router();
const { body, validationResult } = require('express-validator');

// Load User model
const User = require("../models/Users");
const jobs = require("../models/jobs");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});
router.post("/acceptdatusr", (req, res) => {
  console.log("req.body", req.body);
  var id = req.body.id;
  var email=req.body.email
    console.log("printing the user below")
    console.log(id)
    console.log("just checking")
    User.findOne({ email }).then(user=>{
      var jobss=user.Appliedjob
      var fakuser = user
      for(var i=0;i<user.Appliedjob.length;i++)
      {
        if(user.Appliedjob[i].jobid===id)
        {
          if(req.body.flag==='0')
          {// console.log("flag=0")
            //console.log(parseInt(req.body.maxpost)-1)
          //fakuser.maxpost = (parseInt(req.body.maxpost)-1)
          jobss[i].status="Accepted"
          }
          else
          {
            jobss[i].status="Rejected"
          }
        }
      }
    console.log(jobss)
    fakuser.Appliedjob=jobss
    console.log(fakuser)
    let inventory={
      applieduser:''
    }
   // console.log()
    console.log(inventory)
    User.findByIdAndUpdate(user._id, fakuser
    ).then(user=>res.send(user))
    })
})
router.post("/acceptdatjob", (req, res) => {
  console.log("req.body", req.body);
  var id = req.body.id;
  var email=req.body.email
    console.log("printing the user below")
    console.log(id)
    console.log("just checking")
    jobs.findById(id,function(err,user){
      var jobss=user.appleuser
      var fakuser = user
      for(var i=0;i<user.appleuser.length;i++)
      {
        if(user.appleuser[i].emailuser===email)
        {
          if(req.body.flag==='0')
          {
          jobss[i].status="Accepted"
          jobss[i].dateofjoin=Date.now()
          jobss[i].jobtitle=user.title
          jobss[i].jobtype=user.typeofjob
          console.log("entering here")
          console.log(user.email)
          fakuser.maxpost = (parseInt(user.maxpost)-1)
          fakuser.acceptedusers = (parseInt(user.acceptedusers)+1)
          }
          else
          {
            jobss[i].status="Rejected"
          }
  
        }
      }
      fakuser.appleuser=jobss
    console.log(jobss)
    fakuser.Appliedjob=jobss
    console.log(fakuser)
    let inventory={
      applieduser:''
    }
    console.log()
    console.log(inventory)
    jobs.findByIdAndUpdate(id, fakuser
    ).then(user=>res.send(user))
    })
})

//Get user by email id
router.get("/getu" , function(req, res) {
    //const varemail = req.email
    //User.findOne({ varemail }).then(user=>{
    //    res.json(user)
    //})
    var email=req.body.email
    User.findOne({email}).then(user=>{
      res.send(user)
    })
  /*  User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})*/
});
router.post("/editjob", (req, res) => {
  console.log("req.body", req.body);
  console.log("inside updateappliant route")
  const email=req.body.id
  jobs.findById(email,function(err,user){ 
    console.log(user)
    const id=user._id
    var inventory = user
    if(req.body.maxposition!=='')
    {
      inventory.maxposition=req.body.maxposition
    }  
    else{
      inventory.maxposition=user.maxposition
    }
    if(req.body.maxpost!=='')
    {
      inventory.maxpost=req.body.maxpost
    }  
    else{
      inventory.maxpost=user.maxpost
    }
    if(req.body.deadline!=='')
    {
      inventory.deadline=req.body.deadline
    }
    else{
      inventory.deadline=user.deadline
    }  
    console.log(inventory)
    console.log(id)
 // var _id = req.body.id;

  jobs.findByIdAndUpdate(email,inventory, function(
    err,
    inventory
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("check")
      console.log("inventory=",inventory)
  //    console.log("success");
      res.send(inventory);
    }
  });
})
});
router.post("/update", (req, res) => {
    console.log("req.body", req.body);
    var id = req.body.id;
    var email=req.body.email
      console.log("printing the user below")
      console.log(id)
      console.log("just checking")
      User.findOne({ email }).then(user=>{
      let inventory={
        dateapplied:Date.now(),
        sop:req.body.sop,
        emailuser:req.body.email,
        name:user.name,
        Education: user.Education,
        skill:user.skill
      }
      console.log()
      console.log(inventory)
      jobs.findByIdAndUpdate(id, { $push:{
      appleuser:inventory}}).then(user=>res.send(user))
      })
  })
  router.post("/insrtjob", (req, res) => {
    console.log("req.body", req.body);
    var email = req.body.email
      console.log("printing the user below insrt")
      //console.log(id)
      console.log("just checking insrt")
      User.findOne({ email }).then(user=>{
        jobs.findById(req.body.id,function(err,docs){
      
      let inventory={
        jobid:req.body.id,
        jobtitle:docs.title,
        dateofjoining:'',
        salary:docs.salary,
        nameofrecruiter:docs.name,
        status:"applied",
        rating:"Unrated"
      }
      console.log("above insrt inventory")
      console.log(inventory)
      console.log(user._id)
      console.log("above us user id")
      User.findByIdAndUpdate(user._id, { $push:{
      Appliedjob:inventory}}).then(user=>res.send(user))
      })
    })
  })
  router.post("/updateapplicant", (req, res) => {
    console.log("req.body", req.body);
    console.log("inside updateappliant route")
    const email=req.body.email
    User.findOne({ email }).then(user=>{
      const id=user._id
      var inventory = {
        name:'',
        Password: '',
        Education: [{institutename:'',startyear:'',endyear:''}],
        Register_as: user.Register_as,
        skill:''
      };
      if(req.body.name!=='')
      {
        inventory.name=req.body.name
      }  
      else{
        inventory.name=user.name
      }
      if(req.body.Password!=='')
      {
        inventory.Password=req.body.Password
      }  
      else{
        inventory.Password=user.Password
      }
      if(req.body.Education.length!==0)
      {
        inventory.Education=req.body.Education
      }
      else{
        inventory.Education=user.Education
      }  
      console.log(inventory)
      console.log(id)
   // var _id = req.body.id;
  
    User.findByIdAndUpdate(id, inventory, function(
      err,
      inventory
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        console.log("yeah")
        res.send(inventory);
      }
    });
  })
  });
  
router.get("/jobregister1", function(req, res) {
    jobs.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
            console.log("inside job register")
			res.json(users);
		}
	})
});
router.post("/jobregister", body('email').isEmail(),(req, res) => {
    const email = req.body.email
    const errors = validationResult(req);
    var nm=''
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email }).then(user=>{
       nm=user.name
     //  console.log("name=")
      //console.log(user.name)  
      console.log(req.body.skill)
       // console.log(user)
        const newUser = new jobs({
        title: req.body.title,
        name: user.name,
        email: req.body.email,
        maxposition: req.body.maxposition,
        maxpost: req.body.maxpost,
        deadline: req.body.deadline,
        skill: req.body.skill,
        duration: req.body.duration,
        date:Date.now(),
        typeofjob: req.body.typeofjob,
        salary: req.body.salary

    });
    console.log("im here in jobregister")
    console.log(newUser)
    newUser.save()
        .then(newUser => {
            return res.status(200).json(newUser);
            console.log(vari)
        })
        .catch(err => {
          console.log("here comes the error")
            return res.status(400).send(err);
        }); })
})
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", body('email').isEmail(),(req, res) => {
    const email = req.body.email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email }).then(user=>{
    if(!user)
    {
        console.log(user)
        console.log('education below hai')
        console.log(req.body.Education)
        const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        Password: req.body.Password,
        Register_as:req.body.Register_as,
        Education:req.body.Education,
        bio:req.body.bio,
        skill:req.body.skill,
        contact:req.body.contact
    });

    newUser.save()
        .then(user => {
            return res.status(200).json(user);
            console.log(vari)
        })
        .catch(err => {
            return res.status(400).send(err);
        });
    }
    else
    {
       // res.send("E-mail id is already in use")
        console.log("email id is already in use")
        return res.status(400).json({
            error: "Email already exists"
        })
        
    }
    })
})

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const Password = req.body.Password;
    const Register_as=req.body.Register_as;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
           // res.send("Email Found");
            const matp=user.Password
            const regisp=user.Register_as;
            //var res = Password.localeCompare(matp)
            if(matp==Password)
            {
                if(regisp==Register_as)
                {
                console.log("Login Successful")
                return res.status(200).json({
                    error: "Login Successful"
                });
                }
                else{
                    console.log("login unsuccessful")
                    return res.status(400).json({
                        error: "Login Successful"})
                }
            
            }
            else{
                console.log("incorrect Password")
                return res.status(404).json({
                    error: "Incorrect Password"
                });
            }
            console.log(matp)
            console.log(Password)
          //  return user;
        }
	});
});

module.exports = router;