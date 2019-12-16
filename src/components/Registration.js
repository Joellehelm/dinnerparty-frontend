import React, { Component } from 'react';
import Login from './Login'
import Signup from './Signup'

class Registration extends Component {
    constructor(){
        super()

        this.state = {
            clicked: true
        }
    }

    handleSwap = (event) => {
        event.preventDefault()
        this.setState({
            clicked: !this.state.clicked
        })
        const container = document.getElementById('container')
        this.state.clicked ? container.classList.add('right-panel-active') : container.classList.remove('right-panel-active')
    }


    // maybe swap the return below to a logout button if the user is logged in

    render() {
        return (
            <div className="registration">
                <div className="container" id="container">
                    <Login handleSwap={this.handleSwap} handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn}  />

                    <Signup handleSwap={this.handleSwap} handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
                    </div>
            </div>
        );
    }
}

export default Registration;