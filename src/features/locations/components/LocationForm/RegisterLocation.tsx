import { useFormik } from 'formik'
import { LocationTypes } from '../../types/LocationTypes'
import { locationSchema } from '../../utils/locationSchema'
import { Button, Card, SelectChangeEvent, Typography } from '@mui/material'
import styles from './Loactions.module.css'
import TextInput from '../../../../common/components/FormikInputs/TextInput'
import SelectInput from '../../../../common/components/FormikInputs/SelectInput'
import { Areas, categories } from '../../utils/categories'
import { weatherList } from '../../utils/weatherList'
import { accessibilityList } from '../../utils/accessibilityList'
import filterSubcategories from '../../utils/filterSubcategories'
import { initialValues } from '../../utils/initialValiuesFormLocation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { postNewLocation } from '../../slices/postNewLocation'
import { useNavigate } from 'react-router-dom'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'

const RegisterLocation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = async (values: LocationTypes) => {
    dispatch(setLoader(true))
    try {
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
            label="Proceso para solicitar la locación"
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
            label="Proceso para solicitar la locación (inglés)"
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
            />
            <SelectInput
              id="accessibilities"
              label="Accesibilidad"
              options={accessibilityList}
              {...formik.getFieldProps('accessibilities')}
              multiple={true}
              required={true}
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
          <TextInput
            id="phone"
            type="tel"
            label="Teléfono"
            placeholder="0999999999"
            {...formik.getFieldProps('phone')}
            touchedHelper={formik.touched.phone}
            errorHelper={formik.errors.phone}
          />
          <Button type="submit" variant="contained">
            Registrar locación
          </Button>
        </form>
      </Card>
    </>
  )
}

export default RegisterLocation
