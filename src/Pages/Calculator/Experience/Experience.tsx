import { useEffect } from 'react'
import ExpForm from './ExpForm'
import ExpTable from './ExpTable'
import { useWorkExperience } from '../../../Context/WorkExperienceContext'
import TotalExp from './TotalExp'
import './Experience.css'

const Experience = () => {
  const { state, dispatch } = useWorkExperience()
  // Function to update endDate to the current date
  const updateEndDateToCurrentDate = () => {
    const currentDate = new Date()
    const updatedState = state.map((experience) => {
      if (experience.present) {
        experience.endDate = currentDate.toISOString().split('T')[0]
      }
      return experience
    })
    // console.log(123, updatedState);

    // Dispatch an action to update the state with the new endDate
    // dispatch({ type: 'UPDATE_EXPERIENCE', payload: updatedState });
  }

  useEffect(() => {
    // Load data from Local Storage when the app loads
    const savedData = localStorage.getItem('workExperienceData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      // dispatch({ type: 'UPDATE_EXPERIENCE', data: parsedData });
      updateEndDateToCurrentDate() // Update endDate if "present" is true
    }
  }, [])
  return (
    <div className="exp bg-color container-fluid position-relative">
      <div className=" position-absolute top-0 end-0 bg-light text-dark rounded-2 p-2 me-3 mt-3">
        version 2.0.0
      </div>
      {/* <WorkExperienceProvider> */}
      <div className="exp-wrapper-I">
        <TotalExp />
      </div>
      <div className="exp-form mt-3 mb-3">
        <ExpForm />
      </div>
      <div className="exp-table">
        <ExpTable />
      </div>
      {/* </WorkExperienceProvider> */}
    </div>
  )
}

export default Experience
