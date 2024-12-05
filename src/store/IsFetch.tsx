import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface IsFetchStore {
  isFetch: boolean;
  setIsFetch: (isFetch: boolean) => void;
}

const IsFetch = create<IsFetchStore>()(
    devtools(
        persist(
            (set) => ({
            isFetch: true,  //dans le cas ou l'api n'est pas dépasser le mettre a false de base
            setIsFetch: (isFetch) => set({ isFetch }),
            }),
            { name: 'is-fetch' }
        )
        )
)

export default IsFetch;