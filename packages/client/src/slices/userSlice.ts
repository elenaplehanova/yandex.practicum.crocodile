import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { API_URL, SERVER_HOST } from '../constants'

interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface UserState {
  data: User | null
  isLoading: boolean
}

const initialState: UserState = {
  data: null,
  isLoading: false,
}

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUserThunk',
  async () => {
    const response = await fetch(`${SERVER_HOST}/user`)

    if (!response.ok) {
      throw new Error('Ошибка при получении данных пользователя')
    }

    const userData = await response.json()

    return userData
  }
)

export const logoutThunk = createAsyncThunk('user/logoutThunk', async () => {
  const url = `${API_URL}/auth/logout`
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Ошибка при выходе из системы')
  }

  return null
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserPartially: (state, { payload }: PayloadAction<Partial<User>>) => {
      if (state.data) {
        state.data = { ...state.data, ...payload }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserThunk.pending.type, state => {
        state.data = null
        state.isLoading = true
      })
      .addCase(
        fetchUserThunk.fulfilled.type,
        (state, { payload }: PayloadAction<User>) => {
          state.data = payload
          state.isLoading = false
        }
      )
      .addCase(fetchUserThunk.rejected.type, (state, action) => {
        state.isLoading = false
      })
      .addCase(logoutThunk.pending.type, state => {
        state.isLoading = true
      })
      .addCase(logoutThunk.fulfilled.type, state => {
        state.data = null
        state.isLoading = false
      })
      .addCase(logoutThunk.rejected.type, (state, action) => {
        state.isLoading = false
      })
  },
})

export const selectUser = (state: RootState) => state.user.data

export const { updateUserPartially } = userSlice.actions

export default userSlice.reducer
