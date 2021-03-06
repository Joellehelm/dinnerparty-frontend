import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../style/CreateParty.css'


class EditParty extends Component {
    constructor() {
        super()

        this.state = {
            partyName: "",
            partyAddress: "",
            partyDate: "",
            partyDetails: "",
            partyGuests: [],
            users: [],
            userSearch: "",
        }
    }

    UNSAFE_componentWillMount() {
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
                "Accept": 'application/json',
                "Authorization": `JWT ${localStorage.getItem('token')}`

            },
            body: JSON.stringify({ party: partyObj })
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

    componentDidMount() {
        fetch(`http://localhost:3000/usernames`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(r => r.json())
            .then(users => {
                this.setState({ users: users })
            })
    }

    handleCheck = (event) => {
        const guestId = parseInt(event.target.id)

        let guests = this.state.partyGuests
        if (this.state.partyGuests.includes(guestId)) {
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
        return this.state.users.map(user => { return <p key={user.id}><input onChange={this.handleCheck} type="checkbox" key={user.id} name="user" id={user.id} />{user.username}</p> })
    }


    handleDelete = () => {
        fetch(`http://localhost:3000/parties/${this.props.party.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(r => r.json())
            .then(response => {
                this.props.doneEditing()
                this.props.fetchParties()

            })
    }


    render() {
        const { partyName, partyAddress, partyDate, partyDetails } = this.state
        return (

            <div className="createContainer">
                <form className="editForm" onSubmit={this.handleSubmit}>
                    <div className="leftSide edit-party">
                        <input onChange={this.handleChange} type="text" name="partyName" value={partyName} placeholder="Name" />
                        <input onChange={this.handleChange} type="text" name="partyAddress" value={partyAddress} placeholder="Address" />

                        <input className="dateSelect party-date-select" type="date" name="partyDate" value={partyDate} placeholder="Select Date" onChange={this.handleChange} />


                        <textarea className="details edit-details" placeholder="Additional Details" type="text" value={partyDetails} onChange={this.handleChange} name="partyDetails" />
                        <br></br>
                        <div className="edit-buttons">
                            <button className="submit-party-edit" value="submit" type="submit">Submit Edit</button>

                            <button className="cancel-party-btn" onClick={this.handleDelete}>Cancel Party</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default EditParty;