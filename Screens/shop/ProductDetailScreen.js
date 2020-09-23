import React from 'react';
import {View, Image, Text, ScrollView, StyleSheet, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../Constants/Colors';
import * as cartActions from '../../store/action/cart.action'



const ProductDetailScreen = (props) => {

    const productID = props.navigation.getParam('productID');
    const selectedItem = useSelector(state => state.ProductReducer.availableProducts.find(prod => prod.id === productID))
    const dispatch = useDispatch();
    console.log(selectedItem.description)
    return (
    <ScrollView>
        <Image style = {styles.image} source = {{uri: selectedItem.imageURL}}/>
        <View style = {styles.buttonContainer}>
            <Button 
                color = {COLORS.primaryColor} 
                style = {styles.button} title = "add to cart"
                onPress = {() => dispatch(cartActions.addToCart(selectedItem))}
                />
        </View>
        <Text style = {styles.price}>{selectedItem.price.toFixed(2)}</Text>
        <Text style = {styles.description}>{selectedItem.description}</Text>
    </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = (props) => {
    return {
        headerTitle: props.navigation.getParam('productTitle')
    }
}


export default ProductDetailScreen;



const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 300
    },

    buttonContainer:{
        alignItems: 'center',
        marginVertical: 10,
    },

    price: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },

    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal:10,
        fontFamily: 'open-sans'
    }


})