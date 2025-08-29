import { usePage } from '../hooks/usePage'

export const ForumPage = () => {
  usePage({ initPage: initForumPage })

  return <div className="App"></div>
}

export const initForumPage = () => Promise.resolve()
