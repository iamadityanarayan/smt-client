import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { saveExperienceToLocalStorage } from '../Util/util'
import { format, parseISO } from 'date-fns'

export interface InputExperienceData {
  companyName: string
  startDate: string
  endDate: string
}

export interface ExperienceData {
  id: string
  companyName: string
  startDate: string
  endDate: string
  present: boolean
}

export type WorkExperienceState = ExperienceData[]

export type WorkExperienceAction =
  | {
      type: 'DATA_FROM_LS'
      payload: ExperienceData[]
    }
  | {
      type: 'REMOVE_ALL'
      payload: ExperienceData[]
    }
  | {
      type: 'ADD_EXPERIENCE'
      payload: ExperienceData
    }
  | {
      type: 'UPDATE_EXPERIENCE'
      id: string
      payload: ExperienceData
    }
  | {
      type: 'DELETE'
      id: string
      // payload: ExperienceData;
    }

export type WorkExperienceContextType = {
  state: WorkExperienceState
  dispatch: Dispatch<WorkExperienceAction>
  editIndex: string
  setEditIndex: Dispatch<React.SetStateAction<string>>
}

const initialState: WorkExperienceState = []
export const WorkExperienceContext = createContext<WorkExperienceContextType>({
  state: [],
  dispatch: () => {}, // A dummy dispatch function to avoid runtime errors
  editIndex: '',
  setEditIndex: () => null,
})

const workExperienceReducer = (
  state: WorkExperienceState,
  action: WorkExperienceAction
): WorkExperienceState => {
  switch (action.type) {
    case 'ADD_EXPERIENCE':
      const newState = [...state, action.payload]
      newState.sort((a, b) => {
        const startDateA: Date = new Date(a.startDate)
        const startDateB: Date = new Date(b.startDate)
        if (startDateA < startDateB) return 1
        if (startDateA > startDateB) return -1
        return 0
      })
      return newState
    case 'DATA_FROM_LS':
      const newData = action.payload
      newData.sort((a, b) => {
        const startDateA: Date = new Date(a.startDate)
        const startDateB: Date = new Date(b.startDate)
        if (startDateA < startDateB) return 1
        if (startDateA > startDateB) return -1
        return 0
      })
      return (state = newData)
    // return (state = action.payload);
    case 'REMOVE_ALL':
      localStorage.removeItem('workExperienceData')
      localStorage.setItem('workExperienceData', JSON.stringify([]))
      return (state = [])
    case 'UPDATE_EXPERIENCE':
      const states = [...state]
      const allStatesExceptCurrentState = states.filter(
        (s) => s.id !== action.id
      )
      const updatedState = [...allStatesExceptCurrentState, action.payload]
      return updatedState
    case 'DELETE':
      const _states = [...state]
      const _allStatesExceptCurrentState = _states.filter(
        (s) => s.id !== action.id
      )
      const _updatedState = [..._allStatesExceptCurrentState]
      return _updatedState
    default:
      return state
  }
}

export const WorkExperienceProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(workExperienceReducer, initialState)
  useEffect(() => {
    // Load data from Local Storage when the app loads
    const savedData = localStorage.getItem('workExperienceData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      // Dispatch action to update the state with the loaded data
      // console.log('ss', savedData);
      const _newData: ExperienceData[] = parsedData
      const newDate = new Date()

      _newData?.map((e) => {
        if (e.present) {
          debugger
          const check = new Date(e.endDate) < new Date()
          if (check) {
            // const u = newDate.toLocaleDateString().split('/').join('-');
            e.endDate = format(newDate, "yyyy-MM-dd")
            console.log('new end date', e.endDate)
          }
        }
      })

      // console.log('-__new ', _newData);
      saveExperienceToLocalStorage(_newData)
      localStorage.setItem('state', JSON.stringify('true'))
      dispatch({ type: 'DATA_FROM_LS', payload: _newData })
    } else {
      localStorage.setItem('workExperienceData', JSON.stringify(state))
      localStorage.setItem('state', JSON.stringify('false'))
    }
  }, [])
  const [editIndex, setEditIndex] = useState<string>('')
  return (
    <WorkExperienceContext.Provider
      value={{ state, dispatch, editIndex, setEditIndex }}>
      {children}
    </WorkExperienceContext.Provider>
  )
}

export const useWorkExperience = () => {
  return useContext(WorkExperienceContext)
}
