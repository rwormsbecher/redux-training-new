import React from "react";
import { City } from "../models/City";
import { Mode } from "../models/Mode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setMode } from "../store/application/applicationSlice";

export const AddCityButton: React.FC = () => {
	const dispatch = useDispatch();
	const mode = useSelector((state: RootState) => state.application.mode);
	const content =
		mode === Mode.ShowCase ? (
			<button className="btn" onClick={() => dispatch(setMode(Mode.Add))}>
				Add city
			</button>
		) : null;
	return <div className="action-bar">{content}</div>;
};
