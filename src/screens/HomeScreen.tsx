import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CoffeeCard from "../components/CoffeeCard";
import { coffeeData } from "../data/coffeeData";
import { categories } from "../data/categoriesData";
import ScreenTemplate from "../templates/ScreenTemplate";
import OptionList from "../components/OptionsList";
import { getCurrentUser, getUsers } from "../services/authStorage";

export default function HomeScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Cappuccino");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  const filteredData = coffeeData.filter(item => item.category === selectedCategory);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    const foundCategory = categories.find(cat => cat.name.toLowerCase() === query);
    if (foundCategory) {
      setSelectedCategory(foundCategory.name);
    }
  }, [searchQuery]);

  useEffect(() => {
    const loadUser = async () => {
      const current = await getCurrentUser();
      setUser(current);
    };
    const getUsersList = async () => {
      await getUsers();
    }
    loadUser();
    getUsersList();
  }, []);

  return (
    <ScreenTemplate>
      <Header
        userName={user?.nom}
        location={user?.location}
        notifications={3}
        onPressNotification={() => console.log("Notification clicked")}
        onPressProfile={() => console.log("Profile clicked")}
      />

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
      <OptionList
        options={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <FlatList
        horizontal
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CoffeeCard item={item} />}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Special Offer</Text>

      <FlatList
        horizontal
        data={coffeeData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CoffeeCard item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 20
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.5,
    marginTop: 20,
  },
});
