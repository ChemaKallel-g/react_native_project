import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { useTheme } from '../context/ThemeContext';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    let iconSource;

                    if (route.name === 'Home') {
                        iconSource = require('../assets/home.png');
                    } else if (route.name === 'Favorites') {
                        iconSource = require('../assets/favorie.png');
                    } else if (route.name === 'Cart') {
                        iconSource = require('../assets/panier.png');
                    } else if (route.name === 'Profile') {
                        iconSource = require('../assets/profile.png');
                    }

                    return (
                        <Image
                            source={iconSource}
                            style={[
                                styles.icon,
                                { tintColor: color }
                            ]}
                            resizeMode="contain"
                        />
                    );
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.inactive,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    backgroundColor: colors.card,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    display: 'none',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen name="Cart" component={PaymentScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});
