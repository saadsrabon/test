import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        query: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.query = action.payload;
        },
        clearFilter: (state) => {
            state.query = '';
        },
    },
});

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;