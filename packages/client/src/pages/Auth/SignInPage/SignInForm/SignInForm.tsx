import { type FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { TextInput, Button } from '@gravity-ui/uikit'

import {
  useSignInMutation,
  type ErrorResponse,
} from '../../../../slices/apiSlice'
import { getErrorTranslation } from '../../../../utils'
import {
  SignInInputNames,
  type InputProps,
  type SignInFormValues,
} from './SignInForm.types'
import { VALIDATOR } from './SignInForm.validator'
import styles from './SignInForm.module.scss'

export const SignInForm: FC = () => {
  const navigate = useNavigate()
  const [signIn, { error, isLoading, isSuccess, isError }] = useSignInMutation()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      [SignInInputNames.Login]: '',
      [SignInInputNames.Password]: '',
    },
    mode: 'all',
  })

  const inputs: InputProps[] = useMemo(
    () => [
      {
        id: SignInInputNames.Login,
        autoFocus: true,
        label: 'Логин',
        name: SignInInputNames.Login,
        placeholder: 'Введите логин',
        type: 'text',
        rules: VALIDATOR[SignInInputNames.Login],
      },
      {
        id: SignInInputNames.Password,
        label: 'Пароль',
        name: SignInInputNames.Password,
        placeholder: 'Введите пароль',
        type: 'password',
        rules: VALIDATOR[SignInInputNames.Password],
      },
    ],
    []
  )

  const submitButtonTitle = 'Войти'
  const navigateButtonTitle = 'Нет аккаунта?'

  useEffect(() => {
    if (isError) {
      if (!error || !('data' in error)) {
        return
      }

      inputs.forEach(({ name }) =>
        setError(name, {
          message: getErrorTranslation((error?.data as ErrorResponse)?.reason),
        })
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
      className={styles.signInForm}
      onSubmit={handleSubmit(data => signIn(data))}>
      <fieldset className={styles.signInInputs} disabled={isLoading}>
        {inputs.map(
          ({ id, autoFocus, name, label, placeholder, type, rules }) => (
            <Controller
              key={id}
              name={name}
              control={control}
              rules={rules}
              render={({ field }) => (
                <TextInput
                  {...field}
                  autoFocus={autoFocus}
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
          )
        )}
      </fieldset>
      <fieldset className={styles.signInControls}>
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
          onClick={() => navigate('/sign-up')}
          loading={isLoading}>
          {navigateButtonTitle}
        </Button>
      </fieldset>
    </form>
  )
}
