import React from "react";
import { City } from "../models/City";
import useCitiesStore from "../store/cities/citiesStore";

interface ListItemComponentProps {
	city: City;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ city }) => {
	const { activeCity, setActiveCity } = useCitiesStore();

	return (
		<li className={city.cityName === activeCity.cityName ? "active-city" : ""} onClick={() => setActiveCity(city)}>
			{city.cityName}
		</li>
	);
};

export default ListItemComponent;
