import React from 'react'

const Alert = ({ show, type, msg }) => {

    return <p className={type}>{msg}</p>


}

export default Alert
