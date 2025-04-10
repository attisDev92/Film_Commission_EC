import { NavigateFunction, useNavigate } from 'react-router-dom'

const RecoverPass: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()

  return (
    <a
      style={{
        fontSize: 12,
        color: '#4e0073',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/system/recover')}
    >
      Recuperar contraseña
    </a>
  )
}

export default RecoverPass
