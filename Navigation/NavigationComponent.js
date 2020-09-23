import React, { useEffect, useRef } from 'react';
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

// Accessing Navigation from outside of Navigator using ref and NavigationActions

const NavigationComponent = (props) => {
    const ref = useRef()
    const isAuth = useSelector(state => !!state.AuthReducer.token)

    useEffect(() => {
        if(!isAuth) {
            ref.current.dispatch(
                NavigationActions.navigate({routeName: 'Auth'})
            )
        }
    }, [isAuth]);   

    return <ShopNavigator ref = {ref}/>
}

export default NavigationComponent