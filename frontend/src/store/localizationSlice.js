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
export const localizationSlice = createSlice({
    name: 'localization',
    initialState: {
        language: null,
        copy: {},
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload.language
            state.copy = action.payload.copy
        },
    },
})

// Actions
export const { setLanguage } = localizationSlice.actions

// Selectors
export const getCopy = (state) => state.localization.copy
export const getLanguage = (state) => state.localization.language

// Reducer
export default localizationSlice.reducer
