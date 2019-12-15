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
            // add history here
        //   } else {
        //  //handle errors here
          }
        })
        .catch(error => console.log('api errors:', error))
      };

    
export const login = (user) => dispatch => {

  
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
      
          localStorage.setItem('token', response.jwt)

          if (response.logged_in) {
             
              dispatch({
                  type: action.LOGIN,
                  payload: response
              })
          
          } else {
          // error handling here

          }
        })
        .catch(error => console.log('api errors:', error))
      };



   
   


      

    
    
   
