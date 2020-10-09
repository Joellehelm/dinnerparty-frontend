import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { SiAddthis } from "react-icons/si";

class MarkIngredient extends Component {
    constructor(){
        super()
        this.state = {
            checked: false
        }
    }

    markList = () => {
        this.setState({checked: !this.state.checked})
        this.props.markList(this.props.ingredient.id)
    }

    render() {
        return (

            <IconContext.Provider value={this.state.checked ? { color: "rgba(3, 175, 3, 0.904)" } : { color: "gray"}}>
                <div className={this.state.checked ? "ingredientDiv outline-green" : "ingredientDiv"} 
                style={{ backgroundImage: `url(https://spoonacular.com/cdn/ingredients_500x500/${this.props.ingredient.picture})` }} 
                key={this.props.ingredient.name} 
                onClick={() => this.markList(this.props.ingredient.id)} id={this.props.ingredient.id} value={this.props.ingredient.name} key={this.props.ingredientname + this.props.ingredientId}>
                    <div className="mark-ing-container">
                        <SiAddthis />
                
                    <p>{this.props.ingredient.name}</p>
                    </div>
                </div>
            </IconContext.Provider>

        );
    }
}

export default MarkIngredient;