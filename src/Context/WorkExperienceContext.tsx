import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

export interface InputExperienceData {
  companyName: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceData {
  id: string;
  companyName: string;
  startDate: string;
  endDate: string;
}

export type WorkExperienceState = ExperienceData[];

export type WorkExperienceAction =
  | {
      type: 'DATA_FROM_LS';
      payload: ExperienceData[];
    }
  | {
      type: 'REMOVE_ALL';
      payload: ExperienceData[];
    }
  | {
      type: 'ADD_EXPERIENCE';
      payload: ExperienceData;
    }
  | {
      type: 'UPDATE_EXPERIENCE';
      id: string;
      payload: ExperienceData;
    }
  | {
      type: 'DELETE';
      id: string;
      // payload: ExperienceData;
    };

export type WorkExperienceContextType = {
  state: WorkExperienceState;
  dispatch: Dispatch<WorkExperienceAction>;
  editIndex: string;
  setEditIndex: Dispatch<React.SetStateAction<string>>;
};

const initialState: WorkExperienceState = [];
export const WorkExperienceContext = createContext<WorkExperienceContextType>({
  state: [],
  dispatch: () => {}, // A dummy dispatch function to avoid runtime errors
  editIndex: '',
  setEditIndex: () => null,
});

const workExperienceReducer = (
  state: WorkExperienceState,
  action: WorkExperienceAction
): WorkExperienceState => {
  debugger;
  switch (action.type) {
    case 'ADD_EXPERIENCE':
      return [...state, action?.payload];
    case 'DATA_FROM_LS':
      return (state = action.payload);
    case 'REMOVE_ALL':
      localStorage.removeItem('workExperienceData');
      localStorage.setItem('workExperienceData', JSON.stringify([]));
      return (state = []);
    case 'UPDATE_EXPERIENCE':
      const states = [...state];
      const allStatesExceptCurrentState = states.filter(
        (s) => s.id !== action.id
      );
      const updatedState = [...allStatesExceptCurrentState, action.payload];
      return updatedState;
    case 'DELETE':
      const _states = [...state];
      const _allStatesExceptCurrentState = _states.filter(
        (s) => s.id !== action.id
      );
      const _updatedState = [..._allStatesExceptCurrentState];
      return _updatedState;
    default:
      return state;
  }
};

export const WorkExperienceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(workExperienceReducer, initialState);
  useEffect(() => {
    // Load data from Local Storage when the app loads
    const savedData = localStorage.getItem('workExperienceData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Dispatch action to update the state with the loaded data
      dispatch({ type: 'DATA_FROM_LS', payload: parsedData });
      console.log(savedData);
    } else {
      localStorage.setItem('workExperienceData', JSON.stringify(state));
    }
  }, []);
  const [editIndex, setEditIndex] = useState<string>('');
  return (
    <WorkExperienceContext.Provider
      value={{ state, dispatch, editIndex, setEditIndex }}
    >
      {children}
    </WorkExperienceContext.Provider>
  );
};

export const useWorkExperience = () => {
  return useContext(WorkExperienceContext);
};
