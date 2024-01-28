import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./application/applicationSlice";
import citiesSlice from "./cities/citiesSlice";

export const store = configureStore({
	reducer: {
		application: applicationSlice,
		cities: citiesSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
