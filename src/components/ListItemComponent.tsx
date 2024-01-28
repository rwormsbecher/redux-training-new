import React from "react";
import { City } from "../models/City";

interface ListItemComponentProps {
	city: City;
	activeCity: City;
	setActiveCity: (city: City) => void;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ city, activeCity, setActiveCity }) => {
	return (
		<li className={city.cityName === activeCity.cityName ? "active-city" : ""} onClick={() => setActiveCity(city)}>
			{city.cityName}
		</li>
	);
};

export default ListItemComponent;
