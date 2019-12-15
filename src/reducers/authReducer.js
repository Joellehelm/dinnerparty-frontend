import * as act from '../actions/actionTypes';


const initialState = {
    user: {},
    isLoggedIn: false,


    
};
export default function(state = initialState, action) {
  
    switch (action.type) {
        case act.CURRENT_USER:
        return {
            ...state,
            user: action.payload
        };

        case act.LOGIN:
           
        return {
            ...state,
            user: action.payload.user,
            isLoggedIn: true
        };

        case act.LOGOUT:
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }
   //second case
   

        default: 
        return state;
    }
    

    
}