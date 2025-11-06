import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useGetYandexServiceIdQuery,
  useSignInWithYandexIdMutation,
  useGetUserQuery,
} from '@apis/authApi'

export const useYandexOAuth = () => {
  const YANDEX_OAUTH_URL = 'https://oauth.yandex.ru/authorize'
  const REDIRECT_URI =
    import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''

  const navigate = useNavigate()
  const {
    data: serviceData,
    isLoading: isLoadingServiceId,
    error: serviceIdError,
    refetch: getServiceId,
  } = useGetYandexServiceIdQuery()

  const [
    signInWithYandexId,
    { isLoading: isLoadingSignIn, error: signInError },
  ] = useSignInWithYandexIdMutation()

  const { refetch: refetchUser } = useGetUserQuery(undefined, {
    skip: true,
  })

  const initiateAuth = useCallback(async () => {
    if (typeof window === 'undefined') return

    try {
      let serviceId = serviceData?.service_id

      if (!serviceId) {
        const result = await getServiceId()

        if (!result.data?.service_id) {
          throw new Error('Service ID не найден')
        }

        serviceId = result.data.service_id
      }

      const params = new URLSearchParams({
        response_type: 'code',
        client_id: serviceId,
        redirect_uri: REDIRECT_URI,
      })

      window.location.href = `${YANDEX_OAUTH_URL}?${params.toString()}`
    } catch (error) {
      console.error('Ошибка OAuth:', error)
    }
  }, [serviceData?.service_id, REDIRECT_URI, getServiceId])

  const handleOAuthCallback = useCallback(
    async (code: string) => {
      try {
        await signInWithYandexId({
          code,
          redirect_uri: REDIRECT_URI,
        }).unwrap()

        await refetchUser()

        window.history.replaceState({}, '', '/')

        navigate('/')
      } catch (err) {
        console.error('Ошибка OAuth callback:', err)
        navigate('/sign-in')
      }
    },
    [signInWithYandexId, REDIRECT_URI, refetchUser, navigate]
  )

  return {
    initiateAuth,
    handleOAuthCallback,
    isLoading: isLoadingServiceId || isLoadingSignIn,
    error: serviceIdError || signInError,
  }
}
