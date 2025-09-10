export enum SignInInputNames {
  Login = 'login',
  Password = 'password',
}

export interface SignInDefaultValues {
  [SignInInputNames.Login]: string
  [SignInInputNames.Password]: string
}

export interface InputProps {
  name: SignInInputNames
  id: SignInInputNames
  label: string
  placeholder: string
  type?: 'number' | 'search' | 'text' | 'password' | 'email' | 'tel' | 'url'
}
