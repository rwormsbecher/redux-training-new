import React, { useEffect } from "react";
import ListItemComponent from "./ListItemComponent";
import { City } from "../City";

interface ListComponentProps {
	cities: City[];
	activeCity: City;
	selectCity: (city: City) => void;
}

export const ListComponent: React.FC<ListComponentProps> = ({ cities, activeCity, selectCity }) => {
	const citiesListItemArray = cities.map((city) => (
		<ListItemComponent selectedCity={activeCity} city={city} key={city.id} selectCity={selectCity} />
	));

	return <ul>{citiesListItemArray}</ul>;
};
