import React from "react";
import ListItemComponent from "./ListItemComponent";
import { City } from "../models/City";

interface ListComponentProps {
	cities: City[];
	activeCity: City;
	setActiveCity: React.Dispatch<React.SetStateAction<City>>;
}

export const ListComponent: React.FC<ListComponentProps> = ({ cities, activeCity, setActiveCity }) => {
	const citiesListItemArray = cities.map((city: City) => (
		<ListItemComponent city={city} key={city.id} setActiveCity={setActiveCity} activeCity={activeCity} />
	));

	return <ul>{citiesListItemArray}</ul>;
};
