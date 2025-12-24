import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


interface Props {
  image: any;
  title: string;
  subtitle: string;
  size: string;
  sugar: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItemCard({
  image,
  title,
  subtitle,
  size,
  sugar,
  price,
  quantity,
  onIncrease,
  
  onRemove,
}: Props) {
 

  return (
    <View style={[styles.cartCard, { backgroundColor: "#FFF" }]}>
      <Image source={image} style={styles.cartImage} />

      <View style={styles.cartContent}>
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.cartTitle, { color: "#000" }]}>{title}</Text>
            <TouchableOpacity onPress={onRemove}>
              <Image
                source={require("../assets/Heart.png")}
                style={styles.heartIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.cartSubtitle, { color: "#666" }]}>{subtitle}</Text>
          <Text style={[styles.priceText, { color: "#000" }]}>
            Rp {(price * quantity).toLocaleString()}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.optionsCol}>
            <Text style={[styles.optionsText, { color: "#666" }]}>Cap Size: <Text style={{ fontWeight: "bold" }}>{size}</Text></Text>
            <Text style={[styles.optionsText, { color: "#666" }]}>Level Sugar: <Text style={{ fontWeight: "bold" }}>{sugar}</Text></Text>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityNumber, { color: "#000" }]}>{quantity}</Text>
            <TouchableOpacity
              style={styles.plusBtn}
              onPress={onIncrease}
            >
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartCard: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cartImage: {
    width: 130,
    height: 100,
    borderRadius: 15,
  },
  cartContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  mainInfo: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFBABA",
  },
  cartSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  optionsCol: {
    flex: 1,
  },
  optionsText: {
    fontSize: 13,
    marginBottom: 2,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityNumber: {
    fontSize: 26,
    fontWeight: "700",
    marginRight: 15,
  },
  plusBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0A4D2E",
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});