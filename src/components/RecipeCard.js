import React, { Component } from 'react';
import '../style/RecipeCard.css'

class RecipeCard extends Component {

    render() {
        return (
            <div className="recipeCard" onClick={() => this.props.cardClicked(this.props.info)}>
                <div className="imgDiv">
                
                
                
                <img src={`https://spoonacular.com/recipeImages/${this.props.pic}`} alt={this.props.name}/>
                </div>
                <div className="recipeTitle">
                <h3>{this.props.info.title}</h3>
                </div>
            </div>
        );
    }
}

export default RecipeCard;