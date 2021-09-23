import {SIGN_UP_SUCCESS , SIGN_IN_ATTEMPING , SIGN_IN_SUCCESS , LOG_OUT , USER_GETTING , USER_UPDATED} from '../actions/actionTypes.js';



const initState={
    signUpSuccess: false,
    signInSuccess:false,
    signInAttempting:false,
    profile:[],
    userUpdated:false
}

const customerReducer =(state=initState , action)=>{
    switch(action.type){
        case SIGN_UP_SUCCESS:
            return {...state ,signUpSuccess:true}
        case SIGN_IN_ATTEMPING:
            return {...state ,signInAttempting:true , signInSuccess:false}
        case SIGN_IN_SUCCESS:
            return {...state ,signInAttempting:false , signInSuccess:true}
        case LOG_OUT:
            return state
        case USER_GETTING:
            return {...state  , profile:action.payload}
        case USER_UPDATED:
            return {...state , userUpdated:true}
        default:
            return state
    }
}

export default customerReducer;