import '@gravity-ui/uikit/styles/styles.css'
import '@styles/palette.scss'
import '@styles/global.scss'
import '@styles/fonts/fonts.scss'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { routes } from './routes'
import { ThemeProvider } from '@gravity-ui/uikit'
import { StyleSheetManager } from 'styled-components'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StyleSheetManager>
    <Provider store={store}>
      <ThemeProvider theme="light">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StyleSheetManager>
)
