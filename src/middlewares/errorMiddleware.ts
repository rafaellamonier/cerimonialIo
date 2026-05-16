import {
  NextFunction,
  Request,
  Response
} from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: error.flatten((issue) => issue.message).fieldErrors
    });
  };

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  };

  console.error(error);
  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
};