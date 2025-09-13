import type { RegisterOptions } from 'react-hook-form'

import { InputNames } from '../../../../utils'

type SignUpInputNames = InputNames

export interface SignUpFormValues {
  [InputNames.Login]: string
  [InputNames.Password]: string
  [InputNames.Email]: string
  [InputNames.FirstName]: string
  [InputNames.SecondName]: string
  [InputNames.Phone]: string
  [InputNames.ConfirmPassword]: string
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
