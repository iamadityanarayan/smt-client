import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ErrorPage from "../Pages/Error";
import NoteApp from "../Pages/NoteApp";
import WorkExp from "../Pages/WorkExperience";
import AppLayout from "./AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (<AppLayout />),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/wk",
        element: <WorkExp />,
      },
      {
        path: "/na",
        element: <NoteApp />,
      },
    ],
  },
]);