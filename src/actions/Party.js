import * as action from './actionTypes'


export const viewingParty = (viewing) => dispatch => {
    dispatch({
        type: action.VIEWING,
        payload: viewing
    })
}