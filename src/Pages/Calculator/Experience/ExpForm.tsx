import { Row, Col, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { HiPlus } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';

import {
  ExperienceData,
  WorkExperienceContextType,
  useWorkExperience,
} from '../../../Context/WorkExperienceContext';
import { Inputs } from './types/experience';


const schema = yup.object({
  companyName: yup.string(),
  startDate: yup.string().required('Start Date is required'),
  endDate: yup
    .string()
    .required('End Date is required')
    .test(
      'end-date-after-start',
      'End date cannot be before the start date',
      function (endDate) {
        const startDate = this.parent.startDate;
        return (
          !startDate || !endDate || new Date(endDate) >= new Date(startDate)
        );
      }
    ),
});

const ExpForm = () => {
  const { dispatch } = useWorkExperience() as WorkExperienceContextType;
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ExperienceData>({
    defaultValues: {
      companyName: '',
      startDate: '',
      endDate: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ExperienceData> = (data) => {
    console.log(data);
    dispatch({ type: 'ADD_EXPERIENCE', payload: data });
    reset();
  };

  return (
    <div className='py-4'>
      <Form className='w-50 mx-auto' onSubmit={handleSubmit(onSubmit)}>
        <Row className=' justify-content-center'>
          <Col lg={4} className='mb-3'>
            <Form.Group className=''>
              <Form.Label className='text-light'>Company Name</Form.Label>
              <Controller
                control={control}
                name='companyName'
                render={({ field }) => (
                  <Form.Control
                    type='text'
                    placeholder='Company Name'
                    {...field}
                  />
                )}
              />
            </Form.Group>
          </Col>
          <Col lg={4} className='mb-3'>
            <Form.Group>
              <Form.Label className='text-light'>Start Date</Form.Label>
              <Controller
                name='startDate'
                control={control}
                render={({ field }) => <Form.Control type='date' {...field} />}
              />
              {errors.startDate && (
                <Alert variant='danger'>{errors.startDate.message}</Alert>
              )}
            </Form.Group>
          </Col>
          <Col lg={4} className='mb-3'>
            <Form.Group>
              <Form.Label className='text-light'>End Date</Form.Label>
              <Controller
                name='endDate'
                control={control}
                render={({ field }) => <Form.Control type='date' {...field} />}
              />
              {errors.endDate && (
                <Alert variant='danger'>{errors.endDate.message}</Alert>
              )}
            </Form.Group>
          </Col>
        </Row>
        <div className='d-grid d-sm-flex gap-3 justify-content-center'>
          <Button
            variant='secondary'
            className='text-white d-flex align-items-center justify-content-center gap-2'
            type='submit'
          >
            <HiPlus className='fs-5' /> Add & Calculate
          </Button>
          <Button
            variant='warning'
            className='text-white d-flex align-items-center justify-content-center gap-2'
            type='reset'
          >
            <IoMdRefresh className='fs-5' /> Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ExpForm;
