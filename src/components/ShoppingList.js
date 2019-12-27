import React, { Component } from 'react';
import { connect } from 'react-redux'

class ShoppingList extends Component {
    constructor(){
        super()

        this.state = {
            bringingIngredients: [],
            userIngredients: [],
            purchasedIngredients: []
        }
    }
  

    //map ids of user_ingredients to state then when list is mapped exclude ingredients that have an id that is included in user_ingredients
    // then map user_ingredients in their correct places and style them appropriately.


    componentDidMount(){
        this.setState({userIngredients: []})
        fetch('http://localhost:3000/user_ingredients')
        .then(r => r.json())
        .then(response => {
            const boughtIngredients = {}
            const purchased = response.map(r => {return r.ingredient_id})

            response.forEach(r => {
                let ing = r.ingredient_id
                boughtIngredients[ing] = r.user.username
                // boughtIngredients.push({[r.ingredient_id] : r.user.username})
            })
            // let boughtIngredients = response.map(r => {return r.ingredient_id})
          
            this.setState({
                userIngredients: boughtIngredients,
                purchasedIngredients: purchased
            })
        })
    }



    mapList = () => {
       
    
        return this.props.list.partyList.map((ingredient, idx) => {
         
            if(!this.state.purchasedIngredients.includes(ingredient.id)){
            
            return <div key={idx}><h4><input onChange={this.markList} key={idx} type="checkbox" name="user" id={ingredient.id}/>{ingredient.name}</h4></div>
            }else{
               
            return <div key={idx}><h4>Hello i'm a purchased ingredient {ingredient.name}</h4><p>{this.state.userIngredients[ingredient.id]}</p></div>
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