import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { hideNotification } from "../store/notifications/notificationSlice";

export const NotificationComponent = () => {
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
