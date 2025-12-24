import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavProp } from "../navigators/types";
import Button from "../components/Button";
import Input from "../components/Input";
import { getUsers } from "../services/authStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";


const TEXT_DARK = "#111827";


export default function LoginScreen() {
    const navigation = useNavigation<RootStackNavProp<"Login">>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    const isValidEmail = (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const validate = () => {
        const e: typeof errors = {};
        if (!email) e.email = "Champs Email est obligatoire";
        else if (!isValidEmail(email)) e.email = "Adresse Email invalide";

        if (!password) e.password = "Champs Mot de Passe est obligatoire";

        setErrors(e);
        return Object.keys(e).length === 0;
    };


    const handleLogin = async () => {
        if (!validate()) return;

        const allUsers = await getUsers();
        const foundUser = allUsers.find(u => u.email === email && u.motDePasse === password);

        if (!foundUser) {
            setErrors({ email: "Utilisateur non trouvé ou mot de passe incorrect" });
            return;
        }

        // Optionnel : sauvegarder le dernier utilisateur connecté
        await AsyncStorage.setItem("AUTH_USER", JSON.stringify(foundUser));

        navigation.replace("Main");
    };

    return (
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.card}>
                    <Text style={styles.brand}>Welcome Back!</Text>


                    <Input placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
                    {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <View style={{ position: "relative" }}>
                        <Input
                            placeholder="Mot de passe"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            style={{ position: "absolute", right: 16, top: 18 }}
                            onPress={() => setShowPassword(!showPassword)}
                        >


                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Button title="Se connecter" onPress={handleLogin} />



                    <View style={styles.signupContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                            <Text style={styles.signupLink}>Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(29, 28, 28, 0.35)",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    card: {
        padding: 35,
        // Removed background and shadows for transparent look
    },
    brand: {
        fontSize: 32,
        fontWeight: "800",
        color: "#FFFFFF", // White for contrast
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#E5E7EB", // Light gray
        textAlign: "center",
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: TEXT_DARK,
        backgroundColor: "#F9FAFB",
        marginBottom: 12,
        marginTop: 4,
    },
    error: { fontSize: 13, color: "#EF4444", marginTop: 2, marginLeft: 4 }, // Lighter red
    forgot: { textAlign: "center", marginTop: 24, fontSize: 14, color: "#FFFFFF", fontWeight: "600" },
    signupContainer: { marginTop: 32, alignItems: "center" },
    signupLink: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
