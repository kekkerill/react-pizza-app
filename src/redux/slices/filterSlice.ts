import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CategoryIndex: 0,
  SortIndex: 0,
  CurrentPage: 1,
};

const getSortIndex = (sortName: string) => {
  switch (sortName) {
    case "rating":
      return 0;
    case "price":
      return 1;
    case "title":
      return 2;
    default:
      return 0;
  }
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIndex: (state, action) => {
      state.CategoryIndex = action.payload;
    },
    setSortIndex: (state, action) => {
      state.SortIndex = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.CurrentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.CategoryIndex = action.payload.categoryIndex;
      state.SortIndex = getSortIndex(action.payload.sortIndex);
      state.CurrentPage = action.payload.currentPage;
    },
  },
});

export const { setCategoryIndex, setSortIndex, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
