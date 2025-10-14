import leaderboardApi, {
  LeaderboardData,
  LeaderboardSubmitPayload,
} from '@apis/leaderboardApi'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SERVER_HOST } from '../constants'
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
      name: `${user.first_name} ${user.second_name}`,
      count: guessedWordsCount,
      firstGuessWins: firstGuessWinsCount,
    }

    const payload: LeaderboardSubmitPayload = {
      data: leaderboardData,
      ratingFieldName: 'count',
    }

    try {
      const result = await dispatch(
        leaderboardApi.endpoints.submitLeaderboard.initiate(payload)
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
  async () => {
    const response = await fetch(`${SERVER_HOST}/leaderboard`)

    if (!response.ok) {
      throw new Error('Ошибка при загрузке лидерборда')
    }

    const leaderboardData = await response.json()

    return leaderboardData
  }
)
