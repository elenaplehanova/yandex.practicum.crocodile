import { usePage } from '../hooks/usePage'

export const ProfilePage = () => {
  usePage({ initPage: initProfilePage })

  return <div className="App"></div>
}

export const initProfilePage = () => Promise.resolve()
