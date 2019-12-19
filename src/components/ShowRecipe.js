import React, { Component } from 'react';
import { connect } from 'react-redux'

class ShowRecipe extends Component {
    constructor(){
        super()

        this.state = {
            name: "",
            image: "",
            servings: "",
            readyInMinutes: "",
            diets: [],
            ingredients: [],
            winePairings: [],
            pairingText: "",
            instructions: "",
            cuisines: "",
            hosting: [],
            party: ""
        }
    }

    componentDidMount(){

        
      
       

        fetch(`https://api.spoonacular.com/recipes/${this.props.showId}/information?includeNutrition=false&apiKey=${key}`)
        .then(r => r.json())
        .then(info => {
          
            this.setState({
                name: info.title,
                image: info.image,
                servings: info.servings,
                readyInMinutes: info.readyInMinutes,
                diets: info.diets,
                ingredients: info.extendedIngredients.map(ing => {return {item: ing.original, image: ing.image}}),
                winePairings: info.winePairing.pairedWines,
                pairingText: info.winePairing.pairingText,
                instructions: info.instructions,
                cuisines: info.cuisines
            })
            this.fetchParties()
        })


    }


    fetchParties = () => {
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
             }})
             this.mapParties()
    }

    
    listWinePairings = () => {
        if(this.state.winePairings){

            return this.state.winePairings.map((wine, idx) => {return <li key={idx}>{wine}</li>})
        }else{
            return <li>None</li>
        }
    }


  
    mapParties = () => {
        return this.state.hosting.map((party, idx) => { return <option key={idx} value={party.id}>{party.name}</option>})
    }


    addRecipe = () => {

        fetch('http://localhost:3000/recipes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({name: this.state.name, api_id: this.props.showId, image: this.state.image})
        })
        .then(r => r.json())
        .then(response => {
            
            this.addPartyRecipe(response.id)
        })

    }


    addPartyRecipe = (id) => {
        fetch(`http://localhost:3000/party_recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer' + localStorage.getItem('token')

            },
            body: JSON.stringify({party_recipe: {party_id: this.state.party, recipe_id: id}})
        })
        .then(r => r.json())
        .then(response => {
            console.log(response)
        })
    }


    

    handleChange = (event) => {
        debugger
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    render() {
        return (
            <div>
                <img src={this.state.image}/>

                <h1>{this.state.name}</h1>

                <h3>Servings</h3>
                <p>{this.state.servings}</p>

                <h3>Diet(s)</h3>
                <ul>{this.state.diets.map((diet, idx) => {return <li key={idx} >{diet}</li>})}</ul>

                <h3>Time in Minutes</h3>
                <p>{this.state.readyInMinutes}</p>

                

                <h3>Wine Info</h3>
                <p>{this.state.pairingText ? this.state.pairingText : "None"}</p>
                <h3>Wine Pairing(s) </h3>
                <ul>{this.listWinePairings()}</ul>

                <select onChange={this.handleChange} name="party">
                   <option defaultValue>Choose a Party</option>
                   {this.mapParties()}
                   </select><button onClick={this.addRecipe}>Add to Party</button>

                <h3>Ingredients</h3>
                <ul>{this.state.ingredients.map((i, idx) => {return <li key={idx}>{i.item}</li>})}</ul>


                <h2>Instructions</h2>
                {this.state.instructions}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
  })


export default connect(mapStateToProps)(ShowRecipe);