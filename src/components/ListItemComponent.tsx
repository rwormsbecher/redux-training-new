import React from "react";
import { City } from "../City"; // Assuming this is your model

interface ListItemComponentProps {
	city: City;
	selectedCity: City;
	selectCity: (city: City) => void;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ city, selectedCity, selectCity }) => {
	return (
		<li className={city.cityName === selectedCity.cityName ? "active-city" : ""} onClick={() => selectCity(city)}>
			{city.cityName}
		</li>
	);
};

export default ListItemComponent;
