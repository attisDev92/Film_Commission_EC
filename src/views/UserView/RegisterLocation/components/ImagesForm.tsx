import InputPhotos from './InputPhotos'
import InputPoster from './InputPoster'

interface ImagesFormProps {
  locationId: string
  photos: Array<{
    url: string
    _id: string
  }>
  poster: {
    url: string
  }
}

const ImagesForm: React.FC<ImagesFormProps> = ({
  locationId,
  photos,
  poster,
}) => {
  return (
    <>
      <InputPoster locationId={locationId} poster={poster} />
      <InputPhotos locationId={locationId} photos={photos} />
    </>
  )
}

export default ImagesForm
