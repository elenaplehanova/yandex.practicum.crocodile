import '@gravity-ui/uikit/styles/styles.css'
import { Flex, ThemeProvider, Link } from '@gravity-ui/uikit'
import { Helmet } from 'react-helmet'

import { usePage } from '../hooks/usePage'

export const NotFoundPage = () => {
  usePage({ initPage: initNotFoundPage })

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <meta name="description" content="Страница не найдена" />
      </Helmet>
      <ThemeProvider>
        <Flex
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap={{ m: 5 }}
          height="100vh">
          <h1>404</h1>
          <p>Страница не найдена</p>
          <Link view="normal" underline={true} href="#">
            На главную
          </Link>
        </Flex>
      </ThemeProvider>
    </div>
  )
}

export const initNotFoundPage = () => Promise.resolve()
