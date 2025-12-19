import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Props {
  label: string;
  value: string;
  bold?: boolean;
  valueStyle?: any;
  containerStyle?: any;
}

export default function OrderSummaryRow({ label, value, bold, valueStyle, containerStyle }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, containerStyle]}>
      <Text style={[styles.text, { color: colors.textSecondary }, bold && [styles.bold, { color: colors.text }]]}>
        {label}
      </Text>
      <Text style={[styles.text, { color: colors.textSecondary }, valueStyle, bold && [styles.bold, { color: colors.text }]]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "700",
  },
});
