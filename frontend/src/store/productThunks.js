import { createAsyncThunk } from '@reduxjs/toolkit'

import { updateProducts } from './productSlice'
import { fetchProducts, searchProducts } from '../services/mockService'

/*
 * Thunk functions are middlewares that intercept actions before they reach a reducer.
 * Reducers should be pure (they should only update state based on current state and action payload);
 * thunks enable us to write async logic to update the store.
 *
 * The first parameter of createAsyncThunk is `type`, a string that will be used to generate additional
 * Redux action type constants, representing the lifecycle of an async request.
 * A type argument of 'products/get' will generate these action types:
 *   - pending: 'products/get/pending'
 *   - fulfilled: 'products/get/fulfilled'
 *   - rejected: 'products/get/rejected'
*/
export const fetchProductsThunk = createAsyncThunk('products/get', async (previousPage = false, thunkApi) => {
    const currentPage = thunkApi.getState().product.currentPage
    const page = previousPage ? currentPage - 1 : currentPage + 1
    const products = await fetchProducts(page)
    if (products) {
        console.log('got products:' + products.length)
        thunkApi.dispatch(updateProducts({products: products, currentPage: page, total: 10}))
    }
})

export const searchProductsThunk = createAsyncThunk('products/search', async (q, thunkApi) => {
    const products = await searchProducts(q)
    if (products) {
        thunkApi.dispatch(updateProducts({products: products, currentPage: 1, total: 10}))
    }
})
