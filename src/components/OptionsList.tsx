import React from "react";
import { Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Category = {
  name: string;
  icon: any;
};

type OptionListProps = {
  options: Category[];
  selected: string;
  onSelect: (option: string) => void;
};

export default function OptionList({
  options,
  selected,
  onSelect,
}: OptionListProps) {
  const { colors, isDark } = useTheme();

  return (
    <FlatList
      horizontal
      data={options}
      keyExtractor={(item) => item.name}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isActive = item.name === selected;
        return (
          <TouchableOpacity
            style={[
              styles.optionBtn,
              { backgroundColor: isActive ? colors.primary : colors.surface },
            ]}
            onPress={() => onSelect(item.name)}
            activeOpacity={0.7}
          >
            <Image
              source={item.icon}
              style={[
                styles.icon,
                { tintColor: isActive ? "#fff" : isDark ? colors.text : "#000" }
              ]}
            />
            <Text
              style={[
                styles.optionText,
                { color: isActive ? "#fff" : colors.text },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#F0F0F0",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: "contain",
  },
});