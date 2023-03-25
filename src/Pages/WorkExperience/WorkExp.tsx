import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

import { useForm, SubmitHandler } from 'react-hook-form'
import intervalToDuration from 'date-fns/intervalToDuration'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { v4 as uuidv4 } from 'uuid'
import isBefore from 'date-fns/isBefore'

import { HiPlus } from 'react-icons/hi'
import { IoMdRefresh } from 'react-icons/io'

type Inputs = {
  id: string
  companyName: string
  jobRole: string
  startDate: null
  endDate: null
  experience?: string
  years: string
  months: string
  days: string
}

const schema = yup.object({
  startDate: yup
    .date()
    .nullable()
    .required('This field is required')
    .typeError('Must be a `date` type'),
  endDate: yup
    .date()
    .nullable()
    .required('This field is required')
    .typeError('Must be a `date` type')
    .test('endDate', 'Must be greater than start date', (value: any) => {
      if (value) {
        return isBefore(
          new Date(
            (document.getElementById('startDate') as HTMLInputElement).value,
          ),
          new Date(value),
        )
        // return true;
      }
    }),
})

const WorkExp = () => {
  const [array, setArray] = useState<Inputs[] | any>([])
  const [totalDurationCount, setTotalDurationCount] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    let stDate = new Date(data.startDate!).toLocaleDateString()
    let edDate = new Date(data.endDate!).toLocaleDateString()
    setArray([
      ...array,
      {
        id: uuidv4(),
        companyName: data.companyName,
        startDate: stDate,
        endDate: edDate,
        jobRole: data.jobRole,
        years: expDuration(data.endDate!, data.startDate!).years,
        months: expDuration(data.endDate!, data.startDate!).months,
        days: expDuration(data.endDate!, data.startDate!).days,
      },
    ])
    reset()
  }
  console.log(array)

  useEffect(() => {
    const result = totalExps(array)
    console.log('RESULT:: ', result)
  }, [array])

  const totalExps = (array: Inputs[]) => {
    const ONE_DAY = 1000 * 60 * 60 * 24 // One day in milliseconds
    const daysInMonth = 30.44 // average number of days in a month

    let totalYears = 0
    let totalMonths = 0
    let totalDays = 0
    let sd: any[] = []

    array?.forEach((item: Inputs) => {
      totalYears += parseInt(item.years)
      totalMonths += parseInt(item.months)
      totalDays += parseInt(item.days)
      sd.push(item.startDate)
    })

    const remainingDays = Math.floor(totalDays % daysInMonth)

    const fullMonths = Math.floor(totalDays / daysInMonth)
    totalMonths += fullMonths

    // convert years into months
    let yearsToMonths = totalYears * 12 + totalMonths

    const total_Years = Math.floor(yearsToMonths / 12)

    const remainingMonths = totalMonths % 12

    // return result
    let result: string
    const yearString = total_Years === 1 ? 'year' : 'years'
    const monthString = remainingMonths === 1 ? 'month' : 'months'
    const dayString = remainingMonths === 1 ? 'day' : 'days'

    if (total_Years === 0) {
      result = `${total_Years} ${yearString} ${remainingMonths} ${monthString} ${remainingDays} ${dayString}`
    } else if (remainingMonths === 0) {
      result = `${total_Years} ${yearString} ${remainingMonths} ${monthString} ${remainingDays} ${dayString}`
    } else {
      result = `${total_Years} ${yearString} and ${remainingMonths} ${monthString} ${remainingDays} ${dayString}`
    }

    setTotalDurationCount(result)
  }

  const expDuration = (end: Date | any, start: Date | any) => {
    const result = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    })
    return result
  }

  const handleDelete = (_id: any) => {
    const index = array.filter((a: any) => a.id !== _id)
    setArray(index)
  }
  const [orderChanged, setOrderChanged] = useState(false)
  const handleOrder = () => {
    let index = array
    if (orderChanged) {
      index = array.reverse()
      setOrderChanged(!orderChanged)
    } else {
      index = array.reverse()
      setOrderChanged(!orderChanged)
    }
    setArray(index)
  }

  return (
    <React.Fragment>
      <h2 className="page-title text-secondary fw-bold">Online Work Experience Calculator</h2>
      <hr />
      <div className="exp-form">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register('companyName')}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="jobRole">
                <Form.Label>Job Role / Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register('jobRole')}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  {...register('startDate')}
                  className={`form-control ${
                    errors.startDate ? 'is-invalid' : ''
                  }`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  {...register('endDate')}
                  className={`form-control ${
                    errors.endDate ? 'is-invalid' : ''
                  }`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-grid d-sm-flex gap-3">
            <Button
              variant="secondary"
              className="text-white d-flex align-items-center justify-content-center gap-2"
              type="submit"
            >
              <HiPlus className="fs-5" /> Add & Calculate
            </Button>
            <Button
              variant="warning"
              className="text-white d-flex align-items-center justify-content-center gap-2"
              type="reset"
            >
              <IoMdRefresh className="fs-5" /> Reset
            </Button>
          </div>
        </Form>
      </div>

      {array.length !== 0 ? (
        <div className="exp_details my-4">
          <div className="show-total mt-5">
            <p className="text-center fs-5">
              {' '}
              Total Experience: <span className='fw-bold text-decoration-underline text-secondary'>{totalDurationCount}</span>
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <h2 className=" text-decoration-underline fs-4 fw-bold">Details</h2>
          </div>
          <div className="show-details mb-4">
            <Table responsive striped bordered hover>
              <thead className='bg-info text-white'>
                <tr>
                  <th>#</th>
                  <th>Company Name</th>
                  <th>Job Role / Designation</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Experience</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {array?.map((item: any, index: number) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{item.companyName}</td>
                    <td>{item.jobRole}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>
                      {item.years +
                        `${item.years === 1 ? ' year ' : ' years '}` +
                        item.months +
                        `${item.months === 1 ? ' month ' : ' months '}` +
                        item.days +
                        `${item.days === 1 ? ' day ' : ' days '}`}
                    </td>
                    <td>
                      <span
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
                {/* <tr>
                <td>1</td>
                <td>Qentelli</td>
                <td>Sr Software Engineer</td>
                <td>07-02-2022</td>
                <td>19-03-2023</td>
                <td>1 year and 2 months</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr> */}
              </tbody>
            </Table>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default WorkExp
