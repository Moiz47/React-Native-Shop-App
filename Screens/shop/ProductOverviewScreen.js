import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, View, Text, StyleSheet, Platform, Button, ActivityIndicator} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {useSelector, useDispatch} from 'react-redux'
import { HeaderTitle } from 'react-navigation-stack';
import ProductItem from '../../Components/shop/ProductItem';
import * as cartActions from '../../store/action/cart.action'
import * as productActions from '../../store/action/product.action';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/CustomHeaderButton';

const ProductOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

    const loadProducts = useCallback(async() => {
      setError("")
      setIsRefreshing(true)
      try{
        await dispatch(productActions.setProducts());
      }catch(err){
        setError(err.message);
      }
        setIsRefreshing(false);
    }, [dispatch, setError, isRefreshing]);


    useEffect(()=> {
      setIsLoading(true)
      loadProducts().then(() => {
        setIsLoading(false);
      })
    }, [dispatch]);

    /* Drawer navigation does not get recreated unlike stacknavigator. Drawer navigation
    is stored in memory. But i need to fetch data everytime someone lands on productoverview screen
    so i had to add an eventlistener  */
    useEffect(() => {
      const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
      return () => {
        willFocusSub.remove();
      }
    },[loadProducts])

    const products = useSelector(state => state.ProductReducer.availableProducts)

    const onViewDetail = (id, title) => {
      props.navigation.navigate('ProductDetail', {
        productID: id,
        productTitle: title
      })
    }

    if(isLoading){
      return (
        <View style = {styles.Loader}>
          <ActivityIndicator size = 'large' color = {COLORS.primaryColor}/>
        </View>
      )
    }

    if(error){
      return (
        <View style = {styles.Loader}>
          <Text>An error occured</Text>
          <Button title = "Try Again" onPress = {loadProducts} color = {COLORS.primaryColor}/>
        </View>
      )
    }

    if(!isLoading && products.length === 0){
      return (
        <View style = {styles.Loader}>
          <Text>No products available. Start adding!</Text>
        </View>
      )
    }


    return <FlatList
                onRefresh = {loadProducts}  // For pull to refresh functionality
                refreshing = {isRefreshing} // For pull to refresh functionality
                data = {products}
                keyExtractor = {item => item.id}
                renderItem = {(itemData) => <ProductItem 
                                title = {itemData.item.title}
                                price = {itemData.item.price}
                                image= {itemData.item.imageURL}
                                onSelect = {() => {props.navigation.navigate('ProductDetail', {
                                  productID: itemData.item.id,
                                  productTitle: itemData.item.title
                                })}}
                                >
                                  <Button color = {COLORS.primaryColor} 
                                          title = "View detail" 
                                          onPress = {() => onViewDetail(itemData.item.id, itemData.item.title)}/>
                                  <Button color = {COLORS.primaryColor} 
                                          title = "Add to Cart" 
                                          onPress = {() => {dispatch(cartActions.addToCart(itemData.item))}}/>
                        

                                </ProductItem>}
           />
}


export default ProductOverviewScreen;

ProductOverviewScreen.navigationOptions = (navData) => {
   return {
     headerTitle: 'All products',
     headerRight: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                    <Item title = "Cart" 
                          iconName = {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                          onPress = {() => navData.navigation.navigate('Cart')}
                          />
                  </HeaderButtons>,
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                    <Item title = "Menu" 
                          iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                          onPress = {() => navData.navigation.toggleDrawer()}
                          />
                      </HeaderButtons>
   }
}

const styles = StyleSheet.create({

  Loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})