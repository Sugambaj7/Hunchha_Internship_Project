import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook.ts";
import { fetchEmployee } from "../features/employee/employeeSlice.ts";
import { deleteEmployee } from "../features/employee/employeeSlice.ts";

   interface EmployeeFormProps {
        status: boolean;
    }
export default function EmployeeTable({ status }: EmployeeFormProps) {
    const dispatch = useAppDispatch();
    const { employees} = useAppSelector((state) => state.employee);

    useEffect(() => {
        dispatch(
            fetchEmployee() 
        )
    }, [status]);

    return (
    <>
    { !status ? <div>
        <table className="border border-gray-400">
            <thead className='bg-blue-400 text-white'>
                <tr>
                    <th className='px-3 py-2'>ID</th>
                    <th className='px-3 py-2'>Full Name</th>
                    <th className='px-3 py-2'>Email</th>
                    <th className='px-3 py-2'>Department</th>
                    <th className='px-3 py-2'>Profile Picture</th>
                    <th className='px-3 py-2'>Joining Date</th>
                    <th className='px-3 py-2'>Actions</th>
                </tr>
            </thead>
            <tbody>
               {employees.map((employee, index) => (
                <tr key={employee.id} className='border-b border-gray-300'>
                    <td className='p-4'>{index + 1}</td>
                    <td className='p-4'>{employee.fullName}</td>
                    <td className='p-4'>{employee.email}</td>
                    <td className='p-4'>{employee.department}</td>
                    <td className='p-4'>
                        <img src={employee.profilePic} alt="Profile" />
                    </td>
                    <td className='p-4'>{employee.joiningDate}</td>
                    <td className='p-4'>
                        <button className='bg-blue-400 text-white px-4 py-2 rounded'>Edit</button>
                        <button className='bg-red-400 text-white px-4 py-2 rounded ml-2' onClick = {() => dispatch(deleteEmployee(employee.id))}>Delete</button>
                    </td>
                </tr>
               ))}
            </tbody>

        </table>
    </div>: null }
    </>
    
  )
}
