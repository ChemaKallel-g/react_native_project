import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
        {/* Icône recherche */}
        <Image
          source={require('../assets/search.png')}
          style={[styles.searchIcon, isDark && { tintColor: colors.textSecondary }]}
        />

        <TextInput
          placeholder="Search Coffee ..."
          placeholderTextColor={isDark ? colors.textSecondary : "#07271387"}
          style={[styles.searchInput, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
        />

        {/* Icône filtre */}
        <Image
          source={require('../assets/filter.png')}
          style={[styles.filterIcon, isDark && { tintColor: colors.textSecondary }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  filterIcon: {
    width: 24,
    height: 24,
    marginLeft: 15,
    resizeMode: "contain",
  },
});
