import * as action from './actionTypes'





export const partyList = (partyId) => dispatch => {

    fetch(`http://localhost:3000/party_recipes`, {
        method: "GET",
        headers: {
            "Authorization": `JWT ${localStorage.getItem('token')}`
        }

    })
    .then(r => r.json())
    .then(response => {
    
        const recipes = response.map(recipe => {
            if(recipe.party_id === partyId){
               
                return recipe
            }
        })
      


        dispatch({
            type: action.PARTY_LIST,
            payload: recipes
        })
    })
 
  }


