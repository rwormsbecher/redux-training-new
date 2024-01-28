import React from "react";
import ListItemComponent from "./ListItemComponent";
import { City } from "../models/City";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ListComponentProps {
	activeCity: City;
	setActiveCity: React.Dispatch<React.SetStateAction<City>>;
}

export const ListComponent: React.FC<ListComponentProps> = ({ activeCity, setActiveCity }) => {
	const { cities } = useSelector((state: RootState) => state.cities);

	const citiesListItemArray = cities.map((city: City) => (
		<ListItemComponent city={city} key={city.id} setActiveCity={setActiveCity} activeCity={activeCity} />
	));

	return <ul>{citiesListItemArray}</ul>;
};
