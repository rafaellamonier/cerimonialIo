declare namespace Express {
  export interface Request {
    user: {
      id: string
      sequence_id: number
      name: string
      email: string
    }
  }
}