import { type FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { TextInput, Button } from '@gravity-ui/uikit'

import {
  useSignUpMutation,
  type ErrorResponse,
} from '../../../../slices/apiSlice'
import { getErrorTranslation } from '../../../../utils'
import {
  SignUpInputNames,
  type InputProps,
  type SignUpFormValues,
} from './SignUpForm.types'
import { VALIDATOR } from './SignUpForm.validator'
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
      [SignUpInputNames.Login]: '',
      [SignUpInputNames.Password]: '',
      [SignUpInputNames.Email]: '',
      [SignUpInputNames.FirstName]: '',
      [SignUpInputNames.SecondName]: '',
      [SignUpInputNames.Phone]: '',
      [SignUpInputNames.ConfirmPassword]: '',
    },
    mode: 'all',
  })

  const passwordValue = watch(SignUpInputNames.Password)
  const inputs: InputProps[] = useMemo(
    () => [
      {
        id: SignUpInputNames.Email,
        autoFocus: true,
        label: 'Почта',
        name: SignUpInputNames.Email,
        placeholder: 'Введите почту',
        type: 'email',
        rules: VALIDATOR[SignUpInputNames.Email],
      },
      {
        id: SignUpInputNames.Login,
        label: 'Логин',
        name: SignUpInputNames.Login,
        placeholder: 'Введите логин',
        type: 'text',
        rules: VALIDATOR[SignUpInputNames.Login],
      },
      {
        id: SignUpInputNames.FirstName,
        label: 'Имя',
        name: SignUpInputNames.FirstName,
        placeholder: 'Введите имя',
        type: 'text',
        rules: VALIDATOR[SignUpInputNames.FirstName],
      },
      {
        id: SignUpInputNames.SecondName,
        label: 'Фамилия',
        name: SignUpInputNames.SecondName,
        placeholder: 'Введите фамилию',
        type: 'text',
        rules: VALIDATOR[SignUpInputNames.SecondName],
      },
      {
        id: SignUpInputNames.Phone,
        label: 'Телефон',
        name: SignUpInputNames.Phone,
        placeholder: '+7 (___) ___-__-__',
        mask: '+7 (999) 999-99-99',
        type: 'tel',
        rules: VALIDATOR[SignUpInputNames.Phone],
      },
      {
        id: SignUpInputNames.Password,
        label: 'Пароль',
        name: SignUpInputNames.Password,
        placeholder: 'Введите пароль',
        type: 'password',
        rules: VALIDATOR[SignUpInputNames.Password],
      },
      {
        id: SignUpInputNames.ConfirmPassword,
        label: 'Пароль (ещё раз)',
        name: SignUpInputNames.ConfirmPassword,
        placeholder: 'Введите пароль ещё раз',
        type: 'password',
        rules: VALIDATOR[SignUpInputNames.ConfirmPassword](passwordValue),
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
        const { [SignUpInputNames.ConfirmPassword]: _, ...rest } = data
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
                if (name === SignUpInputNames.Phone) {
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
