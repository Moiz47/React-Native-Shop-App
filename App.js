import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducer/product.reducer';

import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import CartReducer from './store/reducer/cart.reducer';
import OrderReducer from './store/reducer/order.reducer';
import ReduxThunk from 'redux-thunk';
import AuthReducer from './store/reducer/auth.reducer';
import NavigationComponent from './Navigation/NavigationComponent';



const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const rootReducer = combineReducers({
  ProductReducer: productReducer,
  CartReducer: CartReducer,
  OrderReducer: OrderReducer,
  AuthReducer: AuthReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))


export default function App() {

  const [loadFonts, setLoadFonts] = useState(false)

  if(!loadFonts){
    return (
      <AppLoading startAsync = {fetchFonts} onFinish = {() => setLoadFonts(true)}/>
    )
  }

  return (
    <Provider store = {store}>
      <NavigationComponent/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
