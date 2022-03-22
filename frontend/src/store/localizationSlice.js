import { createSlice } from "@reduxjs/toolkit";

import { getCopy } from "../api";

// A "slice" is a collection of Redux reducer logic and actions for a single
// feature in your app, typically defined together in a single file.
export const localizationSlice = createSlice({
    name: "localization",
    initialState: {
        language: "en",
        copy: getCopy(),
    },
    reducers: {
        changeLanguage: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            if (action.payload !== state.language) {
                state.language = action.payload;
                state.copy = getCopy(action.payload);
            }
        },
    },
});

export const { changeLanguage } = localizationSlice.actions;

export default localizationSlice.reducer;
