import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
export default class sop extends Component {
    
    constructor(props) {
        super(props);
        this.state = {temp:'',flag:'0',usrmail:'',sup:'jjj',sop:'',psh:''};
        this.onChangesop = this.onChangesop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        var abd=JSON.parse(localStorage.getItem("forsop"))
        var abc=JSON.parse(localStorage.getItem("id"))
        this.setState({flag:1})
        this.setState({temp:abd})
        this.setState({usrmail:abc.email})
        console.log("casually checking")
        console.log(abc.email)
        console.log(abd._id)
    }
    onChangesop(event) {
        console.log("Enter sop function")
        const obj1 = event.target.value
        const obj2 = this.state.usrmail
       // console.log(objpsh)
        this.setState({sop:obj1})
       // this.setState({ email: event.target.value ,});
        /*this.setState(previousState => ({
            appleuser: [...previousState.appleuser, objpsh]
        }));*/
    }
    onSubmit(e) {
        e.preventDefault();
        console.log("i am inside onsubmit")
        //console.log(this.state.psh)
    /*    this.setState(previousState => ({
            appleuser: [...previousState.appleuser, this.state.psh]
        }))*/
        console.log("now see this shit")
       // console.log(appleuser)
        const newUser = {
            id:this.state.temp._id,
            email: this.state.usrmail,
            sop:this.state.sop
        }
        console.log("before submit")
        console.log(newUser)
      /*  axios.post('http://localhost:4000/user/update', newUser)
             .then(res => {alert("Created\t" + res.data.name+res.data.Register_as+res.data.Password);console.log(res.data)})
             .catch(err => { alert("Invalid Credentials")
              })*/
        axios.all([
            axios.post('http://localhost:4000/user/update',newUser), 
            axios.post('http://localhost:4000/user/insrtjob',newUser)
         ])

        this.setState({
           id:this.state.temp._id,
           sup:''
        });
        alert("You have applied successfully,click ok to continue")
        localStorage.removeItem("forsop");
        this.props.history.push('/profile')
    }
    render()
    {
        console.log("inside",this.state.flag)
        if(this.state.flag!=='0')
        {
            console.log("enter if")
            var obj1 = this.state.temp
            console.log(obj1.email)
            return(
                <div>
                   <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                        <label>Enter SOP here</label>
                        <input type="text" 
                               className="form-control" 
                               value={this.setState.sup}
                               onChange={this.onChangesop}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Apply" className="btn btn-primary"/>
                    </div></form>
                </div>
            )       
        
        }
        else{
            console.log("enter else")
            return(
                <div>
                    <p>Fetching results..</p>
                </div>
            )
        }
    }
}
