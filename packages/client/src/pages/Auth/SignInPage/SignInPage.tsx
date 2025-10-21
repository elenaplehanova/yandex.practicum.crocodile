import { type FC } from 'react'

import { AuthLayout } from '../AuthLayout'
import { SignInForm } from './SignInForm'
import { SwitchTheme } from '@components/SwitchTheme/SwitchTheme'

export const SignInPage: FC = () => (
  <AuthLayout title="Добро пожаловать в&nbsp;игру &laquo;Крокодил&raquo;!">
    <SignInForm />
    <SwitchTheme />
  </AuthLayout>
)
