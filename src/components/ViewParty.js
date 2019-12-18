import React, { Component } from 'react';
import EditParty from './EditParty'

class ViewParty extends Component {
    constructor(){
        super()

        this.state = {
            editing: false
        }
    }

    handleEdit = () => {
        this.setState({editing: !this.state.editing})
        

    }

    



    render() {
        return (
            <div>
            {
                this.state.editing === true ?
                <EditParty party={this.props.party} handleEdit={this.handleEdit} />
                    :
                    <div>
                <h1>{this.props.party.name}</h1>
                <h3>Date</h3>
                <p>{this.props.party.date}</p>
                <h3>Address</h3>
                <p>{this.props.party.address}</p>
                <h3>Details</h3>
                <p>{this.props.party.details}</p>

                <button onClick={this.showShoppingList} >Shopping List</button>
                <button>Recipes</button>
                
                

                {this.props.hosting ?
                <button onClick={this.handleEdit}>Edit</button>
                :
                null
                }
            </div>
            }   

            </div>
        );
    }
}

export default ViewParty;