import React, { useState, useEffect } from 'react'
import { usePage } from '../hooks/usePage'
import WordCard from '../components/WordCard'
import ButtonBase from '../components/ButtonBase'
import { getRandomWord, getNextWord } from '../constants/gameWords'
import s from './Game.module.scss'

export const GamePage = () => {
  usePage({ initPage: initGamePage })

  const [currentWord, setCurrentWord] = useState<string>('')
  const [isWordRevealed, setIsWordRevealed] = useState<boolean>(false)
  const [inputWord, setInputWord] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Инициализация игры
  useEffect(() => {
    const initialWord = getRandomWord()
    setCurrentWord(initialWord)
  }, [])

  // Обработчик переключения видимости слова
  const handleToggleWord = () => {
    setIsWordRevealed(!isWordRevealed)
    // Скрываем сообщения при переключении
    setErrorMessage('')
    setIsCorrect(null)
  }

  // Обработчик ввода слова
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputWord(value)
    // Очищаем сообщения при вводе
    setErrorMessage('')
    setIsCorrect(null)
  }

  // Обработчик проверки слова
  const handleCheckWord = () => {
    if (!inputWord.trim()) {
      setErrorMessage('Введите слово')
      setIsCorrect(false)
      return
    }

    if (isWordRevealed) {
      setErrorMessage('Сначала скройте слово на карточке')
      setIsCorrect(false)
      return
    }

    const isWordCorrect =
      inputWord.trim().toLowerCase() === currentWord.toLowerCase()

    if (isWordCorrect) {
      setIsCorrect(true)
      setErrorMessage('Правильно! Переходим к следующему слову')
      // Автоматически переходим к следующему слову через 1.5 секунды
      setTimeout(() => {
        handleNextWord()
      }, 1500)
    } else {
      setIsCorrect(false)
      setErrorMessage('Неправильное слово')
    }
  }

  // Обработчик нажатия Enter в инпуте
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheckWord()
    }
  }

  // Обработчик получения следующего слова
  const handleNextWord = () => {
    const nextWord = getNextWord(currentWord)
    setCurrentWord(nextWord)
    setIsWordRevealed(false)
    setInputWord('')
    setErrorMessage('')
    setIsCorrect(null)
  }

  return (
    <div className={s.gamePage}>
      <div className={s.gameHeader}>
        <div className={s.crocodileIcon}>🐊</div>
        <h1 className={s.gameTitle}>КРОКОДИЛ</h1>
        <div className={s.gameSubtitle}>Игра в слова</div>
      </div>

      <div className={s.wordCardSection}>
        <WordCard
          word={currentWord}
          isRevealed={isWordRevealed}
          onToggle={handleToggleWord}
        />
      </div>

      <div className={s.inputSection}>
        <div className={s.inputContainer}>
          <input
            type="text"
            value={inputWord}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Введите слово..."
            className={s.wordInput}
            disabled={isWordRevealed}
          />
          <ButtonBase
            text="Проверить"
            onClick={handleCheckWord}
            disabled={isWordRevealed || !inputWord.trim()}
          />
        </div>

        {errorMessage && (
          <div className={`${s.message} ${isCorrect ? s.success : s.error}`}>
            {errorMessage}
          </div>
        )}
      </div>

      <div className={s.gameControls}>
        <ButtonBase text="Следующее слово" onClick={handleNextWord} />
      </div>
    </div>
  )
}

export const initGamePage = () => Promise.resolve()
