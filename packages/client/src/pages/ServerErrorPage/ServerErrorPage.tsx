import '@gravity-ui/uikit/styles/styles.css'
import { Flex, ThemeProvider, Button } from '@gravity-ui/uikit'
import { Helmet } from 'react-helmet'
import { usePage } from '../../hooks/usePage'
import { useNavigate } from 'react-router'
import styles from './ServerErrorPage.module.scss'

export const ServerErrorPage = () => {
  usePage({ initPage: initServerErrorPage })
  const navigate = useNavigate()

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ошибка сервера</title>
        <meta name="description" content="Ошибка сервера" />
      </Helmet>
      <ThemeProvider>
        <Flex className={styles['error-page']}>
          <h1>Oops</h1>
          <p>Что-то пошло не так</p>
          <Button onClick={() => navigate(-1)}>Вернуться назад</Button>
        </Flex>
      </ThemeProvider>
    </div>
  )
}

export const initServerErrorPage = () => Promise.resolve()
