import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../states/user";

export const store = configureStore({
	reducer: {
		user: userSliceReducer,
	},
});
