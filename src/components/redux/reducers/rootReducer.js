import {FETCH_USER} from "../actions/actionTypes";

export const rootReducer = (state = {user: []}, action) => {
    switch (action.type){
        case FETCH_USER:
            console.log(action.payload)
            return {...state, user: [action.payload]};
        default:
            return state;
    }
}