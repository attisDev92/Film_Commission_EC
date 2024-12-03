import { useSelector } from 'react-redux'
import { GlobalState } from '../Redux/store'
import { User } from '../types'

type UseUser = User | null

export const useGetUser = (): UseUser => {
  const user = useSelector<GlobalState, User>((state) => state.user)

  if (!user.userToken || !user.username) {
    return null
  }

  return user
}
