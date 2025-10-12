import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants'

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

interface ServiceIdResponse {
  service_id: string
}

interface OAuthRequestPayload {
  code: string
  redirect_uri: string
}

interface UserResponse {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

const AUTH_URL = '/auth'
const OAUTH_URL = '/oauth/yandex'

const authApi = createApi({
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
    getYandexServiceId: builder.query<ServiceIdResponse, void>({
      query: () => ({
        url: `${OAUTH_URL}/service-id`,
        method: 'GET',
      }),
    }),
    signInWithYandexId: builder.mutation<
      ErrorResponse | void,
      OAuthRequestPayload
    >({
      query: body => ({
        url: `${OAUTH_URL}`,
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: `${AUTH_URL}/user`,
        method: 'GET',
      }),
    }),
    logout: builder.mutation<ErrorResponse | null, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetYandexServiceIdQuery,
  useSignInWithYandexIdMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi

export default authApi
