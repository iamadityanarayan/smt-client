import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import PageTitle from '../../Components/PageTitle'

type Props = {}

const PasswordGenerator = (props: Props) => {
  return (
    <React.Fragment>
      <div className="">
        <PageTitle text="Password Generators" />

        <div className="password-block d-flex mt-5 rounded justify-content-between w-100 shadow bg-white p-4 position-relative">
          <h3 className="password-generated-text display-5">6u9K@6NG#Qfvy#*</h3>
          <div className="d-flex">
            <p>Copy</p>
            <p>Refersh</p>
          </div>
          <span className="bg-secondary position-absolute p-2 bottom-0 w-100 start-0 rounded-bottom"></span>
        </div>

        <div className="custom-password-generators p-4 shadow bg-white mt-4">
          <p className="fw-bold display-6">Generate Your password</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PasswordGenerator
