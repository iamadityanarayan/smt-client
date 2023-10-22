import React, { Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Components/Header'
import Main from './Pages/Main'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/routesConfig'
import {
  ExperienceData,
  WorkExperienceProvider,
} from './Context/WorkExperienceContext'
import Experience from './Pages/Calculator/Experience/Experience'
import { ErrorBoundary } from 'react-error-boundary'
import {
  removeExperienceToLocalStorage,
  saveExperienceToLocalStorage,
} from './Util/util'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface Error {
  cause?: unknown
  message?: string
}

const App = () => {
  function fallbackRender({ error }: { error: Error }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    function resetBoundary() {
      // Reset the state of your app so the error doesn't happen again
      removeExperienceToLocalStorage('workExperienceData')
      saveExperienceToLocalStorage([] as ExperienceData[])
    }
    setTimeout(() => {
      resetBoundary()
      setTimeout(() => {
        window.location.reload()
      })
    }, 5000)
    return (
      <div
        role="alert"
        className="d-flex justify-content-between flex-column align-items-center gap-2 py-5">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>

        <div className="my-3 d-flex justify-content-center flex-column gap-2 align-items-center">
          <p className="text-center fs-4">
            Relax, it will attempt to fix itself automatically.
          </p>
          <CountdownCircleTimer
            isPlaying
            duration={5}
            size={80}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[5, 2, 0]}>
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
        <button
          onClick={() => {
            resetBoundary()
            setTimeout(() => {
              window.location.reload()
            })
          }}
          className="btn btn-primary">
          Reload
        </button>
      </div>
    )
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <WorkExperienceProvider>
        <Experience />
        {/* <RouterProvider router={router} /> */}
      </WorkExperienceProvider>
    </ErrorBoundary>
  )
}

export default App
