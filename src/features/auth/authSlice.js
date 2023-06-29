import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authAPI";

const initialState = {
	loggedInUser: null,
	status: "idle",
	error: null,
};

export const createUserAsync = createAsyncThunk(
	"user/createUser",
	async (userData) => {
		const response = await createUser(userData);

		return response.data;
	}
);
export const checkuserAsync = createAsyncThunk(
	"user/checkUser",
	async (logInInfo) => {
		const response = await checkUser(logInInfo);
		console.log(response);

		return response.data;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createUserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.loggedInUser = action.payload;
			})
			.addCase(checkuserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(checkuserAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.loggedInUser = action.payload;
			})
			.addCase(checkuserAsync.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.error;
			});
	},
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
