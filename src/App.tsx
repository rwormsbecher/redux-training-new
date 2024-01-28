import { useEffect, useState } from "react";
import { ShowcaseComponent } from "./components/ShowcaseComponent";
import { ListComponent } from "./components/ListComponent";
import { AddCityButton } from "./components/AddCityButton";
import React from "react";
import { Mode } from "./models/Mode";
import { CitiesApiResponse } from "./models/CitiesApiResponse";
import { City } from "./models/City";
import AddCityForm from "./components/AddCityForm";
import { NotificationType } from "./models/Notification";
import { NotificationComponent } from "./components/NotificationComponent";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
	const [cities, setCities] = useState<City[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [activeCity, setActiveCity] = useState<City>({} as City);
	const [notification, setNotification] = useState<NotificationType>({} as NotificationType);
	const mode = useSelector((state: RootState) => state.application.mode);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await fetch("https://greensocapi.azurewebsites.net/api/Cities");
				const { cities } = (await response.json()) as CitiesApiResponse;
				setCities(cities);
				setLoading(false);
				setActiveCity(cities[0]);
			} catch (error) {
				return;
			}
		};

		fetchCities();
	}, []);

	if (loading) return <div className="App">Loading...</div>;

	return (
		<div className="App">
			<NotificationComponent setNotification={setNotification} notification={notification} />
			{mode === Mode.ShowCase && (
				<React.Fragment>
					<AddCityButton />
					<nav>
						<ListComponent cities={cities} activeCity={activeCity} setActiveCity={setActiveCity} />
					</nav>
					<ShowcaseComponent activeCity={activeCity} />
				</React.Fragment>
			)}

			{mode === Mode.Add && (
				<div>
					<AddCityForm cities={cities} setCities={setCities} setNotification={setNotification} />
				</div>
			)}
		</div>
	);
}

export default App;
