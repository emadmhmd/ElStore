import {RATES_FETCHED ,RATE_ADDED} from './actionTypes';
import { addRateApi ,fetchRatesApi} from '../apis/rateApis';
import {addError , clearError} from './errorActions';
import {addMessage ,clearMessage} from './messageActions';
import {fetchingFailed , fetchingTime} from './fetchActions';

export const addProductAction = (rate)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await addRateApi(rate);
            dispatch({type : RATE_ADDED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}


export const fetchRatesAction = (rate ,id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data : {message}} = await fetchRatesApi();
            dispatch({type : RATES_FETCHED });
            dispatch(addMessage(message))
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}

