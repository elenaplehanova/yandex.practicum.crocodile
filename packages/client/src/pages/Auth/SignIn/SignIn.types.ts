import { InputNames } from './SignIn.constants'

export type FormValues = {
  [key in InputNames]: string
}

export interface InputProps {
  name: InputNames
  id: InputNames
  label: string
  placeholder: string
  type?: 'number' | 'search' | 'text' | 'password' | 'email' | 'tel' | 'url'
}
