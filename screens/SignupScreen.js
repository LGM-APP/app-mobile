import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth_service } from "../services/auth.service";
import logoImage from "../public/logo.png"; // Importation de l'image du logo

const SignupScreen = () => {
  const navigation = useNavigation();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const handleChanges = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await auth_service.login(credentials);
      await auth_service.save_token(response.data.accessToken);
      navigation.navigate("DrawerNavigator");
    } catch (err) {
      console.log(err);
      setIncorrectPassword(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIncorrectPassword(false);
      setCredentials({
        email: "",
        password: "",
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textCenter}>
          <Image source={logoImage} style={styles.logo} />
          <View style={styles.spaceY}>
            <Text style={styles.title}>Connectez-vous à votre compte</Text>
            <Text>
              Vous n'avez pas encore de compte ?{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("InscriptionScreen")}
              >
                Inscrivez-vous
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.form}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            name="email"
            onChangeText={(value) => handleChanges("email", value)}
            value={credentials.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text>Mot de passe</Text>
          <TextInput
            style={styles.input}
            name="password"
            onChangeText={(value) => handleChanges("password", value)}
            value={credentials.password}
            secureTextEntry={true}
          />
          {incorrectPassword && (
            <Text style={styles.incorrectPasswordText}>Mot de passe incorrect</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    maxWidth: 360,
    width: "100%",
  },
  textCenter: {
    alignItems: "center",
  },
  spaceY: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    color: "#069",
  },
  form: {
    marginTop: 32,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#069",
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  incorrectPasswordText: {
    color: "red",
    marginTop: 5,
  },
});

export default SignupScreen;
