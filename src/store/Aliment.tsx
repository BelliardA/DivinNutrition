import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface AlimentStore {
  alimentsId: number[];
  setAliments: (id: number) => void; 
  clearAliments: () => void;
}

const Aliment = create<AlimentStore>()(
  devtools(
    persist(
      (set) => ({
        alimentsId: [],
        setAliments: (id) => set((state) => ({
          alimentsId: [...state.alimentsId, id]  
        })),
        clearAliments: () => set({ alimentsId: [] }),
      }),
      { name: 'aliments' }
    )
  )
);

export default Aliment;