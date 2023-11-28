import { useEffect } from "react";
import { ShowcaseComponent } from "./components/ShowcaseComponent";
import { ListComponent } from "./components/ListComponent";
import { AddCityButton } from "./components/AddCityButton";
import React from "react";
import AddCityForm from "./components/AddCityForm";
import { Mode } from "./models/Mode";
import { NotificationComponent } from "./components/NotificationComponent";
import useApplicationStore from "./store/application/applicationStore";
import useCitiesStore from "./store/cities/citiesStore";

function App() {
	const { loading, error, fetchCities } = useCitiesStore();
	const { mode } = useApplicationStore();

	useEffect(() => {
		fetchCities();
	}, []);

	if (loading) return <div className="App">Loading...</div>;
	if (error) return <div className="App">Error: {error}</div>;

	return (
		<div className="App">
			<NotificationComponent />
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
					<AddCityForm />
				</div>
			)}
		</div>
	);
}

export default App;
