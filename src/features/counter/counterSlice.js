import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";

const initialState = {
	value: 0,
	status: "idle",
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {},

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
});

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
