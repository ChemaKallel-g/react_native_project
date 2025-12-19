import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from "./cartStorage";

const ORDERS_KEY = "orders_history";

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
}

export const getOrders = async (): Promise<Order[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(ORDERS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading orders", e);
        return [];
    }
};

export const saveOrder = async (items: CartItem[], total: number) => {
    try {
        const currentOrders = await getOrders();
        const newOrder: Order = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items,
            total,
        };
        const updatedOrders = [newOrder, ...currentOrders];
        await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
        return updatedOrders;
    } catch (e) {
        console.error("Error saving order", e);
        return [];
    }
};

export const clearOrders = async () => {
    try {
        await AsyncStorage.removeItem(ORDERS_KEY);
    } catch (e) {
        console.error("Error clearing orders", e);
    }
};
