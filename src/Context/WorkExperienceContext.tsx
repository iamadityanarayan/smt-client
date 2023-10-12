import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

export interface ExperienceData {
  companyName: string;
  startDate: string;
  endDate: string;
}

export type WorkExperienceState = ExperienceData[];

export type WorkExperienceAction = 
  | { 
    type: 'DATA_FROM_LS';
    payload: ExperienceData[]
  }
  | { 
    type: 'ADD_EXPERIENCE';
    payload: ExperienceData
  }
  | {
    type: 'UPDATE_EXPERIENCE';
    index: number;
    payload: ExperienceData
  }
  

export type WorkExperienceContextType = {
  state: WorkExperienceState;
  dispatch: Dispatch<WorkExperienceAction>
}

const initialState: WorkExperienceState = [];
export const WorkExperienceContext = createContext<WorkExperienceContextType>({
  state: [],
  dispatch: () => {}, // A dummy dispatch function to avoid runtime errors
});

const workExperienceReducer = (state: WorkExperienceState, action: WorkExperienceAction): WorkExperienceState => {
  switch (action.type) {
    case 'ADD_EXPERIENCE':
      return [...state, action.payload];
    case 'DATA_FROM_LS':
      return state = action.payload;
    case 'UPDATE_EXPERIENCE':
      const updatedState = [...state];
      updatedState[action.index] = action.payload;
      return updatedState;
    default:
      return state;
  }
};

export const WorkExperienceProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(workExperienceReducer, initialState);
  useEffect(() => {
    // Load data from Local Storage when the app loads
    const savedData = localStorage.getItem('workExperienceData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Dispatch action to update the state with the loaded data
      dispatch({ type: 'DATA_FROM_LS', payload: parsedData });
      console.log(savedData)
    }
  }, []);
  return (
    <WorkExperienceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkExperienceContext.Provider>
  );
}

export const useWorkExperience = () => {
  return useContext(WorkExperienceContext);
};