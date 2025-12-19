import AsyncStorage from "@react-native-async-storage/async-storage";
import { CoffeeItem } from "../components/CoffeeCard";

const CART_KEY = "cart";

export interface CartItem extends CoffeeItem {
    quantity: number;
    size?: string;
    sugar?: string;
}

export const getCart = async (): Promise<CartItem[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(CART_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading cart", e);
        return [];
    }
};

export const addToCart = async (item: CoffeeItem, size: string = "Small", sugar: string = "No Sugar") => {
    try {
        const cart = await getCart();
        const existingIndex = cart.findIndex(
            (cartItem) =>
                cartItem.id === item.id &&
                cartItem.size === size &&
                cartItem.sugar === sugar
        );

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...item, size, sugar, quantity: 1 });
        }

        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
        return cart;
    } catch (e) {
        console.error("Error adding to cart", e);
        return [];
    }
};

export const updateQuantity = async (index: number, delta: number) => {
    try {
        const cart = await getCart();
        if (cart[index]) {
            cart[index].quantity += delta;
            if (cart[index].quantity < 1) cart[index].quantity = 1;
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
        return cart;
    } catch (e) {
        console.error("Error updating quantity", e);
        return [];
    }
};

export const removeFromCart = async (index: number) => {
    try {
        const cart = await getCart();
        cart.splice(index, 1);
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
        return cart;
    } catch (e) {
        console.error("Error removing from cart", e);
        return [];
    }
};

export const clearCart = async () => {
    try {
        await AsyncStorage.removeItem(CART_KEY);
    } catch (e) {
        console.error("Error clearing cart", e);
    }
};
