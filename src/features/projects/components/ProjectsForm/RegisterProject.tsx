import {
  Button,
  Card,
  FormControlLabel,
  Switch,
  Typography,
  Checkbox,
  Divider,
} from '@mui/material'
import styles from './RegisterProject.module.css'
import { useFormik } from 'formik'
import TextInput from '../../../../common/components/FormikInputs/TextInput'
import { AudiovisualProject } from '../../types/AudiovisualProject'
import { initialValues } from '../../utils/initialValuesProjectsForm'
import SelectInput from '../../../../common/components/FormikInputs/SelectInput'
import { countriesList } from '../../../../common/utils/seeds/countryList'
import { subgenresList } from '../../utils/genresList'
import ListInput from '../EditProjects/components/ListInput'
import { audiovisualProjectSchema } from '../../utils/audiovisualProjectSchema'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { setNotification } from '../../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../../app/store/store'
import { createProject } from '../../slices/createProject'

const RegisterProject: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [checkForm, setCheckForm] = useState<boolean>(false)

  const onSubmit = async (values: AudiovisualProject) => {
    console.log(values)

    dispatch(setLoader(true))
    if (!checkForm) {
      dispatch(setLoader(false))
      dispatch(
        setNotification({
          text: 'Debe aceptar las condiciones descritas al final del formulario',
          style: 'error',
        }),
      )
      return
    }
    try {
      const newProject = await dispatch(createProject(values))
      navigate(`/system/projects/files/${newProject.id}`)
    } catch (error: unknown) {
      console.error(error)
      dispatch(
        setNotification({
          style: 'error',
          text: 'Error al registrar un nuevo proyecto',
        }),
      )
    } finally {
      dispatch(setLoader(false))
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: audiovisualProjectSchema,
    onSubmit,
  })

  return (
    <Card className={styles.card}>
      <Typography variant="h5">
        Registro de proyecto work in progress
      </Typography>
      <Typography variant="body1" color="success">
        Este registro está dirigidos a proyetos de largometraje ecuatorianos en
        etapas de producción, post-producción y distribución, de cualquier
        género, Que hayan empezado su desarrollo a partir de 2020.
      </Typography>
      <Divider />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextInput
          id="name"
          type="text"
          label="Nombre del proyecto"
          placeholder="Película ..."
          {...formik.getFieldProps('name')}
          touchedHelper={formik.touched.name}
          errorHelper={formik.errors.name}
        />
        <span>
          <TextInput
            id="director"
            type="text"
            label="Director"
            placeholder="Nombre Apellido"
            {...formik.getFieldProps('director')}
            touchedHelper={formik.touched.director}
            errorHelper={formik.errors.director}
          />
          <TextInput
            id="producer"
            type="text"
            label="Productor"
            placeholder="Nombre Apellido"
            {...formik.getFieldProps('producer')}
            touchedHelper={formik.touched.producer}
            errorHelper={formik.errors.producer}
          />
        </span>
        <TextInput
          id="productionCompany"
          type="text"
          label="Empresa productora"
          placeholder="Nombre Productora Cia. Ltda."
          {...formik.getFieldProps('productionCompany')}
          touchedHelper={formik.touched.productionCompany}
          errorHelper={formik.errors.productionCompany}
          helperText="Principal empresa productora"
        />
        <Divider />
        <span>
          <SelectInput
            id="country"
            label="País de producción"
            options={countriesList}
            {...formik.getFieldProps('country')}
            required={true}
          />
          <SelectInput
            id="coproducers"
            label="Paises coproductores"
            options={countriesList}
            {...formik.getFieldProps('coproducers')}
            multiple={true}
          />
          <TextInput
            id="runTime"
            type="text"
            label="Duración"
            placeholder="90"
            {...formik.getFieldProps('runTime')}
            touchedHelper={formik.touched.runTime}
            errorHelper={formik.errors.runTime}
            helperText="En minutos. Solo números. Tiempo aproximado para proyectos sin finalizar."
          />
        </span>
        <span>
          <SelectInput
            id="genre"
            label="Genero"
            options={['Ficción', 'Documental']}
            {...formik.getFieldProps('genre')}
          />
          <SelectInput
            id="subGenres"
            label="Sub-generos"
            options={subgenresList}
            {...formik.getFieldProps('subGenres')}
            multiple={true}
          />
        </span>
        <TextInput
          id="sinopsis"
          type="text"
          label="Sinopsis"
          placeholder="La película trata sobre..."
          multiline={true}
          rows={3}
          {...formik.getFieldProps('sinopsis')}
          touchedHelper={formik.touched.sinopsis}
          errorHelper={formik.errors.sinopsis}
          helperText="min 100 caracteres, max 300 caracteres"
        />
        <TextInput
          id="sinopsisEng"
          type="text"
          label="Sinopsis - EN INGLÉS"
          placeholder="Sinopsis de la obra en idioma inglés..."
          multiline={true}
          rows={3}
          {...formik.getFieldProps('sinopsisEng')}
          touchedHelper={formik.touched.sinopsisEng}
          errorHelper={formik.errors.sinopsisEng}
          helperText="min 100 caracteres, max 300 caracteres"
        />
        <span>
          <SelectInput
            id="currentSituation"
            label="Etapa actual del proyecto"
            options={['Producción', 'Post-Producción', 'Distribución']}
            {...formik.getFieldProps('currentSituation')}
          />
          <TextInput
            id="year"
            type="text"
            label="Año en que inicio esta etapa"
            placeholder="2024"
            {...formik.getFieldProps('year')}
            touchedHelper={formik.touched.year}
            errorHelper={formik.errors.year}
          />
        </span>
        <TextInput
          id="needs"
          type="text"
          label="Necesidad del proyecto"
          placeholder="Ejm: En busca de un distribuidor"
          multiline={true}
          rows={2}
          {...formik.getFieldProps('needs')}
          touchedHelper={formik.touched.needs}
          errorHelper={formik.errors.needs}
          helperText="min 50 caracteres, max 150 caracteres"
        />
        <TextInput
          id="needsENG"
          type="text"
          label="Necesidad del proyecto - EN INGLÉS"
          placeholder="Ejm: We are looking for funding for... "
          multiline={true}
          rows={2}
          {...formik.getFieldProps('needsENG')}
          touchedHelper={formik.touched.needsENG}
          errorHelper={formik.errors.needsENG}
          helperText="min 50 caracteres, max 150 caracteres"
        />
        <TextInput
          id="trailer"
          type="text"
          label="Enlace del trailer o teaser"
          placeholder="https://www.vimeo.com/12312334..."
          {...formik.getFieldProps('trailer')}
          touchedHelper={formik.touched.trailer}
          errorHelper={formik.errors.trailer}
          helperText="*OPCIONAL Subir enlace del video en la plataforma Vimeo."
        />
        <ListInput
          id="recognitions"
          label="Premios, fondos y reconocimientos"
          placeholder="Fondo de fomento..."
          formik={formik}
        />
        <span>
          <TextInput
            id="email"
            type="text"
            label="E-mail"
            placeholder="película@mail.com"
            {...formik.getFieldProps('email')}
            touchedHelper={formik.touched.email}
            errorHelper={formik.errors.email}
          />
          <TextInput
            id="phone"
            type="text"
            label="Teléfono de contacto"
            placeholder="0999999999"
            {...formik.getFieldProps('phone')}
            touchedHelper={formik.touched.phone}
            errorHelper={formik.errors.phone}
            helperText="No incluir el código de país"
          />
          <TextInput
            id="website"
            type="text"
            label="Página web de la empresa"
            placeholder="http://www.empresa.com.ec"
            {...formik.getFieldProps('website')}
            touchedHelper={formik.touched.website}
            errorHelper={formik.errors.website}
            helperText="*OPCIONAL"
          />
        </span>
        <span>
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={formik.values.activeWhatsapp || false}
                onChange={(e) =>
                  formik.setFieldValue('activeWhatsapp', e.target.checked)
                }
              />
            }
            label="Pueden contactarlo por WhatsApp y/o teléfono celular."
          />
          <Typography variant="body2">
            *IMPORTANTE: Si no marca esta casilla su teléfono celular
            permanecerá oculto a otros usuarios. Solo el e-mail será visible
            para otros usuarios.
          </Typography>
        </span>
        <div className={styles.checkInput}>
          <Typography variant="h6">
            El usuario <strong>DECLARA</strong> que la información aquí
            consignada es real y verídica y <strong>AUTORIZA</strong> que la
            misma sea publicada en la presente página web.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                checked={checkForm}
                onChange={(e) => setCheckForm(e.target.checked)}
              />
            }
            label="ACEPTA LAS CONDICIONES"
          />
        </div>
        <Typography variant="body1" color="success">
          La información proporcionada será parte del catálogo de proyectos Work
          in Progress que podrán ser visualizados en la página web
          www.cinemaec.com
        </Typography>
        <Button variant="contained" type="submit">
          Registrar proyecto
        </Button>
      </form>
    </Card>
  )
}

export default RegisterProject
