import React, { Component } from 'react';

import CreateParty from './CreateParty'
import ViewParty from './ViewParty'


import '../style/Parties.css'

class Parties extends Component {
    constructor(){
        super()

        this.state = {
            creating: false,
            hosting: [],
            attending: [],
            viewParty: false,
            partyInfo: [],
            editing: false
        }
    }

    
    componentDidMount(){
       
        this.fetchParties()
        this.fetchUsers()
    } 


    fetchUsers = () => {
        fetch(`http://localhost:3000/party_users`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(r => r.json())
        .then(response => {
 
         const attendedParties = []
             response.forEach(party => {
                 
                 if(party.user_id === this.props.auth.user.id){
                     attendedParties.push(party)
                 }
             })
             if(attendedParties.length > 0){
                 this.setState({
                     attending: attendedParties
                 })
             }
        }) 
    }


    fetchParties = () => {
        fetch(`http://localhost:3000/parties`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${localStorage.getItem('token')}`
            }
        })
       .then(r => r.json())
       .then(response => {

        const hostedParties = []
            response.forEach(party => {
                if(party.host_id === this.props.auth.user.id){
                    hostedParties.push(party)
                }
            })
            if(hostedParties.length > 0){
                this.setState({
                    hosting: hostedParties
                })
            }
       })
    }


   doneViewing = () => {
       this.setState({
           viewParty: !this.state.viewParty
       })
       this.fetchParties()
   }



    doneCreating = () => {
        this.setState({
            creating: false
        })
       
    }

    // handleEdit = () => {
    //     this.setState({editing: !this.state.editing})
    // }

    viewParty = (party) => {
        if(party.party){
            this.setState({viewParty: !this.state.viewParty, partyInfo: party.party, hosting: false})
        }else{
            this.setState({viewParty: !this.state.viewParty, partyInfo: party, hosting: true})
        }
    }


    mapHosting = () => {
       
        if(this.state.hosting.length > 0){

            return this.state.hosting.map((party, idx) => { return <div className="linkDiv" key={idx} partyid={party.id}><p className="partyLink" onClick={() => this.viewParty(party)}>{party.name}</p></div>})
        }else{
            return null
        }
    }


    mapAttending = () => {
        
        if(this.state.attending.length > 0){
       debugger
        return this.state.attending.map((party, idx) => { return <div className="linkDiv" key={idx} partyid={party.id} ><p className="partyLink" onClick={() => this.viewParty(party)} >{party.party.name}</p></div>} )
        
        }else{
            return null
        }
    }


    render() {
        return (
            <div>
               
                { this.state.creating ?
                <CreateParty fetchParties={this.fetchParties} doneCreating={this.doneCreating} auth={this.props.auth}/>

                :
                
                this.state.viewParty ? 
                <ViewParty doneViewing={this.doneViewing} history={this.props.history} hosting={this.state.hosting} auth={this.props.auth} party={this.state.partyInfo} />

                :
                <div className="partyDiv">
                    <h1>Parties</h1>
                <div className="parties">
                        <div className="hosting">
                        <h4>Hosting</h4>
                        {this.mapHosting()}
                        </div>
                    <div>
                        <div className="attending">
                        <h4>Attending</h4>
                        {this.mapAttending()}
                        </div>
                    </div>

                    <div>
                    </div>
                    <button className="partyCreateBtn" onClick={() => this.setState({creating: true})}>Create Party</button>
                </div>

                    </div>
                }
                
            </div>
        );
    }
}




export default Parties;



