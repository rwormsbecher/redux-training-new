import { create } from "zustand";
import { fetchCities as fetchCitiesApi } from "./fetchCities";
import { City } from "../../models/City";
import { devtools, persist } from "zustand/middleware";

// Define the state and action types
interface CitiesState {
	cities: City[];
	activeCity: City;
	loading: boolean;
	error: string | null;
	setActiveCity: (city: City | null) => void;
	addCity: (city: City) => void;
	fetchCities: () => Promise<void>;
}

// Create the Zustand store
const useCitiesStore = create<CitiesState>()(
	devtools(
		persist(
			(set) => ({
				cities: [],
				activeCity: {} as City,
				loading: false,
				error: null,

				// Action to set the active city
				setActiveCity: (city) => set({ activeCity: city || ({} as City) }, false, "setActiveCity"),

				// Action to add a city
				addCity: (city) => set((state) => ({ cities: [...state.cities, city] }), false, "addCity"),

				// Async action to fetch cities
				fetchCities: async () => {
					set({ loading: true }, false, "fetchCities");
					try {
						const response = await fetchCitiesApi();
						set(
							{ cities: response.cities, activeCity: response.cities[0], loading: false },
							false,
							"setCities"
						);
					} catch (err) {
						// Properly handle the error
						let errorMessage = "Failed to fetch cities";
						if (err instanceof Error) {
							errorMessage = err.message;
						}
						set({ loading: false, error: errorMessage }, false, "setCitiesError");
					}
				},
			}),
			{
				name: "application-slice",
			}
		)
	)
);

export default useCitiesStore;
