import React from "react";
import { Mode } from "../models/Mode";
import useApplicationStore from "../store/application/applicationStore";

export const AddCityButton: React.FC = () => {
	const { mode, setMode } = useApplicationStore();
	const content =
		mode === Mode.ShowCase ? (
			<button className="btn" onClick={() => setMode(Mode.Add)}>
				Add city
			</button>
		) : null;
	return <div className="action-bar">{content}</div>;
};
