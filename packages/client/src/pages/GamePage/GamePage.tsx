import React, { useState, useEffect } from 'react'
import { usePage } from '../../hooks/usePage'
import WordCard from '../../components/WordCard'
import ButtonBase from '../../components/ButtonBase'
import { getRandomWord, getNextWord } from '../../constants/gameWords'
import s from './GamePage.module.scss'

export const GamePage = () => {
  usePage({ initPage: initGamePage })

  const [currentWord, setCurrentWord] = useState<string>('')
  const [isWordRevealed, setIsWordRevealed] = useState<boolean>(false)
  const [inputWord, setInputWord] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    const initialWord = getRandomWord()
    setCurrentWord(initialWord)
  }, [])

  const handleToggleWord = () => {
    setIsWordRevealed(!isWordRevealed)
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
      setTimeout(() => {
        handleNextWord()
      }, 1500)
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
    setIsWordRevealed(false)
    setInputWord('')
    setErrorMessage('')
    setIsCorrect(null)
  }

  return (
    <div className={s['game-page']}>
      <div className={s['game-page__header']}>
        <div className={s['game-page__icon']}>🐊</div>
        <h1 className={s['game-page__title']}>КРОКОДИЛ</h1>
        <div className={s['game-page__subtitle']}>Игра в слова</div>
      </div>

      <div className={s['game-page__instructions']}>
        <p>Нажмите на карточку, чтобы увидеть слово</p>
        <p>Введите слово в поле ниже и нажмите "Проверить"</p>
        <p>Слово должно быть скрыто для ввода</p>
      </div>

      <div className={s['game-page__word-card']}>
        <WordCard
          word={currentWord}
          isRevealed={isWordRevealed}
          onToggle={handleToggleWord}
        />
      </div>

      <div className={s['game-page__input']}>
        <div className={s['game-page__input-container']}>
          <input
            type="text"
            value={inputWord}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Введите слово..."
            className={s['game-page__word-input']}
            disabled={isWordRevealed}
          />
          <ButtonBase
            text="Проверить"
            onClick={handleCheckWord}
            disabled={isWordRevealed || !inputWord.trim()}
          />
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

      <div className={s['game-page__controls']}>
        <ButtonBase text="Следующее слово" onClick={handleNextWord} />
      </div>
    </div>
  )
}

export const initGamePage = () => Promise.resolve()
