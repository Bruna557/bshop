import { createSlice } from "@reduxjs/toolkit";

// A "slice" is a collection of Redux reducer logic and actions for a single
// feature in your app, typically defined together in a single file.
export const productSlice = createSlice({
    name: "products",
    initialState: {
        value: [],
    },
    reducers: {
        update: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = action.payload;
        },
    },
});


export const { update } = productSlice.actions;

export default productSlice.reducer;
