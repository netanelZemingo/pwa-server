import { Request, Response, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add the custom property 'token' of type 'string' to the Request type
    }
  }
}

// Middleware to extract the bearer token from the Authorization header and add it to the request context
export const 
authenticateToken = (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const userId = authHeader.split(" ")[1]; // Bearer <token>
    req.userId = userId; // Adding the token to the request object
    next();
    return;
  }
  return res.status(401).json({ msg: "Please log in first" });
};
