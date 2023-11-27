import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
	type: string | null;
	text: string | null;
	visible: boolean;
}

const initialState: NotificationState = {
	type: null,
	text: null,
	visible: false,
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification: (state, action: PayloadAction<{ type: string; text: string }>) => {
			state.type = action.payload.type;
			state.text = action.payload.text;
			state.visible = true;
		},
		hideNotification: (state) => {
			state.visible = false;
			state.type = null;
			state.text = null;
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
