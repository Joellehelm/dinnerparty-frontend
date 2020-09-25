import React, { Component } from 'react';

class InstructionStep extends Component {
    constructor(){
        super()
        this.state = {
            marked: false
        }
    }

    handleClick = () => {
        this.setState({marked: !this.state.marked})

    }


    render() {
        return (
            <div onClick={this.handleClick} className={this.state.marked ? "instruction-step marked-spot" : "instruction-step"}>
                <p className="ins-step marked-place">{this.props.instruction.number}</p>
                <p className="ins">{this.props.instruction.step}</p>
            </div>
        );
    }
}

export default InstructionStep;
