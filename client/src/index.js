import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';
import store from './store';
import {onLoadingSignIn} from './actions/customerActions';

//you have store itself , so you don't need connect()
store.dispatch(onLoadingSignIn());

ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
