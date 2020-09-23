import {AsyncStorage} from 'react-native'; // Can be used to store data in the device itself

// export const SIGN_UP = 'SIGN_UP'; Since the logic is same we merged it with Authenticate action
// export const SIGN_IN = 'SIGN_IN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;


export const authenticate = (token ,userID, expireTime) => {

    return dispatch => {
        dispatch(expirationTime(expireTime));
        dispatch({type: AUTHENTICATE, token: token, userId: userID})
    }

// return {
//     type: AUTHENTICATE,
//     token: token,
//     userId: userID
// }
}

export const signUp = (email, password) => {
   
    return async dispatch => {
      // try{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkEjC4eOdbP1fO-TbLgL1GcGyn0_5UD_M', 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
        
            if(!response.ok){
                // throw new Error("Something went wrong")
                const result = await response.json()
                console.log(result)
                let message = "Something went wrong";
                if(result.error.message === 'EMAIL_EXISTS'){
                    message = "That email ID already exist";
                }
                throw new Error(message)
            }

            const result = await response.json()
            console.log(result)
            const expirationDate = new Date(new Date().getTime() + parseInt(result.expiresIn)* 1000)
            dispatch(authenticate(result.idToken, result.localId, parseInt(result.expiresIn)* 1000))
            saveDataToStorage(result.idToken, result.localId, expirationDate)
            // dispatch({type: SIGN_UP, token: result.idToken, userID: result.localId})
        }
}


export const signIn = (email, password) => {
   
    return async dispatch => {
      // try{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkEjC4eOdbP1fO-TbLgL1GcGyn0_5UD_M', 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
        
            if(!response.ok){
                const result = await response.json()
                console.log(result)
                let message = "Something went wrong";
                if(result.error.message === 'EMAIL_NOT_FOUND'){
                    message = "Email not found";
                }else if(result.error.message === 'INVALID_PASSWORD'){
                    message = "Password you entered was incorrect!";
                }
                throw new Error(message)
            }

            const result = await response.json()
            console.log(result)
            const expirationDate = new Date(new Date().getTime() + parseInt(result.expiresIn)* 1000)
            dispatch(authenticate(result.idToken, result.localId, parseInt(result.expiresIn)* 1000))
            saveDataToStorage(result.idToken, result.localId, expirationDate)
            // dispatch({type: SIGN_IN, token: result.idToken, userID: result.localId})
        }
}


const saveDataToStorage = (token ,userID, expiresIn) => {
    AsyncStorage.setItem('userdata', JSON.stringify({
        token: token,
        userId: userID,
        expiryDate: expiresIn.toISOString()
    }))
}

export const logout = () => {
    clearLogoutTimeout();
    AsyncStorage.removeItem('userdata')
    return {
        type: LOGOUT
    }
}

const clearLogoutTimeout = () => {
    if(timer){
        clearTimeout(timer);
    }
}

export const expirationTime = (expTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expTime/1000)
    }
}