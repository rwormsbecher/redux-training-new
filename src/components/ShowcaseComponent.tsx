import React from "react";
import Amsterdam from "../assets/images/amsterdam.jpg";
import Shenzhen from "../assets/images/shenzhen.jpg";
import London from "../assets/images/london.jpg";
import Mumbai from "../assets/images/mumbai.jpg";
import Sacramento from "../assets/images/sacramento.jpg";
import Nieuwegein from "../assets/images/nieuwegein.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ShowcaseComponent: React.FC = () => {
	const { activeCity } = useSelector((state: RootState) => state.cities);
	let img = null;

	// dynamic imports only work in Chrome...
	if (activeCity.cityName === "Amsterdam") img = Amsterdam;
	else if (activeCity.cityName === "Shenzhen") img = Shenzhen;
	else if (activeCity.cityName === "London") img = London;
	else if (activeCity.cityName === "Mumbai") img = Mumbai;
	else if (activeCity.cityName === "Sacramento") img = Sacramento;
	else if (activeCity.cityName === "nieuwegein") img = Nieuwegein;
	else img = activeCity.image;

	return (
		<section className="showcase-wrapper">
			<h1 className="showcase-wrapper__title">{activeCity.cityName}</h1>
			<img src={img} alt={activeCity.cityName} />
			<div>{activeCity.summary}</div>
		</section>
	);
};
