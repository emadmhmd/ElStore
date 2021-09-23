import {RATE_ADDED ,  RATES_FETCHED} from '../actions/actionTypes.js';



const initState={
    rateAdded: false,
    rateDeleted:false,
    rateUpdated:false,
    rateFetched:false
}

const rateReducer =(state=initState , action)=>{
    switch(action.type){
        case RATE_ADDED:
            return {...state ,rateUpdated:true}
        case RATES_FETCHED:
            return {...state , rateFetched : true}
        default:
            return state
    }
}

export default rateReducer;