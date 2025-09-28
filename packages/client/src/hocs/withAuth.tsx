import { useAuth } from '@hooks/useAuth'
import { ComponentType, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const withAuth = <P extends Record<string, unknown>>(
  Component: ComponentType<P>
) => {
  return (props: P) => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (!isAuth) {
        navigate('/sign-in')
      }
    }, [isAuth, navigate])

    if (!isAuth) {
      return null
    }

    return <Component {...props} />
  }
}
