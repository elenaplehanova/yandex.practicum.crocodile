import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/user', async (_, res) => {
  res.json({
    id: 4922,
    first_name: 'Axel',
    second_name: 'Dizman',
    display_name: 'Dizman',
    login: 'dizman123',
    avatar:
      '/074b09eb-0859-4162-8778-b380c53e4cb3/c0b95fa6-c40b-4968-9254-be4a62a54fc1_unnamed.jpg',
    email: 'axeldizman122@yandex.ru',
    phone: '+79005555555',
  })

  // TODO: реализовать получение пользователя из после настройки cookies
  //
  // try {
  //   const { data } = await axios.get(
  //     'https://ya-praktikum.tech/api/v2/auth/user',
  //     {
  //       withCredentials: true,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //   return res.json(data)
  // } catch (error) {
  //   console.error(error)
  //   return res.status(500).json({ error: 'Server error' })
  // }
})

app.get('/leaderboard', (_, res) => {
  res.json([
    { name: 'Axel Dizman', count: 10, firstGuessWins: 5 },
    { name: 'Ivan Ivanov', count: 8, firstGuessWins: 3 },
    { name: 'Petr Petrov', count: 6, firstGuessWins: 2 },
  ])

  // TODO: реализовать получение leaderboard после настройки cookies
  // вынес код из fetchLeaderboardThunk
  // const payload = {
  //     ratingFieldName: 'count',
  //     cursor: 0,
  //     limit: 10,
  //   }

  //   try {
  //     const result = await dispatch(
  //       api.endpoints.fetchLeaderboard.initiate(payload)
  //     )

  //     if ('data' in result && result.data) {
  //       const extractedData = result.data
  //         .map((item: any) => item.data)
  //         .filter(Boolean)
  //       return extractedData
  //     } else if ('error' in result && result.error) {
  //       throw new Error(`Ошибка RTK Query: ${result.error}`)
  //     }
  //   } catch (rtkError) {
  //     const response = await fetch(
  //       'https://ya-praktikum.tech/api/v2/leaderboard/all',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include',
  //         body: JSON.stringify(payload),
  //       }
  //     )

  //     if (!response.ok) {
  //       throw new Error(`Ошибка при загрузке лидерборда: ${response.status}`)
  //     }

  //     const data = await response.json()

  //     if (data && data.data) {
  //       if (
  //         Array.isArray(data.data) &&
  //         data.data.length > 0 &&
  //         data.data[0].data
  //       ) {
  //         const extractedData = data.data
  //           .map((item: any) => item.data)
  //           .filter(Boolean)
  //         return extractedData
  //       } else {
  //         return data.data
  //       }
  //     } else {
  //       return []
  //     }
  //   }
  // }
})

app.get('/friends', (_, res) => {
  res.json([
    { name: 'Саша', secondName: 'Панов' },
    { name: 'Лёша', secondName: 'Садовников' },
    { name: 'Серёжа', secondName: 'Иванов' },
  ])
})

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
