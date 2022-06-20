import { createAsyncThunk } from '@reduxjs/toolkit'

import { updateProducts, setSearch } from './productSlice'
import { fetchProducts } from '../services/mocks/productService'

const PAGE_SIZE = 4

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
export const fetchProductsThunk = createAsyncThunk('products/get', async (page = 1, thunkApi) => {
    const q = thunkApi.getState().product.search
    fetchProducts(page, PAGE_SIZE, q)
        .then(data => {
            thunkApi.dispatch(updateProducts({
                products: data.products,
                currentPage: page,
                numberOfPages: Math.ceil(data.total/PAGE_SIZE)
            }))
        })
})

// Improve: instead of calling this, call setSearch and implement listener that will
// call fetchProductsThunk(1) whenever q changes
export const setSearchAndFetchProductsThunk = createAsyncThunk('products/search', async (q, thunkApi) => {
    thunkApi.dispatch(setSearch(q))
    thunkApi.dispatch(fetchProductsThunk(1))
})
