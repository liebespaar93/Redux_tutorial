import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { incrementAsync } from "./thunks";

export interface CameraSliceState {
    value: number;
    status: "idle" | "loading" | "failed"
}

const initialState: CameraSliceState = {
    value: 0,
    status: "failed"
}

export const cameraSlice = createSlice({
    name: "camera",
    initialState,
    reducers: {
        increment: (state) => {
          // Redux Toolkit allows us to write "mutating" logic in reducers. It
          // doesn't actually mutate the state because it uses the Immer library,
          // which detects changes to a "draft state" and produces a brand new
          // immutable state based off those changes
          state.value += 1;
        },
        decrement: (state) => {
          state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(incrementAsync.pending, (state) => {
            state.status = "loading";
          })
          .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.value += action.payload;
          });
      },
})