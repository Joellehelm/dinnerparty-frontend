import * as act from '../actions/actionTypes';


const initialState = {
    partyList: []   
 };


 export default function(state = initialState, action) {
   
    
     switch (action.type) {
        case act.PARTY_LIST:
        const ingredientNames = []

        action.payload.map(i => {
            if(i !== undefined){
                ingredientNames.push(i)
            }
        })
            return {
                ...state,
                partyList: ingredientNames
                };
            
        
         
             default: 
             return state;
     }
     
 
     
 }



