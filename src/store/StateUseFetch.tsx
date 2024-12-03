import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface StateUseFecthInterface {
    loading: boolean;
    error: string;
    setState: (loading: boolean, error: string) => void;
}

const StateUseFecth = create<StateUseFecthInterface>()(
    devtools(
        persist(
            (set) => ({
                loading: false,
                error: '',
                setState: (loading : boolean, error : string) => set({ loading, error })
            }),
            {
                name: 'state-use-fetch',
            }
        )
    )
);

export default StateUseFecth;