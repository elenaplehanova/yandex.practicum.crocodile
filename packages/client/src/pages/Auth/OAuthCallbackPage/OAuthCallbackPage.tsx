import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useYandexOAuth } from '@hooks/useYandexOAuth'
import { AuthLayout } from '../AuthLayout'

export const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { handleOAuthCallback } = useYandexOAuth()

  const code = searchParams.get('code')
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      console.error('OAuth error:', error)
      navigate('/sign-in')
      return
    }

    if (code) {
      ;(async () => handleOAuthCallback(code))()
    } else {
      navigate('/sign-in')
    }
  }, [code, error, handleOAuthCallback, navigate])

  return <AuthLayout title="Обработка авторизации...!"></AuthLayout>
}
