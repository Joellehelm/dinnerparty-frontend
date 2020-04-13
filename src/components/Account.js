import React, { Component } from 'react';
import NavBar from './NavBar'
import Parties from './Parties'

class Account extends Component {
    render() {
        return (
            <div>
                <NavBar history={this.props.history} />
                <Parties cableApp={this.props.cableApp} history={this.props.history} auth={this.props.auth}/>
            </div>
        );
    }
}

export default Account;