import { Row, Col, Button } from 'react-bootstrap';
import {
  WorkExperienceContextType,
  useWorkExperience,
} from '../../../Context/WorkExperienceContext';

const ExpTable = () => {
  const { state } = useWorkExperience() as WorkExperienceContextType;
  const handleSaveToLocal = () => {
    localStorage.setItem('workExperienceData', JSON.stringify(state));
  };
  return (
    <div>
      <div className='w-50 mx-auto'>
        <div className='buttons d-flex justify-content-end gap-3'>
          <Button variant='light'>Reset</Button>
          <Button variant='primary' onClick={handleSaveToLocal}>
            Save Locally
          </Button>
        </div>
        <div className='exp-table'>
          <div className='exp-header rounded-3 bg-light p-3 mt-4'>
            <Row className=' align-items-center'>
              <Col xs={1}>#</Col>
              <Col>Company</Col>
              <Col>Start Date</Col>
              <Col>End Date</Col>
              <Col></Col>
            </Row>
          </div>
          {state?.map((item, i) => (
            <div className='exp-header rounded-3 bg-light p-2 mt-3' key={i + 1}>
              <Row className=' align-items-center'>
                <Col xs={1}>{i + 1}</Col>
                <Col>{item.companyName}</Col>
                <Col>{item.startDate}</Col>
                <Col>{item.endDate}</Col>
                <Col>
                  <Button size='sm'>Update</Button>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpTable;
