import { usePage } from '../hooks/usePage'

export const SignInPage = () => {
  usePage({ initPage: initSignInPage })

  return <div className="App"></div>
}

export const initSignInPage = () => Promise.resolve()
