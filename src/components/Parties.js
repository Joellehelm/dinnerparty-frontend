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

    } 

    fetchParties = () => {
        this.fetchHosting()
        this.fetchAttending()
    }

    fetchAttending = () => {
        fetch(`http://localhost:3000/attending`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(r => r.json())
        .then(response => {
            this.setState({attending: response})
        })
    }

    fetchHosting = () => {
        fetch(`http://localhost:3000/hosting`, {
            method: "GET",
            headers: {
                "Authorization": `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(r => r.json())
        .then(response => {
           this.setState({hosting: response})
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

    viewParty = (party) => {
        if(party.hosting){
            this.setState({viewParty: !this.state.viewParty, partyInfo: party, hosting: true})
        }else{
            this.setState({viewParty: !this.state.viewParty, partyInfo: party, hosting: false})
        }
    }


    mapHosting = () => {
       
        if(this.state.hosting.length > 0){
            return this.state.hosting.map((party, idx) => { 
                party.hosting = true
                return <div className="linkDiv" key={idx} partyid={party.id}><p className="partyLink" onClick={() => this.viewParty(party)}>{party.name}</p></div>})
        }else{
            return null
        }
    }


    mapAttending = () => {
        
        if(this.state.attending.length > 0){
            return this.state.attending.map((party, idx) => { 
                party.hosting = false
                return <div className="linkDiv" key={idx} partyid={party.id} ><p className="partyLink" onClick={() => this.viewParty(party)} >{party.name}</p></div>} )  
        }else{
            return null
        }
    }


    render() {
        return (
            <div className="party-container">
               
                { this.state.creating ?
                <CreateParty fetchParties={this.fetchParties} doneCreating={this.doneCreating} auth={this.props.auth}/>

                :
                
                this.state.viewParty ? 
                <ViewParty attending={this.state.attending} fetchParties={this.fetchParties} doneViewing={this.doneViewing} history={this.props.history} hosting={this.state.hosting} auth={this.props.auth} party={this.state.partyInfo} />

                :
                <div className="partyDiv">
                    <p className="parties-title">Parties</p>
                <div className="parties">
                        <div className="hosting">
                        <p className="border-word-first">Hosting</p>
                        <div className="link-div">
                        {this.mapHosting()}
                        </div>
                        </div>
                    <div>
                        <div className="attending">
                        <p className="border-word-second">Attending</p>
                        <div className="link-div">
                        {this.mapAttending()}
                        </div>
                        </div>
                    </div>

                    <div>
                    </div>
                    <div className="partyBtnDiv">
                    <button className="partyCreateBtn" onClick={() => this.setState({creating: true})}>Create Party</button>
                    </div>
                </div>

                    </div>
                }
                
            </div>
        );
    }
}




export default Parties;



