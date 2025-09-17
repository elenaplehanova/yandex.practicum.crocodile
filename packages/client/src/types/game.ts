export enum GameState {
  Waiting = 'waiting',
  Ready = 'ready',
  Playing = 'playing',
  Finished = 'finished',
}

export type GameStateType = `${GameState}`

export interface GameStatus {
  currentWord: string
  isWordRevealed: boolean
  inputWord: string
  errorMessage: string
  isCorrect: boolean | null
  gameState: GameStateType
  isFullscreen: boolean
}

export interface GameActions {
  onToggleWord: () => void
  onInputChange: (value: string) => void
  onCheckWord: () => void
  onNextWord: () => void
  onStartNewGame: () => void
  onClearError: () => void
  onToggleFullscreen: () => void
}
