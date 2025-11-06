import { Loader } from '@gravity-ui/uikit'
import { useAuth } from '@hooks/useAuth'
import { ComponentType, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const withAuth = <P extends Record<string, unknown>>(
  Component: ComponentType<P>
) => {
  return (props: P) => {
    const { isAuth, isLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (!isLoading && !isAuth) {
        navigate('/sign-in', { replace: true })
      }
    }, [isLoading, isAuth, navigate])

    if (isLoading || !isAuth) {
      return <Loader />
    }

    return <Component {...props} />
  }
}
