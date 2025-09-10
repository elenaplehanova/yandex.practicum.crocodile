import type { RegisterOptions } from 'react-hook-form'

export enum SignInInputNames {
  Login = 'login',
  Password = 'password',
}

export interface SignInFormValues {
  [SignInInputNames.Login]: string
  [SignInInputNames.Password]: string
}

export interface InputProps {
  autoFocus?: boolean
  name: SignInInputNames
  id: SignInInputNames
  label: string
  placeholder: string
  type?: 'number' | 'search' | 'text' | 'password' | 'email' | 'tel' | 'url'
  rules?: RegisterOptions<SignInFormValues, SignInInputNames>
}

export type Validator = {
  [K in keyof SignInFormValues]: RegisterOptions<SignInFormValues, K>
}
