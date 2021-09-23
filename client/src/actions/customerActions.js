import {LOG_OUT, SIGN_UP_SUCCESS , SIGN_IN_SUCCESS, SIGN_IN_ATTEMPING , USER_GETTING, ERROR_ADDED, USER_UPDATED} from '../actions/actionTypes.js';
import {signInApi, signUpApi , getUserApi ,updateUserApi} from '../apis/customerApis';
import {addError ,clearError} from './errorActions';
import {addMessage ,clearMessage} from './messageActions';
import setAuthHeader from '../apis/setAuthHeader.js';



const TOKEN_NAME='afokado_app_token'

export const signUpAction=(user)=>{
    return async dispatch=>{
        try{     
            dispatch(clearError()) 
            dispatch(clearMessage())
            const {data:{message}}=await signUpApi(user)
            dispatch({type:SIGN_UP_SUCCESS})
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
            console.log('sign up err')
        }
    }
}


export const signInAction = (request_data) =>{
    return async dispatch =>{
        dispatch({type : SIGN_IN_ATTEMPING }) 
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {token , message}} = await (await signInApi(request_data))
            setAuthHeader(token);
            dispatch(getUser())
            dispatch(signInSuccess(token))
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e)) 
            console.log('sign in err')
        }
    }
}


export const onLoadingSignIn = ()=>{
    return dispatch =>{
        try{
            dispatch(clearError())
            const token = localStorage.getItem(TOKEN_NAME);
            if(token === null || token === 'undefined'){
                dispatch({type:ERROR_ADDED ,payload:'You need to login'})
            }else{
                setAuthHeader(token)
                dispatch(getUser())
                return dispatch(signInSuccess(token))
            }
        }catch(e){
            dispatch(addError(e))
            console.log('onLoadingSignIn err')
        }
    }
}

export const getUser = ()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            const {data : {user}} = await getUserApi();
            dispatch({type : USER_GETTING , payload :user});
           /* if(user.type===2){
                dispatch(fetchLawyerNotifications())
            }
            if(user.type===3){
                dispatch(fetchStudentNotifications())
            }*/
        }catch(e){
            dispatch(addError(e))
            console.log('get profile err')
        }
    }
}
export const updateUserAction = (user)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {message}} = await updateUserApi(user);
            dispatch({type : USER_UPDATED });
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const logUserOut =()=>{
    return dispatch=>{
        dispatch(clearError())
        dispatch(clearMessage())
        localStorage.clear();
        dispatch({ type : LOG_OUT})
        //dispatch(getUser())
    }
}

//////////////////////////////////////// {ACTIONS} ///////////////////////////////////////

const signInSuccess = (token)=>{
    localStorage.setItem(TOKEN_NAME,token)
    return {type :SIGN_IN_SUCCESS}
}