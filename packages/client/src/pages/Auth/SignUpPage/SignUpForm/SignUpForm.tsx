import { type FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { TextInput, Button } from '@gravity-ui/uikit'

import { useSignUpMutation, type ErrorResponse } from '../../../../slices/api'
import {
  SignUpInputNames,
  type InputProps,
  type SignUpDefaultValues,
} from './SignUpForm.types'
import styles from './SignUpForm.module.scss'

export const SignUpForm: FC = () => {
  const navigate = useNavigate()
  const [signUp, { error, isLoading, isSuccess, isError }] = useSignUpMutation()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpDefaultValues>({
    defaultValues: {
      [SignUpInputNames.Login]: '',
      [SignUpInputNames.Password]: '',
      [SignUpInputNames.Email]: '',
      [SignUpInputNames.FirstName]: '',
      [SignUpInputNames.SecondName]: '',
      [SignUpInputNames.Phone]: '',
      [SignUpInputNames.ConfirmPassword]: '',
    },
  })

  const inputs: InputProps[] = useMemo(
    () => [
      {
        id: SignUpInputNames.Email,
        label: 'Почта',
        name: SignUpInputNames.Email,
        placeholder: 'Введите почту',
        type: 'email',
      },
      {
        id: SignUpInputNames.Login,
        label: 'Логин',
        name: SignUpInputNames.Login,
        placeholder: 'Введите логин',
        type: 'text',
      },
      {
        id: SignUpInputNames.FirstName,
        label: 'Имя',
        name: SignUpInputNames.FirstName,
        placeholder: 'Введите имя',
        type: 'text',
      },
      {
        id: SignUpInputNames.SecondName,
        label: 'Фамилия',
        name: SignUpInputNames.SecondName,
        placeholder: 'Введите фамилию',
        type: 'text',
      },
      {
        id: SignUpInputNames.Phone,
        label: 'Телефон',
        name: SignUpInputNames.Phone,
        placeholder: 'Введите телефон',
        type: 'tel',
      },
      {
        id: SignUpInputNames.Password,
        label: 'Пароль',
        name: SignUpInputNames.Password,
        placeholder: 'Введите пароль',
        type: 'password',
      },
      {
        id: SignUpInputNames.ConfirmPassword,
        label: 'Пароль (ещё раз)',
        name: SignUpInputNames.ConfirmPassword,
        placeholder: 'Введите пароль ещё раз',
        type: 'password',
      },
    ],
    []
  )

  const submitButtonTitle = 'Зарегистрироваться'
  const navigateButtonTitle = 'Есть аккаунт?'

  useEffect(() => {
    if (isError) {
      if (!error || !('data' in error)) {
        return
      }

      inputs.forEach(({ name }) =>
        setError(name, { message: (error?.data as ErrorResponse)?.reason })
      )
    }
  }, [isError, error, inputs])

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  return (
    <form
      className={styles.signUpForm}
      onSubmit={handleSubmit(data => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [SignUpInputNames.ConfirmPassword]: _, ...rest } = data
        signUp(rest)
      })}>
      <fieldset className={styles.signUpInputs} disabled={isLoading}>
        {inputs.map(({ id, name, label, placeholder, type }) => (
          <Controller
            key={id}
            name={name}
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label={label}
                placeholder={placeholder}
                validationState={errors[name] ? 'invalid' : undefined}
                errorMessage={errors[name]?.message}
                onUpdate={val => field.onChange(val)}
                type={type}
                size="xl"
              />
            )}
          />
        ))}
      </fieldset>
      <fieldset className={styles.signUpControls}>
        <Button
          type="submit"
          view="action"
          size="xl"
          width="max"
          loading={isLoading}>
          {submitButtonTitle}
        </Button>
        <Button
          view="outlined-action"
          size="xl"
          width="max"
          onClick={() => navigate('/sign-in')}
          loading={isLoading}>
          {navigateButtonTitle}
        </Button>
      </fieldset>
    </form>
  )
}
