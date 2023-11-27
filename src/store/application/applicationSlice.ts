import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "../../models/Mode";

interface ApplicationState {
	mode: string;
}

const initialState: ApplicationState = {
	mode: Mode.ShowCase,
};

export const applicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		setMode: (state, action: PayloadAction<string>) => {
			state.mode = action.payload;
		},
	},
});

export const { setMode } = applicationSlice.actions;
export default applicationSlice.reducer;
