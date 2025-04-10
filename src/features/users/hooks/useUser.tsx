import { useSelector } from 'react-redux'
import { GlobalState } from '../../../app/store/store'
import { User } from '../types/User'
import { UserProfile } from '../types/UserProfile'

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
