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

        if (findItem) {
          findItem.count += 1;
          findItem.totalPrice += action.payload.price;
          state.finalTotalAmount += action.payload.price;
          state.finalTotalProductCount += 1;
        } else {
          state.objectData.push({
            ...action.payload,
            count: 1,
            totalPrice: action.payload.price,
          }),
            (state.finalTotalAmount += action.payload.price),
            (state.finalTotalProductCount += 1);
        }
      }
    },

    decrement: (state, action) => {
      console.log("action.payload in cartSlice #", action.payload.target.id);
      console.log(" state.objectData #", state.objectData);
      const findItem = state.objectData.find(
        (item) => item.prodId === action.payload.target.id
      );
      console.log("findItem inside decrement #", findItem);
      findItem.count -= 1;
      findItem.totalPrice -= findItem.price;
      state.finalTotalAmount -= findItem.price;
      state.finalTotalProductCount -= 1;
    },
  },
});

export const { increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
