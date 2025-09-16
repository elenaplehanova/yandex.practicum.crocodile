import { Button } from '@gravity-ui/uikit'
import s from './StartPage.module.scss'
import { PlayFill } from '@gravity-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header } from '@components/Header'
import { usePage } from '@hooks/usePage'
import { ensureUser } from '@utils/initUser'

export const StartPage = () => {
  usePage({ initPage: initStartPage })

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/game')
  }

  return (
    <div className={s['start-page']}>
      <Helmet>
        <title>Старт</title>
        <meta name="description" content="Стартовая страница" />
      </Helmet>
      <Header />
      <div className={s['start-page__container']}>
        <div className={s['start-page__instructions']}>
          <p>Таймер запустится как только нажмете на кнопку "Играть"</p>
        </div>
        <Button
          size="xl"
          className={s['start-page__button']}
          onClick={handleClick}>
          <PlayFill />
          Играть
        </Button>
      </div>
    </div>
  )
}

export const initStartPage = ensureUser
