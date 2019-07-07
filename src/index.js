import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import {createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux';
// import reducer from '/store/my-reducer.js'


const rootReducer =  combineReducers({});
const store = createStore(rootReducer);



ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,


    document.getElementById('root'));

serviceWorker.unregister();
