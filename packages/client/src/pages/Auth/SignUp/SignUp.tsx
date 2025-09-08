import { type FC } from 'react'

import {
  AuthMain,
  InputNames,
  type FormDefaultValues,
  type InputProps,
} from '../AuthMain'

export const SignUp: FC = () => {
  const title = 'Присоединяйтесь к игре «Крокодил» — создайте новый аккаунт'
  const submitButtonTitle = 'Зарегистрироваться'
  const navigateButtonTitle = 'Есть аккаунт?'
  const navigateRoute = '/sign-in'

  const inputs: InputProps[] = [
    {
      id: InputNames.Email,
      label: 'Почта',
      name: InputNames.Email,
      placeholder: 'Введите почту',
      type: 'email',
    },
    {
      id: InputNames.Login,
      label: 'Логин',
      name: InputNames.Login,
      placeholder: 'Введите логин',
      type: 'text',
    },
    {
      id: InputNames.FirstName,
      label: 'Имя',
      name: InputNames.FirstName,
      placeholder: 'Введите имя',
      type: 'text',
    },
    {
      id: InputNames.SecondName,
      label: 'Фамилия',
      name: InputNames.SecondName,
      placeholder: 'Введите фамилию',
      type: 'text',
    },
    {
      id: InputNames.Phone,
      label: 'Телефон',
      name: InputNames.Phone,
      placeholder: 'Введите телефон',
      type: 'tel',
    },
    {
      id: InputNames.Password,
      label: 'Пароль',
      name: InputNames.Password,
      placeholder: 'Введите пароль',
      type: 'password',
    },
    {
      id: InputNames.ConfirmPassword,
      label: 'Пароль (ещё раз)',
      name: InputNames.ConfirmPassword,
      placeholder: 'Введите пароль ещё раз',
      type: 'password',
    },
  ]

  const defaultValues = {
    [InputNames.Email]: '',
    [InputNames.Login]: '',
    [InputNames.FirstName]: '',
    [InputNames.SecondName]: '',
    [InputNames.Phone]: '',
    [InputNames.Password]: '',
    [InputNames.ConfirmPassword]: '',
  }

  const signUpFunc = async (data: FormDefaultValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data
    console.log('Form data:', rest)
  }

  return (
    <AuthMain
      title={title}
      defaultValues={defaultValues}
      submitButtonTitle={submitButtonTitle}
      navigateButtonTitle={navigateButtonTitle}
      navigateRoute={navigateRoute}
      inputs={inputs}
      mutationFn={signUpFunc}
    />
  )
}
