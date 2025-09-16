import '@testing-library/jest-dom'

// jsdom не реализует matchMedia — мокаем для UI Kit
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Мокаем canvas API, которого нет в jsdom
class MockCanvasRenderingContext2D {
  // свойства, которые иногда читают
  shadowColor = ''
  shadowBlur = 0
  shadowOffsetX = 0
  shadowOffsetY = 0
  fillStyle: unknown = null
  strokeStyle: unknown = null
  lineWidth = 1
  font = ''
  textAlign: CanvasTextAlign = 'start'
  textBaseline: CanvasTextBaseline = 'alphabetic'

  // методы-стабы
  beginPath = jest.fn()
  closePath = jest.fn()
  moveTo = jest.fn()
  lineTo = jest.fn()
  quadraticCurveTo = jest.fn()
  clearRect = jest.fn()
  fill = jest.fn()
  stroke = jest.fn()
  arc = jest.fn()
  fillText = jest.fn()
  strokeText = jest.fn()
  roundRect = jest.fn()

  createLinearGradient = jest.fn(() => ({
    addColorStop: jest.fn(),
  }))

  createRadialGradient = jest.fn(() => ({
    addColorStop: jest.fn(),
  }))
}

// Делаем класс доступным глобально, чтобы код мог расширять его прототип
// и чтобы проверка CanvasRenderingContext2D.prototype прошла
// @ts-expect-error — добавляем глобал для тестовой среды
global.CanvasRenderingContext2D =
  MockCanvasRenderingContext2D as unknown as CanvasRenderingContext2D

// Возвращаем мокнутый контекст для всех canvas
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: function getContext() {
    return new (MockCanvasRenderingContext2D as unknown as {
      new (): CanvasRenderingContext2D
    })()
  },
})
