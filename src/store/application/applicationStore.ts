import { create } from "zustand";
import { Mode } from "../../models/Mode";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface ApplicationState {
	mode: Mode;
}

interface ApplicationActions {
	setMode: (mode: Mode) => void;
}

const useApplicationStore = create<ApplicationState & ApplicationActions>()(
	devtools(
		persist(
			(set) => ({
				mode: Mode.ShowCase,

				setMode: (mode) => set((state) => ({ mode }), false, "setMode"),
			}),
			{
				name: "application-slice",
			}
		)
	)
);

export default useApplicationStore;
