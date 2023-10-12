import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {
  WorkExperienceContextType,
  useWorkExperience,
} from '../../../Context/WorkExperienceContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

const ExpTable = () => {
  const {
    state,
    dispatch,
    setEditIndex,
  } = useWorkExperience() as WorkExperienceContextType;
  const [isSaved, setIsSaved] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [hideTable, setHideTable] = useState(false);
  const notify = (message: string, type: 'success' | 'error') => {
    switch (type) {
      case 'success':
        return toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      case 'error':
        return toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;

      default:
        toast.success('No message', {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
    }
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSaveToLocal = () => {
    localStorage.setItem('workExperienceData', JSON.stringify(state));
    setIsSaved(!isSaved);
    setIsDisabled(false);
    notify('Saved', 'success');
  };

  const handleRemoveDataFromLocal = () => {
    dispatch({ type: 'REMOVE_ALL', payload: [] });
    setIsSaved(!isSaved);
    notify('Removed', 'success');
  };

  const handleHide = () => {
    setHideTable(!hideTable);
  };

  useEffect(() => {
    const savedData: string[] | '' = JSON.parse(
      localStorage.getItem('workExperienceData') || ''
    );
    if (savedData.length !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  useEffect(() => {
    const savedData: string[] | '' = JSON.parse(
      localStorage.getItem('workExperienceData') || ''
    );
    if (savedData.length !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [state]);

  const handleUpdate = (id: string) => {
    // const data= state[id];
    // console.log("data",data);
    // const _id = id && id || ''
    if (id) {
      setEditIndex(id);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* {state.length > 0 && (
        // <div className='w-50 mx-auto'>
        //   <div className='buttons d-flex justify-content-end gap-3'>
        //     <Button
        //       variant='danger'
        //       disabled={isDisabled}
        //       onClick={handleRemoveDataFromLocal}
        //     >
        //       Remove all
        //     </Button>
        //     <Button variant='primary' onClick={handleSaveToLocal}>
        //       Save
        //     </Button>
        //   </div>
        //   <div className='exp-table'>
        //     <div className='exp-header rounded-3 bg-light p-3 mt-4'>
        //       <Row className=' align-items-center'>
        //         <Col xs={1}>#</Col>
        //         <Col>Company</Col>
        //         <Col>Start Date</Col>
        //         <Col>End Date</Col>
        //         <Col></Col>
        //       </Row>
        //     </div>
        //     {state?.map((item, i) => (
        //       <div
        //         className='exp-header rounded-3 bg-light p-2 mt-3'
        //         key={i + 1}
        //       >
        //         <Row className=' align-items-center'>
        //           <Col xs={1}>{i + 1}</Col>
        //           <Col>{item.companyName}</Col>
        //           <Col>{item.startDate}</Col>
        //           <Col>{item.endDate}</Col>
        //           <Col>
        //             <Button size='sm'>Update</Button>
        //           </Col>
        //         </Row>
        //       </div>
        //     ))}
        //   </div>
        // </div>
      )} */}
      <div className='exp-mui-table exp-form mx-auto'>
        <div className='d-flex justify-content-between'>
          <div className='buttons d-flex gap-3 my-3'>
            <Button variant='primary' onClick={handleHide}>
              {!hideTable ? 'Hide Table' : 'Show Table'}
            </Button>
          </div>
          {!hideTable && (
            <div className='buttons d-flex justify-content-end gap-3 my-3'>
              <Button
                variant='danger'
                disabled={isDisabled}
                onClick={handleRemoveDataFromLocal}
              >
                Remove all
              </Button>
              <Button variant='primary' onClick={handleSaveToLocal}>
                Save
              </Button>
            </div>
          )}
        </div>
        {!hideTable && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell
                    align='center'
                    className='fw-bold bg-secondary text-white'
                  >
                    #
                  </TableCell>
                  <TableCell
                    align='center'
                    className='fw-bold bg-secondary text-white'
                  >
                    Company Name
                  </TableCell>
                  <TableCell
                    align='center'
                    className='fw-bold bg-secondary text-white'
                  >
                    Start Date
                  </TableCell>
                  <TableCell
                    align='center'
                    className='fw-bold bg-secondary text-white'
                  >
                    End Date
                  </TableCell>
                  <TableCell
                    align='center'
                    className='fw-bold bg-secondary text-white'
                  >
                    Experience
                  </TableCell>
                  <TableCell
                    align='center'
                    className='fw-bold bg-secondary text-white'
                  >
                    Edit
                  </TableCell>
                  <TableCell
                    align='center'
                    className='fw-bold bg-secondary text-white'
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.map((row, i) => {
                  const getDifferenceInDates = () => {
                    let startDate = new Date(row.startDate);
                    let endDate = new Date(row.endDate);
                    const yearsDiff = differenceInYears(endDate, startDate);
                    const monthsDiff =
                      differenceInMonths(endDate, startDate) - yearsDiff * 12;
                    const daysDiff = differenceInDays(endDate, startDate);
                    return `${yearsDiff}  ${
                      yearsDiff > 0 ? 'years' : 'year'
                    } ${monthsDiff} ${monthsDiff > 0 ? 'months' : 'month'}`;
                  };
                  return (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='center'>{i}</TableCell>
                      <TableCell align='center'>{row.companyName}</TableCell>
                      <TableCell align='center'>{row.startDate}</TableCell>
                      <TableCell align='center'>{row.endDate}</TableCell>
                      <TableCell align='center'>
                        {getDifferenceInDates()}
                      </TableCell>
                      <TableCell align='center'>
                        <Button size='sm' onClick={() => handleUpdate(row.id)}>
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align='center'>Delete</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default ExpTable;

const a = [
  {
    obj1: '1 years 2 months',
  },
  {
    obj1: '5 years 8 months',
  },
  {
    obj1: '3 years 6 months',
  },
];
