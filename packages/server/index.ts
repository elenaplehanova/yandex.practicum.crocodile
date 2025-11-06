import dotenv from 'dotenv'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { authMiddleware } from './middlewares/authMiddleware'
import emojiRoutes from './routes/emojiRoutes'

dotenv.config()

const PORT = Number(process.env.SERVER_PORT) || 3001
const openRoutes = [
  '/api/v2/auth/signin',
  '/api/v2/auth/signup',
  '/api/v2/oauth/yandex/service-id',
  '/api/v2/emoji/comment',
]

const app = express()
app.use(cors())
app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  if (openRoutes.some(path => req.path.startsWith(path))) {
    return next()
  }

  return authMiddleware(req, res, next)
})

app.use('/api/v2/emoji', emojiRoutes)

app.use(
  '/api/v2',
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    target: 'https://ya-praktikum.tech/api/v2',
  })
)

app.get('/friends', (_, res) => {
  res.json([
    { name: 'Саша', secondName: 'Панов' },
    { name: 'Лёша', secondName: 'Садовников' },
    { name: 'Серёжа', secondName: 'Иванов' },
  ])
})

app.get('/api', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(PORT, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
})
