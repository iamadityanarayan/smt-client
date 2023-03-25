import React from 'react'
import Sidebar from '../../Components/Sidebar';

type Props = {}

const Main = (props: Props) => {
  return (
    <div className='d-flex mt-4'>
      <Sidebar />
      <div className="content">xyz</div>
    </div>
  )
}

export default Main;