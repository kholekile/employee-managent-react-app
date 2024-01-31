import React from 'react'

import Employees from '../Employees/index'

import Header from '../Header/index'

import './Styles.css'

const Main = () => {
  return (
    <div className='main-container'>
        <Header />
        <Employees />
    </div>
  )
}

export default Main