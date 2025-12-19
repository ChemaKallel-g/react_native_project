import AsyncStorage from "@react-native-async-storage/async-storage";
import { CoffeeItem } from "../components/CoffeeCard";

const FAVORITE_KEY = "FAVORITE_COFFEES";

export const getFavorites = async (): Promise<CoffeeItem[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY);
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
            await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
        }
    } catch (e) {
        console.error("Error adding favorite", e);
    }
};

export const removeFavorite = async (itemId: number) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter((f) => f.id !== itemId);
        await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
    } catch (e) {
        console.error("Error removing favorite", e);
    }
};

export const isItemFavorite = async (itemId: number): Promise<boolean> => {
    const favorites = await getFavorites();
    return favorites.some((f) => f.id === itemId);
};
