import { HANDLE_INFO, HANDLE_CHECKS, MODAL_ACTIVED, VALID_EMAIL } from "../constants/types";

const AppReducer = (state, action) => {
    const { type, payload } = action

    switch(type){
        case HANDLE_INFO:
            return {
                ...state, 
                [`${payload.name}`]: payload.value
            }
        case HANDLE_CHECKS:
            return {
                ...state, 
                perks: payload
            }
        case MODAL_ACTIVED:
            return {
                ...state, 
                isOpen: payload
            }
        case VALID_EMAIL:
            return {
                ...state, 
                isValid: payload
            }
        default:
            return state;
    }

}

export default AppReducer;