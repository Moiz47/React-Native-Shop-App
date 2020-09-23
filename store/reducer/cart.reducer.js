import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/cart.action";
import CartItem from '../../models/cartItem';
import { ADD_ORDER } from "../action/order.action";
import {DELETE} from '../action/product.action';

const INITIAL_STATE = {
    item: {},
    totalAmount: 0
}


const CartReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){

        case ADD_TO_CART:
            const product = action.product

            if(state.item[product.id]){

                const updatedProduct = new CartItem(
                    state.item[product.id].quantity + 1,
                    product.price,
                    product.title,
                    state.item[product.id].sum + product.price
                )
                return {
                    ...state,
                    item: {
                        ...state.item,
                        [product.id]: updatedProduct 
                    },
                    totalAmount: state.totalAmount + product.price 
                }

            }else{

                const newItem = new CartItem(1, product.price, product.title, product.price)
                 return {
                    ...state,
                    item: {
                        ...state.item,
                        [product.id]: newItem
                    },
                    totalAmount: state.totalAmount + product.price
                }
            }


            case REMOVE_FROM_CART:

                const selectedItem = state.item[action.productID]
                const currentQuantity = selectedItem.quantity
                let updatedCartItem;

                if(currentQuantity > 1){
                    const reduceCartItemBy1 = new CartItem(
                        selectedItem.quantity - 1, 
                        selectedItem.productPrice,
                        selectedItem.productTitle,
                        selectedItem.sum - selectedItem.productPrice
                        );
                    updatedCartItem = {...state.item, [action.productID]: reduceCartItemBy1}

                }else{
                    updatedCartItem = {...state.item};
                    delete updatedCartItem[action.productID]
                }

                return{
                    ...state,
                    item: updatedCartItem,
                    totalAmount: state.totalAmount - selectedItem.productPrice
                }

                case ADD_ORDER: 
                    return INITIAL_STATE


                case DELETE:
                    if(!state.item[action.pid]){
                        return {
                            ...state
                        }
                    }
                    const itemSum = state.item[action.pid].sum
                    const updatedItemList = {...state.item};
                    delete updatedItemList[action.pid] 
                    return {
                        ...state,
                        item: updatedItemList,
                        totalAmount: state.totalAmount - itemSum
                    }


        default: return state
    }

}


export default CartReducer;