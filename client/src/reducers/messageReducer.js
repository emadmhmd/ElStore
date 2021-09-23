import {MESSAGE_ADDED ,MESSAGE_CLEARED} from '../actions/actionTypes';

const initState={
    msg: null
}


const massageReducser =(state=initState , action)=>{
    switch(action.type){
        case MESSAGE_ADDED:
            return {...state , msg : action.payload};
        case MESSAGE_CLEARED:
            return initState
        default:
            return state;
    }
}

export default massageReducser;