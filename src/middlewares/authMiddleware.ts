import {
  Request,
  Response,
  NextFunction
} from "express"
import jwt from "jsonwebtoken"

interface IPayload {
  id: string
  sequence_id: number
  name: string
  email: string
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: "Token missing"
    })
  }

  const [, token] = authHeader.split(" ")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    const { id, sequence_id, name, email } = decoded as IPayload

    req.user = { id, sequence_id, name, email }

    next()
  } catch {
    return res.status(401).json({error: "Invalid token"})
  }
}