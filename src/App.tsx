import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";   
import MealPlan from "./components/MealPlan";
import SearchAliment from "./components/SearchAliment";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="search-aliment" element={<SearchAliment/>} />
      </Routes>
    </Router>
  );

}

export default App
