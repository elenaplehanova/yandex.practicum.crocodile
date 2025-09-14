export type GameState = 'waiting' | 'ready' | 'playing' | 'finished'

export interface GameStatus {
  currentWord: string
  isWordRevealed: boolean
  inputWord: string
  errorMessage: string
  isCorrect: boolean | null
  gameState: GameState
}

export interface GameActions {
  onToggleWord: () => void
  onInputChange: (value: string) => void
  onCheckWord: () => void
  onNextWord: () => void
  onReset: () => void
  onStartNewGame: () => void
  clearError: () => void
}
