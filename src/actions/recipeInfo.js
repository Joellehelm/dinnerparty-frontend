import * as action from './actionTypes'


export const recipeInfo = (info) => dispatch => {
    dispatch({
        type: action.RECIPE_INFO,
        payload: info
    })
}
