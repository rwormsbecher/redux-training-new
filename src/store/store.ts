import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./application/applicationSlice";

export const store = configureStore({
	reducer: {
		application: applicationSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
