import { Button } from '@gravity-ui/uikit'
import s from './StartPage.module.scss'
import { PlayFill } from '@gravity-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header } from '@components/Header'
import { usePage } from '@hooks/usePage'
import { ensureUser } from 'utils/initUser'

export const StartPage = () => {
  usePage({ initPage: initStartPage })

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/game')
  }

  return (
    <div className={s['start-page']}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Старт</title>
        <meta name="description" content="Стартовая страница" />
      </Helmet>
      <Header />
      <div className={s['start-page__container']}>
        <h1 className={s['start-page__header']}>CROCODILE</h1>
        <Button
          size="xl"
          className={s['start-page__button']}
          onClick={handleClick}>
          <PlayFill />
          Play
        </Button>
      </div>
    </div>
  )
}

export const initStartPage = ensureUser
