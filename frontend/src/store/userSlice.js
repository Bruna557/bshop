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
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    },
})

// Actions
export const { setIsLoggedIn } = userSlice.actions

// Selectors
export const getIsLoggedIn = (state) => state.user.isLoggedIn

// Reducer
export default userSlice.reducer
