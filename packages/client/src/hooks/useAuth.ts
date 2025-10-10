import { useGetUserQuery } from '@apis/authApi'

export const useAuth = () => {
  const {
    data: user,
    isLoading,
    error,
    isSuccess,
    refetch,
  } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const isAuth = isSuccess && !!user

  return {
    user,
    isAuth,
    isLoading,
    error,
    refetch,
  }
}
