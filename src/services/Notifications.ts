import webpush, { PushSubscription } from "web-push";
interface Payload {
  title: string;
  message: string;
}

export class Notifications {
  static async sendNotification(pushSubscriptions: PushSubscription[], payload: Payload) {
    for (const subscriber of pushSubscriptions) {
      try {
        await webpush.sendNotification(subscriber, JSON.stringify(payload));
        console.log("Notification sent successfully to subscriber:", subscriber);
      } catch (error) {
        console.error("Error sending notification to subscriber:", subscriber);
        continue;
      }
    }
  }
}
