import * as action from './actionTypes'




export const searchedRecipes = (searchTerms) => dispatch => {

    // const key = '8637d575cf9b40fea513f2928dfc4be1'

    // const key = 'd0ec7d65d45b4f94849ced4f8902ee2a'

    const key = '1bb51352dd1242a78144cdf8f41248f7'
     

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
      
      fetch(URL + `&number=10&instructionsRequired=true&apiKey=${key}`)
      .then(r => r.json())
      .then(recipes => {
       
          dispatch({
            type: action.SEARCHED_RECIPES,
            payload: recipes.results

          })
        
      })
  }





