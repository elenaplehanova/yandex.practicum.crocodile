import type { RegisterOptions } from 'react-hook-form'

import { InputNames } from '../../../../utils'

type SignInInputNames = InputNames.Login | InputNames.Password

export interface SignInFormValues {
  [InputNames.Login]: string
  [InputNames.Password]: string
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
