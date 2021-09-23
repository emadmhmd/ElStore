import {ERROR_ADDED ,ERROR_CLEARED} from '../actions/actionTypes';

const initState={
    err: null
}


const errorReducser =(state=initState , action)=>{
    switch(action.type){
        case ERROR_ADDED:
            return {...state , err : action.payload};
        case ERROR_CLEARED:
            return initState
        default:
            return state;
    }
}

export default errorReducser;