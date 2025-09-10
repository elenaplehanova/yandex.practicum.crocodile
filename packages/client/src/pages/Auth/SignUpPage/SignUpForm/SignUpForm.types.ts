export enum SignUpInputNames {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Phone = 'phone',
  ConfirmPassword = 'confirm_password',
}

export interface SignUpDefaultValues {
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
}
