import { createSlice } from '@reduxjs/toolkit';
//import { getProducts } from '../REST/api'

// Export function to permite invok request to REST API
//export { getProducts };

// Store init
const initialState = {
    list: [],
    isLoading: true
};

// Redux Store to save the rest (in this is menioned the exported functions with relative status loading)
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        /*
        [getProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list = action.payload;
        },
        [getProducts.rejected]: (state) => {
            state.isLoading = false;
        },
        */
    },
});

// export const { clearCart, removeItem, increase, decrease, calculateTotals } = productsSlice.actions;
export default productsSlice.reducer;