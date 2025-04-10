import { AppDispatch } from '../store'
import { activeNotification, NotificationState } from './notiffication.slice'
import { desactiveNotification } from './notiffication.slice'

export const setNotification = ({
  style,
  text,
}: Pick<NotificationState, 'style' | 'text'>) => {
  return (dispatch: AppDispatch) => {
    dispatch(activeNotification({ style, text }))
    setTimeout(() => {
      // @ts-expect-error the dispatch not need arguments, but typescript request arguments
      dispatch(desactiveNotification<void>())
    }, 3000)
  }
}
