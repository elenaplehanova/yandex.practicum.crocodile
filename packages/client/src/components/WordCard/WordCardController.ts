import { WordCardModel } from './WordCardModel'
import { WordCardView } from './WordCardView'

export class WordCardController {
  private model: WordCardModel
  private view: WordCardView
  private canvas: HTMLCanvasElement
  private resizeObserver?: ResizeObserver
  constructor(
    canvas: HTMLCanvasElement,
    opts: { word: string; isRevealed: boolean }
  ) {
    this.canvas = canvas
    this.model = new WordCardModel({
      word: opts.word,
      isRevealed: opts.isRevealed,
    })
    this.view = new WordCardView(canvas, this.model)
    this.updateSizeFromContainer()
    this.view.draw()
    this.initResizeObserver()
  }

  private updateSizeFromContainer(): void {
    const container = this.canvas.parentElement
    if (!container) return
    const rect = container.getBoundingClientRect()
    const width = 450
    const height = 300
    this.model.setSize(width, height)
  }

  private initResizeObserver(): void {
    const container = this.canvas.parentElement
    if (!container || typeof ResizeObserver === 'undefined') {
      const onResize = () => {
        this.updateSizeFromContainer()
        this.view.draw()
      }
      window.addEventListener('resize', onResize)
      this.resizeObserver = {
        disconnect: () => window.removeEventListener('resize', onResize),
      } as unknown as ResizeObserver
      return
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.updateSizeFromContainer()
      this.view.draw()
    })
    this.resizeObserver.observe(container)
  }

  setWord(word: string): void {
    this.model.setWord(word)
    this.view.draw()
  }

  setRevealed(isRevealed: boolean): void {
    this.model.setRevealed(isRevealed)
    this.view.draw()
  }

  redraw(): void {
    this.view.draw()
  }

  stop(): void {
    this.resizeObserver?.disconnect()
  }
}
