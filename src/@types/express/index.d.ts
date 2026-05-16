declare namespace Express {
  export interface Request {
    user: {
      id: string
      sequence_id: number
      name: string
      email: string
    },

    wedding: {
      id: string
      couple_name: string
      wedding_date: Date
      budget: number
    }
  }
}