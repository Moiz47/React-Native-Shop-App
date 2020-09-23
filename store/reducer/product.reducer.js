import PRODUCT from '../../data/dummy-data';
import {DELETE, deleteProduct, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS} from '../action/product.action';
import Product from '../../models/product';

const INITIAL_STATE = {
    availableProducts: [],
    userProducts: []
}


const productReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type){

        case SET_PRODUCTS:

        return {
            availableProducts: action.products,
            userProducts: action.userProducts
        }

        case CREATE_PRODUCT:
            const newProduct = new Product( 
                action.info.id,
                action.info.ownerId,
                action.info.title,
                action.info.imageURL,
                action.info.description,
                action.info.price
            )

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(userProd => userProd.id === action.ID)
            const updatedProduct = new Product(
                action.ID,
                state.userProducts[productIndex].ownerId,
                action.info.title,
                action.info.imageURL,
                action.info.description,
                state.userProducts[productIndex].price,
            )
            const updatedUserProduct = [...state.userProducts]
            updatedUserProduct[productIndex] = updatedProduct;

            const availableProductsIndex = state.availableProducts.findIndex(userProd => userProd.id === action.ID)
            const updatedAvailableProduct = [...state.availableProducts]
            updatedAvailableProduct[availableProductsIndex] = updatedProduct

            return {
                ...state,
                availableProducts: updatedAvailableProduct,
                userProducts: updatedUserProduct
            }

        case DELETE:

            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid),
                userProducts: state.userProducts.filter(product => product.id !== action.pid)
            }

        default:
            return {
                ...state
            }
    }
    
}

export default productReducer;