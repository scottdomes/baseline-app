import { Notifications } from "expo";

const REPEAT_EVERY_X_HOURS = 6;

class NotificationResource {
  schedule() {
    const hour = 3600000;
    Notifications.cancelAllScheduledNotificationsAsync();
    for (let i = 1; i < 7; i++) {
      const hoursFromNow = REPEAT_EVERY_X_HOURS * i;
      Notifications.scheduleLocalNotificationAsync(
        {
          title: "Record your current happiness",
          body: "How's everything going? Take a moment to check in now.",
          android: {
            priority: "high"
          }
        },
        { time: new Date().getTime() + hoursFromNow * hour }
      );
    }
  }
}

const resource = new NotificationResource();
export default resource;
