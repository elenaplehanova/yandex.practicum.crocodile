import React, { useRef, useEffect } from 'react'
import s from './WordCard.module.scss'
import { WordCardController } from './WordCardController'

interface WordCardProps {
  word: string
  isRevealed: boolean
  onToggle: () => void
}

const WordCard: React.FC<WordCardProps> = ({ word, isRevealed, onToggle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controllerRef = useRef<WordCardController | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    controllerRef.current = new WordCardController(canvasRef.current, {
      word,
      isRevealed,
    })
    return () => controllerRef.current?.stop()
  }, [])

  useEffect(() => {
    controllerRef.current?.setWord(word)
  }, [word])

  useEffect(() => {
    controllerRef.current?.setRevealed(isRevealed)
  }, [isRevealed])

  const handleCardClick = () => {
    onToggle()
  }

  return (
    <div className={s['word-card']}>
      <canvas
        ref={canvasRef}
        className={s['word-card__canvas']}
        onClick={handleCardClick}
        title={
          isRevealed
            ? 'Нажмите, чтобы скрыть слово'
            : 'Нажмите, чтобы увидеть слово'
        }
      />
    </div>
  )
}

export default WordCard
