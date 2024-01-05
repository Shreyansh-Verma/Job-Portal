import React, {Component} from 'react';
import axios from 'axios';
var flag=0

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            Password: '',
            Register_as: "Recruiter",
            Education: [
                {
                    institutename:'',
                    startyear:'',
                    endyear:''
                }
            ],
            skill: [],
            bio:'',
            contact:'',
            date:null
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRegister_as = this.onChangeRegister_as.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangecontact = this.onChangecontact.bind(this);
      //  this.onChangeEducation = this.onChangeEducation(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleInputChange = (index, e) => {

          console.log(e.target.value);
        const { name, value } = e.target;
        const Education = [...this.state.Education];
        console.log("inside handleinput")
        console.log(name,value)
        Education[index][name] = value;
        this.setState({ Education });
        for(var i=0;i<Education.length;i++)
        {
            console.log(Education[i])
        }
    }
    handleAddRow = () => {
        const item = {
            institutename: '',
            startyear: '',
            endyear: ''

        }
        this.setState({
            Education: [...this.state.Education, item]
        });
    }
    handleRemoveRow = (id) => {
        let Education = [...this.state.Education]
        Education.splice(id, 1);
        this.setState({
            Education
        });
    }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }
    onChangebio(event) {
        this.setState({ bio: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangecontact(event) {
        this.setState({ contact: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ Password: event.target.value });
    }
     onChangeRegister_as(event) {
        this.setState({ Register_as: event.target.value });
    }
    createUI() {
        return this.state.skill.map((el, i) =>
            <div key={i}>
                <input type="text" value={el} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />
            </div>
        )
    }
    handleChange(i, event) {
        let skill = [...this.state.skill];
       
        skill[i] = event.target.value;

        this.setState({ skill });
    }
    addClick() {
        this.setState(prevState => ({ skill: [...prevState.skill, ''] }))
    }
    removeClick(i) {
        let skill = [...this.state.skill];
        skill.splice(i, 1);
        this.setState({ skill });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,        
            date: Date.now(),
            Register_as: this.state.Register_as,
            Password: this.state.Password,
            Education: this.state.Education,
            skill:this.state.skill,
            bio:this.state.bio,
            contact:this.state.contact
        }
        var temp = newUser.bio.split(' ').length
        console.log(newUser.bio.split(' ').length)
        console.log("before submit")
        var flag=0;
        if(newUser.Register_as==="Applicant")
        {
            if(newUser.name===''||newUser.Education.length===0||newUser.skill.length===0||newUser.Password==='')
            {
                console.log(newUser.name)
                console.log(newUser.Education.length)
                console.log(newUser.skill.length)
                console.log(newUser.Password)
                console.log("enter here")
                flag=1
            }
            if(newUser.Education.length!==0)
            {
                for(var i=0;i<newUser.Education.length;i++)
                {
                    if(newUser.Education[i].startyear==='')
                    {
                        console.log("i=",i)
                        console.log(newUser.Education[i].startyear)
                        flag=1;
                    }
                }
            }
        }
        if(newUser.Register_as==="Recruiter")
        {
            if(newUser.name===''||newUser.Password===''||newUser.bio===''||newUser.bio.split(' ')>250||newUser.contact==='')
            {
                console.log(newUser.name)
                console.log(newUser.Education.length)
                console.log(newUser.skill.length)
                console.log(newUser.Password)
                console.log("enter here")
                flag=1
            }
        }
        if(!flag)
        {
       // console.log(newUser.Education[0])
        axios.post('http://localhost:4000/user/register', newUser)
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
        else
        {
            alert("incorrect format")
        }
    }
    render() {
       // console.log("register")
        const reg=this.state.Register_as
        return (
            <div>
              {(() => { 
                if (reg=="Recruiter") {
                  return (
                    <div>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Register As</label>
                   <select value={this.state.Register_as} onChange={this.onChangeRegister_as} >
                   <option name="Recruiter">Recruiter</option>
                   <option name="Applicant">Applicant</option>
                   </select> 
                   </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />``
                    </div>
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
                        <label>Bio: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangebio}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Contact No: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.contact}
                               onChange={this.onChangecontact}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                    
                </form>
            </div>
                  )
                }
                 else {
                  return (
                    <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                    </div>
                    <div className="form-group">
                        <label>Education: </label>
                        {
                                this.state.Education.map((x, i) => {
                                    return (
                                        <div className="box">
                                            <input name="institutename" placeholder="institutename" value={x.institutename} onChange={this.handleInputChange.bind(this, i)} />
                                            <input name="startyear" placeholder="startyear" value={x.startyear} onChange={this.handleInputChange.bind(this, i)} />
                                            <input name="endyear" placeholder="endyear" value={x.endyear} onChange={this.handleInputChange.bind(this, i)} />
                                            {this.state.Education.length !== 1 && <input type='button' value='remove' onClick={this.handleRemoveRow.bind(this, i)} />}
                                            <div className="btn-box">
                                                {this.state.Education.length - 1 === i && <input type='button' value='add more' onClick={this.handleAddRow.bind(this)} style={{ marginLeft: 8 }} />}
                                            </div>

                                        </div>
                                    );
                                })
                            }
                    </div>
                    <div >
                            <label>Skill:</label>
                            {
                                this.createUI()
                            }
                            <br></br>
                            <input type='button' value='add more' onClick={this.addClick.bind(this)} />
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
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                    
                </form>
            </div>
                 
                  )
                }
              })()}
            </div>
          )
    }
}