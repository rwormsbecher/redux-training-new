import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesApiResponse, fetchCities } from "./citiesActions";
import { City } from "../../models/City";

interface CitiesState {
	cities: City[];
	loading: boolean;
	error: string | null;
	activeCity: City;
}

const initialState: CitiesState = {
	cities: [],
	activeCity: {} as City,
	loading: false,
	error: null,
};

export const citiesSlice = createSlice({
	name: "cities",
	initialState,
	reducers: {
		setActiveCity: (state, action: PayloadAction<City | null>) => {
			state.activeCity = action.payload || ({} as City);
		},
		addCity: (state, action: PayloadAction<City>) => {
			state.cities.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCities.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCities.fulfilled, (state, action: PayloadAction<CitiesApiResponse>) => {
				state.cities = action.payload.cities;
				state.activeCity = action.payload.cities[0];
				state.loading = false;
			})
			.addCase(fetchCities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch cities";
			});
	},
});

export const { setActiveCity, addCity } = citiesSlice.actions;
export default citiesSlice.reducer;
