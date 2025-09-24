import { selectUser } from '@slices/userSlice'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const user = useSelector(selectUser)
  const isAuth = !!user

  return { user, isAuth }
}
