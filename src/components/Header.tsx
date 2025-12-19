import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

type HeaderProps = {
  userName: string;
  location?: string;
  notifications?: number;
  onPressNotification?: () => void;
  onPressProfile?: () => void;
};

export default function Header({
  userName,
  location = "Unknown",
  notifications = 0,
  onPressNotification,
  onPressProfile,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { colors, toggleTheme, isDark } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10, backgroundColor: colors.background }]}>
      {/* Profile */}
      <TouchableOpacity onPress={onPressProfile} activeOpacity={0.7}>
        <Image
          source={require("../assets/person.png")}
          style={styles.profileImg}
        />
      </TouchableOpacity>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={[styles.greeting, { color: colors.text }]}>Good morning, {userName}</Text>

        <View style={styles.locationRow}>
          <Image
            source={require('../assets/locationicon.png')}
            style={styles.locationIcon}
          />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      {/* Theme Toggle */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.notification, { backgroundColor: colors.surface, marginRight: 10 }]}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 20 }}>
          {isDark ? "☀️" : "🌙"}
        </Text>
      </TouchableOpacity>

      {/* Notification */}
      <TouchableOpacity
        onPress={onPressNotification}
        style={[styles.notification, { backgroundColor: colors.surface }]}
        activeOpacity={0.7}
      >
        <Image
          source={require('../assets/notif.png')}
          style={styles.notificationIcon}
        />
        {notifications > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {notifications > 9 ? "9+" : notifications}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a7e36",
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: "contain",
  },
  notification: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF3B30",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
