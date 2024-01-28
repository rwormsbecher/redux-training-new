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
