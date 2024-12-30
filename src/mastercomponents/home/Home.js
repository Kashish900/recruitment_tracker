import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function home() {
  return (
    <div className='container-fluid' >

      <div className='row mynavabar' >
        <Navbar></Navbar>
      </div>
      <div className='row' >
        <div className='col-md-2 mysidebar' >
          <Sidebar></Sidebar>
        </div>
        <div className='col-md-10 mymaincontent' >
          <Outlet></Outlet>
        </div>
      </div>

    </div>
  )
}
