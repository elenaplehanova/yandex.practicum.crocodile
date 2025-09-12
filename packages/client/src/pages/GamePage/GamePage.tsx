import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePage } from '../../hooks/usePage'
import WordCard from '../../components/WordCard'
import { Button } from '@gravity-ui/uikit'
import { getRandomWord, getNextWord } from '../../constants/gameWords'
import s from './GamePage.module.scss'

export const GamePage = () => {
  usePage({ initPage: initGamePage })

  const navigate = useNavigate()

  const [currentWord, setCurrentWord] = useState<string>('')
  const [isWordRevealed, setIsWordRevealed] = useState<boolean>(false)
  const [inputWord, setInputWord] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Состояния игры
  const [gameState, setGameState] = useState<
    'waiting' | 'ready' | 'playing' | 'finished'
  >('waiting')

  useEffect(() => {
    const initialWord = getRandomWord()
    setCurrentWord(initialWord)
  }, [])

  const handleToggleWord = () => {
    if (gameState === 'waiting') {
      setIsWordRevealed(true)
      setGameState('ready')
    } else if (gameState === 'ready') {
      setGameState('playing')
    } else if (gameState === 'playing') {
      setIsWordRevealed(prev => !prev)
      setGameState('playing')
    }
    setErrorMessage('')
    setIsCorrect(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputWord(value)
    setErrorMessage('')
    setIsCorrect(null)
  }

  const handleCheckWord = () => {
    if (!inputWord.trim()) {
      setErrorMessage('Введите слово')
      setIsCorrect(false)
      return
    }

    if (gameState !== 'playing' || isWordRevealed) {
      setErrorMessage('Дождитесь начала игры')
      setIsCorrect(false)
      return
    }

    const isWordCorrect =
      inputWord.trim().toLowerCase() === currentWord.toLowerCase()

    if (isWordCorrect) {
      setIsCorrect(true)
      setErrorMessage('Правильно! Игра завершена')
      setTimeout(() => {
        // Переходим на экран завершения игры
        setIsWordRevealed(false)
        setInputWord('')
        setIsCorrect(null)
        setGameState('finished')
      }, 1200)
    } else {
      setIsCorrect(false)
      setErrorMessage('Неправильное слово')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheckWord()
    }
  }

  const handleNextWord = () => {
    const nextWord = getNextWord(currentWord)
    setCurrentWord(nextWord)
  }

  const isInputDisabled = !(gameState === 'playing' && !isWordRevealed)

  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (!isInputDisabled) {
      inputRef.current?.focus()
    }
  }, [isInputDisabled])

  return (
    <div className={s['game-page']}>
      <div className={s['game-page__header']}>
        <h1 className={s['game-page__title']}>CROCODILE</h1>
      </div>
      <div className={s['game-page__instructions']}>
        {gameState === 'waiting' && (
          <p>Нажмите на карточку, когда будете готовы показать слово</p>
        )}
        {gameState === 'ready' && (
          <p>
            Изучите слово. Нажмите "Следующее слово" для нового слова или
            нажмите на карточку для начала игры
          </p>
        )}
        {gameState === 'playing' && (
          <>
            <p>Ведущий показывает слово пантомимой</p>
            <p>Нажмите на карточку, чтобы скрыть слово и начать ввод ответов</p>
          </>
        )}
        {gameState === 'finished' && <p>Игра завершена</p>}
      </div>

      {gameState !== 'finished' && (
        <div className={s['game-page__word-card']}>
          <WordCard
            word={currentWord}
            isRevealed={isWordRevealed}
            onToggle={handleToggleWord}
          />
        </div>
      )}

      {gameState === 'playing' && (
        <div className={s['game-page__input']}>
          <div className={s['game-page__input-container']}>
            <input
              ref={inputRef}
              type="text"
              value={inputWord}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Введите слово..."
              className={s['game-page__word-input']}
              disabled={isInputDisabled}
            />
            <Button
              size="xl"
              onClick={handleCheckWord}
              disabled={isInputDisabled || !inputWord.trim()}
              className={s['game-page__button']}>
              Проверить
            </Button>
          </div>

          {errorMessage && (
            <div
              className={`${s['game-page__message']} ${
                isCorrect
                  ? s['game-page__message--success']
                  : s['game-page__message--error']
              }`}>
              {errorMessage}
            </div>
          )}
        </div>
      )}

      {gameState === 'ready' && (
        <div className={s['game-page__controls']}>
          <Button
            size="xl"
            onClick={handleNextWord}
            className={s['game-page__button']}>
            Следующее слово
          </Button>
        </div>
      )}

      {gameState === 'finished' && (
        <div className={s['game-page__finish']}>
          <div className={s['game-page__finish-window']}>
            <div className={s['game-page__finish-actions']}>
              <Button
                size="xl"
                view="outlined"
                onClick={() => {
                  const nextWord = getRandomWord()
                  setCurrentWord(nextWord)
                  setIsWordRevealed(false)
                  setInputWord('')
                  setErrorMessage('')
                  setIsCorrect(null)
                  setGameState('waiting')
                }}
                className={s['game-page__button']}>
                Начать заново
              </Button>
              <Button
                size="xl"
                view="action"
                onClick={() => navigate('/')}
                className={s['game-page__button']}>
                Главное меню
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const initGamePage = () => Promise.resolve()
