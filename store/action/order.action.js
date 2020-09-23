import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () => {

    return async (dispatch, getState) => {
        const userId = getState().AuthReducer.userID;
        try{
            const result = await fetch(`https://reactnative-65fdb.firebaseio.com/orders/${userId}.json`)
            
            if(!result.ok){
                throw new Error('Something went wrong');
            }
            
            const resp = await result.json();
            const loadedOrders = [];

            for (const key in resp){
                loadedOrders.push(
                    new Order(key, 
                            resp[key].cartItems,
                            resp[key].totalAmount,
                            new Date(resp[key].date)))                    
            }

            dispatch({type: SET_ORDERS, orders: loadedOrders});
        }catch(err){
            throw err;
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {

    return async (dispatch, getState) => {
        const token = getState().AuthReducer.token;
        const userId = getState().AuthReducer.userID;
        const date = new Date();
        try{
            const result = await fetch(`https://reactnative-65fdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            })

            if(!result.ok){
                throw new Error('Something went wrong')
            }
            const resp = await result.json();

            dispatch({
                type: ADD_ORDER,
                data: {
                    id: resp.name,
                    items: cartItems, 
                    amount: totalAmount,
                    date: date.toISOString()
                }
            })
        }catch(error){
            throw error;
        }
    }
}