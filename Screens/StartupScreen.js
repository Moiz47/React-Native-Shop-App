import React, { useEffect } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage} from 'react-native';
import { COLORS } from '../Constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/action/auth.action';



const StartupScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async() => {
            
            const storageUserData = await AsyncStorage.getItem('userdata');
            if(!storageUserData){
                props.navigation.navigate('Auth')
                console.log("not here")
                return;
            }
            const transformeStorageUserData = JSON.parse(storageUserData);
            const {token, userId ,expiryDate} = transformeStorageUserData;

            const expirationDate = new Date(expiryDate);
            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth')
                return;
            }

            const expiryTime =  expirationDate.getTime() - new Date().getTime()

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(token, userId, expiryTime))
            
        }
        tryLogin();
    }, [dispatch])

    return (
      <View style = {styles.screen}>
          <ActivityIndicator size = 'large' color = {COLORS.primary}/>
      </View>
    )
}

export default StartupScreen;


const styles = StyleSheet.create({

    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
   

})