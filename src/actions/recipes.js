import * as action from './actionTypes'




export const searchedRecipes = (searchTerms) => dispatch => {

    const key = '8637d575cf9b40fea513f2928dfc4be1'
     

      let URL = `https://api.spoonacular.com/recipes/search`

      if(searchTerms.query.length > 0){
          URL = URL + `?query=${searchTerms.query}`
      }
      if(searchTerms.cuisine.length > 0){
          if(URL.includes('?')){
              URL = URL + '&'
          }else{
              URL = URL + '?'
          }
          URL = URL + `cuisine=${searchTerms.cuisine}`
      }
      if(searchTerms.diet.length > 0){
          if(URL.includes('?')){
              URL = URL + '&'
          }else{
              URL = URL + '?'
          }
          URL = URL + `diet=${searchTerms.diet}`
      }
      
      fetch(URL + `&number=4&instructionsRequired=true&apiKey=${key}`)
      .then(r => r.json())
      .then(recipes => {
       
          dispatch({
            type: action.SEARCHED_RECIPES,
            payload: recipes.results

          })
        
      })
  }





