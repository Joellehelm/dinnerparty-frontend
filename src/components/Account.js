import React, { Component } from 'react';
import Parties from './Parties'

class Account extends Component {
    render() {
        return (
            <div>
                <Parties auth={this.props.auth}/>
            </div>
        );
    }
}

export default Account;