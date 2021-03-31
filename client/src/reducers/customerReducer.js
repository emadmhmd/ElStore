import {SIGN_UP , SIGN_IN_ATTEMPING , SIGN_IN_SUCCESS , LOG_OUT , PROFILE_GETTING} from '../actions/actionTypes.js';



const initState={
    signUpSuccess: false,
    signInSuccess:false,
    signInAttempting:false,
    profile:[]
}

const customerReducer =(state=initState , action)=>{
    switch(action.type){
        case SIGN_UP:
            return {...state ,signUpSuccess:true}
        case SIGN_IN_ATTEMPING:
            return {...state ,signInAttempting:true , signInSuccess:false}
        case SIGN_IN_SUCCESS:
            return {...state ,signInAttempting:false , signInSuccess:true}
        case PROFILE_GETTING:
            return {...state  , profile:action.payload}
        case LOG_OUT:
            return state
        default:
            return state
    }
}

export default customerReducer;