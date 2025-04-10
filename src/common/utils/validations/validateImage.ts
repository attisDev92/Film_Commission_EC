import { Image } from '../../types/types'
import imageDefault from '../../../assets/images/imageDefault.jpg'

export const validateImage = (
  image: Image | null | undefined,
): Image['url'] => {
  if (image && image.url && image.url.length > 0) {
    return image.url
  }

  return imageDefault
}
