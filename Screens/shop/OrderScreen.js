import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Platform, ActivityIndicator, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/CustomHeaderButton';
import OrderItem from '../../Components/shop/OrderItem';
import * as orderActions from '../../store/action/order.action'
import { COLORS } from '../../Constants/Colors';

const OrderScreen = (props) => {
    const orders = useSelector(state => state.OrderReducer.orders)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const run = async() => {
            try{
                setIsLoading(true);
                await dispatch(orderActions.fetchOrders(orders))
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                throw error;
            }
        }

        run()
    }, [dispatch])


    
    if(isLoading){
        return ( 
            <View style = {styles.Loader}>
                <ActivityIndicator size = 'large' color = {COLORS.primaryColor}/>
            </View>
        )
    }

    if(orders.length === 0 ){
        return (
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    You do not have any orders.
                </Text>
            </View>
        )
    }

    return (
        <FlatList
            data = {orders}
            keyExtractor = {item => item.id}
            renderItem = {(itemData) => <OrderItem 
                                            amount = {itemData.item.totalAmount} 
                                            date = {itemData.item.readableDate}
                                            item = {itemData.item.items}
                                            />}
        />
    )
}


OrderScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                    <Item title = "Menu" 
                          iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                          onPress = {() => navData.navigation.toggleDrawer()}
                          />
                      </HeaderButtons>
    }
}


export default OrderScreen;

const styles = StyleSheet.create({
    Loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
})