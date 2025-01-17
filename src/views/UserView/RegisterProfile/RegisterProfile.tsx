import { Button, Card, Typography, FormHelperText } from '@mui/material'
import styles from './RegisterProfile.module.css'
import { useFormik } from 'formik'
import { User, UserProfile } from '../../../types'
import TextInput from '../../../components/FormikInputs/TextInput'
import { userProfileSchema } from '../../../Utils/profileValidationSchema'
import SelectInput from '../../../components/FormikInputs/SelectInpu'
import { countriesList } from '../../../data/countryList'
import BirthdateInput from '../../../components/FormikInputs/BirthdateInput'
import { Dayjs } from 'dayjs'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../Redux/store'
import { setLoader } from '../../../Redux/notificationReducer'
import { postProfileData } from '../../../Redux/profileReducer'
import { useGetUser } from '../../../hooks/useUser'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const initialValuesForm: UserProfile = {
  firstName: '',
  lastName: '',
  //@ts-expect-error initial value it's must be a void string
  identificationType: '',
  identification: '',
  nationality: '',
  residenceCity: '',
  //@ts-expect-error initial value it's must be a null
  birthdate: null,
  //@ts-expect-error initial value it's must be a void string
  genre: '',
  cellPhone: '',
}

const RegisterProfile: React.FC = () => {
  const user: User | null = useGetUser()
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (values: UserProfile) => {
    dispatch(setLoader(true))
    dispatch(postProfileData(user?.userToken as string, values)).then(() => {
      navigate('/system')
      dispatch(setLoader(false))
    })
  }

  const formik = useFormik({
    initialValues: initialValuesForm,
    validationSchema: userProfileSchema,
    onSubmit: onSubmit,
  })

  return (
    <Card className={styles.form__container}>
      <Typography variant="h5">Perfil del usuario</Typography>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <span>
          <TextInput
            id="firstName"
            type="text"
            placeholder="Nombre"
            label="Nombres"
            {...formik.getFieldProps('firstName')}
            touchedHelper={formik.touched.firstName}
            errorHelper={formik.errors.firstName}
          />
          <TextInput
            id="lastName"
            label="Apellidos"
            type="text"
            placeholder="Apellido"
            {...formik.getFieldProps('lastName')}
            touchedHelper={formik.touched.lastName}
            errorHelper={formik.errors.lastName}
          />
        </span>
        <span>
          <SelectInput
            id="identificationType"
            label="Tipo de identificación"
            options={['Cédula', 'RUC', 'Pasaporte']}
            {...formik.getFieldProps('identificationType')}
            required={true}
          />
          <TextInput
            id="identification"
            type="text"
            label="Nro. Identificación"
            placeholder="1799999999"
            {...formik.getFieldProps('identification')}
            touchedHelper={formik.touched.identification}
            errorHelper={formik.errors.identification}
          />
        </span>
        <span>
          <BirthdateInput
            value={formik.values.birthdate}
            onChange={(value: Dayjs | null) =>
              formik.setFieldValue('birthdate', value)
            }
          />
          {formik.errors.birthdate && (
            //@ts-expect-error initial value it's must be a void string
            <FormHelperText error>{formik.errors.birthdate}</FormHelperText>
          )}
        </span>
        <span>
          <SelectInput
            id="nationality"
            label="Nacionalidad"
            options={countriesList}
            {...formik.getFieldProps('nationality')}
            required={true}
          />
          <TextInput
            id="residenceCity"
            type="text"
            label="Ciudad de Residencia"
            placeholder="Quito"
            {...formik.getFieldProps('residenceCity')}
            touchedHelper={formik.touched.residenceCity}
            errorHelper={formik.errors.residenceCity}
          />
        </span>
        <TextInput
          id="cellPhone"
          type="text"
          label="Celular"
          placeholder="0999999999"
          {...formik.getFieldProps('cellPhone')}
          touchedHelper={formik.touched.cellPhone}
          errorHelper={formik.errors.cellPhone}
          helperText="no incluya el código de area"
        />
        <SelectInput
          id="genre"
          label="Genero"
          options={['Masculino', 'Femenino', 'No especificado']}
          {...formik.getFieldProps('genre')}
          required={true}
        />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </Card>
  )
}

export default RegisterProfile
