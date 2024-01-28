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
