import { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import {
  WorkExperienceContextType,
  useWorkExperience,
} from '../../../Context/WorkExperienceContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns'
import { saveExperienceToLocalStorage } from '../../../Util/util'

const ExpTable = () => {
  const { state, dispatch, setEditIndex } =
    useWorkExperience() as WorkExperienceContextType
  const [isSaved, setIsSaved] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [hideTable, setHideTable] = useState(false)
  const notify = (message: string, type: 'success' | 'error') => {
    switch (type) {
      case 'success':
        return toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      // break;
      case 'error':
        return toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      // break;

      default:
        toast.success('No message', {
          position: toast.POSITION.TOP_RIGHT,
        })
        break
    }
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  const handleSaveToLocal = () => {
    // const originalArray = [{ key: 'value' }];
    // localStorage.setItem('yourKey', JSON.stringify(originalArray));

    // Later, when checking for tampering
    const currentArrayString = localStorage.getItem('workExperienceData')
    if (currentArrayString) {
      const currentArray = JSON.parse(currentArrayString)
      if (JSON.stringify(currentArray) !== JSON.stringify(state)) {
        // Tampering detected
        saveExperienceToLocalStorage(state)
        setIsSaved(!isSaved)
        setIsDisabled(false)
        notify('Saved', 'success')
      }
    }
    // notify('Saved XED', 'success');
  }

  const handleRemoveDataFromLocal = () => {
    dispatch({ type: 'REMOVE_ALL', payload: [] })
    setIsSaved(!isSaved)
    notify('Removed', 'success')
  }

  const handleHide = () => {
    setHideTable(!hideTable)
  }

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    const _sd = localStorage.getItem('workExperienceData')
    if (_sd) {
      const savedData: string[] = JSON.parse(_sd)
      if (savedData.length !== 0) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }
  }, [, state])

  const handleUpdate = (id: string) => {
    if (id) {
      setEditIndex(id)
    }
  }
  const handleDelete = (id: string) => {
    if (id) {
      dispatch({ type: 'DELETE', id: id })
    }
  }

  return (
    <div>
      <ToastContainer />
      {state.length > 0 && (
        <div className="exp-mui-table exp-table mx-auto">
          <div className="d-flex justify-content-between">
            <div className="buttons d-flex gap-3 my-3">
              <Button variant="primary" onClick={handleHide}>
                {!hideTable ? 'Hide Table' : 'Show Table'}
              </Button>
            </div>
            {!hideTable && (
              <div className="buttons d-flex justify-content-end gap-3 my-3">
                <Button
                  variant="danger"
                  disabled={isDisabled}
                  onClick={handleRemoveDataFromLocal}>
                  Delete All
                </Button>
                <Button variant="primary" onClick={handleSaveToLocal}>
                  Save
                </Button>
              </div>
            )}
          </div>
          {!hideTable && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table">
                <TableHead>
                  <TableRow className="">
                    <TableCell
                      align="center"
                      className="fw-bold bg-secondary text-white p-2 px-3">
                      #
                    </TableCell>
                    <TableCell
                      align="center"
                      className="fw-bold bg-secondary text-white p-2 px-3">
                      Company Name
                    </TableCell>
                    <TableCell
                      align="center"
                      className="fw-bold bg-secondary text-white p-2 px-3">
                      Start Date
                    </TableCell>
                    <TableCell
                      align="center"
                      className="fw-bold bg-secondary text-white p-2 px-3">
                      End Date
                    </TableCell>
                    <TableCell
                      align="center"
                      className="fw-bold bg-secondary text-white p-2 px-3">
                      Experience
                    </TableCell>
                    <TableCell
                      align="center"
                      className="fw-bold bg-secondary text-white p-2 px-3">
                      Edit
                    </TableCell>
                    <TableCell
                      align="center"
                      className="fw-bold bg-secondary text-white p-2 px-3">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.map((row, i) => {
                    const getDifferenceInDates = () => {
                      let startDate = new Date(row.startDate)
                      let endDate = new Date(row.endDate)
                      const yearsDiff = differenceInYears(endDate, startDate)
                      const monthsDiff =
                        differenceInMonths(endDate, startDate) - yearsDiff * 12
                      // const daysDiff = differenceInDays(endDate, startDate);
                      return `${yearsDiff}  ${
                        yearsDiff > 0 ? 'years' : 'year'
                      } ${monthsDiff} ${monthsDiff > 0 ? 'months' : 'month'}`
                    }
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">
                          {row.companyName !== ''
                            ? row.companyName
                            : `Company ${i + 1}`}
                        </TableCell>
                        <TableCell align="center">{row.startDate}</TableCell>
                        <TableCell align="center">
                          {row.present ? (
                            <span className="btn btn-secondary btn-sm">
                              Present
                            </span>
                          ) : (
                            row.endDate
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {getDifferenceInDates()}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(row.id)}>
                            <FiEdit className="fs-" />
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleDelete(row.id)}>
                            <AiOutlineClose />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </div>
  )
}

export default ExpTable
