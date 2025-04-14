import { Stack, Typography, Divider } from '@mui/material'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import FlightIcon from '@mui/icons-material/Flight'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat'
import WifiIcon from '@mui/icons-material/Wifi'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import SatelliteIcon from '@mui/icons-material/Satellite'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined'
import CircleIcon from '@mui/icons-material/Circle'
import BlockIcon from '@mui/icons-material/Block'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import StoreIcon from '@mui/icons-material/Store'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import HotelIcon from '@mui/icons-material/Hotel'
import SecurityIcon from '@mui/icons-material/Security'
import PowerIcon from '@mui/icons-material/Power'
import ElevatorIcon from '@mui/icons-material/Elevator'
import AccessibleIcon from '@mui/icons-material/Accessible'
import styles from './AccessibilityIcons.module.css'

interface AccessibilityIconsProps {
  accessibilities: string[]
  services: string[]
  nearbyServices: string[]
}

const AccessibilityIcons: React.FC<AccessibilityIconsProps> = ({
  accessibilities,
  services,
  nearbyServices,
}) => {
  const language = useLanguageSelected()

  const getAccessibilityIcon = (type: string) => {
    switch (type) {
      // Accessibility icons
      case 'Avión':
        return <FlightIcon className={styles.icon} />
      case 'Auto':
        return <DirectionsCarIcon className={styles.icon} />
      case 'Bus':
        return <DirectionsBusIcon className={styles.icon} />
      case 'Barco':
        return <DirectionsBoatIcon className={styles.icon} />
      case 'Otros':
        return <BlockIcon className={styles.icon} />
      case 'Ninguno':
        return <BlockIcon className={styles.icon} />
      // Services icons
      case 'Wi-fi':
        return <WifiIcon className={styles.icon} />
      case 'Red Móvil':
        return <PhoneAndroidIcon className={styles.icon} />
      case 'Red satelital':
        return <SatelliteIcon className={styles.icon} />
      case 'Parqueadero privado':
        return <LocalParkingIcon className={styles.icon} />
      case 'Parqueadero público':
        return <LocalParkingOutlinedIcon className={styles.icon} />
      case 'Zona azul':
        return <CircleIcon className={styles.icon} />
      case 'Servicios sanitarios':
        return <AccessibleIcon className={styles.icon} />
      case 'Seguridad':
        return <SecurityIcon className={styles.icon} />
      case 'Corriente eléctrica (220V)':
      case 'Corriente eléctrica (110V)':
        return <PowerIcon className={styles.icon} />
      case 'Bahía de descarga':
        return <LocalParkingIcon className={styles.icon} />
      case 'Ascensor':
        return <ElevatorIcon className={styles.icon} />
      case 'Rampas de acceso':
        return <AccessibleIcon className={styles.icon} />
      // Nearby services icons
      case 'Restaurante':
        return <RestaurantIcon className={styles.icon} />
      case 'Cafetería':
        return <LocalCafeIcon className={styles.icon} />
      case 'Tienda':
        return <StoreIcon className={styles.icon} />
      case 'Farmacia':
        return <LocalPharmacyIcon className={styles.icon} />
      case 'Hospital o centro médico':
        return <LocalHospitalIcon className={styles.icon} />
      case 'Banco o cajero':
        return <AccountBalanceIcon className={styles.icon} />
      case 'Centro comercial':
        return <ShoppingCartIcon className={styles.icon} />
      case 'Hospedaje':
        return <HotelIcon className={styles.icon} />
      default:
        return <BlockIcon className={styles.icon} />
    }
  }

  const getAccessibilityText = (type: string) => {
    if (language.idioma === 'eng') {
      switch (type) {
        // Accessibility translations
        case 'Avión':
          return 'Plane'
        case 'Auto':
          return 'Car'
        case 'Bus':
          return 'Bus'
        case 'Barco':
          return 'Boat'
        case 'Otros':
          return 'Others'
        case 'Ninguno':
          return 'None'
        // Services translations
        case 'Wi-fi':
          return 'Wi-fi'
        case 'Red Móvil':
          return 'Mobile Network'
        case 'Red satelital':
          return 'Satellite Network'
        case 'Parqueadero privado':
          return 'Private Parking'
        case 'Parqueadero público':
          return 'Public Parking'
        case 'Zona azul':
          return 'Blue Zone'
        case 'Servicios sanitarios':
          return 'Sanitary Services'
        case 'Seguridad':
          return 'Security'
        case 'Corriente eléctrica (220V)':
          return 'Electric Power (220V)'
        case 'Corriente eléctrica (110V)':
          return 'Electric Power (110V)'
        case 'Bahía de descarga':
          return 'Loading Bay'
        case 'Ascensor':
          return 'Elevator'
        case 'Rampas de acceso':
          return 'Access Ramps'
        // Nearby services translations
        case 'Restaurante':
          return 'Restaurant'
        case 'Cafetería':
          return 'Cafeteria'
        case 'Tienda':
          return 'Store'
        case 'Farmacia':
          return 'Pharmacy'
        case 'Hospital o centro médico':
          return 'Hospital or Medical Center'
        case 'Banco o cajero':
          return 'Bank or ATM'
        case 'Centro comercial':
          return 'Shopping Mall'
        case 'Hospedaje':
          return 'Lodging'
        default:
          return type
      }
    }
    return type
  }

  const getGroupTitle = (group: string) => {
    if (language.idioma === 'eng') {
      switch (group) {
        case 'Acceso a la locación':
          return 'Access to location'
        case 'Servicios de la locación':
          return 'Location services'
        case 'Servicios cercanos':
          return 'Nearby Services'
        default:
          return group
      }
    }
    return group
  }

  const renderAccessibilityGroup = (title: string, items: string[]) => (
    <div className={styles.container}>
      <Typography variant="h6">{getGroupTitle(title)}</Typography>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        divider={<Divider orientation="vertical" flexItem />}
      >
        {items.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            alignItems="center"
            className={styles.iconContainer}
          >
            {getAccessibilityIcon(item)}
            <Typography variant="body1">
              {getAccessibilityText(item)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </div>
  )

  return (
    <>
      {renderAccessibilityGroup('Acceso a la locación', accessibilities)}
      {renderAccessibilityGroup('Servicios de la locación', services)}
      {renderAccessibilityGroup('Servicios cercanos', nearbyServices)}
    </>
  )
}

export default AccessibilityIcons
