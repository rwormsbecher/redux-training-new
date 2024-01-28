import { createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "../../models/City";

export interface CitiesApiResponse {
	cities: City[];
}

export const fetchCities = createAsyncThunk("cities/fetchCities", async (): Promise<CitiesApiResponse> => {
	const response = await fetch("https://greensocapi.azurewebsites.net/api/Cities");
	const data = (await response.json()) as CitiesApiResponse;
	return data;
});
