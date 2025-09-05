export interface WordCardState {
  word: string
  isRevealed: boolean
  width: number
  height: number
}

export class WordCardModel {
  private state: WordCardState

  constructor(initial: Partial<WordCardState> = {}) {
    this.state = {
      word: initial.word ?? '',
      isRevealed: initial.isRevealed ?? false,
      width: initial.width ?? 400,
      height: initial.height ?? 250,
    }
  }

  getState(): WordCardState {
    return { ...this.state }
  }

  setWord(word: string): void {
    this.state.word = word
  }

  setRevealed(isRevealed: boolean): void {
    this.state.isRevealed = isRevealed
  }

  setSize(width: number, height: number): void {
    this.state.width = width
    this.state.height = height
  }
}
