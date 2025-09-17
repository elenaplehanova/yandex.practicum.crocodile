import { PlayedWord } from '@slices/gameSlice'
import s from './ResultsModal.module.scss'
import { useMemo } from 'react'
import { Button } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import { useGameStatus } from '@hooks/useGameStatus'

export interface IResultsModalProps {
  playedWords: PlayedWord[]
}

export function ResultsModal({ playedWords }: IResultsModalProps) {
  const navigate = useNavigate()

  const { onStartNewGame } = useGameStatus()

  const guessedWords = useMemo(
    () => playedWords.filter(item => item?.guessed),
    [playedWords]
  )
  const unsolvedWords = useMemo(
    () => playedWords.filter(item => !item?.guessed),
    [playedWords]
  )

  return (
    <div className={s['results-modal']}>
      <h1 className={s['results-modal__title']}>Результат</h1>
      {playedWords.length === 0 ? (
        <div>Нет сыгранных слов</div>
      ) : (
        <>
          <div className={s['results-modal__results']}>
            <section>
              <h2 className={s['results-modal__subheader']}>
                Отгадано <span>{guessedWords.length}</span>
              </h2>

              {guessedWords.map((item, index) => (
                <p key={index} className={s['results-modal__text']}>
                  {item.word}
                </p>
              ))}
            </section>
            <section>
              <h2 className={s['results-modal__subheader']}>
                Не отгадано <span>{unsolvedWords.length}</span>
              </h2>
              {unsolvedWords.map((item, index) => (
                <p key={index} className={s['results-modal__text']}>
                  {item.word}
                </p>
              ))}
            </section>
          </div>
          <br />
          <div className={s['results-modal__results']}>
            <p>
              Очки ведущему:
              <span className={s['results-modal__accent']}>
                {guessedWords.length - unsolvedWords.length}
              </span>
            </p>
            <p>
              Очки отгадывающему:
              <span className={s['results-modal__accent']}>
                {guessedWords.length * 3}
              </span>
            </p>
          </div>
          <br />
          <div className={s['results-modal__instructions']}>
            <p>Правильный ответ (отгадывающий): +3 </p>
            <p>Успешный показ (ведущий, если слово отгадали): +1</p>
            <p>Никто не отгадал (ведущий): −1</p>
          </div>
        </>
      )}
      <br />
      <div className={s['results-modal__finish-actions']}>
        <Button
          size="xl"
          view="outlined"
          onClick={onStartNewGame}
          className={s['results-modal__button']}>
          Начать заново
        </Button>
        <Button
          size="xl"
          view="outlined"
          onClick={() => navigate('/')}
          className={s['results-modal__button']}>
          Главное меню
        </Button>
      </div>
    </div>
  )
}
