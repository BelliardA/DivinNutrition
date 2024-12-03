import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import User from '../objects/User';
import { ActivityLevel, Sexe, ProfessionalActivity } from '../objects/Constants';

export interface UserStore {
  user: User;
  updateUser: (param: string, value: string | number | ActivityLevel | ProfessionalActivity | Sexe) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>()( // Ici, <UserStore> spécifie l'interface
  devtools(
    persist(
      (set) => ({
        // Logique du store utilisant l'interface
        user: new User(),
        setUser: (user: User) => set({ user }),
        updateUser: (param, value) =>
          set((state) => {
            if (param in state.user) {
              return { user: { ...state.user, [param]: value } };
            }
            return state;
          }),
      }),
      { name: 'user-store' }
    )
  )
);

export default useUserStore;