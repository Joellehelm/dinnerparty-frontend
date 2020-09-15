import React, { Component } from 'react';
import { TiDelete } from 'react-icons/ti';

class InvitedUsers extends Component {

    usersInvited = () => {
        return this.props.guests.map(guest => <div onClick={() => this.props.removeFromParty(guest)} className="remove-user-frm-party" key={guest.username + "partyGuest"}><TiDelete className="remove-icon" color="red" /><p>{guest.username}</p></div>)

    }

    render() {
        return (

            <div className="invited-users">
                {this.props.guests.length > 0 ? this.usersInvited() 
                :
                <>
                 <p className="invite-some-users">You can search for users to invite to your party with the search box on the right.</p>
                 <p className="invite-some-users"> Click a user to add them to your party.</p>
                 </>
                 }

                </div>

        );
    }
}

export default InvitedUsers;