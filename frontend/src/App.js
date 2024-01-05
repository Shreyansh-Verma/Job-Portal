import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import login from './components/Common/login'
import sop from './components/Users/sopenter'
import editprof from './components/Users/editprof'
import Navbarprof from './components/templates/Navbarprof'
import Navbarrecruit from './components/templates/navbarrecruit'
import RecruiterProfile from './components/Users/Recruiterprof'
import myapplication from './components/Users/myapplication'
import recruiterjobs from './components/Users/recruiterjobs'
import recruiterviewapplicant from './components/Users/recruiterviewapplicant'
import acceptedempl from './components/Users/acceptedemploye'
import editjob from './components/Users/editjob'
import { Dashboard } from '@material-ui/icons';


function App() { 

  const DefaultRoutes = () => {
  return (
      <div>
        <Navbar/>
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component ={login}/>
        
      </div>
  )
  };
  const ProfRoutes = () => {
    return (
        <div>
          <Navbarprof/>
          <br/>
          <Route path="/profile/sop" component = {sop}/>
          <Route path="/profile/edit" component = {editprof}/>
          <Route path="/profile/myapplications" component = {myapplication}/>
          <Route path="/profile" exact component ={Profile}/>
        </div>
    )
  }
  const AnotherRoutes = () => {
    return (
        <div>
          <Navbarrecruit/>
          <br/>
          <Route path="/recruiterprofile/recruiterjobs/editjob" component = {editjob}/>
          <Route path="/recruiterprofile/recruiterjobs" exact component = {recruiterjobs}/>
          <Route path="/recruiterprofile/recruiterjobs/recruiterviewapplicant" component = {recruiterviewapplicant}/>
          <Route path="/recruiterprofile/edit" component = {editprof}/>
          <Route path="/recruiterprofile/recruiterjobs/currentemployees" component = {acceptedempl}/>
          <Route path="/recruiterprofile" exact component ={RecruiterProfile}/>
        </div>
    )
  }
    return(
      <Router>
        <Switch>
          <Route exact component = {ProfRoutes} path="/profile" />
          <Route exact component = {ProfRoutes} path="/profile/sop" />
          <Route exact component = {ProfRoutes} path="/profile/edit" />
          <Route exact component = {ProfRoutes} path="/profile/myapplications" />
          <Route exact component = {AnotherRoutes} path="/recruiterprofile" />
          <Route exact component = {AnotherRoutes} path="/recruiterprofile/recruiterjobs" />
          <Route exact component = {AnotherRoutes} path="/recruiterprofile/recruiterjobs/recruiterviewapplicant" />
          <Route exact component = {AnotherRoutes} path="/recruiterprofile/recruiterjobs/currentemployees" />
          <Route exact component = {AnotherRoutes} path="/recruiterprofile/recruiterjobs/editjob" />
          <Route component = {DefaultRoutes} path="/" />
        </Switch>
      </Router>
    )
  };

export default App;
