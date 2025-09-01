import { AppDispatch, RootState } from './store'

import { initMainPage, MainPage } from './pages/Main'
import { initSignInPage, SignInPage } from './pages/SignIn'
import { initSignUpPage, SignUpPage } from './pages/SignUp'
import { initProfilePage, ProfilePage } from './pages/Profile'
import { initGamePage, GamePage } from './pages/Game'
import { initLeaderboardPage, LeaderboardPage } from './pages/Leaderboard'
import { initForumPage, ForumPage } from './pages/Forum'
import { initTopicPage, TopicPage } from './pages/Topic'
import { initNotFoundPage, NotFoundPage } from './pages/NotFound'
import { StartPage } from './pages/StartPage'

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
    path: '/forum/:topicId',
    Component: TopicPage,
    fetchData: initTopicPage,
  },
  {
    path: '/start',
    Component: StartPage,
  },
  {
    path: '/game',
    Component: GamePage,
    fetchData: initGamePage,
  },
  {
    path: '*',
    Component: NotFoundPage,
    fetchData: initNotFoundPage,
  },
]
