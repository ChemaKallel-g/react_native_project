import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { RouteProp, useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../navigators/types";
import { addFavorite, removeFavorite, isItemFavorite } from "../services/favoriteStorage";
import { addToCart } from "../services/cartStorage";
import { useTheme } from "../context/ThemeContext";

type RouteProps = RouteProp<RootStackParamList, "CoffeeDetails">;

export default function CoffeeDetailsScreen() {
  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const { item } = params;

  const [size, setSize] = useState("Medium");
  const [sugar, setSugar] = useState("No Sugar");
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
      await addFavorite(item as any);
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(item as any, size, sugar);
      navigation.navigate("Main", { screen: "Cart" });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.headerContainer}>
        <ImageBackground source={item.image} style={styles.image} resizeMode="cover">
          <View style={styles.overlay}>
            <View style={styles.topButtons}>
              <TouchableOpacity
                style={[styles.circleBtn, { backgroundColor: colors.card }]}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={require("../assets/fleche.png")}
                  style={[styles.backIcon, { tintColor: colors.primary }]}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.circleBtn, { backgroundColor: colors.card }]} onPress={toggleFavorite}>
                <Image
                  source={require("../assets/Heart.png")}
                  style={[
                    styles.heartIconHeader,
                    { tintColor: isFavorite ? "#FF4D4D" : colors.primary }
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.headerInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle || "With Sugar"}</Text>
              </View>

              <View style={[styles.ratingBadge, { backgroundColor: colors.rating }]}>
                <Image
                  source={require("../assets/etoile.png")}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>{item.rating || "4.8"}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={[styles.content, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Cup Size</Text>
        <View style={styles.optionsRow}>
          {["Small", "Medium", "Large"].map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSize(s)}
              style={[
                styles.optionItem,
                { backgroundColor: colors.surface },
                size === s && { backgroundColor: colors.primary }
              ]}
            >
              <Text style={[
                styles.optionLabel,
                { color: colors.textSecondary },
                size === s && { color: "#fff", fontWeight: "bold" }
              ]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Level Sugar</Text>
        <View style={styles.optionsRow}>
          {["No Sugar", "Low", "Medium"].map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSugar(s)}
              style={[
                styles.optionItem,
                { backgroundColor: colors.surface },
                sugar === s && { backgroundColor: colors.primary }
              ]}
            >
              <Text style={[
                styles.optionLabel,
                { color: colors.textSecondary },
                sugar === s && { color: "#fff", fontWeight: "bold" }
              ]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <Text style={[styles.about, { color: colors.textSecondary }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat..... <Text style={[styles.readMore, { color: colors.primary }]}>Read More</Text>
        </Text>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.cartBtn, { backgroundColor: colors.primary }]}
          onPress={handleAddToCart}
        >
          <Text style={styles.cartBtnMainText}>Add to cart</Text>
          <View style={styles.separator} />
          <Text style={styles.cartBtnPrice}>{item.price} Dt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { height: 450 },
  image: { width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 24,
    justifyContent: "space-between",
    paddingTop: 60,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heartIconHeader: {
    width: 24,
    height: 24,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  titleContainer: { flex: 1 },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#eee", marginTop: 4 },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  ratingText: { color: "#fff", marginLeft: 6, fontWeight: "bold", fontSize: 16 },
  content: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 24, marginBottom: 16 },
  optionsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  optionItem: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  optionLabel: { fontSize: 16 },
  about: { fontSize: 14, lineHeight: 22, textAlign: "justify" },
  readMore: { fontWeight: "bold" },
  bottomBar: { padding: 24 },
  cartBtn: {
    height: 64,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  cartBtnMainText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  separator: { width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.3)", marginHorizontal: 20 },
  cartBtnPrice: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
