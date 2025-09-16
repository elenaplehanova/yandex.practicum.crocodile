import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRandomWord, getNextWord } from '../constants/gameWords'
import { GameState, GameStatus } from '../types/game'

export type PlayedWord = {
  word: string
  guessed: boolean
}

type ExtendedGameStatus = GameStatus & {
  timeLeft: number
  isShowResults: boolean
  playedWords: PlayedWord[]
}

const initialState: ExtendedGameStatus = {
  currentWord: '',
  isWordRevealed: false,
  inputWord: '',
  errorMessage: '',
  isCorrect: null,
  gameState: 'waiting',
  isFullscreen: false,
  timeLeft: 60,
  isShowResults: false,
  playedWords: [],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // dev branch timer/results
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
      state.timeLeft = 60
      state.isShowResults = false
      state.playedWords = []
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
  setTimeLeft,
  decrementTime,
  setShowResults,
  addPlayedWord,
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
