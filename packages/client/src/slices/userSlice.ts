import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { API_URL } from '../constants'

interface User {
  name: string
  secondName: string
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
    const url = `${API_URL}/auth/user`
    const response = await fetch(url, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Ошибка при получении данных пользователя')
    }

    const userData = await response.json()

    return {
      name: userData.first_name || userData.display_name || '',
      secondName: userData.second_name || '',
    }
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
  reducers: {},
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

export default userSlice.reducer
