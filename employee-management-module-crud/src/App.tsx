import { EmployeeForm } from "./components/EmployeeForm";
import SearchBar from "./components/SearchBar";
import "./index.css";
function App() {
  return (
    <div className="container mx-auto my-1 p-4 flex flex-col relative">
        <h1 className="text-2xl font-bold mb-8">Employee Dashboard</h1>
        <SearchBar />
        <EmployeeForm />
      </div>
  );
}

export default App;
