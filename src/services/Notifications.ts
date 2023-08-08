import webpush, { PushSubscription } from "web-push";
interface Payload {
  title: string;
  message: string;
}

export class Notifications {
  static sendNotification(pushSubscriptions: PushSubscription[], payload: Payload) {
    for (const subscriber of pushSubscriptions) {
      webpush.sendNotification(subscriber, JSON.stringify(payload));
    }
  }
}
