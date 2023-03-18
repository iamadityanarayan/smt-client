import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Main from './Pages/Main';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/routesConfig';

type Props = {}

const App = (props: Props) => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;