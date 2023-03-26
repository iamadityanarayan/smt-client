import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

type Props = {}

const AppLayout = (props: Props) => {
  return (
    <React.Fragment>
      <Header />
      <main className="container">
        <Row>
          <Col sm={3} className="py-3">
            <Sidebar />
          </Col>
          <Col>
            <div className="flex-grow-1 pt-3 px-3 min-vh-100 bg-light">
              <Outlet />
            </div>
          </Col>
        </Row>
        {/* <div className="min-vh-100">
         
        </div> */}
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default AppLayout
