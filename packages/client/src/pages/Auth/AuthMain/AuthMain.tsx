import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { TextInput, Button } from '@gravity-ui/uikit'

import type { AuthMainProps, FormDefaultValues } from './AuthMain.types'
import styles from './AuthMain.module.scss'

export const AuthMain: FC<AuthMainProps> = ({
  title,
  defaultValues,
  submitButtonTitle,
  navigateButtonTitle,
  navigateRoute,
  inputs,
  mutationFn,
}) => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDefaultValues>({
    defaultValues,
  })

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      console.log('Mutation successful')
    },
    onError: err => {
      console.error('Mutation error:', err)
    },
  })

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <form
          className={styles.form}
          onSubmit={handleSubmit(data => mutate(data))}>
          <fieldset className={styles.inputs} disabled={isPending}>
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
          <fieldset className={styles.controls}>
            <Button
              type="submit"
              view="action"
              size="xl"
              width="max"
              loading={isPending}>
              {submitButtonTitle}
            </Button>
            <Button
              view="outlined-action"
              size="xl"
              width="max"
              onClick={() => navigate(navigateRoute)}
              loading={isPending}>
              {navigateButtonTitle}
            </Button>
          </fieldset>
        </form>
      </div>
    </section>
  )
}
