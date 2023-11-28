import useNotificationStore from "../store/notifications/notificationStore";

export const NotificationComponent = () => {
	const { visible, text, hideNotification } = useNotificationStore();

	return (
		<div>
			{visible && (
				<div className={visible ? "notification-wrapper success" : "notification-wrapper failure"}>
					<span>{text}</span>
					<div onClick={() => hideNotification()}>X</div>
				</div>
			)}
		</div>
	);
};
