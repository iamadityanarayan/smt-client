import React from 'react'
import Siderbar from '../../Components/Sidebar';

type Props = {}

const Main = (props: Props) => {
  return (
    <div className='d-flex mt-4'>
      <Siderbar />
      <div className="content">xyz</div>
    </div>
  )
}

export default Main;