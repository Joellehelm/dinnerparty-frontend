import React, { Component } from 'react';
import RecipeCard from './RecipeCard'
import Search from './Search'
import '../style/Recipes.scss'
import { connect } from 'react-redux'
import { searchedRecipes } from '../actions/recipes';
import { recipeInfo } from '../actions/recipeInfo'
import { fetchingRecipes } from '../actions/recipes'
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";


const override = css`
  display: flex;
`;

class Recipes extends Component {
    constructor() {
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

        if (this.props.isFetching === true) {
            return <div className="loader">
                <PacmanLoader
                    css={override}
                    size={50}
                    color={"rgb(4, 153, 29)"}
                    loading={this.props.isFetching}
                /></div>
        }
        if (this.props.isFetching === false && this.props.recipes.recipes.length > 0) {

            return this.props.recipes.recipes.map((recipe, idx) => {


                return <RecipeCard cardClicked={this.cardClicked} info={recipe} pic={recipe.image} key={idx} />
            })

        }
    }


    handleSubmit = (event) => {
        event.preventDefault()


        if (this.state.query !== "" || this.state.cuisine !== "" || this.state.diet !== "") {
            this.props.fetchingRecipes()
            this.props.searchedRecipes({ ...this.state })
            this.mapCards()

            event.target.query.value = ""
            event.target.cuisine.value = "Cuisine Type"
            event.target.diet.value = "Dietary Restrictions"
            this.setState({
                query: "",
                cuisine: "",
                diet: ""
            })

        }

    }




    cardClicked = (info) => {
        this.props.recipeInfo(info)
        this.props.history.push('/recipe')

    }


    render() {
        return (
            <div className="recipe-wrapper">

                <div className="recipe-container">
                    <Search search={this.state.query} selected={this.state.cuisine} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />

                    <div className="recipe-cards-container">

                        {this.mapCards()}

                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes,
    info: state.info,
    isFetching: state.recipes.isFetching
})


const mapDispatchToProps = {

    searchedRecipes,
    recipeInfo,
    fetchingRecipes

}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes);