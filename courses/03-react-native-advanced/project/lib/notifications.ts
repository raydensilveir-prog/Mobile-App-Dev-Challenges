import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const sendLocalNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello!",
      body: "This is a local push notification.",
    },
    trigger: null,
  });
};