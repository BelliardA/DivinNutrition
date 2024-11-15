import { create } from 'zustand';
import User from '../objects/User';

// Fonction pour récupérer un utilisateur depuis le localStorage
const getUserFromLocalStorage = (): User => {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData); // Récupérer l'objet utilisateur depuis localStorage
  }
  // Retourner un utilisateur par défaut
  return new User("", 0, 0, 0, 1, true, 1); // Utilisateur par défaut
};

// Fonction pour enregistrer un utilisateur dans le localStorage
const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user)); // Sauvegarder l'objet utilisateur dans localStorage
};

const useUserStore = create((set) => ({
  user: getUserFromLocalStorage(), // Initialiser l'utilisateur depuis le localStorage
  setUser: (newUser: User) => {
    saveUserToLocalStorage(newUser); // Sauvegarder le nouvel utilisateur dans le localStorage
    set({ user: newUser });
  },
  updateUser: (updatedFields: any) => 
    set((state: any) => {
      const updatedUser = { ...state.user, ...updatedFields };
      saveUserToLocalStorage(updatedUser); // Sauvegarder l'utilisateur mis à jour dans le localStorage
      return { user: updatedUser };
    }),
  clearUser: () => {
    const defaultUser = new User("", 0, 0, 0, 1, true,1); // Réinitialiser à un utilisateur par défaut
    saveUserToLocalStorage(defaultUser); // Sauvegarder l'utilisateur par défaut dans le localStorage
    set({ user: defaultUser });
  },
}));

export default useUserStore;