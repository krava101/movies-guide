import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    trending: 'day',
    search: '',
    page: 1,
    totalPages: 0,
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
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload
    }
  }
})

export const { changeTrending, changePage, setSearch, setTotalPages } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;