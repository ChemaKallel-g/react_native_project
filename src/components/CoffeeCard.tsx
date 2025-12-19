import { Alert, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { RootStackParamList } from "../navigators/types";
import { addFavorite, removeFavorite, isItemFavorite } from "../services/favoriteStorage";
import { addToCart } from "../services/cartStorage";

export type CoffeeItem = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  image: any;
  rating: number;
};

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

export default function CoffeeCard({ item }: { item: CoffeeItem }) {
  const navigation = useNavigation<NavProp>();
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkFavorite = async () => {
        const fav = await isItemFavorite(item.id);
        setIsFavorite(fav);
      };
      checkFavorite();
    }, [item.id])
  );

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(item.id);
    } else {
      await addFavorite(item);
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    await addToCart(item);
    Alert.alert("Succès", `${item.title} a été ajouté au panier !`);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("CoffeeDetails", { item })
      }
    >
      <Image source={item.image} style={styles.cardImg} />
      <View style={styles.titleRow}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Image
            source={require("../assets/Heart.png")}
            style={[
              styles.heartIcon,
              { tintColor: isFavorite ? "#FF4D4D" : "#FFBABA" }
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.cardSub, { color: colors.textSecondary }]}>{item.subtitle}</Text>

      <View style={styles.priceRow}>
        <Text style={[styles.price, { color: colors.primary }]}>{item.price} Dt</Text>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={handleAddToCart}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { height: 230, width: 160, marginRight: 15, borderRadius: 16, padding: 8, elevation: 4, marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardImg: { width: "100%", height: 120, borderRadius: 12 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  heartIcon: { width: 22, height: 22 },
  cardSub: { fontSize: 13, marginTop: 2 },
  priceRow: { flexDirection: "row", marginTop: 10, justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 16, fontWeight: "800" },
  addBtn: { width: 32, height: 32, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  addText: { color: "white", fontSize: 20, fontWeight: "bold" },
});
