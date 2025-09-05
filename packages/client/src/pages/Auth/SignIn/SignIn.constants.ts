import type { InputProps } from './SignIn.types'

export const title = 'Добро пожаловать в игру "Крокодил"!'
export const submitTitle = 'Войти'
export const navigateTitle = 'Нет аккаунта?'

export enum InputNames {
  Login = 'login',
  Password = 'password',
}

export const inputs: InputProps[] = [
  {
    id: InputNames.Login,
    label: 'Логин',
    name: InputNames.Login,
    placeholder: 'Введите ваш логин',
    type: 'text',
  },
  {
    id: InputNames.Password,
    label: 'Пароль',
    name: InputNames.Password,
    placeholder: 'Введите ваш пароль',
    type: 'password',
  },
]

export const defaultValues = {
  [InputNames.Login]: '',
  [InputNames.Password]: '',
}
