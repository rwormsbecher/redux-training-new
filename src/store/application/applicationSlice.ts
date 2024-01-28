import { createSlice } from "@reduxjs/toolkit";
import { Mode } from "../../models/Mode";

export const applicationSlice = createSlice({
	name: "application",
	initialState: {
		mode: Mode.ShowCase,
	},
	reducers: {},
});

export const {} = applicationSlice.actions;
export default applicationSlice.reducer;
