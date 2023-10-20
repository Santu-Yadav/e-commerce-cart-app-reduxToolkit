import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectData: [],
  finalTotalAmount: 0,
  finalTotalProductCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    increment: (state, action) => {
      if (state.productData.length === 0) {
        state.objectData.push({
          ...action.payload,
          count: 1,
          totalPrice: data.price,
        }),
          (state.finalTotalAmount = data.price),
          (state.finalTotalProductCount = 1);
      } else {
      }
    },

    decrement: () => {},
  },
});
