import { IoClose } from "react-icons/io5";
import { useState } from "react";

export const EmployeeForm = () => {
  const [formPopUpStatus, setformPopUpStatus] = useState(false);

  const handleClick = () => {
    setformPopUpStatus(!formPopUpStatus);
  };

  return (
    <div>
      <button
        className="btn btn-primary mb-4 bg-blue-400 px-4 py-2 text-white rounded w-40"
        onClick={() => setformPopUpStatus(true)}
      >
        Add Employee
      </button>
      {formPopUpStatus ? (
        <form className="space-y-4 flex flex-col w-[32%] h-auto border-2 border-gray-400 rounded-md p-8 absolute top-20 left-[30%]">
          <div className="flex justify-end text-xl">
            <IoClose onClick={handleClick} />
          </div>
          <label htmlFor="">Full Name</label>
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

          <label htmlFor="">Profile Picture</label>
          <input type="file" className="px-2 py-2 text-white bg-gray-400" />

          <label htmlFor="">Joining Date</label>
          <input
            type="date"
            className="input border border-gray-400 px-2 py-2"
          />

          <button type="submit" className="bg-blue-400 text-white py-2 rounded">
            Add Employee
          </button>
        </form>
      ) : null}
    </div>
  );
};
