import { usePage } from '../hooks/usePage'

export const GamePage = () => {
  usePage({ initPage: initGamePage })

  return <div className="App"></div>
}

export const initGamePage = () => Promise.resolve()
