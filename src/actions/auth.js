import * as action from './actionTypes'




export const register = (user) => dispatch => {
  
        return dispatch => fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({user})
    })
    
        .then(r => r.json())
        .then(response => {
         
          if (response.status === 'created') {
            dispatch({
                type: action.CURRENT_USER,
                payload: response

              })
            // add history here
          } else {
         //handle errors here
          }
        })
        .catch(error => console.log('api errors:', error))
      };
    
    
   
