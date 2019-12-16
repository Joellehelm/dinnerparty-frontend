import React, { Component } from 'react';
import '../style/RecipeCard.css'

class RecipeCard extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.info.title}</h3>
                <p>{this.props.info.cuisines[0]}</p>
                <img src={this.props.info.image} alt={this.props.name} className="cardImg"/>
            </div>
        );
    }
}

export default RecipeCard;