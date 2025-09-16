import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePage } from '../../hooks/usePage'
import { useGameStatus } from '../../hooks/useGameStatus'
import WordCard from '../../components/WordCard'
import { Button, Modal } from '@gravity-ui/uikit'
import { useDispatch, useSelector } from '../../store'
import { RootState } from '../../store'
import {
  addPlayedWord,
  decrementTime,
  resetGame,
  setShowResults,
} from '@slices/gameSlice'
import s from './GamePage.module.scss'

const initGame = () => Promise.resolve()

export const GamePage = () => {
  usePage({ initPage: initGame })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { timeLeft, isShowResults, playedWords } = useSelector(
    (state: RootState) => state.game
  )
  const {
    currentWord,
    gameState,
    isWordRevealed,
    inputWord,
    errorMessage,
    isCorrect,
    isInputDisabled,
    isFullscreen,
    onInitGame,
    onToggleWord,
    onInputChange,
    onCheckWord,
    onNextWord,
    onReset,
    onStartNewGame,
    onFinishGame,
    onToggleFullscreen,
    onSetFullscreen,
  } = useGameStatus()

  useEffect(() => {
    onInitGame()
  }, [onInitGame])

  useEffect(() => {
    return () => {
      dispatch(resetGame())
    }
  }, [dispatch])

  useEffect(() => {
    const handleFullscreenChange = () => {
      onSetFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [onSetFullscreen])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value)
  }

  const handleCheckWord = () => {
    onCheckWord()
  }

  useEffect(() => {
    if (isCorrect === true) {
      dispatch(addPlayedWord({ word: currentWord, guessed: true }))
      const timer = setTimeout(() => {
        onFinishGame()
      }, 1200)

      return () => clearTimeout(timer)
    }
  }, [isCorrect, onFinishGame])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheckWord()
    }
  }

  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (!isInputDisabled) {
      inputRef.current?.focus()
    }
  }, [isInputDisabled])

  useEffect(() => {
    if (gameState !== 'playing') return

    if (timeLeft <= 0) {
      dispatch(setShowResults(true))
      return
    }

    const id = setTimeout(() => {
      dispatch(decrementTime())
    }, 1000)

    return () => clearTimeout(id)
  }, [timeLeft, gameState, dispatch])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const handleNextWord = () => {
    dispatch(addPlayedWord({ word: currentWord, guessed: false }))
    onNextWord()
  }

  return (
    <>
      <div className={s['game-page']}>
        <div className={s['game-page__header']}>
          <h1 className={s['game-page__title']}>CROCODILE</h1>
          <Button
            size="m"
            view="outlined"
            onClick={handleToggleFullscreen}
            className={s['game-page__fullscreen-button']}>
            {isFullscreen
              ? 'Выйти из полноэкранного режима'
              : 'Полноэкранный режим'}
          </Button>
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
              <p>
                Нажмите на карточку, чтобы скрыть слово и начать ввод ответов
              </p>
            </>
          )}
          {gameState === 'finished' && <p>Игра завершена</p>}
        </div>

        {gameState !== 'finished' && (
          <div className={s['game-page__word-card']}>
            <WordCard
              word={currentWord}
              isRevealed={isWordRevealed}
              onToggle={onToggleWord}
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

        {gameState === 'playing' && (
          <div className={s['game-page__timer']}>
            Осталось времени:
            <span className={s['game-page__timer_accent']}>
              {formatTime(timeLeft)}
            </span>
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
                  onClick={onStartNewGame}
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
      <Modal
        open={isShowResults}
        onClose={() => {
          dispatch(setShowResults(false))
          navigate('/start')
        }}>
        <div style={{ padding: 24 }}>
          <h3>Результаты</h3>
          {playedWords.length === 0 ? (
            <div>Нет сыгранных слов</div>
          ) : (
            <ul>
              {playedWords.map((w, idx) => (
                <li key={idx}>
                  {w.word} — {w.guessed ? 'угадано' : 'пропущено'}
                </li>
              ))}
            </ul>
          )}
          <div style={{ marginTop: 16 }}>
            <Button
              view="action"
              onClick={() => {
                dispatch(setShowResults(false))
                navigate('/start')
              }}>
              Закрыть
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
