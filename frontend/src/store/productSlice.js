import { createSlice } from "@reduxjs/toolkit";

import { getProducts } from "../api";

// A "slice" is a collection of Redux reducer logic and actions for a single
// feature in your app, typically defined together in a single file.
export const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: getProducts(),
    },
    reducers: {
        updateList: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.productList = action.payload;
        },
    },
});

export const { updateList } = productSlice.actions;

export default productSlice.reducer;
