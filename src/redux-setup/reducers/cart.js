import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let isProductExists = false;
      state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.qty += Number(action.payload.qty);
          isProductExists = true;
        }
        return item;
      });
      if (!isProductExists) {
        state.items.push(action.payload);
      }
    },
    updateCart: (state, action) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.qty = action.payload.qty;
        }
        return item;
      });
    },
    clearCart: (state) => {
      state.items = [];
    },
    deleteItemCart: (state, action) => {
      const newItems = state.items.filter(
        (item) => item._id !== action.payload._id,
      );
      state.items = newItems;
    },
  },
});
export const { addToCart, updateCart, deleteItemCart, clearCart } =
  cartReducer.actions;
export default cartReducer.reducer;
