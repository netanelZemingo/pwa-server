import dotenv from "dotenv";
dotenv.config();
export const config = {
  vapidPublicKey: process.env.VAPID_PUBLIC,
  vapidPrivateKey: process.env.VAPID_PRIVATE,
} as const;
