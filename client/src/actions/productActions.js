import {PRODUCT_ADDED , PRODUCT_DELETED , PRODUCT_UPDATED, PRODUCTS_FETCHED, PRODUCT_SEARCHED ,PRODUCT_FETCHED , PRODUCT_ARCHIVED ,PRODUCT_IMAGE_UPLOADED} from './actionTypes';
import { addProductApi , deleteProductApi ,updateProductApi ,fetchProductsApi ,searchProductApi,fetchProductApi,archiveProductApi,uploadProductImageApi } from '../apis/productApis';
import {addError , clearError} from './errorActions';
import {addMessage ,clearMessage} from './messageActions';
import {fetchingFailed , fetchingTime} from './fetchActions';

export const addProductAction = (product)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await addProductApi(product);
            dispatch(fetchProductsAction({}))
            dispatch({type : PRODUCT_ADDED });
            dispatch(addMessage(message))
        }catch(e){
            console.log('err from action')
            dispatch(addError(e))
        }
    }
}

export const deleteProductAction = (id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await deleteProductApi(id);
            dispatch(fetchProductsAction({}))
            dispatch({type : PRODUCT_DELETED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const archiveProductAction = (id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await archiveProductApi(id);
            dispatch(fetchProductsAction({}))
            dispatch({type : PRODUCT_ARCHIVED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const updateProductAction = (product ,id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await updateProductApi(product , id);
            dispatch(fetchProductsAction({}))
            dispatch({type : PRODUCT_UPDATED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const uploadProductImageAction = (product ,id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await uploadProductImageApi();
            dispatch({type : PRODUCT_IMAGE_UPLOADED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const fetchProductsAction = (query)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , products}} = await fetchProductsApi(query);
            dispatch({type : PRODUCTS_FETCHED , payload:products });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const searchProductAction = (title)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , products}} = await searchProductApi(title);
            console.log('products length' , products.length)
            dispatch({type : PRODUCT_SEARCHED , payload:products });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const fetchProductAction = (productId)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , product}} = await fetchProductApi(productId);
            dispatch({type : PRODUCT_FETCHED , payload:product });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
/*export const fetchProductsAction = (title , code)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , products}} = await fetchProductsApi(title ,code);
            dispatch({type : PRODUCTS_FETCHED , payload:products });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const filterProductsAction = (category , type)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , products}} = await filterProductsApi(category ,type);
            dispatch({type : PRODUCTS_FETCHED , payload:products });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
*/