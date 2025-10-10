import { type FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { TextInput, Button } from '@gravity-ui/uikit'

import { useSignUpMutation, type ErrorResponse } from '@apis/authApi'
import { getErrorTranslation, InputNames, VALIDATOR } from '../../../../utils'
import type { InputProps, SignUpFormValues } from './SignUpForm.types'
import styles from './SignUpForm.module.scss'

export const SignUpForm: FC = () => {
  const navigate = useNavigate()
  const [signUp, { error, isLoading, isSuccess, isError }] = useSignUpMutation()

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      [InputNames.Login]: '',
      [InputNames.Password]: '',
      [InputNames.Email]: '',
      [InputNames.FirstName]: '',
      [InputNames.SecondName]: '',
      [InputNames.Phone]: '',
      [InputNames.ConfirmPassword]: '',
    },
    mode: 'all',
  })

  const passwordValue = watch(InputNames.Password)
  const inputs: InputProps[] = useMemo(
    () => [
      {
        id: InputNames.Email,
        autoFocus: true,
        label: 'Почта',
        name: InputNames.Email,
        placeholder: 'Введите почту',
        type: 'email',
        rules: VALIDATOR[InputNames.Email],
      },
      {
        id: InputNames.Login,
        label: 'Логин',
        name: InputNames.Login,
        placeholder: 'Введите логин',
        type: 'text',
        rules: VALIDATOR[InputNames.Login],
      },
      {
        id: InputNames.FirstName,
        label: 'Имя',
        name: InputNames.FirstName,
        placeholder: 'Введите имя',
        type: 'text',
        rules: VALIDATOR[InputNames.FirstName],
      },
      {
        id: InputNames.SecondName,
        label: 'Фамилия',
        name: InputNames.SecondName,
        placeholder: 'Введите фамилию',
        type: 'text',
        rules: VALIDATOR[InputNames.SecondName],
      },
      {
        id: InputNames.Phone,
        label: 'Телефон',
        name: InputNames.Phone,
        placeholder: '+7 (___) ___-__-__',
        mask: '+7 (999) 999-99-99',
        type: 'tel',
        rules: VALIDATOR[InputNames.Phone],
      },
      {
        id: InputNames.Password,
        label: 'Пароль',
        name: InputNames.Password,
        placeholder: 'Введите пароль',
        type: 'password',
        rules: VALIDATOR[InputNames.Password],
      },
      {
        id: InputNames.ConfirmPassword,
        label: 'Пароль (ещё раз)',
        name: InputNames.ConfirmPassword,
        placeholder: 'Введите пароль ещё раз',
        type: 'password',
        rules: VALIDATOR[InputNames.ConfirmPassword](passwordValue),
      },
    ],
    [passwordValue]
  )

  const submitButtonTitle = 'Зарегистрироваться'
  const navigateButtonTitle = 'Есть аккаунт?'

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
      className={styles.signUpForm}
      onSubmit={handleSubmit(data => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [InputNames.ConfirmPassword]: _, ...rest } = data
        signUp(rest)
      })}>
      <fieldset className={styles.signUpInputs} disabled={isLoading}>
        {inputs.map(
          ({ id, autoFocus, name, label, mask, placeholder, type, rules }) => (
            <Controller
              key={id}
              name={name}
              control={control}
              rules={rules}
              render={({ field }) => {
                if (name === InputNames.Phone) {
                  return (
                    <InputMask
                      mask={mask ?? ''}
                      value={field.value}
                      onChange={e => {
                        const normalized = e.target.value.replace(/\D/g, '')
                        field.onChange(normalized)
                      }}
                      onBlur={field.onBlur}>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(inputProps: any) => (
                        <TextInput
                          {...inputProps}
                          label={label}
                          placeholder={placeholder}
                          validationState={errors[name] ? 'invalid' : undefined}
                          errorMessage={errors[name]?.message}
                          type={type}
                          size="xl"
                        />
                      )}
                    </InputMask>
                  )
                }

                return (
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
                )
              }}
            />
          )
        )}
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
