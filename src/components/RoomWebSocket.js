import React, { Component } from 'react';

class RoomWebSocket extends Component {

    componentDidMount = () => {
        this.props.getRoomData(window.location.href.match(/\d+/)[0])
    }


    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default RoomWebSocket;