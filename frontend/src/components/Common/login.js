import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
var varia=0;
export default class login extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            Password: '',
            Register_as: 'Recruiter',
            errorm: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRegister_as = this.onChangeRegister_as.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ Password: event.target.value });
    }
    onChangeRegister_as(event) {
        this.setState({ Register_as: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,        
            Password: this.state.Password,
            Register_as: this.state.Register_as
        }
        console.log(newUser)
        axios.post('http://localhost:4000/user/login', newUser)
             .then(res => {alert("Login Successful,Click `OK` to continue");
              console.log(res.data);
            /*   axios.get('http://localhost:4000/user')
             .then(res=>{
                res.findOne({newUser}).then(user=>{
                    console.log("entering")
                    varia = user
                })
             })*/
             localStorage.setItem("id",JSON.stringify(newUser))
             if(newUser.Register_as==='Applicant')
             {
             this.props.history.push({
                pathname: '/profile'
               // data: newUser
                });
            }
            else
            {
                this.props.history.push({
                    pathname: '/recruiterprofile'
                   // data: newUser
                    });

            }
             varia=1;})
             .catch(err => { 

                alert("Invalid Credentials")
               // alert(err.error)
              })

        this.setState({
            email: '',
            Password: '',
            Register_as: "Recruiter",
            errorm: ''
        });
        if(varia==1)
        {
            console.log("enter inside this")
           // return <Redirect to='/login' />
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.Password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                    <label>Register As</label>
                   <select value={this.state.Register_as} onChange={this.onChangeRegister_as} >
                   <option name="Recruiter">Recruiter</option>
                   <option name="Applicant">Applicant</option>
                   </select> 
                   </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                    
                </form>
            </div>
        )
    }
}