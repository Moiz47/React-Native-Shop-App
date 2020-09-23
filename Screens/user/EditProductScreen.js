import React, {useState, useCallback, useEffect, useReducer} from 'react';
import {View, Text, Platform, Button, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, 
ActivityIndicator,
Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/CustomHeaderButton';
import * as productActions from '../../store/action/product.action';
import Input from '../../Components/UI/Input';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../Constants/Colors';


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

const EditProductScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const prodID = props.navigation.getParam('productID');
    const isEditing = useSelector(state => state.ProductReducer.userProducts.find(prod => prod.id === prodID))
    console.log("Meow")
    console.log(isEditing);
    const dispatch = useDispatch();
   const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValue: {
            title: isEditing ? isEditing.title : '',
            imageURL: isEditing ? isEditing.imageURL : '',
            description: isEditing ? isEditing.description : '',
            price: ''
        },
        inputValidity: {
            title: isEditing ? true : false,
            imageURL: isEditing ? true : false,
            description: isEditing ? true : false,
            price: isEditing ? true : false
        },
        formValidity: isEditing ? true : false
    })

    // const [title, setTitle] = useState(isEditing ? isEditing.title : '');
    // const [imageURL, setImageURL] = useState(isEditing ? isEditing.imageURL : '');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState(isEditing ? isEditing.description : '');


    const submitHandler = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try{
            if(isEditing){
                console.log("isediting")
               await dispatch(productActions.updateProduct(prodID, 
                        formState.inputValue.title, 
                        formState.inputValue.description, 
                        formState.inputValue.imageURL))
            }else{
               await dispatch(productActions.createProduct(
                        formState.inputValue.title, 
                        formState.inputValue.description, 
                        formState.inputValue.imageURL, 
                        +formState.inputValue.price))
            }
            props.navigation.goBack();
        }catch(err){
            setError(err.message);
            
        }
        setIsLoading(false);
    }, [dispatch, formState, prodID])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler])


   const onInputContentChanged = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
        type: 'FORM_UPDATE',
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
    })
   }, [dispatchFormState]);

   useEffect(() => {
     if(error){
         Alert.alert('An error Occured!', error, [{text: 'okay'}]);
     }
   }, [error])

   if(isLoading){
    return (
      <View style = {styles.Loader}>
        <ActivityIndicator size = 'large' color = {COLORS.primaryColor}/>
      </View>
    )
  }

    // You can check react native docs for all the  different applicable properties on TextInput
    return (
        <KeyboardAvoidingView behavior = "height" keyboardVerticalOffset = {100} style = {{flex: 1}}>
            <ScrollView>
            <View style = {styles.form}>
                <Input
                        id = "title"
                        initialValue = {isEditing ? isEditing.title : ''}
                        initiallyValid = {!!isEditing}
                        onInputChange = {onInputContentChanged}
                        error = "Please enter valid Title"
                        label = {'title'}
                        keyboardType = 'default'
                        autoCapitalize = 'sentences'
                        autoCorrect
                        returnKeyType = 'next'
                        required
                />
                <Input
                        id = "imageURL"
                        initialValue = {isEditing ? isEditing.imageURL : ''}
                        initiallyValid = {!!isEditing}
                        onInputChange = {onInputContentChanged}
                        error = "Please enter valid image url"
                        label = {'imageURL'}
                        keyboardType = 'default'
                        returnKeyType = 'next'
                        required
                />
                {isEditing ? null : 
                <Input
                        id = "price"
                        onInputChange = {onInputContentChanged}
                        val = {formState.inputValue.price}
                        error = "Please enter valid Price"
                        label = {'price'}
                        keyboardType = 'decimal-pad'
                        returnKeyType = 'next'
                        required
                        min = {0.1}
                />
                }
                <Input
                        id = "description"
                        initialValue = {isEditing ? isEditing.description : ''}
                        initiallyValid = {!!isEditing}
                        onInputChange = {onInputContentChanged}
                        error = "Please enter valid Description"
                        label = {'description'}
                        keyboardType = 'default'
                        autoCapitalize = 'sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        returnKeyType = 'next'
                        required
                        minLength = {5}
                    />
                </View>
            </ScrollView>
       </KeyboardAvoidingView>
    )
}




EditProductScreen.navigationOptions = (navData) => {
    const submit = navData.navigation.getParam('submit');

    return {
      headerTitle: navData.navigation.getParam('productID')?  'Edit Product' : 'Add Product',
      
      headerRight: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                            <Item title = "Add" 
                                    iconName = {Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
                                    onPress = {submit}
                                    />
                        </HeaderButtons>
    }
 }





export default EditProductScreen;


const styles = StyleSheet.create({

    form:{
        margin : 20
    },

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

    Loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
   

})