import React, { Component } from 'react';
import CreateParty from './CreateParty'
import ViewParty from './ViewParty'

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
       fetch(`http://localhost:3000/parties`)
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

       fetch(`http://localhost:3000/party_users`)
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


   



    doneCreating = () => {
        this.setState({
            creating: false
        })
    }

    handleEdit = () => {
        this.setState({editing: !this.state.editing})
    }

    viewParty = (party) => {
        if(party.party){
            this.setState({viewParty: !this.state.viewParty, partyInfo: party.party, hosting: false})
        }else{
            this.setState({viewParty: !this.state.viewParty, partyInfo: party, hosting: true})
        }
    }


    mapHosting = () => {
       
        if(this.state.hosting.length > 0){

            return this.state.hosting.map((party, idx) => { return <div key={idx} partyid={party.id}><p onClick={() => this.viewParty(party)}>{party.name}</p><button onClick={() => this.handleEdit(party)}>EDIT</button></div>})
        }else{
            return null
        }
    }


    mapAttending = () => {
        
        if(this.state.attending.length > 0){
          debugger
        return this.state.attending.map((party, idx) => { return <div key={idx} partyid={party.id} ><p onClick={() => this.viewParty(party)} >{party.party.name}</p></div>} )
        
        }else{
            return null
        }
    }


    render() {
        return (
            <div>
               
                { this.state.creating ?
                <CreateParty mapHosting={this.mapHosting} doneCreating={this.doneCreating} auth={this.props.auth}/>

                :
                
                this.state.viewParty ? 
                <ViewParty hosting={this.state.hosting} auth={this.props.auth} party={this.state.partyInfo} />

                :

                <div>
                    <h2>Parties</h2>
                        <h4>Hosting</h4>
                        {this.mapHosting()}
                    <div>
                        <h4>Attending</h4>
                        {this.mapAttending()}
                    </div>

                    <div>

                </div>

                    <button onClick={() => this.setState({creating: true})}>Create Party</button>
                    </div>
                }
                
            </div>
        );
    }
}

export default Parties;



