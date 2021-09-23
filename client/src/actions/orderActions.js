import {ORDER_ADDED , ORDER_DELETED , ORDER_UPDATED , CHECHOUT , CART_FETCHED ,CARTS_FETCHED, FAV_ORDER_ADDED, FAV_ORDERS_FETCHED ,STATUS_CHANGED} from './actionTypes';
import { addOrderApi , deleteOrderApi ,updateOrderApi ,fetchOrdersApi , checkoutApi ,fetchCartsApi ,fetchCartApi ,addFavOrderApi ,fetchFavOrdersApi ,changeStatusApi} from '../apis/orderApis';
import {addError , clearError} from './errorActions';
import {addMessage ,clearMessage} from './messageActions';
import {fetchingFailed , fetchingTime} from './fetchActions';

export const addOrderAction = (id )=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await addOrderApi(id );
            dispatch({type : ORDER_ADDED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const deleteOrderAction = (id ,flage ,status)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await deleteOrderApi(id , flage );
            dispatch({type : ORDER_DELETED });
            dispatch(fetchOrdersAction(flage , status))
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const updateOrderAction = (order ,id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await updateOrderApi(order , id);
            dispatch({type : ORDER_UPDATED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const checkoutAction = ()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await checkoutApi();
            dispatch({type : CHECHOUT });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const changeStatusAction = (cartId , status)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await changeStatusApi(cartId ,status);
            dispatch({type : STATUS_CHANGED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const fetchOrdersAction = ()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , cart}} = await fetchOrdersApi();
            dispatch({type : CART_FETCHED, payload:cart });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}

export const fetchCartsAction = (status)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , carts}} = await fetchCartsApi(status);
            dispatch({type : CARTS_FETCHED, payload:carts });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}

export const fetchCartAction = (cartId)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , cart}} = await fetchCartApi(cartId);
            dispatch({type : CART_FETCHED, payload:cart });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}

export const addFavOrderAction = (id  , value)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await addFavOrderApi(id  , value);
            dispatch({type : FAV_ORDER_ADDED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const fetchFavOrdersAction = ()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message , orders}} = await fetchFavOrdersApi();
            dispatch({type : FAV_ORDERS_FETCHED,payload:orders });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}