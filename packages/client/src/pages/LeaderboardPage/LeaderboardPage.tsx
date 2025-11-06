import { Helmet } from 'react-helmet'
import { Button } from '@gravity-ui/uikit'

import { Header } from '@components/Header'
import { usePage } from '@hooks/usePage'
import { LeaderboardTable } from '@components/LeaderboardTable'
import { fetchLeaderboardThunk } from '@slices/leaderboardThunks'
import { fetchUserThunk, selectUser } from '@slices/userSlice'
import {
  selectLeaderboardLoading,
  selectLeaderboardError,
  selectLeaderboardData,
} from '@slices/leaderboardSlice'
import { PageInitArgs } from 'routes'
import { useDispatch, useSelector } from '../../store'
import s from './LeaderboardPage.module.scss'

export const LeaderboardPage = () => {
  usePage({ initPage: initLeaderboardPage })

  const dispatch = useDispatch()
  const isLoading = useSelector(selectLeaderboardLoading)
  const error = useSelector(selectLeaderboardError)

  const handleRefresh = () => {
    dispatch(fetchLeaderboardThunk())
  }

  return (
    <div className={s['leaderboard-page']}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Leaderboard</title>
        <meta name="description" content="Leaderboard страница" />
      </Helmet>
      <Header />
      <div className={s['leaderboard-page__container']}>
        <div className={s['leaderboard-page__header-section']}>
          <h1 className={s['leaderboard-page__header']}>Таблица лидеров</h1>
          <Button
            view="outlined"
            onClick={handleRefresh}
            loading={isLoading}
            className={s['leaderboard-page__refresh-btn']}>
            Обновить
          </Button>
        </div>
        <div className={s['leaderboard-page__table']}>
          {isLoading ? (
            <div>Загрузка...</div>
          ) : error ? (
            <div>Ошибка: {error}</div>
          ) : (
            <LeaderboardTable />
          )}
        </div>
      </div>
    </div>
  )
}

export const initLeaderboardPage = async ({
  dispatch,
  state,
}: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = []

  if (!selectUser(state)) {
    queue.push(dispatch(fetchUserThunk()))
  }

  if (!selectLeaderboardData(state).length) {
    queue.push(dispatch(fetchLeaderboardThunk()))
  }

  return Promise.all(queue)
}
