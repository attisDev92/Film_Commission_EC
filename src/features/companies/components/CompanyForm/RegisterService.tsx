import {
  Card,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
} from '@mui/material'
import styles from './RegisterServices.module.css'
import { CompanyServiceType } from '../../types/CompanyServiceType'
import { useFormik } from 'formik'
import { initialValues } from '../../utils/initialValuesServiceForm'
import TextInput from '../../../../common/components/FormikInputs/TextInput'
import { companySchema } from '../../utils/companySchema'
import SelectInput from '../../../../common/components/FormikInputs/SelectInput'
import { companyServices } from '../../utils/companyServiceList'
import { provinciaList } from '../../../../common/utils/seeds/provinciaList'
import { useState } from 'react'
import ListInput from '../../../../common/components/FormikInputs/ListInput'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { setNotification } from '../../../../app/store/slices/setNotification'
import { postCompany } from '../../slices/postCompany'
import { useNavigate } from 'react-router-dom'

const RegisterService: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [checkForm, setCheckForm] = useState<boolean>(false)

  const onSubmit = async (values: CompanyServiceType) => {
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
      const newCompany = await dispatch(postCompany(values))
      navigate(`/system/services/files/${newCompany.id}`)
    } catch (error: unknown) {
      console.error(error)
      dispatch(
        setNotification({
          style: 'error',
          text: `Error al crear un nuevo servicio`,
        }),
      )
    } finally {
      dispatch(setLoader(false))
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: companySchema,
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
          helperText="min 100 caracteres, max 1000 caracteres"
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
          helperText="min 100 caracteres, max 1000 caracteres"
        />
        <ListInput
          id="clients"
          label="Empresas con las que ha trabajado previamente"
          placeholder="Puede agregar varias empresas"
          formik={formik}
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
                color="success"
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
