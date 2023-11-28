import React from "react";
import ListItemComponent from "./ListItemComponent";

import useCitiesStore from "../store/cities/citiesStore";

export const ListComponent: React.FC = () => {
	const { cities } = useCitiesStore();

	const citiesListItemArray = cities.map((city) => <ListItemComponent city={city} key={city.id} />);

	return <ul>{citiesListItemArray}</ul>;
};
