import React from "react";
import { Mode } from "../models/Mode";

interface AddCityButtonProps {
	mode: Mode;
	setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export const AddCityButton: React.FC<AddCityButtonProps> = ({ mode, setMode }) => {
	const content =
		mode === Mode.ShowCase ? (
			<button className="btn" onClick={() => setMode(Mode.Add)}>
				Add city
			</button>
		) : null;
	return <div className="action-bar">{content}</div>;
};
