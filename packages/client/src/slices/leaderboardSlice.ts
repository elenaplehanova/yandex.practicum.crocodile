import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LeaderboardData } from '@apis/leaderboardApi'
import {
  saveGameResultsThunk,
  fetchLeaderboardThunk,
} from './leaderboardThunks'

export interface LeaderboardState {
  data: LeaderboardData[]
  isLoading: boolean
  error: string | null
}

const initialState: LeaderboardState = {
  data: [],
  isLoading: false,
  error: null,
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboardData: (state, action: PayloadAction<LeaderboardData[]>) => {
      state.data = action.payload
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveGameResultsThunk.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(saveGameResultsThunk.fulfilled, state => {
        state.isLoading = false
        state.error = null
      })
      .addCase(saveGameResultsThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          action.error.message || 'Ошибка при сохранении результатов'
      })
      .addCase(fetchLeaderboardThunk.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchLeaderboardThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchLeaderboardThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Ошибка при загрузке лидерборда'
      })
  },
})

export const { setLeaderboardData, setLoading, setError, clearError } =
  leaderboardSlice.actions

export const selectLeaderboard = (state: any) => state.leaderboard
export const selectLeaderboardData = (state: any) => state.leaderboard.data
export const selectLeaderboardLoading = (state: any) =>
  state.leaderboard.isLoading
export const selectLeaderboardError = (state: any) => state.leaderboard.error

export default leaderboardSlice.reducer
