import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";   
import MealPlan from "./components/MealPlan";
import SearchAliment from "./components/SearchAliment";
import ListeCourse from "./components/ListeCourse";
import RecipeDetails from "./components/RecipeDetails";
import Recipe from "./components/Recipe";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal-plan/:currentWeek" element={<MealPlan />} />
        <Route path="/search-aliment" element={<SearchAliment/>} />
        <Route path="/liste-course" element={<ListeCourse/>} />
        <Route path="/recipe-details/:day/:mealType" element={<RecipeDetails/>} />
        <Route path="/recipe/:day/:mealType" element={<Recipe/>} />
      </Routes>
    </Router>
  );

}

export default App
