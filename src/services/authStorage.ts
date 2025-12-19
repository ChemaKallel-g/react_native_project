// src/services/authStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "USERS_LIST"; // clé pour la liste de tous les utilisateurs
const AUTH_USER_KEY = "AUTH_USER"; // clé pour l'utilisateur connecté

export interface AuthUser {
  nom: string;
  email: string;
  motDePasse: string;
  location?: string;
}

// Sauvegarder un nouvel utilisateur dans la liste
export const saveUser = async (user: AuthUser) => {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    const users: AuthUser[] = data ? JSON.parse(data) : [];
    
    // Ajouter le nouvel utilisateur
    users.push(user);
    
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Sauvegarder l'utilisateur actuellement connecté
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'utilisateur :", error);
  }
};

// Récupérer tous les utilisateurs
export const getUsers = async (): Promise<AuthUser[]> => {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return [];
  }
};

// Récupérer l'utilisateur actuellement connecté
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const data = await AsyncStorage.getItem(AUTH_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return null;
  }
};

// Déconnexion
export const logout = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};
