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
      if (state.objectData.length === 0) {
        state.objectData.push({
          // action.payload : {price: 100, prodId:1, prodName:"product01"}
          ...action.payload,
          count: 1,
          totalPrice: action.payload.price,
        }),
          (state.finalTotalAmount = action.payload.price),
          (state.finalTotalProductCount = 1);
      } else {
        const findItem = state.objectData.find(
          (item) => item.prodId === action.payload.prodId
        );
        findItem.count += 1;
        findItem.totalPrice += action.payload.price;
        state.finalTotalAmount += action.payload.price;
        state.finalTotalProductCount += 1;
      }
    },

    decrement: (state, action) => {
      const findItem = state.objectData.find(
        (item) => item.prodId === action.payload.prodId
      );
      findItem.count -= 1;
      findItem.totalPrice -= action.payload.price;
      state.finalTotalAmount -= action.payload.price;
      state.finalTotalProductCount -= 1;
    },
  },
});

export const { increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
