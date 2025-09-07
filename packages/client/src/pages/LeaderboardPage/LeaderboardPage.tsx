import s from './LeaderboardPage.module.scss'
import { Helmet } from 'react-helmet'
import { Header } from '@components/Header'
import { PageInitArgs } from 'routes'
import { fetchUserThunk, selectUser } from '@slices/userSlice'
import { usePage } from '@hooks/usePage'
import {
  LeaderboardTable,
  type LeaderboardData,
} from '@components/LeaderboardTable'

export const LeaderboardPage = () => {
  usePage({ initPage: initLeaderboardPage })

  const data: LeaderboardData[] = [
    {
      name: 'Биба',
      count: 12,
      firstGuessWins: 5,
    },
    {
      name: 'Боба',
      count: 5,
      firstGuessWins: 1,
    },
    {
      name: 'Пупа',
      count: 10,
      firstGuessWins: 3,
    },
    {
      name: 'Лупа',
      count: 18,
      firstGuessWins: 15,
    },
  ]

  return (
    <div className={s['leaderboard-page']}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard страница" />
      </Helmet>
      <Header />
      <div className={s['leaderboard-page__container']}>
        <h1 className={s['leaderboard-page__header']}>Таблица лидеров</h1>
        <div className={s['leaderboard-page__table']}>
          <LeaderboardTable data={data} />
        </div>
      </div>
    </div>
  )
}

export const initLeaderboardPage = async ({
  dispatch,
  state,
}: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserThunk())
  }
}
