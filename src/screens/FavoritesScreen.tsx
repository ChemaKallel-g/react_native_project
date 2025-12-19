import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getFavorites } from '../services/favoriteStorage';
import CoffeeCard, { CoffeeItem } from '../components/CoffeeCard';
import { useTheme } from '../context/ThemeContext';

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState<CoffeeItem[]>([]);
    const { colors } = useTheme();

    useFocusEffect(
        useCallback(() => {
            const loadFavorites = async () => {
                const data = await getFavorites();
                setFavorites(data);
            };
            loadFavorites();
        }, [])
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Favorite</Text>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={({ item }) => <CoffeeCard item={item} />}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No favorites yet.</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    listContainer: {
        paddingBottom: 100,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
});
