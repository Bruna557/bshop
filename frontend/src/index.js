import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import { fetchCopyThunk } from './store/localizationThunks'
import App from './App'

import './index.css'


store.dispatch(fetchCopyThunk())

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
