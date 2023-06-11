import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth_service } from "../services/auth.service";

const SignupScreen = () => {
  const navigation = useNavigation();
  const logo = "../public/logo.png";

  const [credentials, setCredentials] = useState({
    "email": "",
    "password": "",
  });

  const handleChanges = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();

    auth_service.login(credentials)
      .then(response => {
        auth_service.save_token(response.data.accessToken);
        navigation.navigate("HomeScreen");
      })
      .catch(err => console.log(err))
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textCenter}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image source={{ logo }} style={styles.logo} />
          </TouchableOpacity>
          <View style={styles.spaceY}>
            <Text style={styles.title}>Connectez-vous à votre compte</Text>
            <Text>
              Vous n'avez pas encore de compte ?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('InscriptionScreen')}
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
            onChangeText={value => handleChanges("email", value)}
            value={credentials.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text>Mot de passe</Text>
          <TextInput
            style={styles.input}
            name="password"
            onChangeText={value => handleChanges("password", value)}
            value={credentials.password}
            secureTextEntry={true}
          />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    maxWidth: 360,
    width: '100%',
  },
  textCenter: {
    alignItems: 'center',
  },
  spaceY: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: '#069',
  },
  form: {
    marginTop: 32,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#069',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default SignupScreen;
