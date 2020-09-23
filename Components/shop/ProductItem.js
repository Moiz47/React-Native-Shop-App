import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback, Platform, TouchableOpacity ,Image, Button} from 'react-native';
import { COLORS } from '../../Constants/Colors';


const ProductItem = (props) => {

    let TouchableComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback
    }

    return (
        <View style = {styles.product}>
            <View style = {styles.touchable}>
                <TouchableComponent onPress = {props.onSelect} useForeground>
                    <View>
                        <View style = {styles.imageContainer}>
                            <Image source = {{uri: props.image}} style = {styles.image}/>
                        </View>
                        <View style = {styles.textInfo}>
                            <Text style = {styles.title}>{props.title}</Text>
                            <Text style = {styles.price}>{props.price.toFixed(2)}</Text>
                        </View>
                        <View style = {styles.buttonContainer}>
                            {props.children}
                        </View>
                    </View>
                </TouchableComponent>    
            </View>
        </View>
    )
}


export default ProductItem;


const styles = StyleSheet.create({
    product:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },

    touchable: {
        overflow: 'hidden',
        borderRadius: 5
    },

    imageContainer: {
        height: '60%',
        width: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },

    image: {
        width: '100%',
        height: '100%'
    },

    title: {
        fontSize: 18,
        marginVertical: 3,
        fontFamily: 'open-sans-bold'
    },

    price: {
        fontSize: 14,
        color: "#888",
        fontFamily: 'open-sans'
    },

    textInfo: {
        alignItems: "center",
        height: "15%"
    },

    buttonContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 10,
    },


})