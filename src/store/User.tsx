import { create } from 'zustand';
import User from '../objects/User';
import UserInterface from '../types/UserInterface';

export interface UserStore {
  user: User;
  updateUser: (updatedFields: Partial<User>) => void;
  clearUser: () => void;
}

// Fonction pour récupérer un utilisateur depuis le localStorage
const getUserFromLocalStorage = (): User => {
  const localStorageUser = localStorage.getItem('user'); // Récupérer l'utilisateur depuis localStorage
  const userData = localStorageUser ? JSON.parse(localStorageUser) : null;
  if (userData) {
    console.log("user zustand ",userData);
    return new User(userData); // Récupérer l'objet utilisateur depuis localStorage
  }
  // Retourner un utilisateur par défaut
  return new User(); // Utilisateur par défaut
};

// Fonction pour enregistrer un utilisateur dans le localStorage
const saveUserToLocalStorage = (user: UserInterface) => {
  localStorage.setItem('user', JSON.stringify(user)); // Sauvegarder l'objet utilisateur dans localStorage
};

const useUserStore = create<UserStore>((set) => ({
  user: getUserFromLocalStorage(), // Initialiser l'utilisateur depuis le localStorage
  updateUser: (updatedFields: any) => 
    set((store: UserStore) => {
      const updatedUser ={ ...store.user, ...updatedFields };
      saveUserToLocalStorage(updatedUser); // Sauvegarder l'utilisateur mis à jour dans le localStorage
      return { user: updatedUser };
    }),
  clearUser: () => {
    const defaultUser = new User(); // Réinitialiser à un utilisateur par défaut
    saveUserToLocalStorage(defaultUser); // Sauvegarder l'utilisateur par défaut dans le localStorage
    set({ user: defaultUser });
  },
}));

export default useUserStore;