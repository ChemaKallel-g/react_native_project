import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from "./cartStorage";
import { getCurrentUser } from "./authStorage";

const ORDERS_KEY_BASE = "orders_history";

const getOrderKey = async () => {
    const user = await getCurrentUser();
    return user ? `${ORDERS_KEY_BASE}_${user.email}` : ORDERS_KEY_BASE;
};

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
}

export const getOrders = async (): Promise<Order[]> => {
    try {
        const key = await getOrderKey();
        const jsonValue = await AsyncStorage.getItem(key);
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
        const key = await getOrderKey();
        await AsyncStorage.setItem(key, JSON.stringify(updatedOrders));
        return updatedOrders;
    } catch (e) {
        console.error("Error saving order", e);
        return [];
    }
};

export const clearOrders = async () => {
    try {
        const key = await getOrderKey();
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error("Error clearing orders", e);
    }
};
