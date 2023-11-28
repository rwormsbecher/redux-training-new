import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface NotificationState {
	type: string | null;
	text: string | null;
	visible: boolean;
}

interface NotificationActions {
	showNotification: (type: string, text: string) => void;
	hideNotification: () => void;
}

const useNotificationStore = create<NotificationState & NotificationActions>()(
	devtools(
		persist(
			(set) => ({
				// Initial state
				type: null,
				text: null,
				visible: false,

				// Actions
				showNotification: (type, text) => set({ type, text, visible: true }, false, "showNotification"),
				hideNotification: () => set({ type: null, text: null, visible: false }, false, "hideNotification"),
			}),
			{
				name: "notification-slice",
			}
		)
	)
);

export default useNotificationStore;
