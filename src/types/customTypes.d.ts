declare namespace Express {
  interface Request {
    userId?: string; // Add the custom property 'token' of type 'string' to the Request type
  }
}
