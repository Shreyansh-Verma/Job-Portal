import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }
   /* checkfn()
    {
        window.location
    }*/
    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Demo</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/profile/edit" className="nav-link">Edit</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/profile" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/profile" className="nav-link">My info</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/profile/myapplications" className="nav-link">My Applications</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Logout</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}