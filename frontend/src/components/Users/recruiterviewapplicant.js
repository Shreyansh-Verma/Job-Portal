import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class recruiterviewapplicants extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: JSON.parse(localStorage.getItem("recruitview")),users1:[],users2:'',sortedUsers: [], sortName:true,flag:false,filtusers:[],check:['IIT','BITs','NIT'],filttemp:[],namtemp:[]};
        this.renderIcon = this.renderIcon.bind(this);
        this.renderIcon1 = this.renderIcon1.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.sortChangename = this.sortChangename.bind(this);
    }

    componentDidMount() {
        Promise.all([
            axios.get('http://localhost:4000/user'),
            axios.get('http://localhost:4000/user/jobregister1')
        ]).then(([response, reposResponse]) => {
                 this.setState({users1: response.data, users2:reposResponse.data});
                 console.log("usersq=",this.state.users1)
                 var varusr=this.state.users._id
                 console.log("varuse=",varusr)
                 console.log("userrsorig=",this.state.users2[0].appleuser)
                 var ustuse='';
                 for(var i=0;i<this.state.users2.length;i++)
                 {
                     if(this.state.users2[i]._id===varusr)
                     {
                         ustuse=this.state.users2[i]
                     }
                 }
                 console.log("ustuse=",ustuse)
                 for (var i=0;i<ustuse.appleuser.length;i++)
                 {
                     console.log(this.state.users.appleuser[i].emailuser)
                     console.log(i)
                     console.log(this.state.users1.length)
                     for(var j=0;j<this.state.users1.length;j++)
                     {
                         console.log("j=",j)
                         console.log(this.state.users1[j].email)
                        if(this.state.users1[j].email===ustuse.appleuser[i].emailuser)
                        {
                            if(ustuse.appleuser[i].status!="Rejected")
                            this.state.filtusers.push(ustuse.appleuser[i])
                        }
                     }
                 }
                 this.setState({filttemp:this.state.filtusers})
                 
                 console.log("here users1=",this.state.users1.length)
                 console.log("filt=",this.state.filtusers)
                 this.setState({flag:true})
                 
             })
             .catch(function(error) {
                 console.log(error);
             })
        
             console.log("inside did mount")
            // console.log(JSON.parse(localStorage.getItem("recruitview")))
            // var abc = JSON.parse(localStorage.getItem("recruitview"))
             //this.setState({users:abc})
             this.setState({flag:true})
             
             //console.log("filt=")
             console.log(this.state.filtusers)
             //this.setState({users:abc})
            // console.log(this.state.users)
             
    }
    sortChangename(){
        /**
         *      Note that this is sorting only at front-end.
         */ console.log("entering on change")
                var array = this.state.filtusers;
                var flag = this.state.sortName;
                array.sort(function(a, b) {
                    console.log("a=",a.name)
                    console.log("b=",b.name)
                    if(a.name != undefined && b.name != undefined){
                        console.log("enter1")
                        return (1 - flag*2) * (a.name - b.name);
                    }
                    else{
                        console.log("enter2")
                        return 1;

                    }
                  });
                  console.log(array)
                this.setState({
                    filtusers:array,
                    sortName:!this.state.sortName,
                })
            }
    sortChange(){
/**
 *      Note that this is sorting only at front-end.
 */         
        var array = this.state.filtusers;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.dateapplied != undefined && b.dateapplied != undefined){
                return (1 - flag*2) * (new Date(a.dateapplied) - new Date(b.dateapplied));
            }
          /* if(a.name!=undefined && b.name!=undefined)
            {
                return (1 - flag*2) * (a.name - b.name);
            }*/
            else{
                return 1;
            }
          });
        this.setState({
            filtusers:array,
            sortName:!this.state.sortName,
        })
    }
    acceptdat(usr)
    {
        var dat = {
            id:this.state.users._id,
            email:usr.emailuser,
            flag:'0'
        }
        axios.all([
            axios.post('http://localhost:4000/user/acceptdatusr',dat), 
            axios.post('http://localhost:4000/user/acceptdatjob',dat)
         ])
        console.log("acceptdat=",dat)
    }
    rejectdat(usr)
    {
        var dat = {
            id:this.state.users._id,
            email:usr.emailuser,
            flag:'1'
        }
        axios.all([
            axios.post('http://localhost:4000/user/acceptdatusr',dat), 
            axios.post('http://localhost:4000/user/acceptdatjob',dat)
         ])
        console.log("acceptdat=",dat)
    }
    renderIcon(){
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
    renderIcon1(){
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
    testfunc()
    {
        console.log("The button is working")
    }
    checksop(sop)
    {
        var show='Not found'
        console.log(sop)
        console.log("inside check sop")
        show=sop
        alert(show)
        
    }
    returnedu(filtrusers,idx)
    {
        console.log("inside return edu")
        console.log(filtrusers)
        var arrays=filtrusers.Education
        console.log(arrays)
        console.log(typeof(this.state.filttemp))
        console.log("length=",filtrusers.length)
        console.log(typeof(filtrusers))
    
            console.log("enter0")
            //this.setState({namtemp:filtrusers.Education})
        return(<div>
            <TableBody>
                                    {this.state.check.map((user,ind) => (
                                        
                                        <TableRow key={ind}>{ind}</TableRow>
                                        
                                        
                                ))}
                                </TableBody>
        </div>)
        
    }
    render() {
        if(this.state.flag)
        {
            console.log("inside if")
        return (
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>List Applied Users to this job</h3>
                        </ListItem>
                    </List>
                </Grid>
    
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <Divider />
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date Applied</TableCell>
                                            <TableCell><Button onClick={this.sortChangename}>{this.renderIcon1()}</Button>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Education(Institute Name,Startyear,Endyear)</TableCell>
                                            <TableCell>Skills</TableCell>
                                            <TableCell>SOP</TableCell>
                                            <TableCell><Button onClick={this.sortChange}>{this.renderIcon()}</Button>Rating</TableCell>
                                            <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.filtusers.map((user,ind) => (
                                        
                                        <TableRow key={ind}>
                                            <TableCell>{user.dateapplied}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.emailuser}</TableCell>
                                            <TableCell>{this.returnedu(this.state.filttemp[ind].Education,ind)}</TableCell>
                                            <TableCell>{this.returnedu(this.state.filttemp[ind].Education,ind)}</TableCell>
                                            <TableCell className='opration'><button  onClick={()=>this.checksop(user.sop)} color='#4285F4'>Check SOP</button></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell className='opration'><button  onClick={()=>this.acceptdat(user)} color='#4285F4'>Accept</button></TableCell>
                                            <TableCell className='opration'><button  onClick={()=>this.rejectdat(user)} color='#4285F4'>Reject</button></TableCell>
                                            <TableCell>{user.status}</TableCell>
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
                <div><p>Fetching Results...</p></div>
            )
        }
    }
}

export default recruiterviewapplicants;