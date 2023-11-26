import React from "react";
import { City } from "../City";
import Amsterdam from "../assets/images/amsterdam.jpg";
import Shenzhen from "../assets/images/shenzhen.jpg";
import London from "../assets/images/london.jpg";
import Mumbai from "../assets/images/mumbai.jpg";
import Sacramento from "../assets/images/sacramento.jpg";

interface ShowcaseComponentProps {
	city: City;
}

export const ShowcaseComponent: React.FC<ShowcaseComponentProps> = ({ city }) => {
	let img = null;

	// dynamic imports only work in Chrome...
	if (city.cityName === "Amsterdam") img = Amsterdam;
	else if (city.cityName === "Shenzhen") img = Shenzhen;
	else if (city.cityName === "London") img = London;
	else if (city.cityName === "Mumbai") img = Mumbai;
	else if (city.cityName === "Sacramento") img = Sacramento;
	else img = city.image;

	return (
		<section className="showcase-wrapper">
			<h1 className="showcase-wrapper__title">{city.cityName}</h1>
			<img src={img} alt={city.cityName} />
			<div>{city.summary}</div>
		</section>
	);
};
