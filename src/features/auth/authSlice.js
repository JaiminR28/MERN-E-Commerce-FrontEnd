import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./authAPI";
// import { updateUser } from "../user/userAPI";

const initialState = {
	loggedInUserToken: null, // this should ol=nly contain user identity  => 'id', '/role'
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
// export const updateUserAsync = createAsyncThunk(
// 	"user/updateUser",
// 	async (update) => {
// 		const response = await updateUser(update);

// 		return response.data;
// 	}
// );
export const checkuserAsync = createAsyncThunk(
	"user/checkUser",
	async (logInInfo, { rejectWithValue }) => {
		console.log(logInInfo);
		try {
			const response = await checkUser(logInInfo);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const signOutAsync = createAsyncThunk(
	"user/signOut",
	async (logInInfo) => {
		const response = await signOut(logInInfo);

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
				state.loggedInUserToken = action.payload;
			})
			.addCase(checkuserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(checkuserAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.loggedInUserToken = action.payload;
			})
			.addCase(checkuserAsync.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})
			.addCase(signOutAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(signOutAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.loggedInUserToken = action.payload;
			});
	},
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
