import { fetchUserThunk, selectUser } from '@slices/userSlice'
import { PageInitArgs } from 'routes'

export const ensureUser = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserThunk())
  }
}
