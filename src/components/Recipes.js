import React, { Component } from 'react';
import RecipeCard from './RecipeCard'
import Search from './Search'



class Recipes extends Component {
    constructor(){
        super()
        
        this.state = {
            randoms: [],
            servings: "",
            searched: []
        }
    }
    
    
    // componentDidMount(){


        



    //     fetch(`https://api.spoonacular.com/recipes/random/?number=2&apiKey=${Key}`)
    //     .then(r => r.json())
    //     .then(r => {
          
        
    //        this.setState({
    //            randoms: r.recipes
    //        })
    //     })
    // }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }

  
    mapCards = () => {
        if(this.state.randoms.length === 0){
            return null
        }else{
            return this.state.randoms.map((random, idx) => { return <RecipeCard info={random} key={idx}/>})

        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        this.fetchSearched()
        debugger
        event.target.query.value = ""
        event.target.Cuisine.value = "Cuisine Type"
        event.target.Diet.value = "Dietary Restrictions"
    }


    fetchSearched = () => {

    }


    render() {
        return (
            <div>
                <div>
                    <Search search={this.state.query} selected={this.state.cuisine} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                </div>
              {this.mapCards()}
            </div>
        );
    }
}

export default Recipes;