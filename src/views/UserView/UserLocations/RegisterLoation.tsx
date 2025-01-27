import { useFormik } from 'formik'
import { LocationTypes } from '../../../types'
import { locationSchema } from '../../../Utils/validationSchemas'
import { Button, Card, Typography } from '@mui/material'
import styles from './Loactions.module.css'
import TextInput from '../../../components/FormikInputs/TextInput'
import SelectInput from '../../../components/FormikInputs/SelectInpu'
import {
  Areas,
  categories,
  subCategoryNatural,
  subCategoryRural,
  subCategoryUrban,
} from '../../../data/categories'
import { provinciaList } from '../../../data/provinciaList'
import { weatherList } from '../../../data/weatherList'
import { accessibilityList } from '../../../data/accessibilityList'
import React from 'react'

const initialValues: LocationTypes = {
  name: '',
  //@ts-expect-error initial value it's must be a void string
  type: '',
  //@ts-expect-error initial value it's must be a void string
  category: '',
  subCategory: [],
  description: '',
  //@ts-expect-error initial value it's must be a void string
  province: '',
  city: '',
  direction: '',
  googleDireccion: '',
  requestInformation: '',
  //@ts-expect-error initial value it's must be a void string
  weather: [],
  accessibilities: [],
  contactName: '',
  email: '',
  phone: '',
}

const RegisterLoacation: React.FC = () => {
  const onSubmit = (values: LocationTypes) => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: locationSchema,
    onSubmit: onSubmit,
  })

  const filterSubcategories = (category: Areas | '') => {
    if (category === 'Urbano') {
      return subCategoryUrban
    } else if (category === 'Natural') {
      return subCategoryNatural
    } else if (category === 'Rural') {
      return subCategoryRural
    } else {
      return ['Antes seleccione una categoría']
    }
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const newCategory = event.target.value as Areas
    formik.setFieldValue('category', newCategory)
    formik.setFieldValue('subCategory', [])
  }
  return (
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
          {/* direccion */}
          {/* ubicación */}
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
            placeholder="ingo@mail.com"
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
          Guardar
        </Button>
      </form>
    </Card>
  )
}

export default RegisterLoacation
