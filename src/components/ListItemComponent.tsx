import React from "react";
import { City } from "../models/City";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCity } from "../store/cities/citiesSlice";

interface ListItemComponentProps {
	city: City;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ city }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { activeCity } = useSelector((state: RootState) => state.cities);

	return (
		<li
			className={city.cityName === activeCity.cityName ? "active-city" : ""}
			onClick={() => dispatch(setActiveCity(city))}
		>
			{city.cityName}
		</li>
	);
};

export default ListItemComponent;
