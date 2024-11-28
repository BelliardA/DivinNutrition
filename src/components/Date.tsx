import { useEffect } from "react";

interface MealPlanDashboardProps {
  setCurrentWeek: (weekNumber: number) => void;
  setCurrentDate: (date: string) => void;
}

// Fonction améliorée pour obtenir le numéro de la semaine ISO 8601
function getWeekNumber(date: Date): number {
  const targetDate = new Date(date.getTime());
  
  // Déplace la date au jeudi de la même semaine pour garantir l'appartenance à la bonne semaine
  targetDate.setDate(targetDate.getDate() - ((targetDate.getDay() + 6) % 7) + 3);
  
  // Obtenir le premier jour de l'année
  const firstThursday = new Date(targetDate.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Calculer la différence en jours
  const weekNumber = Math.round(((targetDate.getTime() - firstThursday.getTime()) / (86400000 * 7)) + 1);
  return weekNumber;
}

function MealPlanDashboard({ setCurrentWeek, setCurrentDate }: MealPlanDashboardProps) {
  useEffect(() => {
    const today = new Date();
    setCurrentWeek(getWeekNumber(today)); // Calcul du numéro de la semaine
    setCurrentDate(today.toISOString().split('T')[0]); // Date formatée en "YYYY-MM-DD"
  }, [setCurrentWeek, setCurrentDate]);

  return null;
}

export default MealPlanDashboard;