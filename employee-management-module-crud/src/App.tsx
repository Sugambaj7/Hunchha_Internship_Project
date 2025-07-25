import { EmployeeForm } from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import SearchBar from "./components/SearchBar";
import "./index.css";
import { useEffect, useState } from "react";
function App() {
  const [formPopUpStatus, setformPopUpStatus] = useState(false);

    useEffect(() => {
      console.log("Form Popup Status Changed:", formPopUpStatus);
  }, [formPopUpStatus]);


  return (
    <div className="container mx-auto my-1 p-4 flex flex-col relative">
      <h1 className="text-2xl font-bold mb-8">Employee Dashboard</h1>
      <SearchBar />
      <button
        className="btn btn-primary mb-4 bg-blue-400 px-4 py-2 text-white rounded w-40"
        onClick={() => setformPopUpStatus(true)}
      >
        Add Employee
      </button>
      <EmployeeTable status={formPopUpStatus}/>
      <EmployeeForm
        status={formPopUpStatus}
        onClose={() => setformPopUpStatus(false)}
      />
    </div>
  );
}

export default App;
