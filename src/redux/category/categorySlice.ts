import { createSlice } from '@reduxjs/toolkit';
import { Category, CategoryType } from '@types';
import productCategories from 'mock/productCategory';

interface CategoryState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  categoryType: CategoryType;
  categories: Category[];
  category: Category | null;
}

const initialState: CategoryState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  categoryType: CategoryType.NORMAL,
  categories: productCategories,
  category: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setAddCategory: (state) => {
      state.isEditing = false;
    },
    setEditCategory: (state, action) => {
      state.isEditing = true;
      state.category = action.payload;
    },
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },
    getCategoryDetail: (state, action) => {
      console.log(action);
      state.category = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setAddCategory, setEditCategory, setCategoryType, getCategoryDetail } = categorySlice.actions;
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
