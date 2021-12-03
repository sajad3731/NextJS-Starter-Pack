import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type exampleSliceStateType = {
  exampleState: any;
};

const initialState: exampleSliceStateType = {
  exampleState: 0,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setExampleState: (_, { payload }: PayloadAction<any>) => ({
      exampleState: payload,
    }),
  },
});

export const { setExampleState: setExampleStateAction } = exampleSlice.actions;

export default exampleSlice.reducer;
