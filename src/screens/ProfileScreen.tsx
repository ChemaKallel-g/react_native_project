import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import ScreenTemplate from "../templates/ScreenTemplate";
import { getOrders, Order } from "../services/orderStorage";
import { getCurrentUser, logout, AuthUser } from "../services/authStorage";
import { RootStackNavProp } from "../navigators/types";

export default function ProfileScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation<RootStackNavProp<any>>();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                const pastOrders = await getOrders();
                setOrders(pastOrders);
            };
            loadData();
        }, [])
    );

    const handleLogout = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <ScreenTemplate>
            <View style={styles.container}>
                <View style={[styles.header, { backgroundColor: colors.primary }]}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={require("../assets/person.png")}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.userName}>{user?.nom || "Utilisateur"}</Text>
                    <Text style={styles.userEmail}>{user?.email || ""}</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Informations Personnelles</Text>

                    <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Nom complet</Text>
                            <Text style={[styles.infoValue, { color: colors.text }]}>{user?.nom}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
                            <Text style={[styles.infoValue, { color: colors.text }]}>{user?.email}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Localisation</Text>
                            <Text style={[styles.infoValue, { color: colors.text }]}>{user?.location || "Non spécifiée"}</Text>
                        </View>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 10 }]}>Historique des commandes</Text>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <View key={order.id} style={[styles.infoCard, { backgroundColor: colors.card, marginBottom: 15 }]}>
                                <View style={styles.infoRow}>
                                    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Date: {new Date(order.date).toLocaleDateString()}</Text>
                                    <Text style={[styles.infoValue, { color: colors.primary, fontSize: 18 }]}>Rp {order.total.toLocaleString()}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={{ paddingTop: 10 }}>
                                    {order.items.map((item, idx) => (
                                        <Text key={idx} style={{ color: colors.text, fontSize: 14 }}>
                                            - {item.quantity}x {item.title} ({item.size})
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: colors.textSecondary, marginBottom: 20 }}>Aucune commande passée.</Text>
                    )}

                    <TouchableOpacity
                        style={[styles.logoutButton, { borderColor: colors.primary }]}
                        onPress={handleLogout}
                    >
                        <Text style={[styles.logoutText, { color: colors.primary }]}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenTemplate>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 100, // Add padding to avoid overlapping with absolute TabBar
    },
    header: {
        paddingVertical: 40,
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    profileImageContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 5,
        marginBottom: 15,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
    userName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    userEmail: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 4,
    },
    infoSection: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 15,
    },
    infoCard: {
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        marginBottom: 30,
    },
    infoRow: {
        paddingVertical: 12,
    },
    infoLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
    },
    logoutButton: {
        borderWidth: 2,
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "700",
    },
});
