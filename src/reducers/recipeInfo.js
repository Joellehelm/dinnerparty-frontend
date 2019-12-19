import * as act from '../actions/actionTypes';


const initialState = {
    info: []
    
 };


 export default function(state = initialState, action) {
   
     switch (action.type) {
         case act.RECIPE_INFO:
         return {
             ...state,
             info: action.payload
         };
 
    
 
     
    //second case
    
 
         default: 
         return state;
     }
     
 
     
 }



