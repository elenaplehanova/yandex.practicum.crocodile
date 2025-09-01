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

  // Полифилл для roundRect
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

  // Функция для создания крокодилового градиента
  const createCrocodileGradient = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height)
    gradient.addColorStop(0, '#2d5a27') // Темно-зеленый
    gradient.addColorStop(0.3, '#4a7c59') // Средне-зеленый
    gradient.addColorStop(0.6, '#6b8e23') // Оливковый
    gradient.addColorStop(0.8, '#8fbc8f') // Светло-зеленый
    gradient.addColorStop(1, '#98fb98') // Бледно-зеленый
    return gradient
  }

  // Функция для создания внутреннего свечения
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

  // Функция для отрисовки карточки
  const drawCard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Рисуем внешнюю тень
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    ctx.shadowBlur = 25
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 15

    // Рисуем основной фон карточки с крокодиловым градиентом
    const cardX = 20
    const cardY = 20
    const cardWidth = canvas.width - 40
    const cardHeight = canvas.height - 40

    // Основной крокодиловый градиент
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

    // Убираем тень для внутренних элементов
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Рисуем внутреннее свечение
    ctx.fillStyle = createInnerGlow(ctx, cardX, cardY, cardWidth, cardHeight)
    ctx.beginPath()
    ctx.roundRect(cardX + 8, cardY + 8, cardWidth - 16, cardHeight - 16, 20)
    ctx.fill()

    // Рисуем внутренний фон с прозрачностью
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.beginPath()
    ctx.roundRect(cardX + 20, cardY + 20, cardWidth - 40, cardHeight - 40, 18)
    ctx.fill()

    // Рисуем декоративные элементы в крокодиловом стиле
    const cornerRadius = 10
    const cornerSize = 20

    // Угловые украшения в виде чешуек
    ctx.fillStyle = 'rgba(45, 90, 39, 0.3)'
    // Левый верхний угол
    ctx.beginPath()
    ctx.arc(
      cardX + cornerSize,
      cardY + cornerSize,
      cornerRadius,
      0,
      2 * Math.PI
    )
    ctx.fill()
    // Правый верхний угол
    ctx.beginPath()
    ctx.arc(
      cardX + cardWidth - cornerSize,
      cardY + cornerSize,
      cornerRadius,
      0,
      2 * Math.PI
    )
    ctx.fill()
    // Левый нижний угол
    ctx.beginPath()
    ctx.arc(
      cardX + cornerSize,
      cardY + cardHeight - cornerSize,
      cornerRadius,
      0,
      2 * Math.PI
    )
    ctx.fill()
    // Правый нижний угол
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
      // Отображаем слово по центру карточки с улучшенной видимостью
      ctx.fillStyle = '#1a3d1a' // Очень темно-зеленый для лучшей читаемости
      ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Добавляем белую обводку для лучшей видимости
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 3

      // Разбиваем длинное слово на строки
      const words = word.split(' ')
      let y = cardY + cardHeight / 2

      if (words.length === 1) {
        // Одно слово - центрируем
        ctx.strokeText(word, cardX + cardWidth / 2, y)
        ctx.fillText(word, cardX + cardWidth / 2, y)
      } else {
        // Несколько слов - распределяем по строкам
        y = cardY + cardHeight / 2 - (words.length - 1) * 20
        words.forEach((wordPart, index) => {
          const currentY = y + index * 40
          ctx.strokeText(wordPart, cardX + cardWidth / 2, currentY)
          ctx.fillText(wordPart, cardX + cardWidth / 2, currentY)
        })
      }
    } else {
      // Отображаем заглушку по центру карточки с улучшенной видимостью
      ctx.fillStyle = '#4a7c59' // Средне-зеленый для лучшей видимости
      ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Добавляем белую обводку
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

  // Обработчик изменения размера
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

  // Отрисовка при изменении состояния
  useEffect(() => {
    drawCard()
  }, [drawCard, canvasSize])

  // Обработчик клика по карточке
  const handleCardClick = () => {
    onToggle()
  }

  return (
    <div className={s.wordCardContainer}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className={s.wordCardCanvas}
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
