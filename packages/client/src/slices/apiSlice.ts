import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ErrorResponse {
  reason: string
}

interface SignInPayload {
  login: string
  password: string
}

interface SignUpPayload {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

interface SignUpResponse {
  id: number
}

const PROTOCOL_HTTPS = 'https://'
const DOMAIN = 'ya-praktikum.tech'
const API_BASE_URL = `${PROTOCOL_HTTPS}${DOMAIN}/api`
const API_VERSION = 'v2'

const API_URL = `${API_BASE_URL}/${API_VERSION}`
const AUTH_URL = '/auth'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    responseHandler: async response => {
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await response.json()
      }
      return await response.text()
    },
  }),
  endpoints: builder => ({
    signIn: builder.mutation<ErrorResponse | null, SignInPayload>({
      query: body => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<ErrorResponse | SignUpResponse, SignUpPayload>({
      query: body => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = api
