import { useFormik } from 'formik'
import { LocationTypes } from '../../../types'
import { locationSchema } from '../../../Utils/validationSchemas'
import { Button, Card, SelectChangeEvent, Typography } from '@mui/material'
import styles from './Loactions.module.css'
import TextInput from '../../../components/FormikInputs/TextInput'
import SelectInput from '../../../components/FormikInputs/SelectInpu'
import { Areas, categories } from '../../../data/categories'
import { weatherList } from '../../../data/weatherList'
import { accessibilityList } from '../../../data/accessibilityList'
import filterSubcategories from '../../../Utils/filterSubcategories'
import { initialValues } from '../../../Utils/initialValiuesFormLocation'
import { postLocationInfo } from '../../../services/LoacationServices'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../../Redux/store'
import { User } from '../../../types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../Redux/store'
import { setLoader, setNotification } from '../../../Redux/notificationReducer'
import { useNavigate } from 'react-router-dom'

const RegisterLoacation: React.FC = () => {
  const user = useSelector<GlobalState, User>((state) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = async (values: LocationTypes) => {
    dispatch(setLoader(true))
    try {
      const response = await postLocationInfo(user.userToken, values)
      console.log(response)
      navigate(`/system/locations/map/${response.id}`)
    } catch (error: unknown) {
      console.log(error)
      dispatch(
        setNotification({
          text: 'Error al crear locación, vuelve a intentar',
          style: 'error',
        }),
      )
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
            helperText="min 100 caracteres, max 300 caracteres"
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
            helperText="min 100 caracteres, max 300 caracteres"
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
          <span>
            <TextInput
              id="contactName"
              type="text"
              label="Nombre de Contacto"
              placeholder="Nombre Apellido"
              {...formik.getFieldProps('contactName')}
              touchedHelper={formik.touched.contactName}
              errorHelper={formik.errors.contactName}
            />
            <TextInput
              id="email"
              type="text"
              label="Correo de contacto"
              placeholder="info@mail.com"
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
            />
          </span>
          <Button type="submit" variant="contained">
            Crear locación
          </Button>
        </form>
      </Card>
    </>
  )
}

export default RegisterLoacation
