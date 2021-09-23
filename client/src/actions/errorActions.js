import {ERROR_ADDED ,ERROR_CLEARED} from './actionTypes';

export const addError = e =>{
    const { response: {data :{error}}} = e;            
    return{type:ERROR_ADDED, payload: error}
}

export const  clearError = () =>{
    return{type:ERROR_CLEARED}
}