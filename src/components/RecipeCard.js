import React, { Component } from 'react';
import '../style/RecipeCard.css'

class RecipeCard extends Component {
    componentDidMount(){
        debugger
    }
    render() {
        return (
            <div className="recipeCard" onClick={() => this.props.cardClicked(this.props.info)}>
                <div className="imgDiv">
                <img src={`https://spoonacular.com/recipeImages/${this.props.info.id}-636x393`} alt={this.props.name}/>
                </div>
                <div className="recipeTitle">
                <h3>{this.props.info.title}</h3>
                </div>
            </div>
        );
    }
}

export default RecipeCard;