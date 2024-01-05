import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
export default class editjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {id:'',maxpost:'',maxposition:'',deadline:''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangemaxapp = this.onChangemaxapp.bind(this);
        this.onChangemaxpos = this.onChangemaxpos.bind(this);
        
    }
    componentDidMount() {
       // console.log("reomve error")
       var abc = JSON.parse(localStorage.getItem("jobrecruid"))
       console.log(JSON.parse(localStorage.getItem("jobrecruid")))
       console.log("inside didmount",abc)
       this.setState({id:abc})
    
    }
    onChangemaxapp(event) {
        this.setState({ maxposition: event.target.value });
    }
    onChangemaxpos(event) {
        this.setState({ maxpost: event.target.value });
    }
    onChangesop(event) {
   
    }
    onSubmit(e) {
        e.preventDefault();
        console.log("i am inside onsubmit")
       // console.log(appleuser)
        const newUser = {
            id:this.state.id,
            maxposition: this.state.maxposition,
            maxpost:this.state.maxpost,
            deadline:''
        }
        console.log("before submit")
        console.log(newUser)
        axios.post('http://localhost:4000/user/editjob', newUser)
             .then(res => {alert("Created\t" + res.data.name+res.data.Register_as+res.data.Password);console.log(res.data)})
             .catch(err => { alert("Invalid Credentials")
              })
            }
    render()
    {
        return(
        <div>
            <p>Fill any one of the following fields to update the values of the selected job</p>
            <form onSubmit={this.onSubmit}>
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
                    <label>Deadline </label>
                    <input type="password" 
                           className="form-control" 
                           value={this.state.deadline}
                           onChange={this.onChangedeadline}
                           />  
                </div>
                <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-primary"/>
                </div>
                
            </form>
        </div>
        )
        
    }
}
