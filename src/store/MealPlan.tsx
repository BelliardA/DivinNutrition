import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MealType } from '../objects/Constants';
import Week from '../objects/Week';

interface MealStore {
  week: Week | null;
  setWeek: (week: Week) => void;
  updateMeal: (dayName: string, mealType: MealType, mealData: any[]) => void;
}

const useMealStore = create<MealStore>()(
  persist(
    (set) => ({
      week: null,
      setWeek: (week) => set({ week }),
      updateMeal: (dayName, mealType, mealData) =>
        set((state) => {
          if (state.week) {
            const day = state.week.getDay(dayName);
            switch (mealType) {
              case MealType.Breakfast:
                day.breakfast = mealData;
                break;
              case MealType.Lunch:
                day.lunch = mealData;
                break;
              case MealType.Dinner:
                day.dinner = mealData;
                break;
              case MealType.Snack:
                day.snack = mealData;
                break;
              default:
                break;
            }
            return { week: state.week };
          }
          return state;
        }),
    }),
    {
      name: 'meal-store', // Clé utilisée dans le localStorage
      partialize: (state) => ({ week: state.week }), // Sauvegarde uniquement la propriété `week`
    }
  )
);

export default useMealStore;