import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

type Props = {}

const AppLayout = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <main className='container'>
        <div className="min-vh-100">
          {/* <Sidebar /> */}
          <div className="flex-grow-1 pt-2">
            <Outlet />
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default AppLayout;
