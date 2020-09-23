import React from 'react';
import { ADD_ORDER, SET_ORDERS } from '../action/order.action';
import Order from '../../models/order';


const Initial_State = {
    orders: []
}

const OrderReducer = (state = Initial_State, action) => {

    switch(action.type){

        case SET_ORDERS: 
            return {
                orders: action.orders
            }

        case ADD_ORDER: {
            const order = new Order(
                action.data.id,
                action.data.items,
                action.data.amount,
                action.data.date
            )

            return {
                ...state,
                orders: state.orders.concat(order)
            }

        }

        default: return state;
    }
}


export default OrderReducer;
