import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppDispatch, RootState } from './store'
import { initMainPage, MainPage } from './pages/MainPage'
import { ForumPage, initForumPage } from './pages/Forum/Forum'
import { initGamePage, GamePage } from './pages/GamePage/GamePage'
import { initLeaderboardPage, LeaderboardPage } from './pages/LeaderboardPage'
import { initProfilePage, ProfilePage } from './pages/Profile'
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
import { SignIn as SignInPage, SignUp as SignUpPage } from './pages/Auth'
import { initSubmitTopicPage, SubmitTopicPage } from './pages/SubmitTopic'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

const queryClient = new QueryClient()

export const routes = [
  {
    path: '/',
    Component: MainPage,
    fetchData: initMainPage,
  },
  {
    path: '/sign-in',
    Component: () => (
      <QueryClientProvider client={queryClient}>
        <SignInPage />
      </QueryClientProvider>
    ),
  },
  {
    path: '/sign-up',
    Component: () => (
      <QueryClientProvider client={queryClient}>
        <SignUpPage />
      </QueryClientProvider>
    ),
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
    path: '/505',
    Component: ServerErrorPage,
    fetchData: initServerErrorPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
    fetchData: initNotFoundPage,
  },
]
