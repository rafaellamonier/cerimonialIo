import {
  Request,
  Response,
  NextFunction
} from "express";
import { ZodError } from "zod";

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
    })
  }

  console.log(error)

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  })
}