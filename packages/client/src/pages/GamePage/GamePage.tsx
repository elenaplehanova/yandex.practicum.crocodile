import React, { useState, useEffect } from 'react'
import { usePage } from '../../hooks/usePage'
import WordCard from '../../components/WordCard'
import { Button, Modal } from '@gravity-ui/uikit'
import { getRandomWord, getNextWord } from '../../constants/gameWords'
import s from './GamePage.module.scss'
import { Helmet } from 'react-helmet'
import { Header } from '@components/Header'
import { ResultsModal } from '@components/ResultsModal/ResultsModal'
import { useNavigate } from 'react-router-dom'

export type PlayedWords = {
  word: string
  guessed: boolean
}

export const GamePage = () => {
  usePage({ initPage: initGamePage })
  const navigate = useNavigate()

  const [currentWord, setCurrentWord] = useState<string>('')
  const [isWordRevealed, setIsWordRevealed] = useState<boolean>(false)
  const [inputWord, setInputWord] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(60)
  const [isShowResults, setIsShowResults] = useState(false)
  const [playedWords, setPlayedWords] = useState<PlayedWords[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsShowResults(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  useEffect(() => {
    const initialWord = getRandomWord()
    setCurrentWord(initialWord)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const handleToggleFullscreen = () => {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    } else {
      const element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      }
    }
  }

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
      setPlayedWords(playedWords => [
        ...playedWords,
        { word: currentWord, guessed: true },
      ])
      setErrorMessage('Правильно! Переходим к следующему слову')
      setTimeout(() => {
        showNextWord()
      }, 700)
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

  const showNextWord = () => {
    const nextWord = getNextWord(currentWord)
    setCurrentWord(nextWord)
    setIsWordRevealed(false)
    setInputWord('')
    setErrorMessage('')
    setIsCorrect(null)
  }

  const handleNextWord = () => {
    showNextWord()
    setPlayedWords(playedWords => [
      ...playedWords,
      { word: currentWord, guessed: false },
    ])
  }

  return (
    <>
      <div className={s['game-page']}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Game</title>
          <meta name="description" content="Страница с игрой" />
        </Helmet>
        <Header />

        <div className={s['game-page__header']}>
          <h1 className={s['game-page__title']}>CROCODILE</h1>
          <Button
            size="xl"
            onClick={handleToggleFullscreen}
            className={s['game-page__toggle-fullscreen-button']}>
            {isFullscreen
              ? 'Выход из полноэкранного режима'
              : 'Полноэкранный режим'}
          </Button>
        </div>

        <div className={s['game-page__instructions']}>
          <p>Нажмите на карточку, чтобы увидеть слово</p>
          <p>Введите слово в поле ниже и нажмите "Проверить"</p>
          <p>Слово должно быть скрыто для ввода</p>
        </div>

        <div className={s['game-page__timer']}>
          Осталось времени:
          <span className={s['game-page__timer_accent']}>
            {formatTime(timeLeft)}
          </span>
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
            <Button
              size="xl"
              onClick={handleCheckWord}
              disabled={isWordRevealed || !inputWord.trim()}
              className={s['game-page__button']}>
              Проверить
            </Button>
          </div>
        </div>

        <div className={s['game-page__controls']}>
          <Button
            size="xl"
            onClick={handleNextWord}
            className={s['game-page__button']}>
            Следующее слово
          </Button>
        </div>
      </div>
      <Modal
        open={isShowResults}
        onClose={() => {
          setIsShowResults(false)
          navigate('/start')
        }}>
        <ResultsModal playedWords={playedWords} />
      </Modal>
    </>
  )
}

export const initGamePage = () => Promise.resolve()
