import { City } from "../../models/City";

export interface CitiesApiResponse {
	cities: City[];
}

export const fetchCities = async (): Promise<CitiesApiResponse> => {
	try {
		const response = await fetch("https://greensocapi.azurewebsites.net/api/Cities");
		if (!response.ok) {
			throw new Error("Network error");
		}
		const data = (await response.json()) as CitiesApiResponse;
		return data;
	} catch (error) {
		throw error;
	}
};
