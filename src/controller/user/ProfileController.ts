import { Request, Response } from "express"

export class ProfileController {
  async handle(
    req: Request,
    res: Response
  ) {
    return res.json({
      message: "Authenticated user",
      user: req.user
    })
  }
}