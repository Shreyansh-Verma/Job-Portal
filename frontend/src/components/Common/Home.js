import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Welcome to my Linkedin :)</h1>
           </div>
        )
    }
}