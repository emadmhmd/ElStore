import {MESSAGE_ADDED ,MESSAGE_CLEARED} from './actionTypes';

export const addMessage = m =>{       
    return{type:MESSAGE_ADDED, payload: m}
}

export const  clearMessage = () =>{
    return{type:MESSAGE_CLEARED}
}