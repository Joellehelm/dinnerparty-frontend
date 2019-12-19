import * as action from './actionTypes'




export const partyList = (partyId) => dispatch => {

    fetch(`http://localhost:3000/party_recipes`)
    .then(r => r.json())
    .then(response => {
       const recipeApis = response.map(r => {
           return r.recipe.api_id
       })


       
        dispatch({
            type: action.PARTY_LIST,
            payload: partyId
        })
    })













 
  }