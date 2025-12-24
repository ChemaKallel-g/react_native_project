import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenTemplate from "../templates/ScreenTemplate";
import Button from "../components/Button";
import OrderSummaryRow from "../components/OrderSummaryRow";
import CartItemCard from "../components/CartItemCard";
import { getCart, updateQuantity, removeFromCart, clearCart, CartItem } from "../services/cartStorage";
import { saveOrder } from "../services/orderStorage";
import { useTheme } from "../context/ThemeContext";

export default function PaymentScreen({}: any) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { colors } = useTheme();

  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const handleIncrease = async (index: number) => {
    const updated = await updateQuantity(index, 1);
    setCart(updated);
  };

  const handleDecrease = async (index: number) => {
    const updated = await updateQuantity(index, -1);
    setCart(updated);
  };

  const handleRemove = async (index: number) => {
    const updated = await removeFromCart(index);
    setCart(updated);
  };

  

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const discount = subtotal * 0.25;
  const total = subtotal - discount;

  const handleBuy = async () => {
    if (cart.length === 0) {
      Alert.alert("Cart Empty", "Please add items before buying!");
      return;
    }

    await saveOrder(cart, total);
    await clearCart();
    setCart([]);
    Alert.alert("Success", "Payment successful! Order saved to history.");
  };



  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <View style={[styles.summary, { borderTopColor: "transparent" }]}>
        <OrderSummaryRow
          label="Subtotal"
          value={`Rp ${subtotal.toLocaleString()}`}
        />
        <OrderSummaryRow
          label="Discount"
          value={`Rp ${discount.toLocaleString()}`}
        />
        <OrderSummaryRow
          label="Total"
          value={`Rp ${total.toLocaleString()}`}
          bold
        />
      </View>

      <View style={styles.paymentSection}>
        <Text style={[styles.paymentTitle, { color: colors.text }]}>Payment</Text>
        <View style={styles.paymentIconsRow}>
          <Image source={require("../assets/visa.png")} style={styles.paymentIcon} />
          <Image source={require("../assets/paypal.png")} style={styles.paymentIcon} />
          <Image source={require("../assets/mastercard.png")} style={styles.paymentIcon} />
        </View>
      </View>

      <Button
        title="Buy"
        onPress={handleBuy}
        style={{ backgroundColor: "#0A4D2E", paddingVertical: 18 }}
      />
      <View style={{ height: 100 }} />
    </View>
  );

  return (
    <ScreenTemplate scrollable={false}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.cartHeaderTop}>
          <Text style={[styles.title, { color: colors.text }]}>Cart</Text>
        </View>

        {cart.length > 0 ? (
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <CartItemCard
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                size={item.size || "Small"}
                sugar={item.sugar || "No Sugar"}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => handleIncrease(index)}
                onDecrease={() => handleDecrease(index)}
                onRemove={() => handleRemove(index)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Your cart is empty</Text>
          </View>
        )}
      </View>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  cartHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  footerContainer: {
    marginTop: 20,
  },
  summary: {
    borderTopWidth: 0,
    paddingTop: 0,
    marginBottom: 20,
  },
  paymentSection: {
    marginTop: 10,
    marginBottom: 25,
  },
  paymentIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 15,
  },
  paymentTitle: { fontSize: 18, fontWeight: "700" },
  paymentIcon: { width: 45, height: 28, resizeMode: "contain", borderRadius: 4 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
});
