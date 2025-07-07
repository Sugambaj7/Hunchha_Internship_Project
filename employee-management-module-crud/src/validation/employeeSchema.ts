import {z} from "zod";

export const employeeSchema = z.object({
  profilePic: z
    .any()
    .refine((file: FileList) => file && file.length === 1, {
      message: 'Profile picture is required',
    }),
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  department: z.string(),
   joiningDate: z
    .string()
    .refine((dateStr) => {
      const today = new Date();
      const inputDate = new Date(dateStr);
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
      return inputDate > today;
    }, {
      message: "Joining date must be in the future",
    }),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;