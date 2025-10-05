import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from '../store'
import {
  setPageHasBeenInitializedOnServer,
  selectPageHasBeenInitializedOnServer,
} from '../slices/ssrSlice'
import { PageInitArgs, PageInitContext } from '../routes'

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
})

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch()
  const pageHasBeenInitializedOnServer = useSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useStore()

  useEffect(() => {
    const runInit = async () => {
      if (pageHasBeenInitializedOnServer) {
        dispatch(setPageHasBeenInitializedOnServer(false))
        return
      }

      if (initPage) {
        await initPage({
          dispatch,
          state: store.getState(),
          ctx: createContext(),
        })
      }
    }

    runInit()
  }, [dispatch, initPage, pageHasBeenInitializedOnServer, store])
}
