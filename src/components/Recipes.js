import React, { Component } from 'react';
import RecipeCard from './RecipeCard'
import Search from './Search'
import ShowRecipe from './ShowRecipe'
import '../style/Recipes.css'
import { connect } from 'react-redux'
import { searchedRecipes } from '../actions/recipes';
import { recipeInfo } from '../actions/recipeInfo'
import { Redirect } from 'react-router-dom'



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





    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }

  
    mapCards = () => {
        if(this.props.recipes.recipes.length === 0 ){
            return null
        }else{
            return this.props.recipes.recipes.map((recipe, idx) => { 
                
                return <RecipeCard cardClicked={this.cardClicked} info={recipe} key={idx}/>
            })

        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        this.props.searchedRecipes({...this.state})
        this.mapCards()
        
        event.target.query.value = ""
        event.target.cuisine.value = "Cuisine Type"
        event.target.diet.value = "Dietary Restrictions"
       
    }





    cardClicked = (info) => {
        this.props.recipeInfo(info)
       this.props.history.push('/recipe')
        
    }


    render() {
        return (
            <div className="recipesContainer">
                {/* {
                    this.state.clicked ? 
                    <ShowRecipe showId={this.state.showId}/>
                    : */}
                <div>
                    <Search search={this.state.query} selected={this.state.cuisine} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                    {this.mapCards()}
                </div>
                {/* // } */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes,
    info: state.info
  })


  const mapDispatchToProps = {
 
      searchedRecipes,
      recipeInfo
    
  }


export default connect(mapStateToProps, mapDispatchToProps)(Recipes);