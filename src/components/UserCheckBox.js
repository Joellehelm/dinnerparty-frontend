import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { SiAddthis } from "react-icons/si";


class UserCheckBox extends Component {
    constructor(){
        super()
        this.state = {
            checked: false
        }
    }

    handleCheck = () => {
        this.setState({ checked: !this.state.checked })
        this.props.handleCheck(this.props.user)
    }

    render() {
        return (

            <IconContext.Provider value={{ color: "rgba(3, 175, 3, 0.904)", className: "global-class-name" }}>
                <div className="user-add-div" onClick={() => this.props.handleCheck(this.props.user)}>
                    <div className="icon-container">
                        <SiAddthis />
                    </div>
                    <div className="add-user-name">
                        <p>{this.props.user.username}</p>
                    </div>
                </div>
            </IconContext.Provider>

        );
    }
}

export default UserCheckBox;