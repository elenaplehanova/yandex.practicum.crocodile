import { type FC } from 'react'

import { AuthLayout } from '../AuthLayout'
import { SignInForm } from './SignInForm'

export const SignInPage: FC = () => (
  <AuthLayout title="Добро пожаловать в&nbsp;игру &laquo;Крокодил&raquo;!">
    <SignInForm />
  </AuthLayout>
)
