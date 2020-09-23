export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";


export const addToCart = (data) => {
    return {
        type: ADD_TO_CART,
        product: data
    }
}

export const removedFromCart = (data) => {
    return {
        type: REMOVE_FROM_CART,
        productID: data
    }
}