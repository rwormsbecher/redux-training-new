import React from "react";
import ListItemComponent from "./ListItemComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ListComponent: React.FC = () => {
	const { cities } = useSelector((state: RootState) => state.cities);

	const citiesListItemArray = cities.map((city) => <ListItemComponent city={city} key={city.id} />);

	return <ul>{citiesListItemArray}</ul>;
};
