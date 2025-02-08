import {
  Card,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import styles from './RegisterServices.module.css'
import { useGetUser } from '../../../hooks/useUser'
import { CompanyServiceType, User } from '../../../types'
import { useFormik } from 'formik'
import { initialValues } from '../../../Utils/initialValuesServiceForm'
import TextInput from '../../../components/FormikInputs/TextInput'
import { companySchema as validationSchema } from '../../../Utils/validationSchemas'
import SelectInput from '../../../components/FormikInputs/SelectInpu'
import { companyServices } from '../../../data/companyServiceList'
import { provinciaList } from '../../../data/provinciaList'
import { useState } from 'react'
import ListInput from '../../../components/FormikInputs/ListInput'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../Redux/store'
import { setNotification } from '../../../Redux/notificationReducer'

const RegisterService: React.FC = () => {
  const user: User | null = useGetUser()
  const dispatch = useDispatch<AppDispatch>()

  const [checkForm, setCheckForm] = useState<boolean>(false)

  const onSubmit = (values: CompanyServiceType) => {
    if (!checkForm) {
      dispatch(
        setNotification({
          text: 'Debe aceptar las condiciones descritas al final del formulario',
          style: 'error',
        }),
      )
      return
    }
    console.log(user)
    console.log('Formulario enviado con los valores:', values)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <Card className={styles.card}>
      <Typography variant="h5">Registro de servicios audiovisuales</Typography>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextInput
          id="company"
          type="text"
          label="Nombre de la empresa"
          placeholder="Empresa que da el servicio"
          {...formik.getFieldProps('company')}
          touchedHelper={formik.touched.company}
          errorHelper={formik.errors.company}
        />
        <span>
          <SelectInput
            id="firstActivity"
            label="Actividad principal"
            options={companyServices}
            {...formik.getFieldProps('firstActivity')}
            required={true}
          />
          <SelectInput
            id="secondActivity"
            label="Actividad secundaria"
            options={companyServices}
            {...formik.getFieldProps('secondActivity')}
            required={true}
          />
        </span>
        <span>
          <SelectInput
            id="province"
            label="Provincia"
            options={provinciaList}
            {...formik.getFieldProps('province')}
            required={true}
          />
          <TextInput
            id="city"
            type="text"
            label="Ciudad"
            placeholder="Quito"
            {...formik.getFieldProps('city')}
            touchedHelper={formik.touched.city}
            errorHelper={formik.errors.city}
          />
        </span>
        <TextInput
          id="direction"
          type="text"
          label="Dirección"
          placeholder="Av. Principal y calle secundaria"
          {...formik.getFieldProps('direction')}
          touchedHelper={formik.touched.direction}
          errorHelper={formik.errors.direction}
        />
        <TextInput
          id="description"
          type="text"
          label="Perfil de la empresa"
          placeholder="Describa brevemente la trayectoria de la empresa y las actividades que realiza"
          multiline={true}
          rows={3}
          {...formik.getFieldProps('description')}
          touchedHelper={formik.touched.description}
          errorHelper={formik.errors.description}
          helperText="min 100 caracteres, max 300 caracteres"
        />
        <TextInput
          id="descriptionENG"
          type="text"
          label="Perfil de la empresa - EN INGLÉS"
          placeholder="Descripción de la empresa en idioma INGLÈS"
          multiline={true}
          rows={3}
          {...formik.getFieldProps('descriptionENG')}
          touchedHelper={formik.touched.descriptionENG}
          errorHelper={formik.errors.descriptionENG}
          helperText="min 100 caracteres, max 300 caracteres"
        />
        <ListInput
          id="clients"
          label="Empresas con las que ha trabajado previamente"
          placeholder="Puede agregar varias empresas"
          formik={formik}
        />
        <span>
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
        <TextInput
          id="website"
          type="text"
          label="Página web de la empresa"
          placeholder="http://www.empresa.com.ec"
          {...formik.getFieldProps('website')}
          touchedHelper={formik.touched.website}
          errorHelper={formik.errors.website}
        />
        <span>
          <SelectInput
            id="typeVideo"
            label="Plataforma de video"
            options={['Vimeo', 'YouTube']}
            {...formik.getFieldProps('typeVideo')}
            required={true}
          />
          <TextInput
            id="urlVideo"
            type="text"
            label="Video reel de la empresa"
            placeholder="https://www.youtube.com/12312334... o https://www.vimeo.com/12312334..."
            {...formik.getFieldProps('urlVideo')}
            touchedHelper={formik.touched.urlVideo}
            errorHelper={formik.errors.urlVideo}
          />
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
                checked={checkForm}
                onChange={(e) => setCheckForm(e.target.checked)}
              />
            }
            label="ACEPTA LAS CONDICIONES"
          />
        </div>
        <Button type="submit" variant="contained">
          Crear empresa
        </Button>
      </form>
    </Card>
  )
}

export default RegisterService
