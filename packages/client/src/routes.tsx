import { AppDispatch, RootState } from './store'
import { initMainPage, MainPage } from './pages/MainPage'
import { ForumPage, initForumPage } from './pages/Forum/Forum'
import { initGamePage, GamePage } from './pages/GamePage/GamePage'
import { initLeaderboardPage, LeaderboardPage } from './pages/LeaderboardPage'

import { SignIn as SignInPage } from './pages/Auth'
import { initSignUpPage, SignUpPage } from './pages/SignUp'
import { initProfilePage, ProfilePage } from './pages/Profile'
import { initTopicPage, TopicPage } from './pages/Topic'
import {
  initNotFoundPage,
  NotFoundPage,
} from './pages/NotFoundPage/NotFoundPage'
import { StartPage, initStartPage } from './pages/StartPage'
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
    Component: MainPage,
    fetchData: initMainPage,
  },
  {
    path: '/sign-in',
    Component: SignInPage,
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
    path: '/game',
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
    fetchData: initStartPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
    fetchData: initNotFoundPage,
  },
]
