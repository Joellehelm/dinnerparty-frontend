import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../style/ShoppingList.css'
import NavBar from './NavBar'


class ShoppingList extends Component {
    constructor() {
        super()
        this.state = {
            bringingIngredients: [],
            userIngredients: [],
            purchasedIngredients: []
        }
    }


    componentDidMount() {
        this.fetchIngredients()
    }

    fetchIngredients = () => {
        this.setState({ userIngredients: [] })
        fetch('http://localhost:3000/user_ingredients', {
            method: "GET",
            headers: {
                "Authorization": `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(r => r.json())
            .then(response => {
                const boughtIngredients = {}
                const purchased = response.map(r => { return r.ingredient_id })

                response.forEach(r => {
                    let ing = r.ingredient_id
                    boughtIngredients[ing] = r.user.username

                })

                this.setState({
                    userIngredients: boughtIngredients,
                    purchasedIngredients: purchased
                })
            })
    }



    mapList = () => {
        return this.props.list.partyList.map((recipe, idx) => {

            return <div className="listedRecipe" key={idx} >
                <div className="recipeHeader">
                    <img src={recipe.recipe.image} />
                    <p>{recipe.recipe.name}</p>
                </div>
                {this.mapIngredients(recipe.ingredients)}
            </div>
        })
    }


    mapIngredients = (ingredients) => {
        return ingredients.map((ingredient, idx) => {
            if (!this.state.purchasedIngredients.includes(ingredient.id)) {
              
                return <div className="ingredientDiv" style={{backgroundImage: `url(https://spoonacular.com/cdn/ingredients_500x500/${ingredient.picture})`}} key={idx}>
                    <input className="checkbox" onChange={this.markList} key={idx} type="checkbox" name="user" id={ingredient.id} value={ingredient.name} />
                    <p>{ingredient.name}</p>
                    </div>
            } else {
                return <div className="ingredientDiv" key={idx}><h4 className="purchasedIngredient">{ingredient.name}</h4><p>{this.state.userIngredients[ingredient.id]}</p></div>
            }
        })
    }




    markList = (event) => {
        const ingredientId = parseInt(event.target.id)

        let bringing = this.state.bringingIngredients
        if (this.state.bringingIngredients.includes(ingredientId)) {
            let idx = bringing.indexOf(ingredientId)
            delete bringing[idx]

            this.setState({
                bringingIngredients: bringing
            })
        } else {
            bringing.push(ingredientId)
            this.setState({
                bringingIngredients: bringing
            })
        }
    }


    handleSubmit = () => {

        if (this.state.bringingIngredients.length > 0) {
            fetch('http://localhost:3000/user_ingredients', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `JWT ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ user_id: this.props.auth.user.id, ingredient_id: this.state.bringingIngredients })
            })
                .then(r => r.json())
                .then(response => {
                    this.setState({ bringingIngredients: [] })
                    this.fetchIngredients()
                })
        }

    }



    render() {
        return (
            <div>

                <NavBar history={this.props.history} />
                <div className="shoppingList">
                    <h1>Shopping List</h1>
                    <p>Check off which ingredients you'll be bringing and click "Bring These Ingredients" at the bottom of the page.</p>
                    <div className="listDiv">
                        {this.mapList()}
                        <button onClick={this.handleSubmit} >Bring These Ingredients</button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    list: state.partyList,
    auth: state.auth
})

export default connect(mapStateToProps)(ShoppingList);