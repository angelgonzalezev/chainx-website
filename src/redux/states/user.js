import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, persistLocalStorage } from "../../utilities/localStorage";

export const EmptyUserState = {
	id: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : EmptyUserState,
	reducers: {
		createUser: (_state, action) => {
			persistLocalStorage("user", action.payload);
			return action.payload;
		},
		updateUser: (state, action) => {
			const result = { ...state, ...action.payload };
			persistLocalStorage("user", result);
			return result;
		},
		resetUser: () => {
			clearLocalStorage("user");
			return EmptyUserState;
		},
	},
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
