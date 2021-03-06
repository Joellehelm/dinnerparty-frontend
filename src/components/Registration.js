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


    render() {
        return (
            <div className="registration">
                <div className="container" id="container">
                    <Login history={this.props.history} handleSwap={this.handleSwap} handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn}  />

                    <Signup handleSwap={this.handleSwap} handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
                    </div>
            </div>
        );
    }
}

export default Registration;