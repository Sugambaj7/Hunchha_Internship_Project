import { EmployeeForm } from "./components/EmployeeForm";
import SearchBar from "./components/SearchBar";
import "./index.css";
function App() {
  return (
    <div className="container mx-auto my-4 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Employee Dashboard</h1>
        <SearchBar />
         <button className="btn btn-primary mb-4 bg-blue-400 px-4 py-2 text-white rounded w-38">Add Employee</button>
        <EmployeeForm />
      </div>
  );
}

export default App;
