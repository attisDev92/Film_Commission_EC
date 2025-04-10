import { useParams } from 'react-router-dom'
import { useUserLocations } from '../../hooks/useLocations'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { useNavigate } from 'react-router-dom'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { setNotification } from '../../../../app/store/slices/setNotification'
import { LocationTypes } from '../../types/LocationTypes'
import { editLocation } from '../../slices/editLocation'
import { useFormik } from 'formik'
import {
  Card,
  Divider,
  List,
  Typography,
  Button,
  ListItem,
  Switch,
  FormControlLabel,
} from '@mui/material'
import MapIcon from '@mui/icons-material/Map'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import PinDropIcon from '@mui/icons-material/PinDrop'
import DescriptionIcon from '@mui/icons-material/Description'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor'
import styles from './EditLocation.module.css'
import EditField from '../../../../common/components/FormikInputs/EditField'
import TextInput from '../../../../common/components/FormikInputs/TextInput'
import SelectInput from '../../../../common/components/FormikInputs/SelectInput'
import AccessibleIcon from '@mui/icons-material/Accessible'
import CloudIcon from '@mui/icons-material/Cloud'
import { categories } from '../../utils/categories'
import filterSubcategories from '../../utils/filterSubcategories'
import { accessibilityList } from '../../utils/accessibilityList'
import { weatherList } from '../../utils/weatherList'

