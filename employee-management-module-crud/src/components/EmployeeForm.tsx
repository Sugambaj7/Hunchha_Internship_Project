import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  employeeSchema,
} from "../validation/employeeSchema.ts";
import type { EmployeeFormData } from "../validation/employeeSchema.ts";


interface EmployeeFormProps {
  status: boolean;
  onClose: () => void;
}

export const EmployeeForm = ({status, onClose}: EmployeeFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>(
    {
      resolver: zodResolver(employeeSchema),
    }
  );

  const onSubmit = (data: EmployeeFormData) => {
    console.log("Submitted Data:", data);
  };


  if (!status) return null;

  return (
    <div>
      {status ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-[32%] h-auto border-2 border-gray-400 rounded-md p-8 absolute top-20 left-[30%]"
        >
          <div className="flex justify-end text-xl">
        <IoClose onClick={onClose} />
      </div>
          <label htmlFor="">Full Name</label>
          <input
            {...register("fullName")}
            className="input border border-gray-400 px-2 py-2"
          />
           <p className="text-red-500">{errors.fullName?.message}</p>

          <label htmlFor="">Email</label>
          <input
            {...register("email")}
            className="input  border border-gray-400 px-2 py-2"
          />
           <p className="text-red-500">{errors.email?.message}</p>

          <label htmlFor="">Department</label>
          <select
            {...register("department")}
            className="input border border-gray-400 px-2 py-2"
          >
            <option value="">Choose Department</option>
            <option value="HR Department">HR Departmemt</option>
            <option value="Finance Department">Finance Departmemt</option>
            <option value="Sales Department">Sales Department</option>
          </select>
          <p className="text-red-500">{errors.department?.message}</p>

          <label htmlFor="">Profile Picture</label>
          <input
            {...register("profilePic")}
            type="file"
            className="px-2 py-2 text-white bg-gray-400"
            accept="image/*"
          />
           <p className="text-red-500">{errors.profilePic?.message?.toString()}</p>


          <label htmlFor="">Joining Date</label>
          <input
            {...register("joiningDate")}
            type="date"
            className="input border border-gray-400 px-2 py-2"
          />
          <p className="text-red-500">{errors.joiningDate?.message}</p>

          <button type="submit" className="bg-blue-400 text-white py-2 rounded">
            Add Employee
          </button>
        </form>
      ) : null}
    </div>
  );
};
