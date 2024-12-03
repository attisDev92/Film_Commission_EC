import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import RegisterCard from './RegisterCard/RegisterCard'
import styles from './Index.module.css'

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
