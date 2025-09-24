import { Table, type TableColumnConfig } from '@gravity-ui/uikit'
import { FC } from 'react'
import s from './LeaderboardTable.module.scss'

export interface LeaderboardData {
  name: string
  count: number
  firstGuessWins: number
}

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

  return (
    <div className={s['leaderboard-table']}>
      <Table columns={columns} data={data} />
    </div>
  )
}
