import * as act from '../actions/actionTypes';


const initialState = {
   recipes: [],
   isFetching: false
 
    
};
export default function(state = initialState, action) {
  
    switch (action.type) {
        case act.SEARCHED_RECIPES:
        return {
            ...state,
            recipes: action.payload,
            isFetching: false
      
        };

   
        case act.SEARCH_FETCH:
            return {
                ...state,
                isFetching: true
            }
   

        default: 
        return state;
    }
    

    
}