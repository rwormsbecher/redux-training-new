import React from "react";
import { City } from "../City";

interface AddCityButtonProps {
	mode: string;
	handleMode: (mode: string) => void;
}

export const AddCityButton: React.FC<AddCityButtonProps> = ({ mode, handleMode }) => {
	const content =
		mode === "showcase" ? (
			<button className="btn" onClick={() => handleMode("Add")}>
				Add city
			</button>
		) : null;
	return <div className="action-bar">{content}</div>;
};
