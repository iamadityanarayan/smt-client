import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import ErrorPage from "../Pages/Error";
import NoteApp from "../Pages/NoteApp";
import PasswordGenerator from "../Pages/PasswordGenerator";
import WorkExp from "../Pages/WorkExperience";
import AppLayout from "./AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (<AppLayout />),
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   element: <Dashboard />,
      // },
      {
        path: "/",
        element: <WorkExp />,
      },
      {
        path: "/password-generator",
        element: <PasswordGenerator />,
      },
      {
        path: "/na",
        element: <NoteApp />,
      },
    ],
  },
]);