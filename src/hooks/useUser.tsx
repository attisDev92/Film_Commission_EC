import { useSelector } from 'react-redux'
import { GlobalState } from '../Redux/store'
import { User, UserProfile } from '../types'

export const useGetUser = (): User | null => {
  const user = useSelector<GlobalState, User>((state) => state.user)

  if (!user.userToken || !user.username) {
    return null
  }

  return user
}

export const useGetProfile = (): UserProfile | null => {
  const profile = useSelector<GlobalState, UserProfile>(
    (state) => state.userProfile,
  )

  if (!profile) return null
  return profile
}
