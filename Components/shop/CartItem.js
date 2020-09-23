import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const CartItem = (props) => {
    return (
        <View style = {styles.cartItem}>
            <View style = {styles.itemData}>
                <Text style = {styles.quantity}>{props.quantity}</Text>
                <Text style = {styles.title}>{props.title}</Text>
            </View>
            <View style = {styles.itemData}>
                <Text style = {styles.amount}>{props.price}</Text>
                {props.deleteable && <TouchableOpacity onPress = {props.remove} style = {styles.delete}>
                    <Ionicons name = {Platform.OS ==='android' ? 'md-trash' : 'ios-trash'}
                    size = {23}
                    color = "red"
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
}


export default CartItem;

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    itemData: {
        flexDirection: "row",
        alignItems: 'center',
    },
    quantity:{
        fontFamily: 'open-sans',
        color: "#ccc",
        fontSize: 16,
        
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        paddingHorizontal: 5
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        paddingHorizontal: 5
    },
    deleteItem: {
        padding: 5
    }


})