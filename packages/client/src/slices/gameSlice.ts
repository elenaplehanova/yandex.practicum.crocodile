import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRandomWord, getNextWord } from '../constants/gameWords'
import { GameState, GameStateType, GameStatus } from '../types/game'

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
  gameState: GameState.Waiting,
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
      state.gameState = GameState.Waiting
      state.isFullscreen = false
    },
    toggleWord: state => {
      if (state.gameState === GameState.Waiting) {
        state.isWordRevealed = true
        state.gameState = GameState.Ready
      } else if (state.gameState === GameState.Ready) {
        state.gameState = GameState.Playing
      } else if (state.gameState === GameState.Playing) {
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

      if (state.gameState !== GameState.Playing || state.isWordRevealed) {
        state.errorMessage = 'Дождитесь начала игры'
        state.isCorrect = false
        return
      }

      const isWordCorrect =
        state.inputWord.trim().toLowerCase() === state.currentWord.toLowerCase()

      if (isWordCorrect) {
        state.isCorrect = true
        state.errorMessage = 'Правильно! Показывайте следующее слово'
        state.inputWord = ''
      } else {
        state.isCorrect = false
        state.errorMessage = 'Неправильное слово'
      }
    },

    nextWord: state => {
      state.currentWord = getNextWord(state.currentWord)
    },

    startNewGame: state => {
      state.currentWord = getRandomWord()
      state.isWordRevealed = false
      state.inputWord = ''
      state.errorMessage = ''
      state.isCorrect = null
      state.gameState = GameState.Waiting
      state.isFullscreen = false
      state.isShowResults = false
      state.playedWords = []
      state.timeLeft = 60
    },

    clearError: state => {
      state.errorMessage = ''
      state.isCorrect = null
    },

    finishGame: state => {
      state.isWordRevealed = false
      state.inputWord = ''
      state.isCorrect = null
      state.gameState = GameState.Finished
    },

    setGameState: (state, action: PayloadAction<GameStateType>) => {
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
