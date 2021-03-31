import {LOG_OUT, SIGN_UP , SIGN_IN_SUCCESS, SIGN_IN_ATTEMPING , PROFILE_GETTING} from '../actions/actionTypes.js';
import {signInApi, signUpApi , getProfileApi} from '../apis/customerApis';
import setAuthHeader from '../apis/setAuthHeader.js';



const TOKEN_NAME='afokado_app_token'

export const signUpAction=(user)=>{
    return async dispatch=>{
        try{     
            /*dispatch(clearError()) 
            dispatch(clearMessage())*/
            const {data:{message}}=await signUpApi(user)
            dispatch({type:SIGN_UP})
            //dispatch(addMessage(message))
        }catch(e){
            //dispatch(addError(e))
            console.log('sign up err')
        }
    }
}


export const signInAction = (request_data) =>{
    return async dispatch =>{
        dispatch({type : SIGN_IN_ATTEMPING }) 
        try{
            //dispatch(clearError())
            //dispatch(clearMessage())
            const {data : {token , message}} = await (await signInApi(request_data))
            setAuthHeader(token);
            dispatch(getProfile())
            dispatch(signInSuccess(token))
            //dispatch(addMessage(message))
        }catch(e){
            //dispatch(addError(e)) 
            console.log('sign in err')
        }
    }
}


export const onLoadingSignIn = ()=>{
    return dispatch =>{
        try{
            //dispatch(clearError())
            const token = localStorage.getItem(TOKEN_NAME);
            if(token === null || token === 'undefined'){
                //dispatch({type:ADD_ERROR ,payload:'You need to login'})
                console.log('onLoadingSignIn err')
            }else{
                setAuthHeader(token)
                dispatch(getProfile())
                return dispatch(signInSuccess(token))
            }
        }catch(e){
            //dispatch(addError(e))
            console.log('onLoadingSignIn err')
        }
    }
}

export const getProfile = ()=>{
    return async dispatch =>{
        try{
            //dispatch(clearError())
            const {data : {user}} = await getProfileApi();
            dispatch({type : PROFILE_GETTING , payload :user});
           /* if(user.type===2){
                dispatch(fetchLawyerNotifications())
            }
            if(user.type===3){
                dispatch(fetchStudentNotifications())
            }*/
        }catch(e){
            //dispatch(addError(e))
            console.log('get profile err')
        }
    }
}
export const logUserOut =()=>{
    return dispatch=>{
        //dispatch(clearError())
        //dispatch(clearMessage())
        localStorage.clear();
        dispatch({ type : LOG_OUT})
    }
}

//////////////////////////////////////// {ACTIONS} ///////////////////////////////////////

const signInSuccess = (token)=>{
    localStorage.setItem(TOKEN_NAME,token)
    return {type :SIGN_IN_SUCCESS}
}