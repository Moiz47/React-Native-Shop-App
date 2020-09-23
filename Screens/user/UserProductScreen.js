import React from 'react';
import {View, Alert, Text, Platform, Button, StyleSheet, FlatList} from 'react-native';
import { COLORS } from '../../Constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../Components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/CustomHeaderButton';
import {deleteProduct} from '../../store/action/product.action';



const UserProductScreen = (props) => {
    const userProduct = useSelector(state => state.ProductReducer.userProducts)
    
    const onEditProduct = (id) => {
        props.navigation.navigate('EditProduct', {productID: id})
    }

    const dispatch = useDispatch();

    const onDeleteHandler = (id) => {
        Alert.alert('Delete?', 'Are you sure you want to delete this item', [
            { text: "No", style: 'default' },
            { text: "Yes", style: 'destructive', onPress : () => dispatch(deleteProduct(id))}
            ],
            { cancelable: true });
    }

    if(userProduct.length === 0 ){
        return (
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    No products created yet.
                </Text>
            </View>
        )
    }

    return (
       <FlatList data = {userProduct}
                 keyExtractor = {item => item.id}
                 renderItem = {(itemData) => <ProductItem
                                                onSelect = {() => onEditProduct(itemData.item.id)}
                                                price = {itemData.item.price}
                                                title = {itemData.item.title}
                                                image = {itemData.item.imageURL}>
                                     <Button color = {COLORS.primaryColor} 
                                          title = "Edit" 
                                          onPress = {() => onEditProduct(itemData.item.id)}/>
                                     <Button color = {COLORS.primaryColor} 
                                          title = "Delete" 
                                          onPress = {onDeleteHandler.bind(this, itemData.item.id)}/>
                                       

                                </ProductItem>}    
       />
    )
}


UserProductScreen.navigationOptions = (navData) => {
    return {
      headerTitle: 'Your Products',
      headerLeft: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                     <Item title = "Menu" 
                           iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                           onPress = {() => navData.navigation.toggleDrawer()}
                           />
                       </HeaderButtons>,
      headerRight: () => <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                            <Item title = "Add" 
                                    iconName = {Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                                    onPress = {() => navData.navigation.navigate('EditProduct')}
                                    />
                        </HeaderButtons>
    }
 }


export default UserProductScreen;


const styles = StyleSheet.create({

   

})