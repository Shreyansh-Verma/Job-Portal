import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "bootstrap/dist/css/bootstrap.min.css"
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { ContactSupportOutlined, PrintDisabledTwoTone } from '@material-ui/icons';
import Fuse from 'fuse.js'
var usem;
var cnt=0;

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: [],jobs:[],title:'',titlearr:[],temparr:[],sortName:true,searchvalue:'',maxsal:'1000000000',minsal:'-1',temp:"",_id:'',vari:false,flag:'0',taruser:'Loading',title:'',name:'',email:'',maxposition:'',maxpost:'',duration:0,typeofjob:'',appleuser:[],showfrm:'0',redirect:'',sortName:true,mnflg:false,mxflg:false,usrid:''};
        this.sortClicked = this.sortClicked.bind(this);
        this.renderIcondate = this.renderIcondate.bind(this);
        this.renderIcontitle = this.renderIcontitle.bind(this);
        this.renderIconsalary = this.renderIconsalary.bind(this);
        this.renderIconrate = this.renderIconrate.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.sortsalary = this.sortsalary.bind(this);
        this.sortduration = this.sortduration.bind(this);
        this.sortrate = this.sortrate.bind(this);
        this.setsalfilt=this.setsalfilt.bind(this);
        this.setminsal=this.setminsal.bind(this);
        this.setmaxsal=this.setmaxsal.bind(this);
        this.setsaldefault=this.setsaldefault.bind(this);
      //this.sortduration = this.sortduration.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.jobtypedrop = this.jobtypedrop.bind(this)
        this.durationtypedrop = this.durationtypedrop.bind(this)
        this.Fuzzy = this.Fuzzy.bind(this);
    //    this.btntxt = this.btntxt.bind(this);
    }
    state= {showForm: false}
    
    Fuzzy(e) {
        //console.log("search");
        // console.log(this.state.users1)
        const fuse = new Fuse(this.state.temparr, {
            keys:
                ['title']
            , includeScore: true

        })
        console.log(this.state.temparr)
        console.log("fuse=",fuse)
       // console.log(this.state.searchvalue)
        // console.log(e.target.value);
        this.state.searchvalue = e.target.value;
        console.log(this.state.searchvalue);
        const results = fuse.search(this.state.searchvalue);
        var ans=''
        if(this.state.searchvalue)
        {
            ans=results.map(result => result.item)
        }
        else{
            ans=this.state.jobs
        }
        this.setState({ temparr: ans });
        // this.Search();
    }
    componentDidMount() {
        var manoj=localStorage.getItem("id")
        console.log("enter did mount")
        console.log(manoj)
        //this.setState.temp=manoj
        this.setState({})
      //  this.setState.vari=1
        console.log(this.setState.temp)
        this.setState({temp : JSON.parse(localStorage.getItem("id"))})
        Promise.all([
            axios.get('http://localhost:4000/user'),
            axios.get('http://localhost:4000/user/jobregister1')
        ])
        .then(([userResponse, reposResponse]) => {
            this.setState({users : userResponse.data, jobs : reposResponse.data});
            console.log("i am inside double axios")
            this.setState({vari:true})
            console.log(this.state.jobs)
            console.log(this.state.users)
            console.log("before entering ", this.state.flag)
            console.log("length=",this.state.jobs.length)
            for(var i=0;i<this.state.jobs.length;i++)
            {
               this.state.titlearr.push("apply")
            }
            console.log(this.state.titlearr.length)
    
         /*   for(var i=0;i<this.state.jobs.length;i++)
            {
                
                for(var j=0;j<this.state.jobs[i].appleuser.length;j++)
                {
                    if((this.state.jobs[i].appleuser[j]).email===(this.state.temp.email))
                    {
                        this.state.titlearr[i]="Applied"
                        console.log(i,"applied")
                        console.log(this.state.jobs[i].appleuser[j].status)
                    }
                }
            
            console.log(i)
          //  console.log(this.state.jobs[i])
            }*/
           // console.log(this.state.jobs[15].appleuser.length)
           // console.log(JSON.parse(this.setState.temp))
            this.setState.flag=1
            console.log("before temparr")
            this.setState({temparr:this.state.jobs})
            console.log("after temparr ",this.state.temparr)
            console.log("after entering flag",this.setState.flag)
          //  console.log(userResponse.data[0])
           // this.setState.taruser=userResponse.filter(mail=>mail.email===JSON.parse(this.setState.temp).email)     
          //  this.render()
        });
        
       /* axios.get('http://localhost:4000/user')
        .then(response => {
            this.setState({users: response.data});
            console.log("inside get function")
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error);
        })
        axios.get('http://localhost:4000/user/jobregister')
        .then(response => {
            this.setState({jobs: response.data});
            console.log("inside jobs get function")
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error);
        })*/
        
        /*axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({usem: response.data});
                 console.log("entering1")
                 console.log(response.data)
             })
             .catch(function(error) {
                 console.log(error);
             })*/
    }
    showForm()
    {
        console.log("enter show form")
       // alert("insert sop")
      //  this.setState({showForm: false})
        this.setState({showfrm:1})
        return (
          <div> 
           <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Please enter SOP </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.sop}
                               onChange={this.onChangesop}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="submit sop" className="btn btn-primary"/>
                    </div>
                    
            </form>
           </div>
          );
      }
    submitForm(idx,newid){
     /*   console.log("i am inside submit form")
        console.log(idx.email)
        console.log(newid._id)
        console.log(newid)*/
        var checkeruser = ''
        var counter=0
        var acceptflag=0;
        for (var i = 0;i<this.state.users.length;i++)
        {
            if(this.state.users[i].email===this.state.temp.email)
            {
                console.log("i=",i)
                checkeruser=this.state.users[i].Appliedjob
            }
        }
        for(var i=0;i<checkeruser.length;i++)
        {
            if(checkeruser[i].status!=="Rejected")
            {
                counter++
                if(checkeruser[i].status==="Accepted")
                {
                    acceptflag=1;
                }
            }
        }
        console.log(checkeruser)
        console.log(counter)
        if(acceptflag)
        {
            alert("you are already having a job")
        }
        else if(counter>10)
        {
            alert("Your application limit has exceeded")
        }
        else{
        alert('Please enter sop!')
        localStorage.setItem("forsop",JSON.stringify(newid))
       // console.log(this.jobs[idx])
        const inventory = {
            _id:newid._id,       
            title:"Ye mera title hai new 3"
        }
        this.props.history.push('/profile/sop')
        }
      
       /* axios.post('http://localhost:4000/user/update', inventory)
        .then( res => {
          alert('Updated successfully!');
          this.forceUpdate()
          console.log("before entering render")
          this.render()
         }   
        )
        .catch(err => {
          console.log(err.response);
          alert('An error occurred! Try submitting the form again.');
        });*/
      }
  /*  componentWillReceiveProps(nextProps){
        this.setState({
          users: nextProps.users,
          jobs:nextProps.jobs
       })
       }*/
    //componentDidUpdate() {
      //  console.log("entering update")
        //this.setState.taruser=this.setState.user.filter(mail=>mail.email===JSON.parse(this.setState.temp).email)
      //  this.componentDidMount()
    //    this.setState.vari=1
     //   this.setState.users
       // console.log(this.setState.users)
       /* axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })*/
           //  const {data} = this.props.location;        
   // }
    
    sortClicked(){
        console.log(this.state);
    }
    fuzzy()
    {
        console.log("fuzzy search")
    }
    sortChange(){
        var array = this.state.temparr;
        var flag = this.state.sortName;
        console.log("inside sortchange")
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined){
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            }
            else{
                return 1;
            }
          }); // Sort youngest first
        this.setState({
            jobs:array,
            sortName:!this.state.sortName,
        })
    }
    sortsalary(){
        var array = this.state.temparr;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.salary != undefined && b.salary!= undefined){
                return (1 - flag*2) * (a.salary - b.salary);
            }
            else{
                return 1;
            }
          }); // Sort youngest first
        this.setState({
            jobs:array,
            sortName:!this.state.sortName,
        })
    }
    sortduration(){
        var array = this.state.temparr;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.duration != undefined && b.duration!= undefined){
                return (1 - flag*2) * (a.duration - b.duration);
            }
            else{
                return 1;
            }
          }); // Sort youngest first
        this.setState({
            jobs:array,
            sortName:!this.state.sortName,
        })
    }
    sortrate(){
        var array = this.state.temparr;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.duration != undefined && b.duration!= undefined){
                return (1 - flag*2) * (a.duration - b.duration);
            }
            else{
                return 1;
            }
          }); // Sort youngest first
        this.setState({
            jobs:array,
            sortName:!this.state.sortName,
        })
    }

    renderIcondate(){
        if(this.state.sortName){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    renderIconrate(){
        if(this.state.sortName){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    renderIcontitle(){
        if(this.state.sortName){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    renderIconsalary(){
        if(this.state.sortName){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    renderIconduration(){
        if(this.state.sortName){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    renderIconrating(){
        if(this.state.sortName){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }
    setsalfilt(){
        console.log("inside setsalfilt")
        console.log(this.state.mnflg)
        
            console.log("inside if setsalfilt")
            console.log(this.state.mnflg)
            console.log(this.state.minsal)
            console.log(this.state.temparr)
            var array = this.state.temparr.filter(varia=>parseInt(varia.salary)>=parseInt(this.state.minsal))
            var array1 = array.filter(varia=>parseInt(varia.salary)<=parseInt(this.state.maxsal))

            console.log("array below")
            console.log(array1)
            //this.setState({temparr:array})
            this.setState({temparr:array1})
            console.log("temparr below")
            console.log(this.state.temparr)
        
   
    }
    setminsal(e){
        console.log("this will set salary min filter")
        console.log(e.target.value)
        this.setState({minsal:e.target.value})
       // this.setState({})
        this.setState({mnflg:true})
    }
    setmaxsal(e){
        console.log(e.target.value)
        this.setState({maxsal:e.target.value})
        this.setState({mxflg:true})
        console.log("this will set max salary filter")
    }
 
    setsaldefault(e)
    {
        this.setState({temparr:this.state.jobs})
        this.setState({minsal:'0'})
        this.setState({maxsal:'1000000000'})

    }
    jobtypedrop(e)
    {
        console.log("change jobb type")
        var array = this.state.temparr.filter(varia=>(varia.typeofjob)===(e.target.value))
        this.setState({temparr:array})
        console.log(e.target.value)
    }
    durationtypedrop(e)
    {
       // console.log("change durationtype")
        var array = this.state.temparr.filter(varia=>parseInt(varia.duration)<parseInt(e.target.value))
        this.setState({temparr:array})
        console.log(e.target)
    }
    btntxt(ind,user)
    {
        var initval = "Apply"
        var counter=0
        console.log("userr")
        console.log(user)
        var flag=false;
            for(var j=0;j<user.appleuser.length;j++)
            {
                console.log("open")
                console.log(user.appleuser[j].emailuser)
                console.log(this.state.temp)
                console.log("close")
                if((user.appleuser[j]).emailuser===(this.state.temp.email))
                {
                    console.log("enter",user)
                    initval=user.appleuser[j].status;
                    flag=true;
                }
            }
            if(user.acceptedusers===user.maxposition)
            {
                flag=true
                initval="Full"
            }
            if(user.maxpost==='0')
            {
                flag=true
                initval="Full"
            }
           
         
        //console.log(i)
      //  console.log(this.state.jobs[i])
      if(!flag)
      {

        return(<TableCell className='opration'><button  onClick={()=>this.submitForm(ind,user)} color='#4285F4'>{initval}</button></TableCell>)
      }
      else{
          return(<TableCell className='opration'>{initval}</TableCell>)
      }
        
    }
 //   setminsal(){
     //   console.log("this will set salary filter")
   // }
    render() {
  
        console.log(this.state.vari)
        if(this.state.vari)
        {
        console.log("inside if")
        //var obj1 = JSON.parse(this.setState.temp)
        var obj2="Loading"
       
        return (
            
            <div>
            <Grid container>
            <Grid item xs={12} md={3} lg={3}>
                <List component="nav" aria-label="mailbox folders">
                    <ListItem text>
                                    <h3>Current Jobs</h3>
                    </ListItem>
                </List>
            </Grid>
                <Grid item xs={12} md={9} lg={9}>
                <List component="nav" aria-label="mailbox folders" onChange={this.Fuzzy}>
                    <TextField 
                    id="standard-basic" 
                    label="Search" 
                    fullWidth={true}   
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )}}
                    />
                </List>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">

                        <ListItem button>
                            <form noValidate autoComplete="off" >
                                <label>Salary</label>
                                <TextField id="standard-basic"  label="Enter Min" fullWidth={true} onChange={this.setminsal} />
                                <TextField id="standard-basic"  label="Enter Max" fullWidth={true} onChange={this.setmaxsal}/>
                                <Button value="submit" onClick={this.setsalfilt}>Set Salary filter</Button>
                                <Button value="submit" onClick={this.setsaldefault}>Set default</Button>

                            </form>                                                                
                        </ListItem>
        
                        <Divider />
                        <ListItem button divider>
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.state.users}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                            />
                        </ListItem>
                    </List>
                </Grid>
                
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                        <TableHead>
                                <TableRow>
                                        <TableCell>
                                        <InputLabel id="label">Filter job type</InputLabel>
                                            <Select labelId="label" id="select" value="jobtype" onClick={this.jobtypedrop}>
                                            <MenuItem value="Work From Home">Work From Home</MenuItem>
                                            <MenuItem value="Part Time">Part Time</MenuItem>
                                            <MenuItem value="Full Time">Full Time</MenuItem>
                                        </Select></TableCell>
                                        <TableCell>
                                        <InputLabel id="label">Filter Duration</InputLabel>
                                            <Select labelId="label" id="select" value="duration" onClick={this.durationtypedrop}>
                                            <MenuItem value="1">One</MenuItem>
                                            <MenuItem value="2">Two</MenuItem>
                                            <MenuItem value="3">Three</MenuItem>
                                            <MenuItem value="4">Four</MenuItem>
                                            <MenuItem value="5">Five</MenuItem>
                                            <MenuItem value="6">Six</MenuItem>
                                            <MenuItem value="7">Seven</MenuItem>
                                        </Select></TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableHead>
                                <TableRow>
                                        <TableCell> <Button onClick={this.sortChange}>{this.renderIcondate()}</Button>Date</TableCell>
                                        <TableCell>Title of job</TableCell>
                                        <TableCell>Email id of recruiter</TableCell>
                                        <TableCell><Button onClick={this.sortsalary}>{this.renderIconsalary()}</Button>Salary</TableCell>
                                        <TableCell><Button onClick={this.sortduration}>{this.renderIconduration()}</Button>Duration</TableCell>
                                        <TableCell>Job Type</TableCell>
                                        <TableCell><Button onClick={this.sortrate}>{this.renderIconrate()}</Button>Rating</TableCell>
                                        
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.temparr.map((user,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{user.date}</TableCell>
                                        <TableCell>{user.title}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.salary}</TableCell>
                                        <TableCell>{user.duration}</TableCell>
                                        <TableCell>{user.typeofjob}</TableCell>
                                        <TableCell>{user.rating}</TableCell>
                                        {this.btntxt(ind,user)}
                                        </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>               
                </Grid>    
            </Grid>            
        </div>
        )
        }
        else
        {
            console.log("inside else")
            return(
                <p>Fetching info...</p>
            )
        }
    }
}

export default Profile;