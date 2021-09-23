import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import messageReducer from './messageReducer';
import errotReducer from './errorReducer';
import customerReducer from './customerReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import rateReducer from './rateReducer';


export default combineReducers({
    customerReducer,
    fetchReducer,
    messageReducer,
    errotReducer,
    productReducer,
    orderReducer,
    rateReducer

})