import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

import './index.css'

import { fetchCopyThunk } from './store/localizationThunks'
import { fetchProductsThunk } from './store/productThunks'

store.dispatch(fetchCopyThunk())
store.dispatch(fetchProductsThunk())

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
