import * as act from '../actions/actionTypes';


const initialState = {
    shoppingList: []   
 };


 export default function(state = initialState, action) {
   
     switch (action.type) {
         case act.PARTY_LIST:
         
         return {
             ...state,
             shoppingList: action.payload
            };
             
             
             
             
             //second case
             
             
             default: 
             return state;
     }
     
 
     
 }



