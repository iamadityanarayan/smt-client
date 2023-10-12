import ExpForm from './ExpForm';
import ExpTable from './ExpTable';
import { WorkExperienceProvider } from '../../../Context/WorkExperienceContext';
import './Experience.css';

const Experience = () => {
  return (
    <div className='exp bg-color container-fluid'>
      <div className='exp-wrapper-I'>
        <div className='exp-numbers text-center'>
          <h1 className='text-light font-digit mb-0'>1</h1>
          <p className='text-light text-year line-height-8'>year</p>
        </div>
      </div>
      <WorkExperienceProvider>
        <div className='exp-form my-5'>
          <ExpForm />
        </div>
        <div className='exp-table my-5'>
          <ExpTable />
        </div>
      </WorkExperienceProvider>
    </div>
  );
};

export default Experience;
