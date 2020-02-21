import React, { Component } from 'react';
import EditParty from './EditParty'
import { connect } from 'react-redux'
import { partyList } from '../actions/ViewParty'
import RoomWebSocket from './RoomWebSocket'
import actionCable from 'actioncable'
import '../style/ViewParty.css'

const CableApp = {}

CableApp.cable = actionCable.createConsumer(`ws://localhost:3000/cable`)

class ViewParty extends Component {
    
    _isMounted = false;
    constructor(){
        super()
        
        this.state = {
            editing: false,
            allRooms: [],
            currentRoom: {
              room: {}, 
              users: [],
              messages: []
            }
        }
    }

    componentDidMount = () => {
     
        this._isMounted = true;

       // either fetch all users for chat room from here `http://localhost:3000/party_users` or create an array of users on back end and fetch that.
        
        
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    handleEdit = () => {
        this.setState({editing: !this.state.editing})
           
    }

    doneEditing = () => {
        // this function is used after a party is deleted
        this.setState({editing: !this.state.editing})
        // this.props.doneViewing()
    }

   
    showShoppingList = () => {
       
        this.props.partyList(this.props.party.id)
        this.props.history.push('/list')
       
    }

    sendMessage = (event) => {
        event.preventDefault()
        console.log(event.target.message.value)
    }

    getRoomData = () => {
        fetch(`http://localhost:3000/rooms/${this.props.party.room.id}`)
        .then(r => r.json())
        .then(response => {
            this.setState({
                room: response.room
            })
            
        })
    }
    



    render() {
        return (
           
            <div className="viewParty">
            {
                this.state.editing === true ?
                <EditParty fetchParties={this.props.fetchParties} sendPartyObj={this.props.sendPartyObj} history={this.props.history} party={this.props.party} doneEditing={this.doneEditing} doneViewing={this.props.doneViewing} handleEdit={this.handleEdit} />
                    :
                    <div className="partyViewDiv">

                        <div className="chatBoxDiv">
                            <RoomWebSocket getRoomData={this.getRoomData} />
                            <div className="chatBorder">
                                {/* chatroom name will go here */}
                            <h1>CHATROOM ID {this.props.party.room.id}</h1>
                            </div>
                            <form onSubmit={this.sendMessage}>
                            <input type="text" name="message" />
                            <button>Send</button>
                            </form>
                        </div>

                <div className="partyInfoDiv">
                <h1>{this.props.party.name}</h1>
                <h3>Date</h3>
                <p>{this.props.party.date}</p>
                <h3>Address</h3>
                <p>{this.props.party.address}</p>
                <h3>Details</h3>
                <p>{this.props.party.details}</p>
               
                </div>

                <button onClick={this.showShoppingList} >Shopping List</button>
                
                
                

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


const mapStateToProps = (state) => ({
    auth: state.auth,
    list: state.partyList
  })

  const mapDispatchToProps = {
 
      partyList
    
  }

export default connect(mapStateToProps, mapDispatchToProps)(ViewParty);