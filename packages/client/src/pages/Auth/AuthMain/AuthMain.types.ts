export enum InputNames {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Phone = 'phone',
  ConfirmPassword = 'confirm_password',
}

interface SignInDefaultValues {
  [InputNames.Login]: string
  [InputNames.Password]: string
  [key: string]: string
}

interface SignUpDefaultValues {
  [InputNames.Login]: string
  [InputNames.Password]: string
  [InputNames.Email]: string
  [InputNames.FirstName]: string
  [InputNames.SecondName]: string
  [InputNames.Phone]: string
  [InputNames.ConfirmPassword]: string
  [key: string]: string
}

export type FormDefaultValues = SignInDefaultValues | SignUpDefaultValues

export interface InputProps {
  name: InputNames
  id: InputNames
  label: string
  placeholder: string
  type?: 'number' | 'search' | 'text' | 'password' | 'email' | 'tel' | 'url'
}

export interface AuthMainProps {
  title: string
  defaultValues: FormDefaultValues
  submitButtonTitle: string
  navigateButtonTitle: string
  navigateRoute: '/sign-up' | '/sign-in'
  mutationFn: (data: FormDefaultValues) => Promise<void>
  inputs: InputProps[]
}
