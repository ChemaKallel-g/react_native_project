import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavProp } from "../navigators/types";
import Input from "../components/Input";
import Button from "../components/Button";
import { saveUser } from "../services/authStorage";


const TEXT_DARK = "#111827";

export default function SignupScreen() {
    const navigation = useNavigation<RootStackNavProp<"Signup">>();

    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");

    const [location, setLocation] = useState(""); // nouveau champ
    const [erreurs, setErreurs] = useState<any>({});

    const emailValide = (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const validerFormulaire = () => {
        const e: any = {};

        if (!nom) e.nom = "Le nom est requis";
        if (!email) e.email = "L’adresse email est requise";
        else if (!emailValide(email)) e.email = "Adresse email invalide";

        if (!motDePasse) e.motDePasse = "Mot de passe requis";



        if (!location) e.location = "La localisation est requise"; // validation location

        setErreurs(e);
        return Object.keys(e).length === 0;
    };

    const handleSignup = async () => {
        if (!validerFormulaire()) return;
        const newUser = {
            nom,
            email,
            motDePasse,
            location,
        };

        await saveUser(newUser);

        navigation.replace("Main");
    };

    return (
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.background}
        >
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.card}>
                    <Text style={styles.title}>Create Account</Text>


                    <Input
                        placeholder="Nom complet"
                        value={nom}
                        onChangeText={setNom}
                        style={styles.input}
                    />
                    {erreurs.nom && <Text style={styles.error}>{erreurs.nom}</Text>}

                    <Input
                        placeholder="Adresse email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    {erreurs.email && <Text style={styles.error}>{erreurs.email}</Text>}
                    <Input
                        placeholder="Localisation"
                        value={location}
                        onChangeText={setLocation}
                        style={styles.input}
                    />
                    {erreurs.location && (
                        <Text style={styles.error}>{erreurs.location}</Text>
                    )}

                    <Input
                        placeholder="Mot de passe"
                        value={motDePasse}
                        onChangeText={setMotDePasse}
                        style={styles.input}
                    />
                    {erreurs.motDePasse && (
                        <Text style={styles.error}>{erreurs.motDePasse}</Text>
                    )}



                    <Button
                        title="S’inscrire"
                        onPress={handleSignup}
                    />

                    <Text style={styles.loginText}>
                        Déjà un compte ?{' '}
                        <Text
                            style={styles.loginLink}
                            onPress={() => navigation.navigate("Login")}
                        >
                            Se connecter
                        </Text>
                    </Text>
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
        // Removed background and shadows
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#FFFFFF", // White
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
    error: {
        color: "#EF4444", // Lighter red
        fontSize: 13,
        marginTop: 2,
        marginLeft: 4,
        marginBottom: 8,
    },
    loginText: {
        textAlign: "center",
        marginTop: 24,
        fontSize: 14,
        color: "#E5E7EB", // Light gray
    },
    loginLink: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
});
