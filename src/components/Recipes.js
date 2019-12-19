import React, { Component } from 'react';
import RecipeCard from './RecipeCard'
import Search from './Search'
import ShowRecipe from './ShowRecipe'



class Recipes extends Component {
    constructor(){
        super()
        
        this.state = {
            randoms: [],
            servings: "",
            recipes: [],
            query: "",
            cuisine: "",
            diet: "",
            clicked: false,
            showId: ""
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
        if(this.state.recipes.length === 0 ){
            return null
        }else{
            return this.state.recipes.map((recipe, idx) => { 
                
                return <RecipeCard cardClicked={this.cardClicked} info={recipe} key={idx}/>
            })

        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        this.fetchSearched()
        
        event.target.query.value = ""
        event.target.cuisine.value = "Cuisine Type"
        event.target.diet.value = "Dietary Restrictions"
    }



    fetchSearched = () => {

      
        

        let URL = `https://api.spoonacular.com/recipes/search`

        if(this.state.query.length > 0){
            URL = URL + `?query=${this.state.query}`
        }
        if(this.state.cuisine.length > 0){
            if(URL.includes('?')){
                URL = URL + '&'
            }else{
                URL = URL + '?'
            }
            URL = URL + `cuisine=${this.state.cuisine}`
        }
        if(this.state.diet.length > 0){
            if(URL.includes('?')){
                URL = URL + '&'
            }else{
                URL = URL + '?'
            }
            URL = URL + `diet=${this.state.diet}`
        }
        


        fetch(URL + `&number=5&instructionsRequired=true&apiKey=${key}`)
        .then(r => r.json())
        .then(recipes => {
            
          
            this.setState({

                recipes: recipes.results
            })
            this.mapCards()
            this.setState({
                query: "",
                diet: "",
                cuisine: ""
            })
        })
    }


    cardClicked = (info) => {
       
        this.setState({
            clicked: true,
            showId: info.id
        })
    }


    render() {
        return (
            <div>
                {
                    this.state.clicked ? 
                    <ShowRecipe showId={this.state.showId}/>
                    :
                <div>
                    <Search search={this.state.query} selected={this.state.cuisine} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                    {this.mapCards()}
                </div>
                }
            </div>
        );
    }
}

export default Recipes;