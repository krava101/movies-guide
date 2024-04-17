import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    trending: 'day',
    search: '',
    page: 1,
  },
  reducers: {
    changeTrending(state, action) {
      state.trending = action.payload;
      state.search = '';
      state.page = 1;
    },
    changePage(state, action) {
      state.page = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    }
  }
})

export const { changeTrending, changePage, setSearch } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;