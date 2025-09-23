import { useAuth } from '@hooks/useAuth'
import { ComponentType } from 'react'
import { useNavigate } from 'react-router-dom'

export const withAuth = <P extends Record<string, unknown>>(
  Component: ComponentType<P>
) => {
  return (props: P) => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()

    if (!isAuth) {
      navigate('/sign-in')
      return null
    }

    return <Component {...props} />
  }
}