const EditLocation = () => {
  const { id } = useParams()
  const { location, loading, error } = useUserLocations(id)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  if (loading) {
    dispatch(setLoader(true))
  }

  if (location) {
    dispatch(setLoader(false))
  }

  if (error) {
    dispatch(
      setNotification({
        style: 'error',
        text: 'Error al cargar la información',
      }),
    )
  }

  const onSubmit = async (values: LocationTypes) => {
    dispatch(setLoader(true))
    try {
      await dispatch(editLocation(values))
      dispatch(
        setNotification({
          style: 'success',
          text: 'Cambios guardados exitosamente',
        }),
      )
      navigate('/system')
    } catch (error: unknown) {
      console.error(error)
      dispatch(
        setNotification({
          style: 'error',
          text: 'Error al guardar los cambios',
        }),
      )
    } finally {
      dispatch(setLoader(true))
    }
  }

  const formik = useFormik({
    //@ts-expect-error location
    initialValues: location || {},
    onSubmit,
    enableReinitialize: true,
  })

  return (
    <Card className={styles.card}>
      {location && (
        <>
          <Typography variant="h4">Editar Locación</Typography>
          <Typography variant="body1">
            Puede editar los campos necesarios. Cuando haya terminado debe
            guardar todos los cambios antes de salir de la página.
          </Typography>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <List>
              <EditField
                label="Nombre de la locación"
                avatar={<CameraOutdoorIcon />}
                value={formik.values.name}
                onSave={(newValue) => formik.setFieldValue('name', newValue)}
              >
                <TextInput
                  id="name"
                  label="Nombre de la locación"
                  placeholder="Nombre de la locación"
                  type="text"
                  {...formik.getFieldProps('name')}
                />
              </EditField>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      color="success"
                      checked={formik.values.public}
                      onChange={(e) =>
                        formik.setFieldValue('public', e.target.checked)
                      }
                    />
                  }
                  label="Publicar perfil"
                />
                {formik.values.public ? (
                  <Typography variant="body2" color="success">
                    El perfil está disponible dentro del catálogo de locaciones
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error">
                    No se verá el perfil dentro del catalogo de locaciones.
                  </Typography>
                )}
              </ListItem>
              <EditField
                label="Tipo de locación"
                avatar={<MapIcon />}
                value={formik.values.type}
                onSave={(newValue) => formik.setFieldValue('type', newValue)}
              >
                <SelectInput
                  id="type"
                  label="Tipo de locación"
                  options={['Público', 'Privado']}
                  {...formik.getFieldProps('type')}
                />
              </EditField>
              <EditField
                label="Categoría"
                avatar={<LocationCityIcon />}
                value={formik.values.category}
                onSave={(newValue) =>
                  formik.setFieldValue('category', newValue)
                }
              >
                <SelectInput
                  id="category"
                  label="Categoría"
                  options={categories}
                  {...formik.getFieldProps('category')}
                />
              </EditField>
              <EditField
                label="Subcategoría"
                avatar={<PinDropIcon />}
                value={formik.values.subCategory}
                onSave={(newValue) =>
                  formik.setFieldValue('subCategory', newValue)
                }
              >
                <SelectInput
                  id="subCategory"
                  label="Subcategoría"
                  options={filterSubcategories(formik.values.category)}
                  {...formik.getFieldProps('subCategory')}
                />
              </EditField>
              <EditField
                label="Descripción"
                avatar={<DescriptionIcon />}
                value={formik.values.description}
                onSave={(newValue) =>
                  formik.setFieldValue('description', newValue)
                }
              >
                <TextInput
                  id="description"
                  label="Descripción"
                  placeholder="Descripción"
                  type="text"
                  {...formik.getFieldProps('description')}
                />
              </EditField>
              <EditField
                label="Descripción en inglés"
                avatar={<DescriptionIcon />}
                value={formik.values.descriptionEn}
                onSave={(newValue) =>
                  formik.setFieldValue('descriptionEn', newValue)
                }
              >
                <TextInput
                  id="descriptionEn"
                  label="Descripción en inglés"
                  placeholder="Descripción en inglés"
                  type="text"
                  {...formik.getFieldProps('descriptionEn')}
                />
              </EditField>
              <EditField
                label="Proceso para solicitar la locación"
                avatar={<SubscriptionsIcon />}
                value={formik.values.requestInformation}
                onSave={(newValue) =>
                  formik.setFieldValue('requestInformation', newValue)
                }
              >
                <TextInput
                  id="requestInformation"
                  label="Proceso para solicitar la locación"
                  placeholder="Proceso para solicitar la locación"
                  type="text"
                  {...formik.getFieldProps('requestInformation')}
                />
              </EditField>
              <EditField
                label="Proceso para solicitar la locación en inglés"
                avatar={<SubscriptionsIcon />}
                value={formik.values.requestInformationEn}
                onSave={(newValue) =>
                  formik.setFieldValue('requestInformationEn', newValue)
                }
              >
                <TextInput
                  id="requestInformationEn"
                  label="Proceso para solicitar la locación en inglés"
                  placeholder="Proceso para solicitar la locación en inglés"
                  type="text"
                  {...formik.getFieldProps('requestInformationEn')}
                />
              </EditField>
              <EditField
                label="Clima"
                avatar={<CloudIcon />}
                value={formik.values.weather}
                onSave={(newValue) => formik.setFieldValue('weather', newValue)}
              >
                <SelectInput
                  id="weather"
                  label="Clima"
                  options={weatherList}
                  {...formik.getFieldProps('weather')}
                />
              </EditField>
              <EditField
                label="Accesibilidad"
                avatar={<AccessibleIcon />}
                value={formik.values.accessibilities}
                onSave={(newValue) =>
                  formik.setFieldValue('accessibilities', newValue)
                }
              >
                <SelectInput
                  id="accessibility"
                  label="Accesibilidad"
                  options={accessibilityList}
                  {...formik.getFieldProps('accessibility')}
                />
              </EditField>
              <EditField
                label="Nombre de contacto"
                avatar={<PeopleAltIcon />}
                value={formik.values.contactName}
                onSave={(newValue) =>
                  formik.setFieldValue('contactName', newValue)
                }
              >
                <TextInput
                  id="contactName"
                  label="Nombre de contacto"
                  placeholder="Nombre de contacto"
                  type="text"
                  {...formik.getFieldProps('contactName')}
                />
              </EditField>
              <EditField
                label="Correo electrónico"
                avatar={<AlternateEmailIcon />}
                value={formik.values.email}
                onSave={(newValue) => formik.setFieldValue('email', newValue)}
              >
                <TextInput
                  id="email"
                  label="Correo electrónico"
                  placeholder="Correo electrónico"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
              </EditField>
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      color="success"
                      checked={formik.values.activeWhatsapp}
                      onChange={(e) =>
                        formik.setFieldValue('activeWhatsapp', e.target.checked)
                      }
                    />
                  }
                  label="Habilitar WhatsApp"
                />
                {formik.values.activeWhatsapp ? (
                  <Typography variant="body2" color="success">
                    Su celular es visible y lo pueden contactar por WhatsApp.
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error">
                    Su celular está oculto y solo será visible su e-mail.
                  </Typography>
                )}
              </ListItem>
              <EditField
                label="Teléfono"
                avatar={<PhoneIphoneIcon />}
                value={formik.values.phone}
                onSave={(newValue) => formik.setFieldValue('phone', newValue)}
              >
                <TextInput
                  id="phone"
                  label="Teléfono"
                  placeholder="Teléfono"
                  type="tel"
                  {...formik.getFieldProps('phone')}
                />
              </EditField>
            </List>
            <Button type="submit" variant="contained">
              Guardar todos los cambios
            </Button>
          </form>
        </>
      )}
    </Card>
  )
}

export default EditLocation
