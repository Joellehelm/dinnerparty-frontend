import React, { Component } from 'react';
import CreateParty from './CreateParty'

class Parties extends Component {
    constructor(){
        super()

        this.state = {
            creating: false
        }
    }


    doneCreating = () => {
        this.setState({
            creating: !this.state.creating
        })
    }

    render() {
        return (
            <div>
                { this.state.creating ?
                <CreateParty auth={this.props.auth}/>

                :
                <div>
                    <div>

                </div>

                    <button onClick={() => this.setState({creating: true})}>Create Party</button>
                    </div>
                }
            </div>
        );
    }
}

export default Parties;