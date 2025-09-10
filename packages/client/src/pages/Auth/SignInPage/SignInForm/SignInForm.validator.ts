import { SignInInputNames, type Validator } from './SignInForm.types'

export const VALIDATOR: Validator = {
  [SignInInputNames.Login]: {
    required: 'Введите логин',
    pattern: {
      value: /^(?!\d+$)[A-Za-z0-9_-]+$/,
      message:
        'Логин может содержать латинские буквы, цифры, дефисы или подчеркивания. Не может состоять из одних цифр',
    },
    minLength: {
      value: 3,
      message:
        'Логин минимум 3 символа. Может содержать латинские буквы, цифры, дефисы или подчеркивания. Не может состоять из одних цифр',
    },
    maxLength: {
      value: 20,
      message: 'Логин максимум 20 символов',
    },
  },
  [SignInInputNames.Password]: {
    required: 'Введите пароль',
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).+$/,
      message:
        'Пароль обязательно должен содержать хотя бы одну заглавную букву и цифру',
    },
    minLength: {
      value: 8,
      message:
        'Пароль минимум 8 символов. Обязательно должен содержать хотя бы одну заглавную букву и цифру',
    },
    maxLength: {
      value: 40,
      message: 'Пароль максимум 40 символов',
    },
  },
}
