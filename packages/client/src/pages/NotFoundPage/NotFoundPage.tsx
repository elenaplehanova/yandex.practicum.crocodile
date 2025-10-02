import '@gravity-ui/uikit/styles/styles.css'
import { Flex, Button } from '@gravity-ui/uikit'
import { Helmet } from 'react-helmet'
import { usePage } from '../../hooks/usePage'
import { useNavigate } from 'react-router'
import styles from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
  usePage({ initPage: initNotFoundPage })
  const navigate = useNavigate()

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <meta name="description" content="Страница не найдена" />
      </Helmet>
      <Flex className={styles['error-page']}>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <Button onClick={() => navigate(-1)}>Вернуться назад</Button>
      </Flex>
    </div>
  )
}

export const initNotFoundPage = () => Promise.resolve()
