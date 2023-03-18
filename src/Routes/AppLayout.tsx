import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Siderbar from '../Components/Sidebar'

type Props = {}

const AppLayout = (props: Props) => {
  return (
    <>
      <Header />
      <main className='container'>
        <div className="d-flex min-vh-100">
          <Siderbar />
          <div className="flex-grow-1 bg-light">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default AppLayout
