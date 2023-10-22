import { RouterProvider } from 'react-router-dom'
import { router } from './routesConfig'

const AppLayout = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppLayout
