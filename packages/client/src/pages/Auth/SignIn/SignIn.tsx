import { type FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { TextInput, Button } from '@gravity-ui/uikit'

import { AuthTemplate } from '../AuthTemplate'
import {
  title,
  submitTitle,
  navigateTitle,
  inputs,
  defaultValues,
} from './SignIn.constants'
import type { FormValues } from './SignIn.types'
import styles from './SignIn.module.scss'

export const SignIn: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  })

  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form data:', data)
    setLoading(false)
  }

  return (
    <AuthTemplate title={title}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.inputs}>
          {inputs.map(({ id, name, label, placeholder, type }) => (
            <Controller
              key={id}
              name={name}
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  disabled={isLoading}
                  label={label}
                  placeholder={placeholder}
                  validationState={errors[name] ? 'invalid' : undefined}
                  errorMessage={errors[name]?.message}
                  onUpdate={val => field.onChange(val)}
                  size="xl"
                  type={type}
                />
              )}
            />
          ))}
        </fieldset>
        <fieldset className={styles.controls}>
          <Button
            type="submit"
            view="action"
            size="xl"
            width="max"
            loading={isLoading}>
            {submitTitle}
          </Button>
          <Button
            view="outlined-action"
            size="xl"
            width="max"
            onClick={() => navigate('/sign-up')}
            loading={isLoading}>
            {navigateTitle}
          </Button>
        </fieldset>
      </form>
    </AuthTemplate>
  )
}
