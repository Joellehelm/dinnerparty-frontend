import * as act from '../actions/actionTypes';


const initialState = {
    user: {}
    
};
export default function(state = initialState, action) {
    switch (action.type) {
        case act.CURRENT_USER:
        return {
            ...state,
            user: action.payload
        };
   //second case

        default: 
        return state;
    }
    
}