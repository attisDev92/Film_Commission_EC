import {
  Card,
  Divider,
  List,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  ListItem,
} from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import MapIcon from '@mui/icons-material/Map'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import PinDropIcon from '@mui/icons-material/PinDrop'
import DescriptionIcon from '@mui/icons-material/Description'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import LanguageIcon from '@mui/icons-material/Language'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserCompanies } from '../../../hooks/useCompanies'
import styles from './RegisterServices.module.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../Redux/store'
import { setLoader, setNotification } from '../../../Redux/notificationReducer'
import EditField from '../../../components/FormikInputs/EditField'
import TextInput from '../../../components/FormikInputs/TextInput'
import { companyServices } from '../../../data/companyServiceList'
import SelectInput from '../../../components/FormikInputs/SelectInput'
import { provinciaList } from '../../../data/provinciaList'
import { useFormik } from 'formik'
import { CompanyServiceType } from '../../../types'
import ListInput from '../../../components/FormikInputs/ListInput'
import { editCompany } from '../../../Redux/companiesReducer'

const EditCompany: React.FC = () => {
  const { id } = useParams()
  const { company, loading, error } = useUserCompanies(id)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  if (loading) {
    dispatch(setLoader(true))
  }

  if (company) {
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

  const onSubmit = async (values: CompanyServiceType) => {
    dispatch(setLoader(true))
    try {
      await dispatch(editCompany(values))
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
      dispatch(setLoader(false))
    }
  }

  const formik = useFormik({
    //@ts-expect-error company
    initialValues: company || {},
    onSubmit,
    enableReinitialize: true,
  })

  return (
    <Card className={styles.card}>
      {company && (
        <>
          <Typography variant="h4">Editar Empresa</Typography>
          <Typography variant="body1">
            Puede editar los campos necesarios. Cuando haya terminado debe
            guardar todos los cambios antes de salir de la página.
          </Typography>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <List>
              <EditField
                label="Nombre de la empresa"
                avatar={<BusinessIcon />}
                value={formik.values.company}
                onSave={(newValue) => formik.setFieldValue('company', newValue)}
              >
                <TextInput
                  id="company"
                  type="text"
                  label="Nombre de la empresa"
                  placeholder="Empresa"
                  {...formik.getFieldProps('company')}
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
                    El perfil está disponible dentro del catálogo de empresas{' '}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error">
                    No se verá el perfil dentro del catalogo de empresas.
                  </Typography>
                )}
              </ListItem>
              <EditField
                label="Actividad Principal"
                value={formik.values.firstActivity}
                avatar={<CameraOutdoorIcon />}
                onSave={(newValue) =>
                  formik.setFieldValue('firstActivity', newValue)
                }
              >
                <SelectInput
                  id="firstActivity"
                  label="Actividad principal"
                  options={companyServices}
                  {...formik.getFieldProps('firstActivity')}
                />
              </EditField>
              <EditField
                label="Actividad secundaria"
                value={formik.values.secondActivity}
                avatar={<CameraOutdoorIcon />}
                onSave={(newValue) =>
                  formik.setFieldValue('secondActivity', newValue)
                }
              >
                <SelectInput
                  id="secondActivity"
                  label="Actividad secundaria"
                  options={companyServices}
                  {...formik.getFieldProps('secondActivity')}
                />
              </EditField>
              <EditField
                label="Provincia"
                value={formik.values.province}
                onSave={(newValue) =>
                  formik.setFieldValue('province', newValue)
                }
                avatar={<MapIcon />}
              >
                <SelectInput
                  id="province"
                  label="Provincia"
                  options={provinciaList}
                  {...formik.getFieldProps('province')}
                />
              </EditField>
              <EditField
                label="Ciudad"
                avatar={<LocationCityIcon />}
                value={formik.values.city}
                onSave={(newValue) => formik.setFieldValue('city', newValue)}
              >
                <TextInput
                  id="city"
                  type="text"
                  label="Ciudad"
                  placeholder="Quito"
                  {...formik.getFieldProps('city')}
                />
              </EditField>
              <EditField
                label="Dirección"
                avatar={<PinDropIcon />}
                value={formik.values.direction}
                onSave={(newValue) =>
                  formik.setFieldValue('direction', newValue)
                }
              >
                <TextInput
                  id="direction"
                  type="text"
                  label="Dirección"
                  placeholder="Av. Principal y calle secundaria"
                  {...formik.getFieldProps('direction')}
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
                  type="text"
                  label="Perfil de la empresa"
                  placeholder="Describa brevemente la trayectoria de la empresa y las actividades que realiza"
                  multiline={true}
                  rows={3}
                  {...formik.getFieldProps('description')}
                />
              </EditField>
              <EditField
                label="Descripción en Inglés"
                avatar={<DescriptionIcon />}
                value={formik.values.descriptionENG}
                onSave={(newValue) =>
                  formik.setFieldValue('descriptionENG', newValue)
                }
              >
                <TextInput
                  id="descriptionENG"
                  type="text"
                  label="Perfil de la empresa"
                  placeholder="Describa brevemente la trayectoria de la empresa y las actividades que realiza"
                  multiline={true}
                  rows={3}
                  {...formik.getFieldProps('descriptionENG')}
                />
              </EditField>
              <EditField
                label="Clientes"
                avatar={<PeopleAltIcon />}
                value={formik.values.clients}
                onSave={(newValue) => formik.setFieldValue('clients', newValue)}
              >
                <ListInput
                  id="clients"
                  label="Empresas con las que ha trabajado previamente"
                  placeholder="Puede agregar varias empresas"
                  formik={formik}
                />
              </EditField>
              <EditField
                label="E-mail"
                value={formik.values.email}
                onSave={(newValue) => formik.setFieldValue('email', newValue)}
                avatar={<AlternateEmailIcon />}
              >
                <TextInput
                  id="email"
                  type="text"
                  label="Correo de contacto"
                  placeholder="info@mail.com"
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
                label="Celular"
                avatar={<PhoneIphoneIcon />}
                value={formik.values.phone}
                onSave={(newValue) => formik.setFieldValue('phone', newValue)}
              >
                <TextInput
                  id="phone"
                  type="text"
                  label="Teléfono de contacto"
                  placeholder="0999999999"
                  {...formik.getFieldProps('phone')}
                />
              </EditField>
              <EditField
                label="Website"
                avatar={<LanguageIcon />}
                value={formik.values.website}
                onSave={(newValue) => formik.setFieldValue('website', newValue)}
              >
                <TextInput
                  id="website"
                  type="text"
                  label="Página web de la empresa"
                  placeholder="http://www.empresa.com.ec"
                  {...formik.getFieldProps('website')}
                />
              </EditField>
              <EditField
                label="Video Reel"
                avatar={<OndemandVideoIcon />}
                value={formik.values.urlVideo}
                onSave={(newValue) =>
                  formik.setFieldValue('urlVideo', newValue)
                }
              >
                <TextInput
                  id="urlVideo"
                  type="text"
                  label="Video reel de la empresa"
                  placeholder="https://www.youtube.com/12312334... o https://www.vimeo.com/12312334..."
                  {...formik.getFieldProps('urlVideo')}
                />
              </EditField>
              <EditField
                label="Plataforma"
                avatar={<SubscriptionsIcon />}
                value={formik.values.typeVideo}
                onSave={(newValue) =>
                  formik.setFieldValue('typeVideo', newValue)
                }
              >
                <SelectInput
                  id="typeVideo"
                  label="Plataforma de video"
                  options={['Vimeo', 'YouTube']}
                  {...formik.getFieldProps('typeVideo')}
                  required={true}
                />
              </EditField>
            </List>
            <Button type="submit" variant="contained">
              GUARDAR TODOS LOS CAMBIOS
            </Button>
          </form>
        </>
      )}
    </Card>
  )
}

export default EditCompany
