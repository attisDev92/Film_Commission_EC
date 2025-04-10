import React from 'react'
import LoginForm from '../LoginForm/LoginForm'
import RegisterCard from '../RegistrationCard/RegisterCard'
import styles from './UserLogin.module.css'

const UserLogin: React.FC = () => {
  return (
    <div className={styles.login__container}>
      <div className={styles.login__card}>
        <LoginForm legend="usuario" />
        <RegisterCard />
      </div>
    </div>
  )
}

export default UserLogin
