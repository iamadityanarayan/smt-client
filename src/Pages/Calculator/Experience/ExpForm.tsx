import { Row, Col, Alert, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { HiPlus } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';

import {
  InputExperienceData,
  WorkExperienceContextType,
  useWorkExperience,
} from '../../../Context/WorkExperienceContext';
// import { Inputs } from './types/experience';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { isToday, parseISO } from 'date-fns';

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
  const {
    state,
    dispatch,
    editIndex,
  } = useWorkExperience() as WorkExperienceContextType;
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<InputExperienceData>({
    defaultValues: {
      companyName: '',
      startDate: '',
      endDate: '',
    },
    resolver: yupResolver(schema),
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setshowForm] = useState(false);
  const handleForm = () => setshowForm(!showForm);
  const onSubmit: SubmitHandler<InputExperienceData> = (data) => {
    let isPresent = false;
    // Your provided end date
    const endDate = data.endDate;

    // Parse the provided end date string to a Date object
    const endDateDate = parseISO(endDate);

    // Get the current date
    const currentDate = new Date();

    // Check if the endDate is equal to the current date
    const isEndDateToday = isToday(endDateDate);

    // Set a variable to true if the endDate is today
    if (isEndDateToday) {
      isPresent = true;
    } else {
      isPresent = false;
    }

    const updatedData = {
      ...data,
      present: isPresent,
    };
    if (isEditMode) {
      // update experience data here using id
      dispatch({
        type: 'UPDATE_EXPERIENCE',
        id: editIndex,
        payload: { id: editIndex, ...updatedData },
      });
    } else {
      const _updatedData = {
        id: uuidv4(),
        ...updatedData,
      };
      if (data.endDate)
        dispatch({ type: 'ADD_EXPERIENCE', payload: _updatedData });
    }
    console.log(data);

    reset();
  };

  useEffect(() => {
    if (!editIndex) {
      return;
    } // if we are not editing an experience then exit out of hook
    const id: string = editIndex;
    // const data= state[id];
    // console.log("data",data);
    const editState = state.filter((s) => s.id === editIndex);
    const _data = editState[0];
    console.log('state data', state);
    console.log('editIndex', editIndex);
    console.log('e', editState);

    setValue('companyName', _data.companyName);
    setValue('startDate', _data.startDate);
    setValue('endDate', _data.endDate);
    setIsEditMode(true);
  }, [editIndex]);

  return (
    <div className='py-4'>
      <div className='d-flex justify-content-center'>
        <Button variant='primary' onClick={handleForm} className='my-3'>
          {showForm ? 'Hide Form' : 'Show Form'}
        </Button>
      </div>
      {showForm && (
        <Form className='exp-form mx-auto' onSubmit={handleSubmit(onSubmit)}>
          <Row className=' justify-content-center'>
            <Col lg={4} className='mb-3'>
              <Form.Group className=''>
                <Form.Label className='text-light d-none d-lg-block'>
                  Company Name
                </Form.Label>
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
            <Col lg={4} className='mb-3 d-none d-lg-block'>
              <Form.Group>
                <Form.Label className='text-light'>Start Date</Form.Label>
                <Controller
                  name='startDate'
                  control={control}
                  render={({ field }) => (
                    <Form.Control type='date' {...field} />
                  )}
                />
                {errors.startDate && (
                  <Alert variant='danger'>{errors.startDate.message}</Alert>
                )}
              </Form.Group>
            </Col>
            <Col lg={4} className='mb-3 d-lg-none d-block'>
              <Controller
                name='startDate'
                control={control}
                render={({ field }) => (
                  // <Form.Control type='date' {...field} />
                  <InputGroup className=''>
                    <InputGroup.Text id='basic-addon1'>
                      Start Date
                    </InputGroup.Text>
                    <Form.Control type='date' {...field} />
                  </InputGroup>
                )}
              />
              {errors.startDate && (
                <Alert variant='danger'>{errors.startDate.message}</Alert>
              )}
            </Col>
            <Col lg={4} className='mb-3 d-none d-lg-block'>
              <Form.Group>
                <Form.Label className='text-light'>End Date</Form.Label>
                <Controller
                  name='endDate'
                  control={control}
                  render={({ field }) => (
                    <Form.Control type='date' {...field} />
                  )}
                />
                {errors.endDate && (
                  <Alert variant='danger'>{errors.endDate.message}</Alert>
                )}
              </Form.Group>
            </Col>
            <Col lg={4} className='mb-3 d-lg-none d-block'>
              <Controller
                name='endDate'
                control={control}
                render={({ field }) => (
                  // <Form.Control type='date' {...field} />
                  <InputGroup className=''>
                    <InputGroup.Text id='basic-addon2'>
                      End Date
                    </InputGroup.Text>
                    <Form.Control type='date' {...field} />
                  </InputGroup>
                )}
              />
              {errors.startDate && (
                <Alert variant='danger'>{errors.startDate.message}</Alert>
              )}
            </Col>
          </Row>
          <div className='d-grid d-lg-flex gap-3 justify-content-lg-center'>
            <Button
              variant='secondary'
              className='text-white d-flex align-items-center justify-content-center gap-2'
              type='submit'
            >
              <HiPlus className='fs-5' /> {!editIndex ? 'Add' : 'Update'} & Calculate
            </Button>
            {!editIndex && (
              <Button
                variant='warning'
                className='text-white d-flex align-items-center justify-content-center gap-2'
                type='reset'
                onClick={() => reset()}
              >
                <IoMdRefresh className='fs-5' /> Reset
              </Button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
};

export default ExpForm;
