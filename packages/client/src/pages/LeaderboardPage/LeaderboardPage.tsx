import { Button } from '@gravity-ui/uikit'
import s from './LeaderboardPage.module.scss'
import { PlayFill } from '@gravity-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header } from '@components/Header'
import { PageInitArgs } from 'routes'
import { fetchUserThunk, selectUser } from '@slices/userSlice'
import { usePage } from '@hooks/usePage'

export const LeaderboardPage = () => {
  usePage({ initPage: initLeaderboardPage })

  return (
    <div className={s['leaderboard-page']}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard страница" />
      </Helmet>
      <Header />
      <div className={s['leaderboard-page__container']}>таблица лидеров</div>
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
