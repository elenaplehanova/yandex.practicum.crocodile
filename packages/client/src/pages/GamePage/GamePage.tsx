import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePage } from '../../hooks/usePage'
import { useGameStatus } from '../../hooks/useGameStatus'
import WordCard from '../../components/WordCard'
import { Button } from '@gravity-ui/uikit'
import s from './GamePage.module.scss'

const initGame = () => Promise.resolve()

export const GamePage = () => {
  usePage({ initPage: initGame })

  const navigate = useNavigate()
  const {
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
    onFinishGame,
  } = useGameStatus()

  useEffect(() => {
    onInitGame()
  }, [onInitGame])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value)
  }

  const handleCheckWord = () => {
    onCheckWord()
  }

  useEffect(() => {
    if (isCorrect === true) {
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

      {gameState === 'ready' && (
        <div className={s['game-page__controls']}>
          <Button
            size="xl"
            onClick={onNextWord}
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
  )
}
