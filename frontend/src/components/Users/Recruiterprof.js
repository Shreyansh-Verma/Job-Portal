import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import DatePicker from "react-datepicker";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { ContactSupportOutlined, PrintDisabledTwoTone } from '@material-ui/icons';
import DateTimePicker from 'react-datetime-picker';

var usem;
var cnt=0;

class ReProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            title: '',
            maxposition:'',
            maxpost:'',
            date: null,
            skill: [],
            duration:'',
            salary:'',
            flag:'0',
            typeofjob:'Work From Home',
            usmail:'',
            deadline: new Date()
        }
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangemaxapp = this.onChangemaxapp.bind(this);
        this.onChangemaxpos = this.onChangemaxpos.bind(this);
        this.onChangesalary = this.onChangesalary.bind(this);
        this.onChangetypeofjob = this.onChangetypeofjob.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        var abc=JSON.parse(localStorage.getItem("id"))
        this.setState({flag:'1'})
        this.setState({usmail:abc.email})
    }
    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }
    onChangename(event) {
        this.setState({ name: event.target.value });
    }

    onChangemaxapp(event) {
        this.setState({ maxposition: event.target.value });
    }
    onChangemaxpos(event) {
        this.setState({ maxpost: event.target.value });
    }
    onChangesalary(event) {
        this.setState({ salary: event.target.value });
    }
     onChangetypeofjob(event) {
        this.setState({ typeofjob: event.target.value });
    }
    onChangeduration(event) {
        this.setState({ duration: event.target.value });
    }
    onChangedeadline(date) {
        console.log(date)
        this.setState({ deadline: date});
    }
    state= {showForm: false}
    
    sortClicked(){
        console.log(this.state);
    }

    sortChange(){
        var array = this.state.users;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined){
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            }
            else{
                return 1;
            }
          }); // Sort youngest first
        this.setState({
            users:array,
            sortName:!this.state.sortName,
        })
    }
    createUI() {
        console.log("inside skill")
        return this.state.skill.map((el, i) =>
            <div key={i}>
                ({el})
                <input type="text"  onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />
            </div>
        )
    }
    addClick() {
        this.setState(prevState => ({ skill: [...prevState.skill, ''] }))
    }
    handleChange(i, event) {
        console.log("isnide handle change")
        let skill = [...this.state.skill];
        skill[i] = event.target.value;
        this.setState({skill})
        console.log(this.state.skill)
    }
    removeClick(i) {
        console.log("removed")
        let skill = [...this.state.skill];
        skill.splice(i, 1);
        this.setState({ skill });
    }
    showForm()
    {
        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Job title: </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.title}
                           onChange={this.onChangetitle}
                           />
                </div>
                <div className="form-group">
                    <label>Maximum Applications </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.maxapp}
                           onChange={this.onChangemaxapp}
                           />  
                </div>
                <div className="form-group">
                    <label>Maximum Positions </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.maxpost}
                           onChange={this.onChangemaxpos}
                           />  
                           
                </div>
                <div className="form-group">
                                                <label>Deadline:</label>
                                                <DatePicker
                                                    selected={this.state.deadline}
                                                    onChange={this.onChangedeadline}
                                                    showTimeSelect
                                                    timeFormat="HH:mm:ss"
                                                    timeIntervals={20}
                                                    timeCaption="time"
                                                    dateFormat="dd/MM/yyyy hh:mm:ss aa"
                                                />
                                                <br></br>
                                                {/* <button className="btn btn-primary">show Date</button> */}</div>
                <div>
                    <label>Skills Required </label>
                    {
                    this.createUI()
                    }
                    <br></br>
                    <input type='button' value='add more' onClick={this.addClick.bind(this)} />
                </div>
                <div className="form-group">
                <label>Job type</label>
               <select value={this.state.typeofjob} onChange={this.onChangetypeofjob} >
               <option name="FT">Full Time</option>
               <option name="PT">Part Time</option>
               <option name="WFH">Work From Home</option>
               </select> 
               </div>
               <div className="form-group">
                    <label>Duration </label>
                    <input type="String" 
                           className="form-control" 
                           value={this.state.duration}
                           onChange={this.onChangeduration}
                           />  
                
                </div>
                <div className="form-group">
                    <label>Salary </label>
                    <input type="String" 
                           className="form-control" 
                           value={this.state.salary}
                           onChange={this.onChangesalary}
                           />  
                
                </div>
                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary"/>
                </div>
                
            </form>
        </div>
        )
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
    showemployee()
    {
        console.log(this.state.usmail)
        
        localStorage.setItem("viewemployee",JSON.stringify(this.state.usmail))
        this.props.history.push('/recruiterprofile/recruiterjobs/currentemployees')
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.usmail,
            title: this.state.title,
            maxposition:this.state.maxposition,
            maxpost:this.state.maxpost,
            date: null,
            skill: this.state.skill,
            duration:this.state.duration,
            salary:this.state.salary,
            typeofjob:this.state.typeofjob,
            deadline:this.state.deadline
        }
        console.log("before submit")
        console.log(newUser)
        axios.post('http://localhost:4000/user/jobregister', newUser)
             .then(res => {alert("Created\t" + res.data.name+res.data.Register_as+res.data.Password);console.log(res.data)})
             .catch(err => { alert("Invalid Credentials")
              })
        
        this.setState({
            name: '',
            email: '',
            date:null,
            Register_as: "Recruiter",
            Password: ''
        });
    }
    render() {
        if(this.state.flag!=='0')
        {
        return (
            
            <div>
                
                <p>Welcome to profile of recruiter Dashboard</p>

                <button onClick={()=>this.setState({showForm: true})}>Create New job</button>
                <button onClick={()=>this.showemployee()}>View Current Employees</button>
                
                {this.state.showForm ? this.showForm() : null}
       
            </div>
        )
        }
        else{
            return(
                <div><p>Fetching info...</p></div>
            )
        }
        
    }
}

export default ReProfile;