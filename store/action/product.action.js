import Product from "../../models/product";

export const DELETE = 'DELETE';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';



export const setProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().AuthReducer.userID;
        try{
            const result = await fetch('https://reactnative-65fdb.firebaseio.com/products.json')
            
            if(!result.ok){
                throw new Error('Something went wrong');
            }
            
            const resp = await result.json();
            const loadedProducts = [];
            for (const key in resp){
                loadedProducts.push(new Product(key, resp[key].ownerId, resp[key].title, resp[key].imageURL, resp[key].description, resp[key].price))
            }

            dispatch({  type: SET_PRODUCTS, 
                        products: loadedProducts, 
                        userProducts : loadedProducts.filter(prod => prod.ownerId === userId)});
        }catch(err){
            // console.log("Something is wrong");
            throw err;
        }
    }
}


export const createProduct = (title, description, imageURL, price) => {


    return async (dispatch, getState) => {
    const token = getState().AuthReducer.token;
    const userId = getState().AuthReducer.userID;
    const result = await fetch(`https://reactnative-65fdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, 
                description, 
                imageURL, 
                price,
                ownerId: userId
            })
        })

        const resp = await result.json();
        dispatch({
            type: CREATE_PRODUCT,
            info: {
                id: resp.name,
                title, 
                description, 
                imageURL, 
                price,
                ownerId: userId
            }
        })
    }
}

export const updateProduct = (id, title, description, imageURL) => {
    
    return async (dispatch, getState) => {
        const token = getState().AuthReducer.token;
        const result = await fetch(`https://reactnative-65fdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, description, imageURL
            })
        })

        if(!result.ok){
            throw new Error('Something went wrong');
        }

            dispatch({
                type: UPDATE_PRODUCT,
                ID: id, 
                info: {
                    title, 
                    description, 
                    imageURL, 
                }
            })
    }
}


export const  deleteProduct = (id) => {

    return async (dispatch, getState) => {
        const token = getState().AuthReducer.token;
        const result = await fetch(`https://reactnative-65fdb.firebaseio.com/products/${id}.json?auth=${token}`, {
         method: 'DELETE'})

         dispatch({
            type: DELETE,
            pid: id
         })

         if(!result.ok){
            throw new Error('Something went wrong');
        }
    }
}