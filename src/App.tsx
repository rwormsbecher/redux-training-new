import { useEffect, useState } from "react";
import { ShowcaseComponent } from "./components/ShowcaseComponent";
import { ListComponent } from "./components/ListComponent";
import { AddCityButton } from "./components/AddCityButton";
import React from "react";
import { Mode } from "./models/Mode";
import { City } from "./models/City";
import AddCityForm from "./components/AddCityForm";
import { NotificationType } from "./models/Notification";
import { NotificationComponent } from "./components/NotificationComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchCities } from "./store/cities/citiesActions";

function App() {
	const [notification, setNotification] = useState<NotificationType>({} as NotificationType);
	const dispatch = useDispatch<AppDispatch>();
	const mode = useSelector((state: RootState) => state.application.mode);
	const { loading, error } = useSelector((state: RootState) => state.cities);

	useEffect(() => {
		dispatch(fetchCities());
	}, [dispatch]);

	if (loading) return <div className="App">Loading...</div>;
	if (error) return <div className="App">Error: {error}</div>;

	return (
		<div className="App">
			<NotificationComponent setNotification={setNotification} notification={notification} />
			{mode === Mode.ShowCase && (
				<React.Fragment>
					<AddCityButton />
					<nav>
						<ListComponent />
					</nav>
					<ShowcaseComponent />
				</React.Fragment>
			)}

			{mode === Mode.Add && (
				<div>
					<AddCityForm setNotification={setNotification} />
				</div>
			)}
		</div>
	);
}

export default App;
