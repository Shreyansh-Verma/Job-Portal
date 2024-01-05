import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
export default class myapp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applied:[{
            jobid:'',
            jobtitle:'',
            dateofjoining:'',
            salary:'',
            nameofrecruiter:'',
            status:'',
            rating:''
            }],
            users: [],
            arr:[],
            arrnew:[],
            flag:'0',
            vari:''
        };
        
    }
    componentDidMount() {

       var abc=JSON.parse(localStorage.getItem("id"))
       axios.get('http://localhost:4000/user')
       .then(response => {
           this.setState({users: response.data});
           this.setState({flag:'1'})
           console.log(this.state.users)
            for(var i=0;i<this.state.users.length;i++)
            {
                if(this.state.users[i].email===abc.email)
                {
           this.setState(prevState => ({
            arr: [...prevState.arr, this.state.users[i]]
          }))}
        }
        for(var i=0;i<this.state.arr[0].Appliedjob.length;i++)
        {
            this.setState(prevState => ({
                arrnew: [...prevState.arrnew, this.state.arr[0].Appliedjob[i]]
              }))
        //
        }
        console.log(this.state.arrnew)
       })
       .catch(function(error) {
           console.log(error);
       })
    }
    render()
    {
        if(this.state.flag==='0')
        {
        return(<div><p>Welcome to my applications</p></div>)
        }
        else
        {
            console.log("inside else")
            console.log(this.state.flag)
        return(<div>
             <TableRow>
                                            <TableCell>Date of Joining </TableCell>
                                            <TableCell>Title of Job</TableCell>
                                            <TableCell>Salary offered</TableCell>
                                            <TableCell>Name of recruiter </TableCell>
                                            <TableCell>Status of my application</TableCell>
                                            <TableCell>Rating of the job</TableCell>
                </TableRow>
                <p>{this.state.arrnew.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{user.dateofjoining}</TableCell>
                                            <TableCell>{user.jobtitle}</TableCell>
                                            <TableCell>{user.salary}</TableCell>
                                            <TableCell>{user.nameofrecruiter} </TableCell>
                                            <TableCell>{user.status}</TableCell>
                                            <TableCell>{user.rating}</TableCell>
                                            <TableCell className='opration'>

                    </TableCell>
                                        </TableRow>
                                ))}</p>
        </div>
                
             )
        }
    }
}
