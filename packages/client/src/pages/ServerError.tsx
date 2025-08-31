import '@gravity-ui/uikit/styles/styles.css'
import { Flex, ThemeProvider, Link } from '@gravity-ui/uikit'
import { Helmet } from 'react-helmet'

import { usePage } from '../hooks/usePage'

export const ServerErrorPage = () => {
  usePage({ initPage: initServerErrorPage })

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ошибка сервера</title>
        <meta name="description" content="Страница не найдена" />
      </Helmet>
      <ThemeProvider>
        <Flex
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap={{ m: 5 }}
          height="100vh">
          <h1>Oops</h1>
          <p>Что-то пошло не так</p>
          <Link view="normal" underline={true} href="#">
            На главную
          </Link>
        </Flex>
      </ThemeProvider>
    </div>
  )
}

export const initServerErrorPage = () => Promise.resolve()
