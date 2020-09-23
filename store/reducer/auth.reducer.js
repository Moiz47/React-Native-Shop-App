import { SIGN_UP, SIGN_IN, AUTHENTICATE, LOGOUT } from "../action/auth.action";

const Initial_State = {
    token: null,
    userID: null
}


const AuthReducer = (state=Initial_State, action) => {
    switch(action.type){
        case AUTHENTICATE: 
            return {
                token: action.token,
                userID: action.userID
            }

        case LOGOUT:
            return Initial_State
        /* case SIGN_UP:
            return {
                token: action.token,
                userID: action.userID
            }
        case SIGN_IN: 
            return {
                token: action.token,
                userID: action.userID
            } */
        default: 
            return state;
    }
}


export default AuthReducer;