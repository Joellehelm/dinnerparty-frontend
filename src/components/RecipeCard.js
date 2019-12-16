import React, { Component } from 'react';
import '../style/RecipeCard.css'

class RecipeCard extends Component {
    render() {
        return (
            <div onClick={() => this.props.cardClicked(this.props.info)}>
                <h3>{this.props.info.title}</h3>
                <p>{this.props.info.cuisines}</p>
                <img src={`https://spoonacular.com/recipeImages/${this.props.info.image}`} alt={this.props.name} className="cardImg"/>
            </div>
        );
    }
}

export default RecipeCard;