import { Button } from '@gravity-ui/uikit'
import s from './StartPage.module.scss'
import { PlayFill } from '@gravity-ui/icons'
import { useNavigate } from 'react-router-dom'

export const StartPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/game')
  }

  return (
    <div className={s['start-page']}>
      <h1 className={s['start-page__header']}>CROCODILE</h1>
      <Button
        size="xl"
        className={s['start-page__button']}
        onClick={handleClick}>
        <PlayFill />
        Play
      </Button>
    </div>
  )
}
