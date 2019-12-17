import React, { Component } from 'react';

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
            cuisines: ""
        }
    }

    componentDidMount(){

       
       

        fetch(`https://api.spoonacular.com/recipes/${this.props.showId}/information?includeNutrition=false&apiKey=${key}`)
        .then(r => r.json())
        .then(info => {
            debugger
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
        })
    }

    
    listWinePairings = () => {
        return this.state.winePairings.map(wine => {return <li>{wine}</li>})
    }


    render() {
        return (
            <div>
                <img src={this.state.image}/>

                <h1>{this.state.name}</h1>

                <h3>Diet(s)</h3>
                <ul>{this.state.diets.map((diet, idx) => {return <li key={idx} >{diet}</li>})}</ul>

                <h3>Time in Minutes</h3>
                <p>{this.state.readyInMinutes}</p>

                <h3>Wine Info</h3>
                <p>{this.state.pairingText}</p>
                <h3>Wine Pairing(s) </h3>
                <ul>{this.state.winePairings.map((wine, idx) => {return <li key={idx} >{wine}</li>})}</ul>

                <h3>Ingredients</h3>
                <ul>{this.state.ingredients.map((i, idx) => {return <li key={idx}>{i.item}</li>})}</ul>


                <h2>Instructions</h2>
                <p>{this.state.instructions}</p>
            </div>
        );
    }
}

export default ShowRecipe;