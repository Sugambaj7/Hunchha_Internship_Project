import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook.ts";
import { fetchEmployee } from "../features/employee/employeeSlice.ts";
import { deleteEmployee } from "../features/employee/employeeSlice.ts";
import {EditEmployeeForm} from "./EditEmployeeForm.tsx";
import { setCurrentPage } from "../features/employee/employeeSlice.ts";

   interface EmployeeFormProps {
        status: boolean;
    }
export default function EmployeeTable({ status }: EmployeeFormProps) {
  const [editPopUpStatus, setEditPopUpStatus] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { employees, currentPage } = useAppSelector((state) => state.employee);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const currentItems = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [status, editPopUpStatus, dispatch]);

  useEffect(() => {
    // If last item is deleted and causes empty page
    if ((currentPage - 1) * itemsPerPage >= employees.length && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }, [employees.length, currentPage, dispatch]);

  const handleEditEmployee = (id: string) => {
    setEditPopUpStatus(true);
    setEditEmployeeId(id);
    console.log("Edit Employee ID:", id);
  };

  return (
    <>
      {!status && !editPopUpStatus ? (
        <div>
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
              {currentItems.map((employee, index) => (
                <tr key={employee.id} className='border-b border-gray-300'>
                  <td className='p-4'>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className='p-4'>{employee.fullName}</td>
                  <td className='p-4'>{employee.email}</td>
                  <td className='p-4'>{employee.department}</td>
                  <td className='p-4'>
                    <img src={employee.profilePic} alt="Profile" className="w-10 h-10 " />
                  </td>
                  <td className='p-4'>{employee.joiningDate}</td>
                  <td className='p-4'>
                    <button className='bg-blue-400 text-white px-4 py-2 rounded' onClick={() => handleEditEmployee(employee.id)}>Edit</button>
                    <button className='bg-red-400 text-white px-4 py-2 rounded ml-2' onClick={() => dispatch(deleteEmployee(employee.id))}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4 w-[79%]">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                disabled={currentPage === 1}
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              >
                Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                disabled={currentPage === totalPages}
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : null}

      {editPopUpStatus && (
        <EditEmployeeForm
          status={editPopUpStatus}
          onClose={() => setEditPopUpStatus(false)}
          id={editEmployeeId}
        />
      )}
    </>
  );
}
