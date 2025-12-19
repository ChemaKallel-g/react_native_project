import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavProp } from '../navigators/types';

export default function WelcomeScreen() {
  const navigation = useNavigation<RootStackNavProp<'Welcome'>>();
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <Image
          source={require("../assets/splash.png")}
          style={styles.mainImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Coffee so good,{"\n"}
          <Text style={styles.titleHighlight}>your taste buds{"\n"}will love it</Text>
        </Text>

        <Text style={styles.subtitle}>
          The best grain, the finest roast,{"\n"}
          the most powerful flavor.
        </Text>

        <Button title="Get started"
          onPress={() => navigation.navigate("Login")} />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#C48E4D" },
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  mainImage: { width: 550, height: 290, marginBottom: 40 },
  title: { fontSize: 26, textAlign: "center", color: "white", fontWeight: "700", lineHeight: 32 },
  titleHighlight: { color: "#FFF", fontWeight: "700" },
  subtitle: { marginTop: 15, textAlign: "center", color: "white", fontSize: 17, lineHeight: 20 },
});
