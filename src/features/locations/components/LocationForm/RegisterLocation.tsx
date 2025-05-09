import { useFormik } from 'formik'
import { LocationTypes } from '../../types/LocationTypes'
import { locationSchema } from '../../utils/locationSchema'
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  Switch,
  Typography,
} from '@mui/material'
import styles from './Loactions.module.css'
import TextInput from '../../../../common/components/FormikInputs/TextInput'
import SelectInput from '../../../../common/components/FormikInputs/SelectInput'
import { Areas, categories } from '../../utils/categories'
import { weatherList } from '../../utils/weatherList'
import {
  accessibilityList,
  nearbyServicesList,
  servicesLocation,
} from '../../utils/accessibilityList'
import filterSubcategories from '../../utils/filterSubcategories'
import { initialValues } from '../../utils/initialValiuesFormLocation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { postNewLocation } from '../../slices/postNewLocation'
import { useNavigate } from 'react-router-dom'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { useState } from 'react'
import { setNotification } from '../../../../app/store/slices/setNotification'

const RegisterLocation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [checkForm, setCheckForm] = useState(false)

  const onSubmit = async (values: LocationTypes) => {
    dispatch(setLoader(true))
    try {
      if (!checkForm) {
        dispatch(setLoader(false))
        dispatch(
          setNotification({
            text: 'Debe aceptar las condiciones para registrar la locación',
            style: 'error',
          }),
        )
        return
      }
      const response = await dispatch(postNewLocation(values))
      if (response && response.id) {
        navigate(`/system/locations/files/${response.id}`)
      }
    } catch (error) {
      console.error('Error al crear la locación:', error)
    } finally {
      dispatch(setLoader(false))
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: locationSchema,
    onSubmit,
  })

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const newCategory = event.target.value as Areas
    formik.setFieldValue('category', newCategory)
    formik.setFieldValue('subCategory', [])
  }

  return (
    <>
      <Card className={styles.card}>
        <Typography variant="h5">Registro de nueva locación</Typography>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <TextInput
            id="name"
            type="text"
            label="Nombre de la locación"
            placeholder="Nombre"
            {...formik.getFieldProps('name')}
            touchedHelper={formik.touched.name}
            errorHelper={formik.errors.name}
          />
          <span>
            <SelectInput
              id="type"
              label="Tipo de locación"
              options={['Público', 'Privado']}
              {...formik.getFieldProps('type')}
              required={true}
            />
            <SelectInput
              id="category"
              label="Categoría"
              options={categories}
              {...formik.getFieldProps('category')}
              onChange={handleCategoryChange}
              required={true}
            />
            <SelectInput
              id="subCategory"
              label="Sub-Categorías"
              options={filterSubcategories(formik.values.category)}
              {...formik.getFieldProps('subCategory')}
              required={true}
              multiple={true}
            />
          </span>
          <TextInput
            id="description"
            type="text"
            label="Descripción del lugar"
            placeholder="El espacio es ..."
            multiline={true}
            rows={3}
            {...formik.getFieldProps('description')}
            touchedHelper={formik.touched.description}
            errorHelper={formik.errors.description}
            helperText="min 100 caracteres, max 1000 caracteres"
          />
          <TextInput
            id="descriptionEn"
            type="text"
            label="Descripción del lugar (inglés)"
            placeholder="The space is ..."
            multiline={true}
            rows={3}
            {...formik.getFieldProps('descriptionEn')}
            touchedHelper={formik.touched.descriptionEn}
            errorHelper={formik.errors.descriptionEn}
            helperText="min 100 caracteres, max 1000 caracteres"
          />
          <TextInput
            id="requestInformation"
            type="text"
            label="Condiciones de uso"
            placeholder="Para solicitar la locación se debe ..."
            multiline={true}
            rows={3}
            {...formik.getFieldProps('requestInformation')}
            touchedHelper={formik.touched.requestInformation}
            errorHelper={formik.errors.requestInformation}
            helperText="min 100 caracteres, max 1000 caracteres"
          />
          <TextInput
            id="requestInformationEn"
            type="text"
            label="Condiciones de uso (inglés)"
            placeholder="To request the location you must ..."
            multiline={true}
            rows={3}
            {...formik.getFieldProps('requestInformationEn')}
            touchedHelper={formik.touched.requestInformationEn}
            errorHelper={formik.errors.requestInformationEn}
            helperText="min 100 caracteres, max 1000 caracteres"
          />
          <span>
            <SelectInput
              id="weather"
              label="Clima"
              options={weatherList}
              {...formik.getFieldProps('weather')}
              required={true}
              multiple={true}
              helperText="Clima de la locación"
            />
            <SelectInput
              id="accessibilities"
              label="Medios de acceso a la locación"
              options={accessibilityList}
              {...formik.getFieldProps('accessibilities')}
              multiple={true}
              required={true}
              helperText="Cómo se puede acceder a la locación"
            />
          </span>
          <span>
            <SelectInput
              id="services"
              label="Servicios de la locación"
              options={servicesLocation}
              {...formik.getFieldProps('services')}
              required={true}
              multiple={true}
              helperText="Servicios que ofrece la locación"
            />
            <SelectInput
              id="nearbyServices"
              label="Servicios cercanos"
              options={nearbyServicesList}
              {...formik.getFieldProps('nearbyServices')}
              multiple={true}
              required={true}
              helperText="Servicios cercanos a la locación"
            />
          </span>
          <TextInput
            id="contactName"
            type="text"
            label="Nombre de contacto"
            placeholder="Nombre"
            {...formik.getFieldProps('contactName')}
            touchedHelper={formik.touched.contactName}
            errorHelper={formik.errors.contactName}
          />
          <TextInput
            id="email"
            type="email"
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            {...formik.getFieldProps('email')}
            touchedHelper={formik.touched.email}
            errorHelper={formik.errors.email}
          />
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
          <TextInput
            id="phoneNumber"
            type="tel"
            label="Teléfono fijo"
            placeholder="022110000"
            {...formik.getFieldProps('phoneNumber')}
            touchedHelper={formik.touched.phoneNumber}
            errorHelper={formik.errors.phoneNumber}
          />
          <TextInput
            id="website"
            type="text"
            label="Sitio web"
            placeholder="www.locacion.com"
            {...formik.getFieldProps('website')}
            touchedHelper={formik.touched.website}
            errorHelper={formik.errors.website}
          />
          <TextInput
            id="phone"
            type="tel"
            label="Teléfono"
            placeholder="0999999999"
            {...formik.getFieldProps('phone')}
            touchedHelper={formik.touched.phone}
            errorHelper={formik.errors.phone}
          />
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
          <Button type="submit" variant="contained">
            Registrar locación
          </Button>
        </form>
      </Card>
    </>
  )
}

export default RegisterLocation
