import type { Request, Response, NextFunction } from 'express'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers['cookie']

  if (!cookie) {
    return res.status(401).json({ message: 'Нет cookies' })
  }

  next()
  return
}
