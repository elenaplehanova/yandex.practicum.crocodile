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
  login: string
  email: string
  phone: string
  avatar: string
}

const PROTOCOL_HTTPS = 'https://'
const DOMAIN = 'ya-praktikum.tech'
const API_BASE_URL = `${PROTOCOL_HTTPS}${DOMAIN}/api`
const API_VERSION = 'v2'

const API_URL = `${API_BASE_URL}/${API_VERSION}`
const AUTH_URL = '/auth'
const OAUTH_URL = '/oauth/yandex'

const authApi = createApi({
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
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetYandexServiceIdQuery,
  useSignInWithYandexIdMutation,
  useGetUserQuery,
} = authApi

export default authApi
