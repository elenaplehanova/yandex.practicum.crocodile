import { usePage } from '../hooks/usePage'

export const SignUpPage = () => {
  usePage({ initPage: initSignUpPage })

  return <div className="App"></div>
}

export const initSignUpPage = () => Promise.resolve()
