import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Mode } from "../../models/Mode";

export const applicationSlice = createSlice({
	name: "application",
	initialState: {
		mode: Mode.ShowCase,
	},
	reducers: {
		setMode: (state, action: PayloadAction<Mode>) => {
			state.mode = action.payload;
		},
	},
});

export const { setMode } = applicationSlice.actions;
export default applicationSlice.reducer;
