import { useState } from "react";
import { ShowcaseComponent } from "./components/ShowcaseComponent";
import { City } from "./City";
import { ListComponent } from "./components/ListComponent";
import citiesJson from "./cities.json";
import { AddCityButton } from "./components/AddCityButton";
import React from "react";

function App() {
	const [activeCity, setActiveCity] = useState(citiesJson.cities[0]);
	const [mode, setMode] = useState("showcase");

	const handleActiveCity = (city: City) => {
		setActiveCity(city);
	};

	const handleMode = (mode: string) => {
		setMode(mode);
	};

	return (
		<div className="App">
			{mode === "showcase" && (
				<React.Fragment>
					<AddCityButton mode={mode} handleMode={handleMode} />
					<nav>
						<ListComponent
							selectCity={handleActiveCity}
							activeCity={activeCity}
							cities={citiesJson.cities}
						/>
					</nav>
					<ShowcaseComponent city={activeCity} />
				</React.Fragment>
			)}

			{mode === "Add" && <div>hallo</div>}
		</div>
	);
}

export default App;
