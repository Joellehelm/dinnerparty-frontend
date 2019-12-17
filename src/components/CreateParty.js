import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../style/CreateParty.css'

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
            userSearch: ""

        }

    }


    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.auth)
        debugger
        // fetch('http://localhost:3000/parties', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         name: this.state.partyName,
        //         host_id: 
        //     })


        // })
    }   

    handleChange = (event) => {
        console.log(event.target.value)
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
           
        let guests = this.state.partyGuests
        if(this.state.partyGuests.includes(event.target.id)){
            let idx = guests.indexOf(event.target.id)
            delete guests[idx]

            this.setState({
                partyGuests: guests
            })
        } else {
            guests.push(event.target.id)
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
                    
                    <DatePicker placeholderText="Select Date" selected={this.state.partyDate} onChange={this.handleCalendar} showTimeSelect dateFormat="Pp" />

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