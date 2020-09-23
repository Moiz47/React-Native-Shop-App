import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, 
        Text, StyleSheet, 
        ScrollView, Button,
        ActivityIndicator, Alert
    } from 'react-native';
import Input from '../../Components/UI/Input';
import { COLORS } from '../../Constants/Colors';
import {LinearGradient} from 'expo-linear-gradient';
import * as authActions from '../../store/action/auth.action';
import {useDispatch} from 'react-redux';

const formReducer = (state, action) => {
    // console.log(action.value)
    if (action.type === 'FORM_UPDATE'){
        const updatedInputValue = {
            ...state.inputValue,
            [action.input] : action.value
        }
        const updatedInputValidities = {
            ...state.inputValidity,
            [action.input] : action.isValid
        }
        let updatedIsFormValid = true;
        for (let key in updatedInputValidities){
            updatedIsFormValid = updatedIsFormValid && updatedInputValidities[key]
        }

        // console.log(updatedInputValue)
        return {
            inputValue: updatedInputValue,
            inputValidity: updatedInputValidities,
            formValidity: updatedIsFormValid
        }
        
    }else{
        return state
    }
}


const AuthScreen = (props) => {

const dispatch = useDispatch();
const [isSignUp, setIsSignUp] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
        email: "",
        password: ""
    },
    inputValidity: {
        email: false,
        password: false
    },
    formValidity: false
})


const onInputContentChanged = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
        type: 'FORM_UPDATE',
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
    })
   }, [dispatchFormState]);


const authHandler = async() => {
    let action;
    if(isSignUp){
       action =  dispatch(authActions.signUp(formState.inputValue.email, formState.inputValue.password))
    }else{
       action = dispatch(authActions.signIn(formState.inputValue.email, formState.inputValue.password))
    }
    setError(null)
    setIsLoading(true);
    try{
        await action;
        props.navigation.navigate('Shop')
    }catch(err){
        setError(err.message)
        setIsLoading(false);
    }

}

useEffect(() => {
    if(error) {
        Alert.alert('An Error Occured', error, [{text: 'okay'}])
    }
}, [error])

    // console.log(formState)
    return(
        <KeyboardAvoidingView 
        // behavior = 'padding'
        keyboardVerticalOffset = {10}
        style = {styles.screen}>
            <LinearGradient colors = {['#ffedff', '#ffe3ff']} style = {styles.gradient}>
                <View style = {styles.authContainer}>
                    <ScrollView>
                        <Input
                            id = "email"
                            label = {"E-Mail"}
                            keyboardType = "email-address"
                            required
                            email
                            autoCapitalize = "none"
                            error = "Enter a valid email address"
                            onInputChange = {onInputContentChanged}
                            initialValue = ""
                        />

                        <Input
                            id = "password"
                            label = {"Password"}
                            keyboardType = "default"
                            secureTextEntry
                            required
                            minLength = {5}
                            autoCapitalize = "none"
                            error = "Enter a valid password"
                            onInputChange = {onInputContentChanged}
                            initialValue = ""
                        />
                        <View style = {styles.button}>
                            {isLoading ? 
                                <ActivityIndicator
                                    size = 'small' color = {COLORS.primaryColor}
                                /> : 
                                <Button 
                                title = {isSignUp ? 'Sign Up' : 'Sign In'} 
                                color = {COLORS.primary} 
                                onPress = {authHandler}/>}
                        </View>
                        <View style = {styles.button}>
                            <Button 
                                title = {`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`} 
                                color = {COLORS.secondaryColor} 
                                onPress = {() => setIsSignUp(prevState => !prevState)}/>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
        
    )
}


AuthScreen.navigationOptions = {
    headerTitle : "Authentication"
};


export default AuthScreen;

const styles = StyleSheet.create({
    authContainer: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 10
    },

    screen: {
        flex: 1,
    },

    gradient: {
        width: '100%',
        height:'100%',
        flex: 1,
        justifyContent: "center",
        alignItems:'center'
    },

    button:{
        marginTop: 10
    }
})