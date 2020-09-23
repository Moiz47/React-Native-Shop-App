import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems, DrawerNavigatorItems} from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ProductOverviewScreen from '../Screens/shop/ProductOverviewScreen';
import {COLORS} from '../Constants/Colors'
import {Platform, View, Button, SafeAreaView} from 'react-native';
import ProductDetailScreen from '../Screens/shop/ProductDetailScreen';
import CartScreen from '../Screens/shop/CartScreen';
import OrderScreen from '../Screens/shop/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen from '../Screens/user/UserProductScreen';
import EditProductScreen from '../Screens/user/EditProductScreen';
import AuthScreen from '../Screens/user/AuthScreen';
import StartupScreen from '../Screens/StartupScreen';
import * as authActions from '../store/action/auth.action';
import {useDispatch} from 'react-redux';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primaryColor: '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primaryColor,
}



const ProductsNavigator = createStackNavigator({
     ProductsOverview: ProductOverviewScreen,
     ProductDetail: ProductDetailScreen,
     Cart: CartScreen   
}, {
    navigationOptions: {   // This is not applied to the screen navoptions 
        //but rather to the entire stack if it is being used in another stack. 
        //its effects will be reflected in the other stack where it is used i.e in our case the drawer stack
        drawerIcon: drawerConfig => <Ionicons  // Assigining icons in drawer navigator menu
            name = {Platform.OS === 'android'? 'md-cart' : 'ios-cart'}
            size = {23}
            color = {drawerConfig.tintColor}  
        />
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrderScreenNavigator = createStackNavigator({
    OrderScreen: OrderScreen
},{
    navigationOptions: {   // This is not applied to the screen navoptions 
        //but rather to the entire stack if it is being used in another stack. 
        //its effects will be reflected in the other stack where it is used i.e in our case the drawer stack
        drawerIcon: drawerConfig => <Ionicons  // Assigining icons in drawer navigator menu
            name = {Platform.OS === 'android'? 'md-list' : 'ios-list'}
            size = {23}
            color = {drawerConfig.tintColor}  
        />
    },
    defaultNavigationOptions: defaultNavOptions
}
)


const UserProductsNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen
},{
    navigationOptions: {   // This is not applied to the screen navoptions 
        //but rather to the entire stack if it is being used in another stack. 
        //its effects will be reflected in the other stack where it is used i.e in our case the drawer stack
        drawerIcon: drawerConfig => <Ionicons  // Assigining icons in drawer navigator menu
            name = {Platform.OS === 'android'? 'md-create' : 'ios-create'}
            size = {23}
            color = {drawerConfig.tintColor}  
        />
    },
    defaultNavigationOptions: defaultNavOptions
}
)

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},
{
    defaultNavigationOptions: defaultNavOptions
}

)


const shopNavigator = createDrawerNavigator({
    Products : ProductsNavigator,
    Orders : OrderScreenNavigator,
    Admin: UserProductsNavigator
}, {
    contentOptions: {
        activeTintColor: COLORS.primaryColor
    },
    contentComponent: (props) => {
        const dispatch = useDispatch();
        return (
            <View style = {{flex:1, padding:20}}>
                <SafeAreaView forceInset = {{top: 'always', horizontal: 'never'}}>
                    <DrawerNavigatorItems {...props}/>
                    <Button title = "Logout" color = {COLORS.primaryColor} onPress = {() => {
                        dispatch(authActions.logout());
                        // props.navigation.navigate('Auth');
                    }}/>
                </SafeAreaView>
            </View>
        )
    }
})

const MainNavigator = createSwitchNavigator({
    StartUp: StartupScreen, 
    Auth: AuthNavigator,
    Shop: shopNavigator,
})




export default createAppContainer(MainNavigator);