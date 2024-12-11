import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface macroNutrient{
  protein: number;
  glucides: number;
  lipids: number;
  calories: number;
}

export interface AlimentStore {
  alimentsId: number[];
  nutrients: macroNutrient[];
  setAliments: (id: number) => void; 
  setNutrients: (nutrients: macroNutrient) => void;
  delAliments: (id: number) => void;
  clearAll: () => void;

}

const Aliment = create<AlimentStore>()(
  devtools(
    persist(
      (set) => ({
        alimentsId: [],
        nutrients: [],
        setAliments: (id) => set((state) => ({
          alimentsId: [...state.alimentsId, id]  
        })),
        setNutrients: (tmp: macroNutrient) => set((state) => ({
          nutrients: Array.isArray(state.nutrients) ? [...state.nutrients, tmp] : [tmp]
        })),
        delAliments: (id) =>
          set((state) => {
            // Trouver l'index de l'aliment à supprimer
            const indexToRemove = state.alimentsId.indexOf(id);

            // Si l'aliment existe, le supprimer ainsi que son nutriment correspondant
            if (indexToRemove > -1) {
              return {
                alimentsId: state.alimentsId.filter((_, index) => index !== indexToRemove),
                nutrients: state.nutrients.filter((_, index) => index !== indexToRemove),
              };
            }

            // Si l'aliment n'existe pas, ne rien changer
            return state;
          }),
        clearAll: () => set({ alimentsId: [] , nutrients: []}),
      }),
      { name: 'aliments' }
    )
  )
);

export default Aliment;