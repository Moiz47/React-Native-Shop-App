import React, {useState} from 'react';
import {View, Text, Platform, Button, StyleSheet, ActivityIndicator} from 'react-native';
import { COLORS } from '../../Constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import CartItem from '../../Components/shop/CartItem';
import * as CartActions from '../../store/action/cart.action';
import * as OrderActions from '../../store/action/order.action';

const CartScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const getTotal = useSelector(state => state.CartReducer.totalAmount)
    const cartItems = useSelector(state => {
        const itemsArray = []
        for (let key in state.CartReducer.item){
            itemsArray.push({
                productID: key,
                productTitle: state.CartReducer.item[key].productTitle,
                productPrice: state.CartReducer.item[key].productPrice,
                quantity: state.CartReducer.item[key].quantity,
                sum: state.CartReducer.item[key].sum
            })
        
        }

        return itemsArray.sort((a, b) => a.productID > b.productID ? 1 : -1);
    })
    
    const sendOrders = async() => {
        setIsLoading(true);
        await dispatch(OrderActions.addOrder(cartItems, getTotal))
        setIsLoading(false);
    }

    return (
        <View style = {styles.screen}>
            <View style = {styles.summary}>
                <Text style = {styles.summaryText}>
                    Total: <Text style = {styles.amount}>{getTotal.toFixed(2)}</Text>
                </Text>
                {isLoading ? 
                    <ActivityIndicator size = 'large' color = {COLORS.primaryColor}/>
                        : 
                    <Button 
                    title = "Order Now" 
                    disabled = {cartItems.length === 0}
                    onPress = {sendOrders}
                    />
                }
            </View>
            <FlatList 
             data = {cartItems}
             keyExtractor = {item => item.productID}
             renderItem = {itemData => (<CartItem 
                                            title = {itemData.item.productTitle}
                                            price = {itemData.item.productPrice}
                                            quantity = {itemData.item.quantity}
                                            deleteable
                                            remove =  {() => {
                                                dispatch(CartActions.removedFromCart(itemData.item.productID))
                                            }}/>)
             }/>
        </View>
    )
}

export default CartScreen;


const styles = StyleSheet.create({

    screen: {
        margin: 20,
    },

    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white',

        
    },

    summaryText:{
        fontFamily: 'open-sans',
        fontSize: 18 
    },

    amount: {
    color: COLORS.primaryColor
    }

})