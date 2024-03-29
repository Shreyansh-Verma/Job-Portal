import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Demo</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/recruiterprofile" className="nav-link">Dashboard Recruiter</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/recruiterprofile/recruiterjobs" className="nav-link">My active jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Logout Recruiter</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}