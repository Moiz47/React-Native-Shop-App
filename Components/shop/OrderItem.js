    import React, { useState } from 'react';
    import {View, Text, FlatList, StyleSheet, Platform, Button} from 'react-native';

    import CartItem from './CartItem';
    import { COLORS } from '../../Constants/Colors';

    const OrderItem = (props) => {

        const [viewDetail, setViewDetail] = useState(false);

        return(
            <View style = {styles.orderItem}>
                <View style = {styles.summary}>
                    <Text style = {styles.totalAmount}>{Math.round(props.amount.toFixed(2)) * 100 /100}</Text>
                    <Text style= {styles.date}>{props.date}</Text>
                </View>
                <Button 
                    style = {styles.button} 
                    color = {COLORS.primaryColor} 
                    title = "View Details"
                    onPress = {() => setViewDetail(prevState => !prevState)}
                    />
                {viewDetail && <View style = {styles.details}>
                        {props.item.map(orderItem => 
                                        <CartItem 
                                            quantity = {orderItem.quantity}
                                            title = {orderItem.productTitle}
                                            price = {orderItem.productPrice}
                                            key = {orderItem.productID}
                                        />)}
                    </View>}
            
            </View>
    )
}


export default OrderItem;

const styles = StyleSheet.create({

    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },

    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical:5
    },

    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    },

    date: {
        fontFamily: 'open-sans',
    },

    details: {
        width: '100%'
    }
})