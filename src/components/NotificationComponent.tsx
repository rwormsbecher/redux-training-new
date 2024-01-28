import React from "react";
import { NotificationType } from "../models/Notification";

interface NotificationComponentProps {
	notification: NotificationType;
	setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
}

export const NotificationComponent: React.FC<NotificationComponentProps> = ({ notification, setNotification }) => {
	return (
		<div>
			{notification.visible && (
				<div className={notification.visible ? "notification-wrapper success" : "notification-wrapper failure"}>
					<span>{notification.text}</span>
					<div onClick={() => setNotification({ type: "success", text: "", visible: false })}>X</div>
				</div>
			)}
		</div>
	);
};
