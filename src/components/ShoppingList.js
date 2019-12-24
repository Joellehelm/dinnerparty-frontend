import React, { Component } from 'react';
import { connect } from 'react-redux'

class ShoppingList extends Component {
    constructor(){
        super()

        this.state = {
            bringingIngredients: []
        }
    }
  

    mapList = () => {
    
    
        return this.props.list.partyList.map((ingredient, idx) => {
            
            return <p key={idx}><input onChange={this.markList} type="checkbox" key={idx} name="user" id={ingredient.id}/>{ingredient.name}</p>
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

    componentDidMount(){
        fetch('http://localhost:3000/user_ingredients')
        .then(r => r.json())
        .then(response => {
            debugger
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