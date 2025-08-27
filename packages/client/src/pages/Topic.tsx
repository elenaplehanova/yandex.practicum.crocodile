import { usePage } from '../hooks/usePage'

export const TopicPage = () => {
  usePage({ initPage: initTopicPage })

  return <div className="App"></div>
}

export const initTopicPage = () => Promise.resolve()
