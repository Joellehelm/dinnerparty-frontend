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


    
    

    render() {
        return (
            <div>
                <div>
                    {this.mapList()}
                </div>
            </div>
        );
    }
}

  
    const mapStateToProps = (state) => ({
        list: state.partyList
    })

export default connect(mapStateToProps)(ShoppingList);