# React Redux training

Welcome to this training course on how to integrate Redux-toolkit together with React functional components. In order to follow along with this tutorial, please select the "start" branch within this repository. In order to make sure the course works as expected. Please make sure your package.json use the same package numbers for React.Js and Redux-toolkit. These are:

1.  "@reduxjs/toolkit": "^1.9.7",
2.  "react": "^18.2.0",

## Following along

The course is seperated in several topics. If you follow along with the explainations, every time you will be asked to put into practise the knowledge we covered. Each exercise is marked witha number. Each exercise will have it's own branch and this readme.md contains the answers for the exercise for that number. However we DO ENCOURAGE you to first try the exercises for a paramount learning experience.

### Let's get started!

#### Exercise 1

src\store\store.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./application/applicationSlice";

export const store = configureStore({
	reducer: {
		application: applicationSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

src\index.tsx

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
```

src\store\application\applicationSlice.ts

```typescript
import { createSlice } from "@reduxjs/toolkit";
import { Mode } from "../../models/Mode";

export const applicationSlice = createSlice({
	name: "application",
	initialState: {
		mode: Mode.ShowCase,
	},
	reducers: {},
});

export const {} = applicationSlice.actions;
export default applicationSlice.reducer;
```

#### Exercise 2

src\store\application\applicationSlice.ts

```typescript
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Mode } from "../../models/Mode";

export const applicationSlice = createSlice({
	name: "application",
	initialState: {
		mode: Mode.ShowCase,
	},
	reducers: {
		setMode: (state, action: PayloadAction<Mode>) => {
			state.mode = action.payload;
		},
	},
});

export const { setMode } = applicationSlice.actions;
export default applicationSlice.reducer;
```

src\components\AddCityButton.tsx

```typescript
import React from "react";
import { Mode } from "../models/Mode";
import { setMode } from "../store/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const AddCityButton: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const mode = useSelector((state: RootState) => state.application.mode);

	const content =
		mode === Mode.ShowCase ? (
			<button className="btn" onClick={() => dispatch(setMode(Mode.Add))}>
				Add city
			</button>
		) : null;
	return <div className="action-bar">{content}</div>;
};
```

src\components\AddCityForm.tsx

```typescript
import React, { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";
import { City } from "../models/City";
import { Mode } from "../models/Mode";
import { NotificationType } from "../models/Notification";
import { setMode } from "../store/application/applicationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

interface FormValues {
	title: string;
	image: string;
	description: string;
}

interface AddCityFormProps {
	cities: City[];
	setCities: React.Dispatch<React.SetStateAction<City[]>>;
	setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
}

const AddCityForm: React.FC<AddCityFormProps> = ({ cities, setCities, setNotification }) => {
	const dispatch = useDispatch<AppDispatch>();

	const [values, setValues] = useState<FormValues>({
		title: "",
		image: "",
		description: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = (values: FormValues): Record<string, string> => {
		const validationSchema = Yup.object().shape({
			title: Yup.string().min(2, "You must at least use 2 characters.").required("You must enter a title."),
		});

		try {
			validationSchema.validateSync(values, { abortEarly: false });
			return {};
		} catch (err) {
			const validationErrors = err as Yup.ValidationError;
			return validationErrors.inner.reduce(
				(errors: Record<string, string>, error: Yup.ValidationError) => ({
					...errors,
					[error.path!]: error.message,
				}),
				{}
			);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			const city: City = {
				cityName: values.title,
				summary: values.description,
				image: values.image,
				id: cities.length + 1,
			};

			setCities([...cities, city]);
			dispatch(setMode(Mode.ShowCase));
			setNotification({ type: "success", text: `${values.title} has been added`, visible: true });
		}
	};

	return (
		<div className="sign-up-form-container">
			<div className="sign-up-form">
				<form onSubmit={handleSubmit}>
					<label htmlFor="title" style={{ display: "block" }}>
						<span className="input-feedback">*</span> Title :
					</label>
					{errors.title && <div className="input-feedback">{errors.title}</div>}
					<input
						id="title"
						name="title"
						placeholder="Enter a title"
						type="text"
						value={values.title}
						onChange={handleChange}
						className={errors.title ? "text-input error" : "text-input"}
						autoFocus={true}
					/>

					<label htmlFor="image" style={{ display: "block" }}>
						Image:
					</label>
					<input
						id="image"
						name="image"
						placeholder="Enter an image"
						type="text"
						value={values.image}
						onChange={handleChange}
						className={"text-input"}
					/>

					<label htmlFor="description" style={{ display: "block" }}>
						Description
					</label>
					<input
						id="description"
						name="description"
						placeholder="Enter your description"
						type="text"
						value={values.description}
						onChange={handleChange}
						className={"text-input"}
					/>
					<div className="button-wrapper">
						<button
							type="button"
							className="btn btn-cancel"
							onClick={() => dispatch(setMode(Mode.ShowCase))}
						>
							Cancel
						</button>

						<button type="submit" className="btn btn-primary teams-submit-button">
							Add city
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCityForm;
```

src\App.tsx

```typescript
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
```

#### Exercise 3

src\store\cities\citiesSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesApiResponse, fetchCities } from "./citiesActions";
import { City } from "../../models/City";

interface CitiesState {
	cities: City[];
	loading: boolean;
	error: string | null;
}

const initialState: CitiesState = {
	cities: [],
	loading: false,
	error: null,
};

export const citiesSlice = createSlice({
	name: "cities",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCities.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCities.fulfilled, (state, action: PayloadAction<CitiesApiResponse>) => {
				state.cities = action.payload.cities;
				state.error = "";
				state.loading = false;
			})
			.addCase(fetchCities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch cities";
			});
	},
});

export const {} = citiesSlice.actions;
export default citiesSlice.reducer;
```

src\store\cities\citiesActions.ts

```typescript
import { createAsyncThunk } from "@reduxjs/toolkit";
import { City } from "../../models/City";

export interface CitiesApiResponse {
	cities: City[];
}

export const fetchCities = createAsyncThunk("cities/fetchCities", async (): Promise<CitiesApiResponse> => {
	const response = await fetch("https://greensocapi.azurewebsites.net/api/Cities");
	const data = (await response.json()) as CitiesApiResponse;
	return data;
});
```

src\store\store.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./application/applicationSlice";
import citiesSlice from "./cities/citiesSlice";

export const store = configureStore({
	reducer: {
		application: applicationSlice,
		cities: citiesSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

src\components\ListComponent.tsx

```typescript
import React from "react";
import ListItemComponent from "./ListItemComponent";
import { City } from "../models/City";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ListComponentProps {
	activeCity: City;
	setActiveCity: React.Dispatch<React.SetStateAction<City>>;
}

export const ListComponent: React.FC<ListComponentProps> = ({ activeCity, setActiveCity }) => {
	const { cities } = useSelector((state: RootState) => state.cities);

	const citiesListItemArray = cities.map((city: City) => (
		<ListItemComponent city={city} key={city.id} setActiveCity={setActiveCity} activeCity={activeCity} />
	));

	return <ul>{citiesListItemArray}</ul>;
};
```

src\components\AddCityForm.tsx

```typescript
import React, { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";
import { City } from "../models/City";
import { Mode } from "../models/Mode";
import { NotificationType } from "../models/Notification";
import { setMode } from "../store/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

interface FormValues {
	title: string;
	image: string;
	description: string;
}

interface AddCityFormProps {
	setCities: React.Dispatch<React.SetStateAction<City[]>>;
	setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
}

const AddCityForm: React.FC<AddCityFormProps> = ({ setCities, setNotification }) => {
	const dispatch = useDispatch<AppDispatch>();
	const cities = useSelector((state: RootState) => state.cities.cities);

	const [values, setValues] = useState<FormValues>({
		title: "",
		image: "",
		description: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = (values: FormValues): Record<string, string> => {
		const validationSchema = Yup.object().shape({
			title: Yup.string().min(2, "You must at least use 2 characters.").required("You must enter a title."),
		});

		try {
			validationSchema.validateSync(values, { abortEarly: false });
			return {};
		} catch (err) {
			const validationErrors = err as Yup.ValidationError;
			return validationErrors.inner.reduce(
				(errors: Record<string, string>, error: Yup.ValidationError) => ({
					...errors,
					[error.path!]: error.message,
				}),
				{}
			);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			const city: City = {
				cityName: values.title,
				summary: values.description,
				image: values.image,
				id: cities.length + 1,
			};

			setCities([...cities, city]);
			dispatch(setMode(Mode.ShowCase));
			setNotification({ type: "success", text: `${values.title} has been added`, visible: true });
		}
	};

	return (
		<div className="sign-up-form-container">
			<div className="sign-up-form">
				<form onSubmit={handleSubmit}>
					<label htmlFor="title" style={{ display: "block" }}>
						<span className="input-feedback">*</span> Title :
					</label>
					{errors.title && <div className="input-feedback">{errors.title}</div>}
					<input
						id="title"
						name="title"
						placeholder="Enter a title"
						type="text"
						value={values.title}
						onChange={handleChange}
						className={errors.title ? "text-input error" : "text-input"}
						autoFocus={true}
					/>

					<label htmlFor="image" style={{ display: "block" }}>
						Image:
					</label>
					<input
						id="image"
						name="image"
						placeholder="Enter an image"
						type="text"
						value={values.image}
						onChange={handleChange}
						className={"text-input"}
					/>

					<label htmlFor="description" style={{ display: "block" }}>
						Description
					</label>
					<input
						id="description"
						name="description"
						placeholder="Enter your description"
						type="text"
						value={values.description}
						onChange={handleChange}
						className={"text-input"}
					/>
					<div className="button-wrapper">
						<button
							type="button"
							className="btn btn-cancel"
							onClick={() => dispatch(setMode(Mode.ShowCase))}
						>
							Cancel
						</button>

						<button type="submit" className="btn btn-primary teams-submit-button">
							Add city
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCityForm;
```

src\App.tsx

```typescript
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
	const [activeCity, setActiveCity] = useState<City>({} as City);
	const [cities, setCities] = useState<City[]>([]);
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
						<ListComponent activeCity={activeCity} setActiveCity={setActiveCity} />
					</nav>
					<ShowcaseComponent activeCity={activeCity} />
				</React.Fragment>
			)}

			{mode === Mode.Add && (
				<div>
					<AddCityForm setCities={setCities} setNotification={setNotification} />
				</div>
			)}
		</div>
	);
}

export default App;
```

#### Exercise 4

src\store\cities\citiesSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesApiResponse, fetchCities } from "./citiesActions";
import { City } from "../../models/City";

interface CitiesState {
	cities: City[];
	loading: boolean;
	error: string | null;
}

const initialState: CitiesState = {
	cities: [],
	loading: false,
	error: null,
};

export const citiesSlice = createSlice({
	name: "cities",
	initialState,
	reducers: {
		addCity: (state, action: PayloadAction<City>) => {
			state.cities.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCities.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCities.fulfilled, (state, action: PayloadAction<CitiesApiResponse>) => {
				state.cities = action.payload.cities;
				state.error = "";
				state.loading = false;
			})
			.addCase(fetchCities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch cities";
			});
	},
});

export const { addCity } = citiesSlice.actions;
export default citiesSlice.reducer;
```

src\components\AddCityForm.tsx

```typescript
import React, { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";
import { City } from "../models/City";
import { Mode } from "../models/Mode";
import { NotificationType } from "../models/Notification";
import { setMode } from "../store/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addCity } from "../store/cities/citiesSlice";

interface FormValues {
	title: string;
	image: string;
	description: string;
}

interface AddCityFormProps {
	setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
}

const AddCityForm: React.FC<AddCityFormProps> = ({ setNotification }) => {
	const dispatch = useDispatch<AppDispatch>();
	const cities = useSelector((state: RootState) => state.cities.cities);

	const [values, setValues] = useState<FormValues>({
		title: "",
		image: "",
		description: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = (values: FormValues): Record<string, string> => {
		const validationSchema = Yup.object().shape({
			title: Yup.string().min(2, "You must at least use 2 characters.").required("You must enter a title."),
		});

		try {
			validationSchema.validateSync(values, { abortEarly: false });
			return {};
		} catch (err) {
			const validationErrors = err as Yup.ValidationError;
			return validationErrors.inner.reduce(
				(errors: Record<string, string>, error: Yup.ValidationError) => ({
					...errors,
					[error.path!]: error.message,
				}),
				{}
			);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			const city: City = {
				cityName: values.title,
				summary: values.description,
				image: values.image,
				id: cities.length + 1,
			};

			dispatch(addCity(city));
			dispatch(setMode(Mode.ShowCase));
			setNotification({ type: "success", text: `${values.title} has been added`, visible: true });
		}
	};

	return (
		<div className="sign-up-form-container">
			<div className="sign-up-form">
				<form onSubmit={handleSubmit}>
					<label htmlFor="title" style={{ display: "block" }}>
						<span className="input-feedback">*</span> Title :
					</label>
					{errors.title && <div className="input-feedback">{errors.title}</div>}
					<input
						id="title"
						name="title"
						placeholder="Enter a title"
						type="text"
						value={values.title}
						onChange={handleChange}
						className={errors.title ? "text-input error" : "text-input"}
						autoFocus={true}
					/>

					<label htmlFor="image" style={{ display: "block" }}>
						Image:
					</label>
					<input
						id="image"
						name="image"
						placeholder="Enter an image"
						type="text"
						value={values.image}
						onChange={handleChange}
						className={"text-input"}
					/>

					<label htmlFor="description" style={{ display: "block" }}>
						Description
					</label>
					<input
						id="description"
						name="description"
						placeholder="Enter your description"
						type="text"
						value={values.description}
						onChange={handleChange}
						className={"text-input"}
					/>
					<div className="button-wrapper">
						<button
							type="button"
							className="btn btn-cancel"
							onClick={() => dispatch(setMode(Mode.ShowCase))}
						>
							Cancel
						</button>

						<button type="submit" className="btn btn-primary teams-submit-button">
							Add city
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCityForm;
```

src\App.tsx

```typescript
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
	const [activeCity, setActiveCity] = useState<City>({} as City);
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
						<ListComponent activeCity={activeCity} setActiveCity={setActiveCity} />
					</nav>
					<ShowcaseComponent activeCity={activeCity} />
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
```

#### Exercise 5

src\store\cities\citiesSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesApiResponse, fetchCities } from "./citiesActions";
import { City } from "../../models/City";

interface CitiesState {
	cities: City[];
	loading: boolean;
	error: string | null;
	activeCity: City;
}

const initialState: CitiesState = {
	cities: [],
	loading: false,
	error: null,
	activeCity: {} as City,
};

export const citiesSlice = createSlice({
	name: "cities",
	initialState,
	reducers: {
		setActiveCity: (state, action: PayloadAction<City | null>) => {
			state.activeCity = action.payload || ({} as City);
		},
		addCity: (state, action: PayloadAction<City>) => {
			state.cities.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCities.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCities.fulfilled, (state, action: PayloadAction<CitiesApiResponse>) => {
				state.cities = action.payload.cities;
				state.error = "";
				state.activeCity = action.payload.cities[0];
				state.loading = false;
			})
			.addCase(fetchCities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch cities";
			});
	},
});

export const { addCity, setActiveCity } = citiesSlice.actions;
export default citiesSlice.reducer;
```

src\components\ShowcaseComponent.tsx

```typescript
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
```

src\components\ListItemComponent.tsx

```typescript
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
```

src\components\ListComponent.tsx

```typescript
import React from "react";
import ListItemComponent from "./ListItemComponent";
import { City } from "../models/City";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ListComponent: React.FC = () => {
	const { cities } = useSelector((state: RootState) => state.cities);

	const citiesListItemArray = cities.map((city: City) => <ListItemComponent city={city} key={city.id} />);

	return <ul>{citiesListItemArray}</ul>;
};
```

src\App.tsx

```typescript
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
```

#### Exercise 6

src\store\notifications\notificationSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
	type: string | null;
	text: string | null;
	visible: boolean;
}

const initialState: NotificationState = {
	type: null,
	text: null,
	visible: false,
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification: (state, action: PayloadAction<{ type: string; text: string }>) => {
			state.type = action.payload.type;
			state.text = action.payload.text;
			state.visible = true;
		},
		hideNotification: (state) => {
			state.visible = false;
			state.type = null;
			state.text = null;
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
```

src\store\store.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./application/applicationSlice";
import citiesSlice from "./cities/citiesSlice";
import notificationSlice from "./notifications/notificationSlice";

export const store = configureStore({
	reducer: {
		application: applicationSlice,
		cities: citiesSlice,
		notifications: notificationSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

src\components\AddCityForm.tsx

```typescript
import React, { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";
import { City } from "../models/City";
import { Mode } from "../models/Mode";
import { setMode } from "../store/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addCity } from "../store/cities/citiesSlice";
import { showNotification } from "../store/notifications/notificationSlice";

interface FormValues {
	title: string;
	image: string;
	description: string;
}

const AddCityForm: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const cities = useSelector((state: RootState) => state.cities.cities);

	const [values, setValues] = useState<FormValues>({
		title: "",
		image: "",
		description: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = (values: FormValues): Record<string, string> => {
		const validationSchema = Yup.object().shape({
			title: Yup.string().min(2, "You must at least use 2 characters.").required("You must enter a title."),
		});

		try {
			validationSchema.validateSync(values, { abortEarly: false });
			return {};
		} catch (err) {
			const validationErrors = err as Yup.ValidationError;
			return validationErrors.inner.reduce(
				(errors: Record<string, string>, error: Yup.ValidationError) => ({
					...errors,
					[error.path!]: error.message,
				}),
				{}
			);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			const city: City = {
				cityName: values.title,
				summary: values.description,
				image: values.image,
				id: cities.length + 1,
			};

			dispatch(addCity(city));
			dispatch(setMode(Mode.ShowCase));
			dispatch(showNotification({ type: "success", text: `${values.title} has been added` }));
		}
	};

	return (
		<div className="sign-up-form-container">
			<div className="sign-up-form">
				<form onSubmit={handleSubmit}>
					<label htmlFor="title" style={{ display: "block" }}>
						<span className="input-feedback">*</span> Title :
					</label>
					{errors.title && <div className="input-feedback">{errors.title}</div>}
					<input
						id="title"
						name="title"
						placeholder="Enter a title"
						type="text"
						value={values.title}
						onChange={handleChange}
						className={errors.title ? "text-input error" : "text-input"}
						autoFocus={true}
					/>

					<label htmlFor="image" style={{ display: "block" }}>
						Image:
					</label>
					<input
						id="image"
						name="image"
						placeholder="Enter an image"
						type="text"
						value={values.image}
						onChange={handleChange}
						className={"text-input"}
					/>

					<label htmlFor="description" style={{ display: "block" }}>
						Description
					</label>
					<input
						id="description"
						name="description"
						placeholder="Enter your description"
						type="text"
						value={values.description}
						onChange={handleChange}
						className={"text-input"}
					/>
					<div className="button-wrapper">
						<button
							type="button"
							className="btn btn-cancel"
							onClick={() => dispatch(setMode(Mode.ShowCase))}
						>
							Cancel
						</button>

						<button type="submit" className="btn btn-primary teams-submit-button">
							Add city
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCityForm;
```

src\store\notifications\notificationSlice.ts

```typescript
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { hideNotification } from "../store/notifications/notificationSlice";

export const NotificationComponent: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const notification = useSelector((state: RootState) => state.notifications);

	return (
		<div>
			{notification.visible && (
				<div className={notification.visible ? "notification-wrapper success" : "notification-wrapper failure"}>
					<span>{notification.text}</span>
					<div onClick={() => dispatch(hideNotification())}>X</div>
				</div>
			)}
		</div>
	);
};
```

src\App.tsx

```typescript
import { useEffect } from "react";
import { ShowcaseComponent } from "./components/ShowcaseComponent";
import { ListComponent } from "./components/ListComponent";
import { AddCityButton } from "./components/AddCityButton";
import React from "react";
import { Mode } from "./models/Mode";
import AddCityForm from "./components/AddCityForm";

import { NotificationComponent } from "./components/NotificationComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchCities } from "./store/cities/citiesActions";

function App() {
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
```
