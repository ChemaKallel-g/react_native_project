import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps {
  title: string;
  onPress: (event?: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: string;          
  iconColor?: string;          
  iconSize?: number;  
}

export default function Button({ title, onPress, style, textStyle, iconName, iconColor = "#fff", iconSize = 20  }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0a7e36d3",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 10,
  },
});
