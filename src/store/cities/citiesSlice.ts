import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesApiResponse, fetchCities } from "./citiesActions";
import { City } from "../../models/City";

interface CitiesState {
	cities: City[];
	loading: boolean;
	error: string | null;
}

const initialState: CitiesState = {
	cities: [],
	loading: false,
	error: null,
};

export const citiesSlice = createSlice({
	name: "cities",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCities.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCities.fulfilled, (state, action: PayloadAction<CitiesApiResponse>) => {
				state.cities = action.payload.cities;
				state.error = "";
				state.loading = false;
			})
			.addCase(fetchCities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch cities";
			});
	},
});

export const {} = citiesSlice.actions;
export default citiesSlice.reducer;
