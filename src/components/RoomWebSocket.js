import React, { Component } from 'react';

class RoomWebSocket extends Component {

    componentDidMount = () => {
        this.props.getRoomData()
      
        this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create({
            channel: 'RoomsChannel',
            room: this.props.room
        },
        {
            received: (updatedRoom) => {
                this.props.updateRoom(updatedRoom)
               
               
            }
        })
    }


    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default RoomWebSocket;