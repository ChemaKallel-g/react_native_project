import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import CartScreen from "../screens/CoffeeDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0A7A47",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "cart" : "cart-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}