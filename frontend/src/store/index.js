import { configureStore } from '@reduxjs/toolkit'

import productReducer from './productSlice'
import localizationReducer from './localizationSlice'

export default configureStore({
    reducer: {
        product: productReducer,
        localization: localizationReducer,
    },
})
