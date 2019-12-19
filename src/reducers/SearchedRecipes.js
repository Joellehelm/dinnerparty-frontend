import * as act from '../actions/actionTypes';


const initialState = {
   recipes: [],
 
    
};
export default function(state = initialState, action) {
  
    switch (action.type) {
        case act.SEARCHED_RECIPES:
        return {
            ...state,
            recipes: action.payload
        };

   

    
   //second case
   

        default: 
        return state;
    }
    

    
}