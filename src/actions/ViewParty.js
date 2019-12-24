import * as action from './actionTypes'




export const partyList = (partyId) => dispatch => {

    fetch(`http://localhost:3000/ingredients`)
    .then(r => r.json())
    .then(response => {
        
        const ingredients = response.map(ingredient => {
            if(ingredient.party_id === partyId){
               
                return ingredient
            }
        })
      


        dispatch({
            type: action.PARTY_LIST,
            payload: ingredients
        })
    })
 
  }



//   export const addIngredients = (ingredients) => dispatch => {

   
//   }