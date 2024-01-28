import React from "react";
import ListItemComponent from "./ListItemComponent";
import { City } from "../models/City";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ListComponent: React.FC = () => {
	const { cities } = useSelector((state: RootState) => state.cities);

	const citiesListItemArray = cities.map((city: City) => <ListItemComponent city={city} key={city.id} />);

	return <ul>{citiesListItemArray}</ul>;
};
