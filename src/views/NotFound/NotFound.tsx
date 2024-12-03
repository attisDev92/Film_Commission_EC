import React from 'react'
import notFoundImages from '../../assets/images/404statuscode.jpg'

const NotFound: React.FC = () => {
  return (
    <div className="notfound__container">
      <img src={notFoundImages} alt="pages not found 404 error" />
    </div>
  )
}

export default NotFound
