import React, { Component } from 'react';
import '../style/RecipeCard.css'

class RecipeCard extends Component {

    textTruncate = (str, length, ending) => {
        if (length == null) {
            length = 100;
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    }

    render() {
        return (
            <div className="recipe-card-container">
                <div className="recipeCard" onClick={() => this.props.cardClicked(this.props.info)}>
                    <div className="imgDiv">

                        <img src={`https://spoonacular.com/recipeImages/${this.props.pic}`} alt={this.props.name} />
                    </div>
                    <div className="recipeTitle">
                        <p>{this.textTruncate(this.props.info.title, 35)}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;