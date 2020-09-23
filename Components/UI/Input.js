import React, {useReducer, useEffect} from 'react';
import {View, Text, Platform, StyleSheet,TextInput} from 'react-native';

const inputStateReducer = (state, action) => {

    switch(action.type){

        case 'UPDATE_INPUT':
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        
        case 'LOOSE_FOCUS':
            return {
                ...state,
                touched: true
            }

        default:
            return state;
    }

}

const Input = (props) => {

    const [inputState, dispatch] = useReducer(inputStateReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false 
    })

    const { onInputChange, id } = props;

    useEffect(() => {
        if(inputState.touched){
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [id, inputState, onInputChange])


    const onTextChangeHandler = (text) => {

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }

        dispatch({type: 'UPDATE_INPUT', isValid: isValid, value: text});
    };


    const lostFocus = () => {
        dispatch({
            type: 'LOOSE_FOCUS',
        })
    }

    return (
        <View style = {styles.formControl}>
                <Text style = {styles.label}>{props.label}</Text>
                <TextInput 
                    style = {styles.input} 
                    {...props}
                    value = {inputState.value} 
                    onChangeText = {onTextChangeHandler}
                    onBlur = {lostFocus}       
                    // onChangeText = {(text) => onInputContentChanged('title', text)}       
                />
                {inputState.isValid && inputState.touched ? null : <View style = {styles.errorContainer}>
                                                <Text style = {styles.errorMsg}>{props.error}</Text>
                                            </View>}
           </View>
    )
}



export default Input;


const styles = StyleSheet.create({

    formControl: {
        width: '100%'
    },

    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8

    },

    input: {
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1

    },

    errorContainer: {
        marginVertical: 5
    },

    errorMsg: {
        color: 'red',
        fontFamily: 'open-sans'
    }
   

})