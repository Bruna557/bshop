import { createSlice } from '@reduxjs/toolkit'

/*
 * A "slice" is a collection of Redux reducer logic and actions for a single
 * feature in your app. The name comes from splitting up the root Redux state
 * object into multiple "slices" of state
 *
 * Redux Toolkit allows us to write "mutating" logic in reducers. It
 * doesn't actually mutate the state because it uses the Immer library,
 * which detects changes to a "draft state" and produces a brand new
 * immutable state based off those changes.
*/
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        currentPage: 0,
        total: null,
        products: []
    },
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload.products
            state.currentPage = action.payload.currentPage
            state.total = action.payload.total
        },
    },
})

// Actions
export const { updateProducts } = productSlice.actions

// Selectors
export const getProductList = (state) => state.product.products
export const getProductById = (id) => (state) => {
    return state.product.products.filter((p) => p.id === id)[0] || {}
}
export const getProductPagination = (state) => {
    return {
        currentPage: state.product.currentPage,
        total: state.product.total
    }
}

// Reducer
export default productSlice.reducer
