import { usePage } from '../hooks/usePage'

export const LeaderboardPage = () => {
  usePage({ initPage: initLeaderboardPage })

  return <div className="App"></div>
}

export const initLeaderboardPage = () => Promise.resolve()
