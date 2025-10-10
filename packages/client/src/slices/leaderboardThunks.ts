import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { LeaderboardData, LeaderboardSubmitPayload, api } from './apiSlice'
import { selectUser, fetchUserThunk } from './userSlice'
import { selectGuessedWordsCount, selectFirstGuessWinsCount } from './gameSlice'

export const saveGameResultsThunk = createAsyncThunk(
  'leaderboard/saveGameResults',
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState
    let user = selectUser(state)

    if (!user) {
      try {
        const result = await dispatch(fetchUserThunk())
        if (result.type === 'user/fetchUserThunk/fulfilled') {
          state = getState() as RootState
          user = selectUser(state)
        }
      } catch (error) {
        // Ошибка при загрузке пользователя
      }
    }

    if (!user) {
      return null
    }

    const guessedWordsCount = selectGuessedWordsCount(state)
    const firstGuessWinsCount = selectFirstGuessWinsCount(state)

    // Не сохраняем результаты, если не было сыграно ни одного слова
    if (guessedWordsCount === 0) {
      return null
    }

    const leaderboardData: LeaderboardData = {
      name: `${user.name} ${user.secondName}`,
      count: guessedWordsCount,
      firstGuessWins: firstGuessWinsCount,
    }

    const payload: LeaderboardSubmitPayload = {
      data: leaderboardData,
      ratingFieldName: 'count',
    }

    try {
      const result = await dispatch(
        api.endpoints.submitLeaderboard.initiate(payload)
      )

      if ('data' in result && result.data) {
        return { success: true, data: leaderboardData }
      } else if ('error' in result && result.error) {
        throw new Error(`Ошибка RTK Query: ${result.error}`)
      }
    } catch (rtkError) {
      const response = await fetch(
        'https://ya-praktikum.tech/api/v2/leaderboard',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error(`Ошибка при сохранении результатов: ${response.status}`)
      }

      const responseData = await response.json()

      return { success: true, data: leaderboardData }
    }
  }
)

export const fetchLeaderboardThunk = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async (_, { dispatch }) => {
    const payload = {
      ratingFieldName: 'count',
      cursor: 0,
      limit: 10,
    }

    try {
      const result = await dispatch(
        api.endpoints.fetchLeaderboard.initiate(payload)
      )

      if ('data' in result && result.data) {
        const extractedData = result.data
          .map((item: any) => item.data)
          .filter(Boolean)
        return extractedData
      } else if ('error' in result && result.error) {
        throw new Error(`Ошибка RTK Query: ${result.error}`)
      }
    } catch (rtkError) {
      const response = await fetch(
        'https://ya-praktikum.tech/api/v2/leaderboard/all',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке лидерборда: ${response.status}`)
      }

      const data = await response.json()

      if (data && data.data) {
        if (
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          data.data[0].data
        ) {
          const extractedData = data.data
            .map((item: any) => item.data)
            .filter(Boolean)
          return extractedData
        } else {
          return data.data
        }
      } else {
        return []
      }
    }
  }
)
