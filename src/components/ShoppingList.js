import React, { Component } from 'react';
import { connect } from 'react-redux'

class ShoppingList extends Component {
    constructor(){
        super()

        this.state = {
            bringingIngredients: [],
            userIngredients: []
        }
    }
  

    //map ids of user_ingredients to state then when list is mapped exclude ingredients that have an id that is included in user_ingredients
    // then map user_ingredients in their correct places and style them appropriately.


    componentDidMount(){
        fetch('http://localhost:3000/user_ingredients')
        .then(r => r.json())
        .then(response => {
            let boughtIngredients = response.map(r => {return r.ingredient_id})
            this.setState({
                userIngredients: boughtIngredients
            })
        })
    }



    mapList = () => {
    
    
        return this.props.list.partyList.map((ingredient, idx) => {
            if(!this.state.userIngredients.includes(ingredient.id)){
              
                return <p key={idx}><input onChange={this.markList} type="checkbox" key={idx} name="user" id={ingredient.id}/>{ingredient.name}</p>
            }else{
            return <p>Hello i'm a purchased ingredient {ingredient.name}</p>
            }
        })
    }


    markList = (event) => {
        const ingredientId = parseInt(event.target.id)

        let bringing = this.state.bringingIngredients
        if(this.state.bringingIngredients.includes(ingredientId)){
            let idx = bringing.indexOf(ingredientId)
            delete bringing[idx]

            this.setState({
                bringingIngredients: bringing
            })
        }else{
            bringing.push(ingredientId)
            this.setState({
                bringingIngredients: bringing
            })
        }
    }


    handleSubmit = () => {
        debugger
        fetch('http://localhost:3000/user_ingredients', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user_id: this.props.auth.user.id, ingredient_id: this.state.bringingIngredients})
        })
        .then(r => r.json())
        .then(response => {
            console.log(response)
        })
    }


    

    render() {
        return (
            <div>
                <div>
                    {this.mapList()}
                    <button onClick={this.handleSubmit} >Bring These Ingredients</button>
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