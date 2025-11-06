import type { Request, Response, NextFunction } from 'express'
import axios from 'axios'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers['cookie']

  if (!cookie) {
    return res.status(401).json({ message: 'Нет cookies' })
  }

  try {
    const response = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        headers: {
          Cookie: cookie,
        },
      }
    )

    if (response.data?.id) {
      ;(req as any).user = { id: response.data.id }
      ;(req as any).userId = response.data.id
    }
  } catch (error) {
    // Если не удалось получить информацию о пользователе
  }

  next()
  return
}
