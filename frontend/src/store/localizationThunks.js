import { createAsyncThunk } from '@reduxjs/toolkit'

import { setLanguage } from './localizationSlice'
import { fetchCopy } from '../services/mockService'

/*
 * Thunk functions are middlewares that intercept actions before they reach a reducer.
 * Reducers should be pure (they should only update state based on current state and action payload);
 * thunks enable us to write async logic to update the store.
 *
 * The first parameter of createAsyncThunk is `type`, a string that will be used to generate additional
 * Redux action type constants, representing the lifecycle of an async request.
 * A type argument of 'copy/get' will generate these action types:
 *   - pending: 'copy/get/pending'
 *   - fulfilled: 'copy/get/fulfilled'
 *   - rejected: 'copy/get/rejected'
*/
export const fetchCopyThunk = createAsyncThunk('copy/get', async (language = 'en', thunkApi) => {
    const currentLanguage = thunkApi.getState().language
    if (language !== currentLanguage) {
        const copy = await fetchCopy(language)
        if (copy) {
            thunkApi.dispatch(setLanguage({language: language, copy: copy}))
        }
    }
})
