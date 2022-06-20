import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

import './index.css'

import { fetchCopyThunk } from './store/localizationThunks'
// import { login } from './services/mocks/userService'

store.dispatch(fetchCopyThunk())
// login('bruna@gmail.com', 'a1s2d3f4')

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
