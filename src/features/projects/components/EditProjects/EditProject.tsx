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
import { useNavigate, useParams } from 'react-router-dom'
import { useUserProjects } from '../../hooks/useAudiovsiualProjects'
import styles from './EditProject.module.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { setNotification } from '../../../../app/store/slices/setNotification'
import EditField from '../../../../common/components/FormikInputs/EditField'
import TextInput from '../../../../common/components/FormikInputs/TextInput'
import { useFormik } from 'formik'
import { AudiovisualProject } from '../../types/AudiovisualProject'
import { editProject } from '../../slices/editProject'
import { countriesList } from '../../../../common/utils/seeds/countryList'
import SelectInput from '../../../../common/components/FormikInputs/SelectInput'
import { subgenresList } from '../../utils/genresList'
import ListInput from './components/ListInput'

const EditProject = () => {
  const { id } = useParams()
  const { project, loading, error } = useUserProjects(id)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  if (loading) {
    dispatch(setLoader(true))
  }

  if (project) {
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

  const onSubmit = async (values: AudiovisualProject) => {
    dispatch(setLoader(true))
    try {
      await dispatch(editProject(values))
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
    //@ts-expect-error initial values it's must be a void object
    initialValues: project || {},
    onSubmit,
    enableReinitialize: true,
  })

  return (
    <Card className={styles.card}>
      {project && (
        <>
          <Typography variant="h4">Editar proyecto audiovisual</Typography>
          <Typography variant="body1">
            Puede editar los campos necesarios. Cuando haya terminado debe
            guardar todos los cambios antes de salir de la página.
          </Typography>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <List>
              <EditField
                label="Nombre del proyecto"
                value={formik.values.name}
                onSave={(newValue) => formik.setFieldValue('name', newValue)}
              >
                <TextInput
                  id="name"
                  type="text"
                  label="Nombre del proyecto"
                  placeholder="Película ..."
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
                    El perfil está disponible dentro del catálogo Work in
                    Progress en www.cinemaec.com
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error">
                    No se verá el perfil dentro del catalogo Work in Progress.
                  </Typography>
                )}
              </ListItem>
              <EditField
                label="Director"
                value={formik.values.director}
                onSave={(newValue) =>
                  formik.setFieldValue('director', newValue)
                }
              >
                <TextInput
                  id="director"
                  type="text"
                  label="Director"
                  placeholder="Nombre Apellido"
                  {...formik.getFieldProps('director')}
                />
              </EditField>
              <EditField
                label="Productor"
                value={formik.values.producer}
                onSave={(newValue) =>
                  formik.setFieldValue('producer', newValue)
                }
              >
                <TextInput
                  id="producer"
                  type="text"
                  label="Productor"
                  placeholder="Nombre Apellido"
                  {...formik.getFieldProps('producer')}
                />
              </EditField>
              <EditField
                label="Empresa productora"
                value={formik.values.productionCompany}
                onSave={(newValue) =>
                  formik.setFieldValue('productionCompany', newValue)
                }
              >
                <TextInput
                  id="productionCompany"
                  type="text"
                  label="Empresa productora"
                  placeholder="Nombre Productora Cia. Ltda."
                  {...formik.getFieldProps('productionCompany')}
                  helperText="Principal empresa productora"
                />
              </EditField>
              <EditField
                label="País"
                value={formik.values.country}
                onSave={(newValue) => formik.setFieldValue('country', newValue)}
              >
                <SelectInput
                  id="country"
                  label="País de producción"
                  options={countriesList}
                  {...formik.getFieldProps('country')}
                />
              </EditField>
              <EditField
                label="Paises coproductores"
                value={formik.values.coproducers}
                onSave={(newValue) =>
                  formik.setFieldValue('coproducers', newValue)
                }
              >
                <SelectInput
                  id="coproducers"
                  label="Paises coproductores"
                  options={countriesList}
                  {...formik.getFieldProps('coproducers')}
                  multiple={true}
                />
              </EditField>
              <EditField
                label="Duración"
                value={formik.values.runTime}
                onSave={(newValue) => formik.setFieldValue('runTime', newValue)}
              >
                <TextInput
                  id="runTime"
                  type="text"
                  label="Duración"
                  placeholder="90"
                  {...formik.getFieldProps('runTime')}
                  helperText="En minutos. Solo números. Tiempo aproximado para proyectos sin finalizar."
                />
              </EditField>
              <EditField
                label="Género"
                value={formik.values.genre}
                onSave={(newValue) => formik.setFieldValue('genre', newValue)}
              >
                <SelectInput
                  id="genre"
                  label="Genero"
                  options={['Ficción', 'Documental']}
                  {...formik.getFieldProps('genre')}
                />
              </EditField>
              <EditField
                label="Sub-generos"
                value={formik.values.subGenres}
                onSave={(newValue) =>
                  formik.setFieldValue('subGenres', newValue)
                }
              >
                <SelectInput
                  id="subGenres"
                  label="Sub-generos"
                  options={subgenresList}
                  {...formik.getFieldProps('subGenres')}
                  multiple={true}
                />
              </EditField>
              <EditField
                label="Sinopsis"
                value={formik.values.sinopsis}
                onSave={(newValue) =>
                  formik.setFieldValue('sinopsis', newValue)
                }
              >
                <TextInput
                  id="sinopsis"
                  type="text"
                  label="Sinopsis"
                  placeholder="La película trata sobre..."
                  multiline={true}
                  rows={3}
                  {...formik.getFieldProps('sinopsis')}
                  helperText="min 100 caracteres, max 300 caracteres"
                />
              </EditField>
              <EditField
                label="Sinopsis - EN INGLÉS"
                value={formik.values.sinopsisEng}
                onSave={(newValue) =>
                  formik.setFieldValue('sinopsisEng', newValue)
                }
              >
                <TextInput
                  id="sinopsisEng"
                  type="text"
                  label="Sinopsis - EN INGLÉS"
                  placeholder="Sinopsis de la obra en idioma inglés..."
                  multiline={true}
                  rows={3}
                  {...formik.getFieldProps('sinopsisEng')}
                  helperText="min 100 caracteres, max 300 caracteres"
                />
              </EditField>
              <EditField
                label="Etapa actual del proyecto"
                value={formik.values.currentSituation}
                onSave={(newValue) =>
                  formik.setFieldValue('currentSituation', newValue)
                }
              >
                <SelectInput
                  id="currentSituation"
                  label="Etapa actual del proyecto"
                  options={['Producción', 'Post-Producción', 'Distribución']}
                  {...formik.getFieldProps('currentSituation')}
                />
              </EditField>
              <EditField
                label="Etapa actual del proyecto"
                value={formik.values.currentSituation}
                onSave={(newValue) =>
                  formik.setFieldValue('currentSituation', newValue)
                }
              >
                <SelectInput
                  id="currentSituation"
                  label="Etapa actual del proyecto"
                  options={['Producción', 'Post-Producción', 'Distribución']}
                  {...formik.getFieldProps('currentSituation')}
                />
              </EditField>
              <EditField
                label="Etapa actual del proyecto"
                value={formik.values.currentSituation}
                onSave={(newValue) =>
                  formik.setFieldValue('currentSituation', newValue)
                }
              >
                <SelectInput
                  id="currentSituation"
                  label="Etapa actual del proyecto"
                  options={['Producción', 'Post-Producción', 'Distribución']}
                  {...formik.getFieldProps('currentSituation')}
                />
              </EditField>
              <EditField
                label="Etapa actual del proyecto"
                value={formik.values.currentSituation}
                onSave={(newValue) =>
                  formik.setFieldValue('currentSituation', newValue)
                }
              >
                <SelectInput
                  id="currentSituation"
                  label="Etapa actual del proyecto"
                  options={['Producción', 'Post-Producción', 'Distribución']}
                  {...formik.getFieldProps('currentSituation')}
                />
              </EditField>
              <EditField
                label="year"
                value={formik.values.year}
                onSave={(newValue) => formik.setFieldValue('year', newValue)}
              >
                <TextInput
                  id="year"
                  type="text"
                  label="Año en que inicio esta etapa"
                  placeholder="2024"
                  {...formik.getFieldProps('year')}
                />
              </EditField>
              <EditField
                label="Necesidad del proyecto"
                value={formik.values.needs}
                onSave={(newValue) => formik.setFieldValue('needs', newValue)}
              >
                <TextInput
                  id="needs"
                  type="text"
                  label="Necesidad del proyecto"
                  placeholder="Ejm: En busca de un distribuidor"
                  multiline={true}
                  rows={2}
                  {...formik.getFieldProps('needs')}
                  helperText="min 50 caracteres, max 150 caracteres"
                />
              </EditField>
              <EditField
                label="Necesidad del proyecto - EN INGLÉS"
                value={formik.values.needsENG}
                onSave={(newValue) =>
                  formik.setFieldValue('needsENG', newValue)
                }
              >
                <TextInput
                  id="needsENG"
                  type="text"
                  label="Necesidad del proyecto - EN INGLÉS"
                  placeholder="Ejm: We are looking for funding for... "
                  multiline={true}
                  rows={2}
                  {...formik.getFieldProps('needsENG')}
                  helperText="min 50 caracteres, max 150 caracteres"
                />
              </EditField>
              <EditField
                label="Enlace del trailer o teaser"
                value={formik.values.trailer}
                onSave={(newValue) => formik.setFieldValue('trailer', newValue)}
              >
                <TextInput
                  id="trailer"
                  type="text"
                  label="Enlace del trailer o teaser"
                  placeholder="https://www.vimeo.com/12312334..."
                  {...formik.getFieldProps('trailer')}
                  helperText="*OPCIONAL Subir enlace del video en la plataforma Vimeo."
                />
              </EditField>
              <EditField
                label="Premios, fondos, reconocimientos"
                value={formik.values.recognitions}
                onSave={(newValue) =>
                  formik.setFieldValue('recognitions', newValue)
                }
              >
                <ListInput
                  id="recognitions"
                  label="Premios, fondos y reconocimientos"
                  placeholder="Fondo de fomento..."
                  formik={formik}
                />
              </EditField>
              <EditField
                label="E-mail"
                value={formik.values.email}
                onSave={(newValue) => formik.setFieldValue('email', newValue)}
              >
                <TextInput
                  id="email"
                  type="text"
                  label="E-mail"
                  placeholder="película@mail.com"
                  {...formik.getFieldProps('email')}
                />
              </EditField>
              <EditField
                label="Teléfono de contacto"
                value={formik.values.phone}
                onSave={(newValue) => formik.setFieldValue('phone', newValue)}
              >
                <TextInput
                  id="phone"
                  type="text"
                  label="Teléfono de contacto"
                  placeholder="0999999999"
                  {...formik.getFieldProps('phone')}
                  helperText="No incluir el código de país"
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
                label="Página web de la empresa"
                value={formik.values.website}
                onSave={(newValue) => formik.setFieldValue('website', newValue)}
              >
                <TextInput
                  id="website"
                  type="text"
                  label="Página web de la empresa"
                  placeholder="http://www.empresa.com.ec"
                  {...formik.getFieldProps('website')}
                  helperText="*OPCIONAL"
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

export default EditProject
