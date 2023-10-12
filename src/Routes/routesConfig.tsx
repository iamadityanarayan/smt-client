import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../Pages/Error';
import Experience from '../Pages/Calculator/Experience/Experience';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Experience />,
    errorElement: <ErrorPage />,
  },
]);
