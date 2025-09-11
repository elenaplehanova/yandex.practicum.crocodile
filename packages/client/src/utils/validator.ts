export enum InputNames {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Phone = 'phone',
  ConfirmPassword = 'confirm_password',
}

export const VALIDATOR = {
  [InputNames.Login]: {
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
  [InputNames.Password]: {
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
  [InputNames.ConfirmPassword]: (passwordValue: string) => ({
    required: 'Введите пароль еще раз',
    validate: (value: string) =>
      value === passwordValue || 'Пароли не совпадают',
  }),
  [InputNames.FirstName]: {
    required: 'Введите имя',
    pattern: {
      value: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
      message:
        'Имя должно состоять из букв или дефиса и начинаться с заглавной буквы',
    },
  },
  [InputNames.SecondName]: {
    required: 'Введите фамилию',
    pattern: {
      value: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
      message:
        'Фамилия должна состоять из букв или дефиса и начинаться с заглавной буквы',
    },
  },
  [InputNames.Email]: {
    required: 'Введите почту',
    pattern: {
      value: /^((?!\.)[\w.-]*[^.])@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Введите корректный адрес почты',
    },
  },
  [InputNames.Phone]: {
    required: 'Введите номер телефона',
    pattern: {
      value: /^(\+7|7|8)\d{10}$/,
      message: 'Введите корректный номер телефона',
    },
  },
}
