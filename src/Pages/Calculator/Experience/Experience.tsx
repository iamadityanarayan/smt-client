import ExpForm from './ExpForm';
import ExpTable from './ExpTable';
import {
  WorkExperienceProvider,
  useWorkExperience,
} from '../../../Context/WorkExperienceContext';
import './Experience.css';
import TotalExp from './TotalExp';

const Experience = () => {
  return (
    <div className='exp bg-color container-fluid position-relative'>
      <div className=' position-absolute top-0 end-0 bg-light text-dark rounded-2 p-2 me-3 mt-3'>
        version 1.0.0
      </div>
      <WorkExperienceProvider>
        <div className='exp-wrapper-I'>
          <TotalExp />
        </div>
        <div className='exp-form mt-3 mb-3'>
          <ExpForm />
        </div>
        <div className='exp-table'>
          <ExpTable />
        </div>
      </WorkExperienceProvider>
    </div>
  );
};

export default Experience;
