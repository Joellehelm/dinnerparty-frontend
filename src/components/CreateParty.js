import React, { Component } from 'react';
import { connect } from 'redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



import '../style/CreateParty.css'
import { ReactReduxContext } from 'react-redux';

class CreateParty extends Component {
    constructor(){
        super()

        this.state = {
            partyName: "",
            partyAddress: "",
            partyDate: "",
            partyTime: "",
            partyDetails: "",
            partyGuests: [],
            users: [],
            userSearch: "",
            

        }

    }
   

    handleSubmit = (event) => {
        event.preventDefault()

        const partyObj = {
            name: this.state.partyName,
            host_id: this.props.auth.user.id,
            address: this.state.partyAddress,
            details: this.state.partyDetails,
            date: this.state.partyDate
        }
       
      
        fetch('http://localhost:3000/parties', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
               
            },
            body: JSON.stringify({party: partyObj})
        })
        .then(r => r.json())
        .then(response => {
            this.createPartyUsers(response.id)
            this.setState({
                name: "",
                host_id: "",
                address: "",
                details: "",
                date: ""
            })
        })
    }   


    createPartyUsers = (partyId) => {

        fetch('http://localhost:3000/party_users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({party_user: {party_id: partyId, user_id: this.state.partyGuests}})
        })
        .then(r => r.json())
        .then(response => {
           
            this.setState({
                partyGuests: []
            })
            this.props.fetchParties()
            this.props.doneCreating()
            
        })
    }



    handleChange = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }
    
    handleCalendar = (event) => {
        
        this.setState({
            partyDate: event
        })
        
    }

    componentDidMount(){
        fetch(`http://localhost:3000/usernames`)
        .then(r => r.json())
        .then(users => {
            this.setState({users: users})
           
        })
    }

    handleCheck = (event) => {
        const guestId = parseInt(event.target.id)
           
        let guests = this.state.partyGuests
        if(this.state.partyGuests.includes(guestId)){
            let idx = guests.indexOf(guestId)
            delete guests[idx]

            this.setState({
                partyGuests: guests
            })
        } else {
            guests.push(guestId)
            this.setState({
                partyGuests: guests
            })
        }
       
        
    }

    


    mapUsers = () => {
    return this.state.users.map(user => {return <p key={user.id}><input onChange={this.handleCheck} type="checkbox" key={user.id} name="user" id={user.id}/>{user.username}</p>})
    }


   





    render() {
        const {partyName, partyAddress, userSearch} = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="partyName" value={partyName} placeholder="Name"/>
                    <input onChange={this.handleChange} type="text" name="partyAddress" value={partyAddress} placeholder="Address"/>
                    
                    <input type="date" name="partyDate" placeholder="Select Date" onChange={this.handleChange} />
                    {/* <DatePicker placeholderText="Select Date" selected={this.state.partyDate} onChange={this.handleCalendar}  /> */}
                    
                    <textarea placeholder="Additional Details" type="text" onChange={this.handleChange} name="partyDetails"/>


                    <input type="text" value={userSearch} name="userSearch" placeholder="Search Users" onChange={this.handleChange} />
                    <div className="scrollBox" >
                    <ul>{this.mapUsers()}</ul>
                    </div>
                    <button value="submit" type="submit">Create</button>

                    

                    </form>
            </div>
        );
    }
}

export default CreateParty;