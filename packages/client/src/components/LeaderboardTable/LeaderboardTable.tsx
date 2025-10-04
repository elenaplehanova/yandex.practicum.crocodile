import { Table, type TableColumnConfig } from '@gravity-ui/uikit'
import { FC } from 'react'
import s from './LeaderboardTable.module.scss'
import { LeaderboardData } from '@slices/apiSlice'

interface LeaderboardTableProps {
  data: LeaderboardData[]
}

export const LeaderboardTable: FC<LeaderboardTableProps> = ({ data }) => {
  const columns: TableColumnConfig<LeaderboardData>[] = [
    {
      id: 'name',
      name: 'Имя',
    },
    {
      align: 'center',
      id: 'count',
      name: 'Отгадано слов',
    },
    {
      align: 'center',
      id: 'firstGuessWins',
      name: '(с первой попытки)',
    },
  ]

  const safeData = data || []

  if (safeData.length === 0) {
    return (
      <div className={s['leaderboard-table']}>
        <div>Нет данных для отображения</div>
      </div>
    )
  }

  return (
    <div className={s['leaderboard-table']}>
      <Table columns={columns} data={safeData} />
    </div>
  )
}
