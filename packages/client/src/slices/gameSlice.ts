import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRandomWord, getNextWord } from '../constants/gameWords'
import { GameState, GameStatus } from '../types/game'

const initialState: GameStatus = {
  currentWord: '',
  isWordRevealed: false,
  inputWord: '',
  errorMessage: '',
  isCorrect: null,
  gameState: 'waiting',
  isFullscreen: false,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame: state => {
      state.currentWord = getRandomWord()
      state.isWordRevealed = false
      state.inputWord = ''
      state.errorMessage = ''
      state.isCorrect = null
      state.gameState = 'waiting'
      state.isFullscreen = false
    },
    toggleWord: state => {
      if (state.gameState === 'waiting') {
        state.isWordRevealed = true
        state.gameState = 'ready'
      } else if (state.gameState === 'ready') {
        state.gameState = 'playing'
      } else if (state.gameState === 'playing') {
        state.isWordRevealed = !state.isWordRevealed
      }
      state.errorMessage = ''
      state.isCorrect = null
    },

    setInputWord: (state, action: PayloadAction<string>) => {
      state.inputWord = action.payload
      state.errorMessage = ''
      state.isCorrect = null
    },

    checkWord: state => {
      if (!state.inputWord.trim()) {
        state.errorMessage = 'Введите слово'
        state.isCorrect = false
        return
      }

      if (state.gameState !== 'playing' || state.isWordRevealed) {
        state.errorMessage = 'Дождитесь начала игры'
        state.isCorrect = false
        return
      }

      const isWordCorrect =
        state.inputWord.trim().toLowerCase() === state.currentWord.toLowerCase()

      if (isWordCorrect) {
        state.isCorrect = true
        state.errorMessage = 'Правильно! Игра завершена'
        // Игра завершается через setTimeout в компоненте
      } else {
        state.isCorrect = false
        state.errorMessage = 'Неправильное слово'
      }
    },

    nextWord: state => {
      state.currentWord = getNextWord(state.currentWord)
    },

    resetGame: state => {
      state.currentWord = getRandomWord()
      state.isWordRevealed = false
      state.inputWord = ''
      state.errorMessage = ''
      state.isCorrect = null
      state.gameState = 'waiting'
      state.isFullscreen = false
    },

    startNewGame: state => {
      state.currentWord = getRandomWord()
      state.isWordRevealed = false
      state.inputWord = ''
      state.errorMessage = ''
      state.isCorrect = null
      state.gameState = 'waiting'
      state.isFullscreen = false
    },

    clearError: state => {
      state.errorMessage = ''
      state.isCorrect = null
    },

    finishGame: state => {
      state.isWordRevealed = false
      state.inputWord = ''
      state.isCorrect = null
      state.gameState = 'finished'
    },

    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameState = action.payload
    },

    toggleFullscreen: state => {
      state.isFullscreen = !state.isFullscreen
    },

    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.isFullscreen = action.payload
    },
  },
})

export const {
  initGame,
  toggleWord,
  setInputWord,
  checkWord,
  nextWord,
  resetGame,
  startNewGame,
  clearError,
  finishGame,
  setGameState,
  toggleFullscreen,
  setFullscreen,
} = gameSlice.actions

export const selectGame = (state: any) => state.game
export const selectCurrentWord = (state: any) => state.game.currentWord
export const selectGameState = (state: any) => state.game.gameState
export const selectIsWordRevealed = (state: any) => state.game.isWordRevealed
export const selectInputWord = (state: any) => state.game.inputWord
export const selectErrorMessage = (state: any) => state.game.errorMessage
export const selectIsCorrect = (state: any) => state.game.isCorrect
export const selectIsFullscreen = (state: any) => state.game.isFullscreen

export default gameSlice.reducer
