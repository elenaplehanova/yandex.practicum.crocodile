import type { RegisterOptions } from 'react-hook-form'

export enum SignUpInputNames {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Phone = 'phone',
  ConfirmPassword = 'confirm_password',
}

export interface SignUpFormValues {
  [SignUpInputNames.Login]: string
  [SignUpInputNames.Password]: string
  [SignUpInputNames.Email]: string
  [SignUpInputNames.FirstName]: string
  [SignUpInputNames.SecondName]: string
  [SignUpInputNames.Phone]: string
  [SignUpInputNames.ConfirmPassword]: string
}

export interface InputProps {
  name: SignUpInputNames
  id: SignUpInputNames
  label: string
  placeholder: string
  type?: 'number' | 'search' | 'text' | 'password' | 'email' | 'tel' | 'url'
  rules?: RegisterOptions<SignUpFormValues, SignUpInputNames>
  mask?: string
  autoFocus?: boolean
}

export type Validator = {
  [SignUpInputNames.Login]: RegisterOptions<
    SignUpFormValues,
    SignUpInputNames.Login
  >
  [SignUpInputNames.Password]: RegisterOptions<
    SignUpFormValues,
    SignUpInputNames.Password
  >
  [SignUpInputNames.Email]: RegisterOptions<
    SignUpFormValues,
    SignUpInputNames.Email
  >
  [SignUpInputNames.FirstName]: RegisterOptions<
    SignUpFormValues,
    SignUpInputNames.FirstName
  >
  [SignUpInputNames.SecondName]: RegisterOptions<
    SignUpFormValues,
    SignUpInputNames.SecondName
  >
  [SignUpInputNames.Phone]: RegisterOptions<
    SignUpFormValues,
    SignUpInputNames.Phone
  >
  [SignUpInputNames.ConfirmPassword]: (
    value: string
  ) => RegisterOptions<SignUpFormValues, SignUpInputNames.ConfirmPassword>
}
