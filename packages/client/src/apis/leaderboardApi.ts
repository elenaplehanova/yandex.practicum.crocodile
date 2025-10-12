import { ErrorResponse } from '@apis/authApi'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants'

interface LeaderboardData {
  name: string
  count: number
  firstGuessWins: number
}

interface LeaderboardSubmitPayload {
  data: LeaderboardData
  ratingFieldName: string
}

interface LeaderboardFetchPayload {
  ratingFieldName: string
  cursor: number
  limit: number
}

interface LeaderboardResponse {
  data: LeaderboardData[]
  [x: string]: any
}

const leaderboardApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    fetchFn: typeof window !== 'undefined' ? fetch : undefined,
    responseHandler: async response => {
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await response.json()
      }
      return await response.text()
    },
  }),
  endpoints: builder => ({
    submitLeaderboard: builder.mutation<
      ErrorResponse | null,
      LeaderboardSubmitPayload
    >({
      query: body => ({
        url: '/leaderboard',
        method: 'POST',
        body,
      }),
    }),
    fetchLeaderboard: builder.mutation<
      LeaderboardResponse,
      LeaderboardFetchPayload
    >({
      query: body => ({
        url: '/leaderboard/all',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSubmitLeaderboardMutation, useFetchLeaderboardMutation } =
  leaderboardApi

export type {
  LeaderboardData,
  LeaderboardSubmitPayload,
  LeaderboardFetchPayload,
  LeaderboardResponse,
}

export default leaderboardApi
