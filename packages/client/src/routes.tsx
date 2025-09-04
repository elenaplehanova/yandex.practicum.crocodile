import { ForumPage, initForumPage } from './pages/Forum/Forum'
import { GamePage, initGamePage } from './pages/Game'
import { initLeaderboardPage, LeaderboardPage } from './pages/Leaderboard'
import { initMainPage, MainPage } from './pages/Main'
import {
  initNotFoundPage,
  NotFoundPage,
} from './pages/NotFoundPage/NotFoundPage'
import { initProfilePage, ProfilePage } from './pages/Profile'
import { initSignInPage, SignInPage } from './pages/SignIn'
import { initSignUpPage, SignUpPage } from './pages/SignUp'
import { StartPage } from './pages/StartPage'
import { initSubmitTopicPage, SubmitTopicPage } from './pages/SubmitTopic'
import { initTopicPage, TopicPage } from './pages/Topic'
import { AppDispatch, RootState } from './store'

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
    Component: MainPage,
    fetchData: initMainPage,
  },
  {
    path: '/sign-in',
    Component: SignInPage,
    fetchData: initSignInPage,
  },
  {
    path: '/sign-up',
    Component: SignUpPage,
    fetchData: initSignUpPage,
  },
  {
    path: '/profile',
    Component: ProfilePage,
    fetchData: initProfilePage,
  },
  {
    path: '/start',
    Component: GamePage,
    fetchData: initGamePage,
  },
  {
    path: '/leaderboard',
    Component: LeaderboardPage,
    fetchData: initLeaderboardPage,
  },
  {
    path: '/forum',
    Component: ForumPage,
    fetchData: initForumPage,
  },
  {
    path: '/forum/submit',
    Component: SubmitTopicPage,
    fetchData: initSubmitTopicPage,
  },
  {
    path: '/forum/:topicId',
    Component: TopicPage,
    fetchData: initTopicPage,
  },
  {
    path: '/start',
    Component: StartPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
    fetchData: initNotFoundPage,
  },
]
