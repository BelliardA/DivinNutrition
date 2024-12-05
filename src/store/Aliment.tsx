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
        clearAll: () => set({ alimentsId: [] , nutrients: []}),
      }),
      { name: 'aliments' }
    )
  )
);

export default Aliment;