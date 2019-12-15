import * as act from '../actions/actionTypes';


const initialState = {
    user: {},
    isLoggedIn: false

    
};
export default function(state = initialState, action) {
    switch (action.type) {
        case act.CURRENT_USER:
        return {
            ...state,
            user: action.payload
        };

        case action.LOGIN:
        return {
            ...state,
            user: action.payload,
            isLoggedIn: true
        };
   //second case
   

        default: 
        return state;
    }
    

    
}