import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PlayedWord = {
  word: string
  guessed: boolean
}

interface GameState {
  timeLeft: number
  isShowResults: boolean
  playedWords: PlayedWord[]
}

const initialState: GameState = {
  timeLeft: 60,
  isShowResults: false,
  playedWords: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload
    },
    decrementTime: state => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1
      }
    },
    setShowResults: (state, action: PayloadAction<boolean>) => {
      state.isShowResults = action.payload
    },
    addPlayedWord: (state, action: PayloadAction<PlayedWord>) => {
      state.playedWords.push(action.payload)
    },
    resetGame: () => initialState,
  },
})

export const {
  setTimeLeft,
  decrementTime,
  setShowResults,
  addPlayedWord,
  resetGame,
} = gameSlice.actions

export default gameSlice.reducer
