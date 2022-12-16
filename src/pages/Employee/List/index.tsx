import React, {
    ChangeEvent,
    Dispatch,
    ReactElement,
    useEffect,
    useState,
} from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.scss'
import { history,joinClass } from 'helpers'
import { Button, Textbox, Table } from 'components'
import { employeeActions,employeeTypes } from 'store'
import { RespType } from 'types'

const List = (): ReactElement => {
    const [tempList, setTempList] = useState<employeeTypes.EmployeeType[]>([])
    const listResponse: employeeTypes.EmployeeType[] = useSelector(
        (state: RootStateOrAny) => state.employeeReducer.listResp || []
    )
    const delResponse: RespType = useSelector(
        (state: RootStateOrAny) => state.employeeReducer.deleteResp || false
    )

    useEffect(() => {
        setTempList(listResponse)
    }, [listResponse])

    const dispatch: Dispatch<{ type: string }> = useDispatch()

    useEffect(() => {
        dispatch(employeeActions.ListEmployeeRequest())
    }, [delResponse])

    const [searchTxt, setSearchTxt] = useState<string>('')

    const search = (): void => {
        if (listResponse.length > 0) {
            if (searchTxt && searchTxt.trim()) {
                const subArry: employeeTypes.EmployeeType[] = listResponse.filter((employee) => {
                    if (
                        (employee.fname + employee.lname).toLowerCase().includes(searchTxt.toLowerCase()) ||
                        employee.email.toLowerCase().includes(searchTxt.toLowerCase()) ||
                        employee.designation.toLowerCase().includes(searchTxt.toLowerCase())
                    )
                        return employee
                })
                setTempList(subArry)
            } else {
                setTempList(listResponse)
            }
        }
    }

    const deleteEmployee = (row: employeeTypes.EmployeeType): void => {
        dispatch(
            employeeActions.DeleteEmployeeRequest({
                employeeId: row.employeeId,
            })
        )
    }

    return (
        <>
            <div className={styles['list-cover']}>
                <div className={styles['title-sec']}>
                    <span className={styles['title-txt']}>
                        Employee Dashboard
                    </span>
                    <Button
                        type="button"
                        label="Add Employee"
                        className={styles['add-btn']}
                        click={() => {
                            dispatch(employeeActions.ClearEmployeeProfile())
                            dispatch(
                                employeeActions.EditEmployeeNavigate(false)
                            )
                            history.push('/register')
                        }}
                    ></Button>
                </div>
                <div className={styles['welcome-sec']}>
                    Welcome to Employee Dashboard
                </div>
                <div className={styles['list-body']}>
                    <Textbox
                        className={styles['srch-bar']}
                        placeholder="Search for Employee,email or designation"
                        change={(event: ChangeEvent<HTMLInputElement>) => {
                            setSearchTxt(event.target.value)
                            if (
                                !event.target.value ||
                                (event.target.value &&
                                    !event.target.value.trim())
                            )
                                setTempList(listResponse)
                        }}
                    ></Textbox>
                    <Button
                        className={styles['srch-btn']}
                        label="Search"
                        click={search}
                    ></Button>
                </div>
                <Table className={styles['cstm-table']}>
                    <thead>
                        <tr className={styles['table-header']}>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Joining Date</th>
                            <th>Experience(in yr)</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tempList.map((employee, index) => (
                            <tr className={styles['height-33']} key={index}>
                                <td>{employee.fname + ' ' + employee.lname}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.doj}</td>
                                <td>{employee.experience}</td>
                                <td>{employee.email}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className={styles['cstm-icon']}
                                        icon={faEdit}
                                        title="Edit"
                                        onClick={() => {
                                            dispatch(
                                                employeeActions.ClearEmployeeProfile()
                                            )
                                            dispatch(
                                                employeeActions.EditEmployeeNavigate(
                                                    true,
                                                    employee.employeeId
                                                )
                                            )
                                            history.push('/register')
                                        }}
                                    />
                                    <FontAwesomeIcon
                                        className={joinClass(
                                            'cstm-icon',
                                            'left-5'
                                        )}
                                        icon={faEye}
                                        title="View"
                                        onClick={() => {
                                            dispatch(
                                                employeeActions.ClearEmployeeProfile()
                                            )
                                            dispatch(
                                                employeeActions.ViewEmployeeNavigate(
                                                    employee.employeeId
                                                )
                                            )
                                            history.push('/view')
                                        }}
                                    />
                                    <FontAwesomeIcon
                                        className={joinClass(
                                            'cstm-icon',
                                            'left-5'
                                        )}
                                        icon={faTrash}
                                        title="Delete"
                                        onClick={() => {
                                            deleteEmployee(employee)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                        {tempList.length == 0 && (
                            <tr className={styles['height-33']}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className={styles['empty-text']}>
                                    No Employees added yet.
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default List
