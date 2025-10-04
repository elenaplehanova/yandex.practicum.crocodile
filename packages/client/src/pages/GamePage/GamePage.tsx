import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePage } from '../../hooks/usePage'
import { useGameStatus } from '../../hooks/useGameStatus'
import WordCard from '../../components/WordCard'
import { Button, Modal } from '@gravity-ui/uikit'
import { useDispatch, useSelector } from '../../store'
import { RootState } from '../../store'
import { addPlayedWord, decrementTime, setShowResults } from '@slices/gameSlice'
import { fetchUserThunk, selectUser } from '@slices/userSlice'
import s from './GamePage.module.scss'
import { Helmet } from 'react-helmet'
import { Header } from '@components/Header'
import { ResultsModal } from '@components/ResultsModal/ResultsModal'
import { GameState } from '../../types/game'
import { PageInitArgs } from '../../routes'

const initGame = ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserThunk())
  }
  return Promise.resolve()
}

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
    onStartNewGame,
    onFinishGame,
    onToggleFullscreen,
    onSetFullscreen,
  } = useGameStatus()

  useEffect(() => {
    onInitGame()
  }, [onInitGame])

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
      // Слово уже добавлено в gameSlice.checkWord, просто переходим к следующему
      onNextWord()
    }
  }, [isCorrect])

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
    if (gameState !== GameState.Playing) return

    if (timeLeft <= 0) {
      onFinishGame()
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
    // Слово будет добавлено в gameSlice.nextWord, просто переходим к следующему
    onNextWord()
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
          {gameState === GameState.Waiting && (
            <p>Нажмите на карточку, когда будете готовы показать слово</p>
          )}
          {gameState === GameState.Ready && (
            <>
              <p>Изучите слово. Нажмите на карточку для начала игры</p>
              <p>Таймер запустится как только нажмете на карточку</p>
            </>
          )}
          {gameState === GameState.Playing && (
            <>
              <p>Ведущий показывает слово пантомимой</p>
              <p>
                Нажмите на карточку, чтобы скрыть слово и начать ввод ответов
              </p>
              <p>Нажмите "Следующее слово" чтобы пропустить слово</p>
            </>
          )}
          {gameState === GameState.Finished && <p>Игра завершена</p>}
        </div>

        {gameState === GameState.Playing && (
          <div className={s['game-page__timer']}>
            Осталось времени:
            <span className={s['game-page__timer_accent']}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}

        {gameState === GameState.Playing && errorMessage && (
          <div
            className={`${s['game-page__message']} ${
              isCorrect
                ? s['game-page__message--success']
                : s['game-page__message--error']
            }`}>
            {errorMessage}
          </div>
        )}

        {gameState !== GameState.Finished && (
          <div className={s['game-page__word-card']}>
            <WordCard
              word={currentWord}
              isRevealed={isWordRevealed}
              onToggle={onToggleWord}
            />
          </div>
        )}

        {gameState === GameState.Playing && (
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
            <div className={s['game-page__controls']}>
              <Button
                size="xl"
                onClick={handleNextWord}
                className={s['game-page__button']}>
                Следующее слово
              </Button>
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
        <ResultsModal playedWords={playedWords} />
      </Modal>
    </>
  )
}
