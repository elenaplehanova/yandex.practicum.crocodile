import { type FC } from 'react'

import {
  AuthMain,
  InputNames,
  type FormDefaultValues,
  type InputProps,
} from '../AuthMain'

export const SignIn: FC = () => {
  const title = 'Добро пожаловать в игру «Крокодил»!'
  const submitButtonTitle = 'Войти'
  const navigateButtonTitle = 'Нет аккаунта?'
  const navigateRoute = '/sign-up'

  const inputs: InputProps[] = [
    {
      id: InputNames.Login,
      label: 'Логин',
      name: InputNames.Login,
      placeholder: 'Введите логин',
      type: 'text',
    },
    {
      id: InputNames.Password,
      label: 'Пароль',
      name: InputNames.Password,
      placeholder: 'Введите пароль',
      type: 'password',
    },
  ]

  const defaultValues = {
    [InputNames.Login]: '',
    [InputNames.Password]: '',
  }

  const signInFunc = async (data: FormDefaultValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form data:', data)
  }

  return (
    <AuthMain
      title={title}
      defaultValues={defaultValues}
      submitButtonTitle={submitButtonTitle}
      navigateButtonTitle={navigateButtonTitle}
      navigateRoute={navigateRoute}
      inputs={inputs}
      mutationFn={signInFunc}
    />
  )
}
