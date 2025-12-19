import React, { PropsWithChildren } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface ScreenTemplateProps extends PropsWithChildren {
    scrollable?: boolean;
}

function ScreenTemplate({ children, scrollable = true }: ScreenTemplateProps) {
    const { colors } = useTheme();

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            {scrollable ? (
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={{ flex: 1 }}>
                    {children}
                </View>
            )}
        </View>
    );
}

export default ScreenTemplate;