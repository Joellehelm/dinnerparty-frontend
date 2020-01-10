import React, { Component } from 'react';
import { connect } from 'react-redux'
import NavBar from './NavBar'
import '../style/ShowRecipe.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import { addIngredients } from '../actions/ViewParty'

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
            party: "",
            nutrition: [],
            modal: false
        }
    }

    componentDidMount(){

       
        const key = '8637d575cf9b40fea513f2928dfc4be1'

        // const key = 'd0ec7d65d45b4f94849ced4f8902ee2a'

        // const key = '1bb51352dd1242a78144cdf8f41248f7'

       
        if(this.props.info.info.id){

            fetch(`https://api.spoonacular.com/recipes/${this.props.info.info.id}/information?includeNutrition=true&apiKey=${key}`)
            .then(r => r.json())
            .then(info => {
             const nutr = info.nutrition.nutrients.slice(0, 8)
             
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
                    cuisines: info.cuisines,
                    nutrition: nutr.map(n => {return {title: n.title, amount: n.amount}})
                    
                })
                this.fetchParties()
                this.mapNutrition()
            })
        }


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
                "Accept": "application/json",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({name: this.state.name, api: this.props.info.info.id, image: this.state.image})
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
                "Authorization": `JWT ${localStorage.getItem('token')}`

            },
            body: JSON.stringify({party_recipe: {party_id: this.state.party, recipe_id: id}})
        })
        .then(r => r.json())
        .then(response => {
           
            
            this.setState({modal: true})
            this.addIngredients(id)
        })
    }



    addIngredients = (id) => { 
        const ing = this.state.ingredients.map(i => {return i.item})
        const ingredient = {
            ingredients: ing,
            recipe_id: id,
            party_id: this.state.party
        }


        fetch(`http://localhost:3000/ingredients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "applicaton/json",
                "Authorization": `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ingredient})
        })
        .then(r => r.json())
        .then(response => {
            
        })
       
    }


    mapNutrition = () => {
        return this.state.nutrition.map((n, idx) => {return <div className="singleNutrition" key={idx} ><h3>{n.title}</h3><p>{n.amount}</p></div>})
    }

    
    closeModal = () => {
        document.querySelector('.modalQuery').classList.remove('modalOverlay')
        this.setState({modal: false})
    }


    showModal = () => {

        if(this.state.modal === true){


            document.querySelector('.modalQuery').classList.add('modalOverlay')



            return <div className="modal">
              <h3>This recipe has been successfully added to your party!</h3>
              <Button onClick={() => this.closeModal()} variant="secondary">Close</Button>
          </div>
        }
        
    }

 


    handleChange = (event) => {
       
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    render() {
        return (
                

            <div>
               
                <NavBar history={this.props.history}/>
                {this.showModal()}
                <div className="modalQuery">
                <div className="recipeContainer">
                    <div className="recipeName">
                    <h1>{this.state.name}</h1>
                    </div>
                <div className="showRecipe">
                    <div className="recipePicture">
                        <div className="pictureDiv">
                        <img src={this.state.image}/>
                        </div>
                    <div className="partySelect">
                <select onChange={this.handleChange} name="party">
                   <option defaultValue>Choose a Party</option>
                   {this.mapParties()}
                   </select><button onClick={this.addRecipe}>Add to Party</button>
                   </div>

              
             
                    </div>


                    
              
            <div className="rightSide">
                <div className="innerItems">
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
                </div>

                <div className="nutrition">
                    {this.mapNutrition()}
                
                    </div>

                </div>
                <div className="ingDiv">
                <div className="ingredients">
              
              <h3>Ingredients</h3>
              <ul>{this.state.ingredients.map((i, idx) => {return <li key={idx}>{i.item}</li>})}</ul>
              </div>
              </div>

               
            
                </div>
                </div>
                <div className="instructions">
              <h2>Instructions</h2>
              {this.state.instructions}
              </div>
              </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    info: state.info,
    auth: state.auth
  })

  const mapDispatchToProps = {
    //   addIngredients
  }


export default connect(mapStateToProps, mapDispatchToProps)(ShowRecipe);