import { City } from "../../models/City";

export interface CitiesApiResponse {
	cities: City[];
}

// Async function to fetch cities
export const fetchCities = async (): Promise<CitiesApiResponse> => {
	try {
		const response = await fetch("https://greensocapi.azurewebsites.net/api/Cities");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = (await response.json()) as CitiesApiResponse;
		return data;
	} catch (error) {
		// Handle or throw the error depending on your use case
		throw error;
	}
};
