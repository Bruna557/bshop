import { configureStore } from '@reduxjs/toolkit'

import productReducer from './productSlice'
import localizationReducer from './localizationSlice'
import useReducer from './userSlice'

export default configureStore({
    reducer: {
        product: productReducer,
        localization: localizationReducer,
        user: useReducer,
    },
})
