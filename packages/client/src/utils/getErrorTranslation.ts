export const getErrorTranslation = (reason?: string) => {
  switch (reason) {
    case 'User already in system':
      return 'Пользователь уже авторизован. Выйдите из аккаунта'
    case 'Login or password is incorrect':
      return 'Введите корректные логин и пароль'
    case 'Email already exists':
      return 'Пользователь с таким email уже существует'
    case 'Login already exists':
      return 'Пользователь с таким логином уже существует'
    default:
      return reason ?? 'Что-то пошло не так. Попробуйте ещё раз'
  }
}
