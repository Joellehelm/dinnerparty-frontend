import React, { Component } from 'react';
import { connect } from 'redux';

import "react-datepicker/dist/react-datepicker.css";



import '../style/CreateParty.css'


class EditParty extends Component {
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

   UNSAFE_componentWillMount(){
       this.setState({
        partyName: this.props.party.name,
        partyAddress: this.props.party.address,
        partyDate: this.props.party.date,
        partyTime: this.props.party.time,
        partyDetails: this.props.party.details
       })
  
   }
   

    handleSubmit = (event) => {
        event.preventDefault()

        const partyObj = {
            name: this.state.partyName,
            host_id: this.props.party.host_id,
            address: this.state.partyAddress,
            details: this.state.partyDetails,
            date: this.state.partyDate
        }
       
      
        fetch(`http://localhost:3000/parties/${this.props.party.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
               
            },
            body: JSON.stringify({party: partyObj})
        })
        .then(r => r.json())
        .then(response => {
           
           
            this.props.handleEdit()
            this.props.doneViewing()
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


    handleDelete = () => {
        fetch(`http://localhost:3000/parties/${this.props.party.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(r => r.json())
        .then(response => {
            this.props.doneEditing()
         
            
        })
    }
   





    render() {
        const {partyName, partyAddress, userSearch, partyDetails} = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="partyName" value={partyName} placeholder="Name"/>
                    <input onChange={this.handleChange} type="text" name="partyAddress" value={partyAddress} placeholder="Address"/>
                    
                    <input type="date" name="partyDate" placeholder="Select Date" onChange={this.handleChange} />
                    {/* <DatePicker placeholderText="Select Date" selected={this.state.partyDate} onChange={this.handleCalendar}  /> */}
                    
                    <textarea placeholder="Additional Details" type="text" onChange={this.handleChange} value={partyDetails}/>


                    {/* <input type="text" value={userSearch} name="userSearch" placeholder="Search Users" onChange={this.handleChange} />
                    <div className="scrollBox" >
                    <ul>{this.mapUsers()}</ul> */}
                    {/* </div> */}
                    <button value="submit" type="submit">Submit Edit</button>

                    <button onClick={this.handleDelete}>Cancel Party</button>

                    

                    </form>
            </div>
        );
    }
}

export default EditParty;