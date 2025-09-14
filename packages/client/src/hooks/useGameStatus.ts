import { useCallback } from 'react'
import { useDispatch, useSelector } from '../store'
import {
  initGame,
  toggleWord,
  setInputWord,
  checkWord,
  nextWord,
  resetGame,
  startNewGame,
  clearError,
  finishGame,
  selectGame,
  selectCurrentWord,
  selectGameState,
  selectIsWordRevealed,
  selectInputWord,
  selectErrorMessage,
  selectIsCorrect,
} from '../slices/gameSlice'
import { GameActions } from '../types/game'

export const useGameStatus = () => {
  const dispatch = useDispatch()

  const game = useSelector(selectGame)
  const currentWord = useSelector(selectCurrentWord)
  const gameState = useSelector(selectGameState)
  const isWordRevealed = useSelector(selectIsWordRevealed)
  const inputWord = useSelector(selectInputWord)
  const errorMessage = useSelector(selectErrorMessage)
  const isCorrect = useSelector(selectIsCorrect)

  const onInitGame = useCallback(() => {
    dispatch(initGame())
  }, [dispatch])

  const onToggleWord = useCallback(() => {
    dispatch(toggleWord())
  }, [dispatch])

  const onInputChange = useCallback(
    (value: string) => {
      dispatch(setInputWord(value))
    },
    [dispatch]
  )

  const onCheckWord = useCallback(() => {
    dispatch(checkWord())
  }, [dispatch])

  const onNextWord = useCallback(() => {
    dispatch(nextWord())
  }, [dispatch])

  const onReset = useCallback(() => {
    dispatch(resetGame())
  }, [dispatch])

  const onStartNewGame = useCallback(() => {
    dispatch(startNewGame())
  }, [dispatch])

  const onClearError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  const onFinishGame = useCallback(() => {
    dispatch(finishGame())
  }, [dispatch])

  const isInputDisabled = !(gameState === 'playing' && !isWordRevealed)

  return {
    currentWord,
    gameState,
    isWordRevealed,
    inputWord,
    errorMessage,
    isCorrect,
    isInputDisabled,

    onInitGame,
    onToggleWord,
    onInputChange,
    onCheckWord,
    onNextWord,
    onReset,
    onStartNewGame,
    onClearError,
    onFinishGame,
  }
}
