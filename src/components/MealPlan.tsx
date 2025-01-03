import { useEffect, useState } from "react";
import "../style/MealPlan.css";
import { getMondayOfWeek } from "../hook/useFetch";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import CardMeal from "./CardMeal";
import { MealType } from "../objects/Constants";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MealPlan() {
  const { currentWeek } = useParams(); // Récupère le paramètre dynamique

  const [currentDate, setCurrentDate] = useState<Date | null>(null); // Suivre la date courante
  const [currentDayName, setCurrentDayName] = useState<string>(""); // Suivre le nom du jour courant
  const navigate = useNavigate();

  useEffect(() => {
    // Calcul initial de la date du lundi
    const mondayDate = getMondayOfWeek(Number(currentWeek), new Date().getFullYear());
    setCurrentDate(mondayDate);
    setCurrentDayName(moment(mondayDate).format("dddd").toLowerCase());
  }, [currentWeek]);

  const handlePlus = () => {
    if (currentDate) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1); // Ajouter un jour
      setCurrentDate(nextDate);
      setCurrentDayName(moment(nextDate).format("dddd").toLowerCase()); 
    }
  };

  const handleMinus = () => {
    if (currentDate) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(currentDate.getDate() - 1); // Retirer un jour
      setCurrentDate(prevDate);
      setCurrentDayName(moment(prevDate).format("dddd").toLowerCase()); 
    }
  };

  const backToMenu = () => {
    navigate("/");
}
const handleListeCourse = () => { 
  navigate(`/liste-course`);
}
const handleDetail = (day:string, mealType:MealType) => {
  navigate(`/recipe-details/${day}/${mealType}`);
}
  return (
    <div>
      {currentDate && (
        <div>
        <button onClick={backToMenu} className="back-row">
            <ArrowLeft size={36} color="#000000" />
        </button>
          <h1>Planning </h1>
          <div className="days-selector">
            <button onClick={handleMinus}><ChevronLeft size={34}/></button>
            <h3 className="day">{moment(currentDate).format("dddd")} {moment(currentDate).format("DD/M")}</h3>
            <button onClick={handlePlus}><ChevronRight size={34}/></button>
          </div>
          <section className="feed-meal">
            <div>
              <h2>Petit-déjeuner</h2>
              <button onClick={() => handleDetail(currentDayName, MealType.Breakfast)} className="btn-card-mealPlan">
                <CardMeal key={`breakfast-${currentDayName}`} mealType={MealType.Breakfast} dayName={currentDayName} />
              </button>
            </div>
            <div>
              <h2>Déjeuner</h2>
              <button onClick={() => handleDetail(currentDayName, MealType.Lunch)} className="btn-card-mealPlan">
                <CardMeal key={`lunch-${currentDayName}`} mealType={MealType.Lunch} dayName={currentDayName} />
              </button>
            </div>
            <div>
              <h2>Dîner</h2>
              <button className="btn-card-mealPlan" onClick={() => handleDetail(currentDayName, MealType.Dinner)}>
                <CardMeal key={`dinner-${currentDayName}`} mealType={MealType.Dinner} dayName={currentDayName} />
              </button>
            </div>
          </section>
        </div>
      )}
      <button className="btn-course" onClick={handleListeCourse}><h3>Liste de course</h3></button>
    </div>
  );
}

export default MealPlan