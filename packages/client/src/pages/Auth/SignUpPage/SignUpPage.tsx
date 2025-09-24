import { type FC } from 'react'

import { AuthLayout } from '../AuthLayout'
import { SignUpForm } from './SignUpForm'

export const SignUpPage: FC = () => (
  <AuthLayout title="Присоединяйтесь к&nbsp;игре &laquo;Крокодил&raquo;&nbsp;&mdash; создайте новый аккаунт">
    <SignUpForm />
  </AuthLayout>
)
