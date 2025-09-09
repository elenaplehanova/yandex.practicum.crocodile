import * as React from 'react'

export interface IResultsModalsProps {
  count: number
}

export function ResultsModals(props: IResultsModalsProps) {
  return (
    <div>
      Результат: <span>{props.count}</span> слов
    </div>
  )
}
