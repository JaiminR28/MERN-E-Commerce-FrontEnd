import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	fetchLoggedInUser,
	fetchLoggedInUserOrders,
	updateUser,
} from "./userAPI";

const initialState = {
	status: "idle",
	userInfo: null, // this will be used in case of detailed user info, while auth will only be used for loggeedInUser id etc checks
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
	"user/fetchLoggedInUserOrders",
	async (userId) => {
		const response = await fetchLoggedInUserOrders(userId);

		return response.data;
	}
);
export const fetchLoggedInUserAsync = createAsyncThunk(
	"user/fetchLoggedInUser",
	async (userId) => {
		const response = await fetchLoggedInUser(userId);

		return response.data;
	}
);
export const updateUserAsync = createAsyncThunk(
	"user/updateUser",
	async (update) => {
		const response = await updateUser(update);
		return response.data;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchLoggedInUserOrdersAsync.fulfilled,
				(state, action) => {
					state.status = "idle";
					state.userInfo.orders = action.payload;
				}
			)
			.addCase(updateUserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				state.status = "idle";
				// earlier there was loggedInUser
				state.userInfo = action.payload;
			})
			.addCase(fetchLoggedInUserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
				state.status = "idle";
				// this info can be different or more from the logged-in User Info
				state.userInfo = action.payload;
			});
	},
});

// TODO: change orders and addresses to be independent

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;
