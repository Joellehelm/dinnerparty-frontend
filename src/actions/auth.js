import * as action from './actionTypes'




export const register = (user) => dispatch => {
    
  
        return fetch('http://localhost:3000/users', {
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
              // probably change this to display a successful account creation message
            dispatch({
                type: action.CURRENT_USER,
                payload: response

              })
           
          } else {
              dispatch({
                type: action.CURRENT_USER,
                payload: "no"
              })
          }
        })
        .catch(error => console.log('api errors:', error))
      };

    
export const login = (user, history) => dispatch => {

  
        return fetch('http://localhost:3000/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({user})
        })
        .then(r => r.json())
        .then(response => {
    
            if (response.user) {
                
                dispatch({
                    type: action.LOGIN,
                    payload: response
                })
                localStorage.setItem('token', response.jwt)
                
          } else {
           

          }
        })
        .catch(error => console.log('api errors:', error))
      };



    export const logout = () => dispatch => {
        localStorage.removeItem("token");
        dispatch({
          type: action.LOGOUT
        })
      };
   


      

    
    
   
