import { AppDispatch, RootState } from './store'
import { withAuth } from './hocs/withAuth'
import { initMainPage, MainPage } from './pages/MainPage'
import { ForumPage, initForumPage } from './pages/Forum/Forum'
import { GamePage, initGamePage } from './pages/GamePage/GamePage'
import { initLeaderboardPage, LeaderboardPage } from './pages/LeaderboardPage'
import { initProfilePage, ProfilePage } from './pages/Profile/ProfilePage'
import { initTopicPage, TopicPage } from './pages/Topic'
import {
  initNotFoundPage,
  NotFoundPage,
} from './pages/NotFoundPage/NotFoundPage'
import {
  initServerErrorPage,
  ServerErrorPage,
} from './pages/ServerErrorPage/ServerErrorPage'
import { StartPage, initStartPage } from './pages/StartPage'
import { SignInPage, SignUpPage, OAuthCallbackPage } from './pages/Auth'
import { initSubmitTopicPage, SubmitTopicPage } from './pages/SubmitTopic'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

export const routes = [
  {
    path: '/',
    Component: withAuth(MainPage),
    fetchData: initMainPage,
  },
  {
    path: '/sign-in',
    Component: SignInPage,
  },
  {
    path: '/sign-up',
    Component: SignUpPage,
  },
  {
    path: '/oauth',
    Component: OAuthCallbackPage,
  },
  {
    path: '/profile',
    Component: withAuth(ProfilePage),
    fetchData: initProfilePage,
  },
  {
    path: '/game',
    Component: withAuth(GamePage),
    fetchData: initGamePage,
  },
  {
    path: '/leaderboard',
    Component: withAuth(LeaderboardPage),
    fetchData: initLeaderboardPage,
  },
  {
    path: '/forum',
    Component: withAuth(ForumPage),
    fetchData: initForumPage,
  },
  {
    path: '/forum/submit',
    Component: withAuth(SubmitTopicPage),
    fetchData: initSubmitTopicPage,
  },
  {
    path: '/forum/:topicId',
    Component: withAuth(TopicPage),
    fetchData: initTopicPage,
  },
  {
    path: '/start',
    Component: withAuth(StartPage),
    fetchData: initStartPage,
  },
  {
    path: '/505',
    Component: withAuth(ServerErrorPage),
    fetchData: initServerErrorPage,
  },
  {
    path: '*',
    Component: withAuth(NotFoundPage),
    fetchData: initNotFoundPage,
  },
]
