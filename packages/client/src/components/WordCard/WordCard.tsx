import React, { useRef, useEffect, useState, useCallback } from 'react'
import s from './WordCard.module.scss'

interface WordCardProps {
  word: string
  isRevealed: boolean
  onToggle: () => void
}

// Расширяем интерфейс CanvasRenderingContext2D для roundRect
declare global {
  interface CanvasRenderingContext2D {
    roundRect(
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ): void
  }
}

const WordCard: React.FC<WordCardProps> = ({ word, isRevealed, onToggle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 250 })

  useEffect(() => {
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function (
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
      ) {
        this.beginPath()
        this.moveTo(x + radius, y)
        this.lineTo(x + width - radius, y)
        this.quadraticCurveTo(x + width, y, x + width, y + radius)
        this.lineTo(x + width, y + height - radius)
        this.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        )
        this.lineTo(x + radius, y + height)
        this.quadraticCurveTo(x, y + height, x, y + height - radius)
        this.lineTo(x, y + radius)
        this.quadraticCurveTo(x, y, x + radius, y)
        this.closePath()
      }
    }
  }, [])

  const createCrocodileGradient = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height)
    gradient.addColorStop(0, '#2d5a27')
    gradient.addColorStop(0.3, '#4a7c59')
    gradient.addColorStop(0.6, '#6b8e23')
    gradient.addColorStop(0.8, '#8fbc8f')
    gradient.addColorStop(1, '#98fb98')
    return gradient
  }

  const createInnerGlow = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const gradient = ctx.createRadialGradient(
      x + width / 2,
      y + height / 2,
      0,
      x + width / 2,
      y + height / 2,
      Math.max(width, height) / 2
    )
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    return gradient
  }

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    ctx.shadowBlur = 25
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 15

    const cardX = 20
    const cardY = 20
    const cardWidth = canvas.width - 40
    const cardHeight = canvas.height - 40

    ctx.fillStyle = createCrocodileGradient(
      ctx,
      cardX,
      cardY,
      cardWidth,
      cardHeight
    )
    ctx.beginPath()
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 25)
    ctx.fill()

    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    ctx.fillStyle = createInnerGlow(ctx, cardX, cardY, cardWidth, cardHeight)
    ctx.beginPath()
    ctx.roundRect(cardX + 8, cardY + 8, cardWidth - 16, cardHeight - 16, 20)
    ctx.fill()

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.beginPath()
    ctx.roundRect(cardX + 20, cardY + 20, cardWidth - 40, cardHeight - 40, 18)
    ctx.fill()

    const cornerRadius = 10
    const cornerSize = 20

    ctx.fillStyle = 'rgba(45, 90, 39, 0.3)'
    ctx.beginPath()
    ctx.arc(
      cardX + cornerSize,
      cardY + cornerSize,
      cornerRadius,
      0,
      2 * Math.PI
    )
    ctx.fill()
    ctx.beginPath()
    ctx.arc(
      cardX + cardWidth - cornerSize,
      cardY + cornerSize,
      cornerRadius,
      0,
      2 * Math.PI
    )
    ctx.fill()
    ctx.beginPath()
    ctx.arc(
      cardX + cornerSize,
      cardY + cardHeight - cornerSize,
      cornerRadius,
      0,
      2 * Math.PI
    )
    ctx.fill()
    ctx.beginPath()
    ctx.arc(
      cardX + cardWidth - cornerSize,
      cardY + cardHeight - cornerSize,
      cornerRadius,
      0,
      2 * Math.PI
    )
    ctx.fill()

    if (isRevealed) {
      ctx.fillStyle = '#1a3d1a'
      ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 3

      const words = word.split(' ')
      let y = cardY + cardHeight / 2

      if (words.length === 1) {
        ctx.strokeText(word, cardX + cardWidth / 2, y)
        ctx.fillText(word, cardX + cardWidth / 2, y)
      } else {
        y = cardY + cardHeight / 2 - (words.length - 1) * 20
        words.forEach((wordPart, index) => {
          const currentY = y + index * 40
          ctx.strokeText(wordPart, cardX + cardWidth / 2, currentY)
          ctx.fillText(wordPart, cardX + cardWidth / 2, currentY)
        })
      }
    } else {
      ctx.fillStyle = '#4a7c59'
      ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2

      const placeholderText = 'Нажмите, чтобы увидеть слово'
      ctx.strokeText(
        placeholderText,
        cardX + cardWidth / 2,
        cardY + cardHeight / 2
      )
      ctx.fillText(
        placeholderText,
        cardX + cardWidth / 2,
        cardY + cardHeight / 2
      )
    }
  }, [word, isRevealed])

  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        const rect = container.getBoundingClientRect()
        setCanvasSize({ width: rect.width, height: rect.height })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    drawCard()
  }, [drawCard, canvasSize])

  const handleCardClick = () => {
    onToggle()
  }

  return (
    <div className={s['word-card']}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
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
