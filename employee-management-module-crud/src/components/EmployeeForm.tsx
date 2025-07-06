import {useState} from 'react';

export const EmployeeForm = () => {
    const [addEmployeePopUp, setEmployeePopUp] = useState('false');

  return (
    <form className="space-y-4 flex flex-col w-[35%] border-2 border-gray-400 rounded-md p-8">
      <label htmlFor="" >Full Name</label>
      <input className="input border border-gray-400 px-2 py-2" />

      <label htmlFor="">Email</label>
      <input className="input  border border-gray-400 px-2 py-2" />

        <label htmlFor="">Department</label>
      <select className="input border border-gray-400 px-2 py-2">
        <option value="">Choose Department</option>
        <option value="HR Department">HR Departmemt</option>
        <option value="Finance Department">Finance Departmemt</option>
        <option value="Sales Department">Sales Departmemt</option>
      </select>

       <input type="file" />

      <label htmlFor="">Joining Date</label>
      <input type="date" className="input border border-gray-400 px-2 py-2" />

      <button type="submit" className="bg-blue-400 text-white py-2 rounded">Add Employee</button>
    </form>
  );
};
