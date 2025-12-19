import AsyncStorage from "@react-native-async-storage/async-storage";
import { CoffeeItem } from "../components/CoffeeCard";
import { getCurrentUser } from "./authStorage";

const FAVORITE_KEY_BASE = "FAVORITE_COFFEES";

const getFavoriteKey = async () => {
    const user = await getCurrentUser();
    return user ? `${FAVORITE_KEY_BASE}_${user.email}` : FAVORITE_KEY_BASE;
};

export const getFavorites = async (): Promise<CoffeeItem[]> => {
    try {
        const key = await getFavoriteKey();
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading favorites", e);
        return [];
    }
};

export const addFavorite = async (item: CoffeeItem) => {
    try {
        const favorites = await getFavorites();
        if (!favorites.find((f) => f.id === item.id)) {
            const updatedFavorites = [...favorites, item];
            const key = await getFavoriteKey();
            await AsyncStorage.setItem(key, JSON.stringify(updatedFavorites));
        }
    } catch (e) {
        console.error("Error adding favorite", e);
    }
};

export const removeFavorite = async (itemId: number) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter((f) => f.id !== itemId);
        const key = await getFavoriteKey();
        await AsyncStorage.setItem(key, JSON.stringify(updatedFavorites));
    } catch (e) {
        console.error("Error removing favorite", e);
    }
};

export const isItemFavorite = async (itemId: number): Promise<boolean> => {
    const favorites = await getFavorites();
    return favorites.some((f) => f.id === itemId);
};
